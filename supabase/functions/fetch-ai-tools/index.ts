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

    // Fetch the webpage
    const response = await fetch('https://www.futuretools.io/')
    const html = await response.text()
    
    // Parse HTML with cheerio
    const $ = cheerio.load(html)
    const tools: any[] = []

    // Parse tools from the page
    $('.tool-card').each((_, element) => {
      const card = $(element)
      const tool = {
        name: card.find('.tool-title').text().trim(),
        description: card.find('.tool-description').text().trim(),
        url: card.find('a').attr('href'),
        category: card.find('.tool-category').text().trim(),
        pricing_type: card.find('.tool-pricing').text().trim(),
        image_url: card.find('img').attr('src'),
      }
      
      if (tool.name && tool.description) {
        tools.push(tool)
      }
    })

    console.log(`Found ${tools.length} tools`)

    if (tools.length > 0) {
      // Clear existing tools and insert new ones
      const { error: deleteError } = await supabaseClient
        .from('ai_tools')
        .delete()
        .neq('id', 0) // Delete all records

      if (deleteError) {
        throw deleteError
      }

      const { error: insertError } = await supabaseClient
        .from('ai_tools')
        .insert(tools)

      if (insertError) {
        throw insertError
      }

      console.log('Successfully updated AI tools in database')
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