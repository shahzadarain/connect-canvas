import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting fetch-news function execution...');
    
    // Validate environment variables
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set in environment variables');
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Supabase configuration is missing');
    }

    console.log('Environment variables validated successfully');
    
    // Create Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Check for recent articles in the database
    console.log('Checking for recent articles in database...');
    const { data: existingArticles, error: dbError } = await supabase
      .from('news_articles')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(6);

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error(`Failed to fetch existing articles: ${dbError.message}`);
    }

    // If we have recent articles (less than 1 hour old), return them
    if (existingArticles && existingArticles.length > 0) {
      const mostRecentArticle = existingArticles[0];
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      
      if (new Date(mostRecentArticle.published_at) > oneHourAgo) {
        console.log('Returning cached articles');
        return new Response(JSON.stringify({ articles: existingArticles }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    console.log('Fetching fresh news from OpenAI API...');
    
    // Fetch new articles using OpenAI
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a news curator specialized in technology and AI. Generate 6 recent news articles about technology and AI advancements. Make them sound realistic and current.'
          },
          {
            role: 'user',
            content: 'Generate 6 recent technology and AI news articles. For each article include a title, description, and category (either "tech" or "ai"). Make them sound like real news articles.'
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text();
      console.error('OpenAI API error response:', errorText);
      throw new Error(`OpenAI API returned status ${openaiResponse.status}: ${errorText}`);
    }

    const openaiData = await openaiResponse.json();
    console.log('Received response from OpenAI API');

    if (!openaiData.choices?.[0]?.message?.content) {
      console.error('Invalid OpenAI API response format:', openaiData);
      throw new Error('Invalid response format from OpenAI API');
    }

    let articles;
    try {
      articles = JSON.parse(openaiData.choices[0].message.content).articles;
    } catch (parseError) {
      console.error('Failed to parse OpenAI API response:', openaiData.choices[0].message.content);
      throw new Error('Failed to parse news articles from API response');
    }

    // Store the new articles in the database
    console.log('Storing new articles in the database...');
    const { error: insertError } = await supabase
      .from('news_articles')
      .insert(articles.map((article: any) => ({
        ...article,
        published_at: new Date().toISOString(),
      })));

    if (insertError) {
      console.error('Error storing articles:', insertError);
      throw new Error(`Failed to store articles: ${insertError.message}`);
    }

    console.log('Successfully stored and returning new articles');
    return new Response(JSON.stringify({ articles }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in fetch-news function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack,
        timestamp: new Date().toISOString()
      }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});