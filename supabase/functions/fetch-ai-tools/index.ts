import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4"
import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12"

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
    console.log('Starting to fetch AI tools from futuretools.io')
    
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Fetch the webpage with proper headers
    const response = await fetch('https://www.futuretools.io/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    const html = await response.text()
    console.log('Successfully fetched HTML content')
    
    // Parse HTML with cheerio
    const $ = cheerio.load(html)
    const tools: any[] = []

    // Updated selector to match the current structure
    $('.grid .group').each((_, element) => {
      const card = $(element)
      console.log('Processing card element:', card.html()?.substring(0, 100)) // Log first 100 chars of each card

      const name = card.find('h2, h3').first().text().trim()
      const description = card.find('p').first().text().trim()
      const imageUrl = card.find('img').first().attr('src')
      const url = card.find('a').first().attr('href')
      const category = card.find('.category, .tag').first().text().trim()
      
      console.log('Extracted tool data:', { name, description: description.substring(0, 50) + '...' })

      if (name && description) {
        tools.push({
          name,
          description,
          url: url?.startsWith('http') ? url : `https://www.futuretools.io${url}`,
          category,
          image_url: imageUrl?.startsWith('http') ? imageUrl : `https://www.futuretools.io${imageUrl}`,
          pricing_type: 'Free/Paid', // Default value since pricing info might not be readily available
        })
      }
    })

    console.log(`Found ${tools.length} tools`)

    if (tools.length > 0) {
      // Clear existing tools and insert new ones
      console.log('Clearing existing tools...')
      const { error: deleteError } = await supabaseClient
        .from('ai_tools')
        .delete()
        .neq('id', 0)

      if (deleteError) {
        console.error('Error deleting existing tools:', deleteError)
        throw deleteError
      }

      console.log('Inserting new tools...')
      const { error: insertError } = await supabaseClient
        .from('ai_tools')
        .insert(tools)

      if (insertError) {
        console.error('Error inserting new tools:', insertError)
        throw insertError
      }

      console.log('Successfully updated AI tools in database')
    } else {
      console.log('No tools found to insert')
    }

    return new Response(
      JSON.stringify({ success: true, message: `Updated ${tools.length} tools` }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error in fetch-ai-tools function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})