import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4"
import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
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
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1'
      }
    })

    if (!response.ok) {
      console.error(`Failed to fetch with status: ${response.status}`)
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`)
    }

    const html = await response.text()
    console.log('Successfully fetched HTML content, length:', html.length)
    
    // Parse HTML with cheerio
    const $ = cheerio.load(html)
    const tools: any[] = []

    // Log the full HTML structure for debugging
    console.log('HTML Structure:', $.html().substring(0, 500)) // Log first 500 chars

    // Using the provided selectors
    $('.w-dyn-item').each((_, element) => {
      const card = $(element)
      
      const name = card.find('.tool-item-link---new').text().trim()
      const description = card.find('.tool-item-description-box---new').text().trim()
      const url = card.find('.tool-item-link-block---new').attr('href')
      const type = card.find('.text-block-53').text().trim()
      const imageUrl = card.find('.tool-item-image---new').attr('src')
      
      console.log('Processing tool:', { 
        name, 
        description: description.substring(0, 50) + '...',
        url,
        type,
        imageUrl
      })

      if (name && description) {
        tools.push({
          name,
          description,
          url: url?.startsWith('http') ? url : `https://www.futuretools.io${url}`,
          category: type || 'Uncategorized',
          image_url: imageUrl?.startsWith('http') ? imageUrl : (imageUrl ? `https://www.futuretools.io${imageUrl}` : null),
          pricing_type: 'Free/Paid', // Default value
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