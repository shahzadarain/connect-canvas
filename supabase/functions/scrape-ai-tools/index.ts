import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'
import * as cheerio from 'https://esm.sh/cheerio@1.0.0-rc.12'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface AITool {
  name: string;
  description: string;
  image_url: string;
  url: string;
  category?: string;
  tags: string[];
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Starting AI tools scraping...')
    const response = await fetch('https://www.futuretools.io/')
    const html = await response.text()
    const $ = cheerio.load(html)
    const tools: AITool[] = []

    $('.tool.w-dyn-item').each((_, element) => {
      const $tool = $(element)
      const name = $tool.find('.tool-item-link---new').text().trim()
      const description = $tool.find('.tool-item-description-box---new').text().trim()
      const image_url = $tool.find('.tool-item-image---new').attr('src') || ''
      const url = 'https://www.futuretools.io' + $tool.find('.tool-item-link-block---new').attr('href')
      const tags: string[] = []
      
      $tool.find('.text-block-53').each((_, tagElement) => {
        tags.push($(tagElement).text().trim())
      })

      if (name && description) {
        tools.push({
          name,
          description,
          image_url,
          url,
          tags
        })
      }
    })

    console.log(`Found ${tools.length} tools`)

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Insert tools into database
    const { error } = await supabaseClient
      .from('ai_tools')
      .upsert(
        tools.map(tool => ({
          ...tool,
          updated_at: new Date().toISOString()
        })),
        { onConflict: 'name' }
      )

    if (error) throw error

    return new Response(
      JSON.stringify({ success: true, message: `Successfully scraped ${tools.length} tools` }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})