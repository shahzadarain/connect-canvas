import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'
import * as cheerio from 'https://esm.sh/cheerio@1.0.0-rc.12'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Starting AI news scraping...')
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('Fetching news from futuretools.io...')
    const response = await fetch('https://www.futuretools.io/news', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })

    if (!response.ok) {
      console.error(`Failed to fetch: ${response.status} ${response.statusText}`)
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`)
    }

    const html = await response.text()
    console.log('Successfully fetched HTML content')

    const $ = cheerio.load(html)
    const newsArticles = []
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    console.log('Parsing HTML and extracting articles...')

    $('.collection-item-6').each((i, element) => {
      try {
        const articleElement = $(element)
        const dateText = articleElement.find('.text-block-30').text().trim()
        const title = articleElement.find('.text-block-27').text().trim()
        const source = articleElement.find('.text-block-28').text().trim()
        const url = articleElement.find('.link-block-8').attr('href')
        
        // Parse the date
        const publishedAt = new Date(dateText)
        
        console.log('Found article:', {
          title,
          source,
          dateText,
          url,
          publishedAt: publishedAt.toISOString()
        })
        
        if (!title || !url || !publishedAt) {
          console.log('Skipping article due to missing required fields:', { title, url, publishedAt })
          return
        }

        if (publishedAt >= thirtyDaysAgo) {
          newsArticles.push({
            title,
            url,
            description: source ? `Source: ${source}` : null,
            published_at: publishedAt.toISOString(),
            created_at: new Date().toISOString(),
            category: 'ai'
          })
        }
      } catch (error) {
        console.error('Error processing article:', error)
      }
    })

    console.log(`Found ${newsArticles.length} valid news articles within the last 30 days`)

    if (newsArticles.length === 0) {
      console.log('No articles found to insert')
      return new Response(
        JSON.stringify({ message: 'No new articles found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Delete articles older than 30 days
    console.log('Deleting old articles...')
    const { error: deleteError } = await supabaseClient
      .from('news_articles')
      .delete()
      .lt('published_at', thirtyDaysAgo.toISOString())

    if (deleteError) {
      console.error('Error deleting old articles:', deleteError)
      throw deleteError
    }

    console.log('Successfully deleted old articles')

    // Insert new articles
    console.log('Inserting new articles...')
    const { data: insertedArticles, error: insertError } = await supabaseClient
      .from('news_articles')
      .upsert(newsArticles, {
        onConflict: 'title',
        ignoreDuplicates: false
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
    console.error('Error in fetch-ai-news function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.toString()
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})