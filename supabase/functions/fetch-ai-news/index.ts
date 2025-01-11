import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'
import * as cheerio from 'https://esm.sh/cheerio@1.0.0-rc.12'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Starting AI news scraping from futuretools.io...')
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // First, let's add some test data to ensure the function works
    const testArticles = [
      {
        title: "Test AI News Article 1",
        url: "https://example.com/article1",
        source: "Test Source",
        published_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        category: 'ai'
      },
      {
        title: "Test AI News Article 2",
        url: "https://example.com/article2",
        source: "Test Source",
        published_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        category: 'ai'
      }
    ];

    console.log('Inserting test articles:', testArticles);

    // Insert test articles
    const { data: insertedArticles, error: insertError } = await supabaseClient
      .from('news_articles')
      .upsert(testArticles, { 
        onConflict: 'title',
        ignoreDuplicates: true 
      })
      .select();

    if (insertError) {
      console.error('Error inserting test articles:', insertError);
      throw insertError;
    }

    console.log('Successfully inserted test articles:', insertedArticles);

    return new Response(
      JSON.stringify({ articles: insertedArticles }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})