
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { UAParser } from 'https://esm.sh/ua-parser-js@2.0.0-beta.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const body = await req.json()
    const { pathname, referrer, userId } = body
    const userAgent = req.headers.get('user-agent') || ''
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('cf-connecting-ip') || ''

    // Parse user agent
    const parser = new UAParser(userAgent)
    const browser = parser.getBrowser()
    const os = parser.getOS()
    const device = parser.getDevice()

    // Get location data from IP
    const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`)
    const geoData = await geoResponse.json()

    const { data, error } = await supabaseClient
      .from('visitor_analytics')
      .insert([
        {
          ip_address: ip,
          user_agent: userAgent,
          browser: browser.name,
          operating_system: os.name,
          device_type: device.type || 'desktop',
          country: geoData.country_name,
          city: geoData.city,
          pathname,
          referrer,
          user_id: userId,
          session_id: crypto.randomUUID()
        }
      ])

    if (error) throw error

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error tracking visitor:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
