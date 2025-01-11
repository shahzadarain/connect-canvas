import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'
import * as cheerio from 'https://esm.sh/cheerio@1.0.0-rc.12'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface UNJob {
  job_id: string;
  title: string;
  organization: string;
  update_time: string;
  job_link: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Starting UN jobs scraping...')
    const response = await fetch('https://unjobs.org/new')
    const html = await response.text()
    const $ = cheerio.load(html)
    const jobs: UNJob[] = []

    $('.job').each((_, element) => {
      const jobElement = $(element)
      const jobId = jobElement.attr('id')
      const titleElement = jobElement.find('a.jtitle')
      const title = titleElement.text().trim()
      const jobLink = titleElement.attr('href')
      const organization = jobElement.find('br').get(0)?.nextSibling?.nodeValue?.trim() || ''
      const updateTime = jobElement.find('time.upd.timeago').attr('datetime')

      if (jobId && title && organization && updateTime && jobLink) {
        jobs.push({
          job_id: jobId,
          title,
          organization,
          update_time: updateTime,
          job_link: jobLink.startsWith('http') ? jobLink : `https://unjobs.org${jobLink}`
        })
      }
    })

    console.log(`Found ${jobs.length} jobs`)

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Insert jobs into database
    const { error } = await supabaseClient
      .from('un_jobs')
      .upsert(
        jobs.map(job => ({
          ...job,
          updated_at: new Date().toISOString()
        })),
        { onConflict: 'job_id' }
      )

    if (error) throw error

    return new Response(
      JSON.stringify({ success: true, message: `Successfully scraped ${jobs.length} jobs` }),
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