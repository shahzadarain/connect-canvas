import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PERPLEXITY_API_KEY = Deno.env.get('PERPLEXITY_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Fetching news articles...');
    
    // Create Supabase client
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Check for recent articles in the database
    const { data: existingArticles } = await supabase
      .from('news_articles')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(6);

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

    // Fetch new articles using Perplexity
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: 'You are a news curator specialized in technology and AI. Return only the latest news in a structured format.'
          },
          {
            role: 'user',
            content: 'What are the latest technology and AI news? Return the response in this exact JSON format: { "articles": [{ "title": "", "description": "", "url": "", "category": "tech/ai" }] }. Include 6 articles maximum.'
          }
        ],
        temperature: 0.2,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();
    const articles = JSON.parse(data.choices[0].message.content).articles;

    // Store the new articles in the database
    console.log('Storing new articles in the database...');
    const { error } = await supabase
      .from('news_articles')
      .insert(articles.map((article: any) => ({
        ...article,
        published_at: new Date().toISOString(),
      })));

    if (error) {
      console.error('Error storing articles:', error);
      throw error;
    }

    return new Response(JSON.stringify({ articles }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in fetch-news function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});