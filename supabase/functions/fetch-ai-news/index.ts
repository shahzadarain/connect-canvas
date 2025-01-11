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

    const response = await fetch('https://www.futuretools.io/news', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`)
    }

    const html = await response.text()
    const $ = cheerio.load(html)
    const newsArticles = []
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    console.log('Parsing HTML and extracting articles...')

    $('.link-block-8.w-inline-block').each((i, element) => {
      const articleElement = $(element)
      const dateText = articleElement.find('.text-block-30.blue-text-dm').text().trim()
      const title = articleElement.find('.text-block-27.white-text-db-gc').text().trim()
      const description = articleElement.find('.text-block-29.white-text-db-gc').text().trim()
      const url = articleElement.attr('href')
      
      const publishedAt = new Date(dateText)
      
      if (title && url && publishedAt >= thirtyDaysAgo) {
        newsArticles.push({
          title,
          url,
          description,
          published_at: publishedAt.toISOString(),
          created_at: new Date().toISOString(),
          category: 'ai'
        })
      }
    })

    console.log(`Found ${newsArticles.length} news articles within the last 30 days`)

    // Delete articles older than 30 days
    const { error: deleteError } = await supabaseClient
      .from('news_articles')
      .delete()
      .lt('published_at', thirtyDaysAgo.toISOString())

    if (deleteError) {
      console.error('Error deleting old articles:', deleteError)
      throw deleteError
    }

    console.log('Successfully deleted old articles')

    if (newsArticles.length === 0) {
      console.log('No articles found to insert')
      return new Response(
        JSON.stringify({ message: 'No new articles found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Insert new articles
    const { data: insertedArticles, error: insertError } = await supabaseClient
      .from('news_articles')
      .upsert(newsArticles, { 
        onConflict: 'title',
        ignoreDuplicates: true 
      })
      .select()

    if (insertError) {
      console.error('Error inserting articles:', insertError)
      throw insertError
    }

    console.log('Successfully inserted articles:', insertedArticles?.length || 0)

    return new Response(
      JSON.stringify({ articles: insertedArticles }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})