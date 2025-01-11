import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface UNJob {
  job_id: string;
  title: string;
  organization: string;
  update_time: string;
  job_link: string;
}

async function fetchJobs(): Promise<UNJob[]> {
  try {
    const response = await fetch('https://unjobs.org/');
    const html = await response.text();
    const $ = cheerio.load(html);
    const jobs: UNJob[] = [];

    $('.job').each((_, element) => {
      const jobElement = $(element);
      const titleElement = jobElement.find('a.jtitle');
      const timeElement = jobElement.find('time.upd.timeago');
      
      const job_id = jobElement.attr('id') || '';
      const title = titleElement.text().trim();
      const job_link = titleElement.attr('href') || '';
      const organization = jobElement.find('br').get(0)?.nextSibling?.nodeValue?.trim() || '';
      const update_time = timeElement.attr('datetime') || '';

      if (job_id && title && organization && update_time && job_link) {
        jobs.push({
          job_id,
          title,
          organization,
          update_time,
          job_link: `https://unjobs.org${job_link}`,
        });
      }
    });

    return jobs;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const jobs = await fetchJobs();
    console.log(`Fetched ${jobs.length} jobs`);

    for (const job of jobs) {
      const { error } = await supabaseClient
        .from('un_jobs')
        .upsert(
          {
            job_id: job.job_id,
            title: job.title,
            organization: job.organization,
            update_time: job.update_time,
            job_link: job.job_link,
          },
          { onConflict: 'job_id' }
        );

      if (error) {
        console.error('Error upserting job:', error);
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: `Successfully processed ${jobs.length} jobs` }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});