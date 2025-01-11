import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';
import * as cheerio from 'https://esm.sh/cheerio@1.0.0-rc.12';

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
    console.log('Starting to fetch UN jobs...');
    const response = await fetch('https://unjobs.org/');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    const $ = cheerio.load(html);
    const jobs: UNJob[] = [];

    console.log('Parsing HTML content...');
    // Select all job elements on the page
    $('.job').each((_, element) => {
      try {
        const jobElement = $(element);
        const titleElement = jobElement.find('a.jtitle');
        const timeElement = jobElement.find('time.upd.timeago');
        
        const job_id = jobElement.attr('id')?.trim() || '';
        const title = titleElement.text().trim();
        const job_link = titleElement.attr('href') || '';
        // Get organization by finding the text after the <br> tag
        const organization = jobElement.find('br').get(0)?.nextSibling?.nodeValue?.trim() || '';
        const update_time = timeElement.attr('datetime') || '';

        if (job_id && title && organization && update_time && job_link) {
          console.log(`Found valid job: ${job_id} - ${title}`);
          jobs.push({
            job_id,
            title,
            organization,
            update_time,
            job_link: `https://unjobs.org${job_link}`,
          });
        } else {
          console.log('Skipped invalid job entry:', { job_id, title, organization });
        }
      } catch (error) {
        console.error('Error processing individual job:', error);
      }
    });

    console.log(`Successfully parsed ${jobs.length} jobs`);
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
    console.log('Starting UN jobs update process...');
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const jobs = await fetchJobs();
    console.log(`Fetched ${jobs.length} jobs, preparing to update database`);

    // Process jobs in batches to avoid potential timeout issues
    const batchSize = 50;
    for (let i = 0; i < jobs.length; i += batchSize) {
      const batch = jobs.slice(i, i + batchSize);
      const { error } = await supabaseClient
        .from('un_jobs')
        .upsert(
          batch.map(job => ({
            job_id: job.job_id,
            title: job.title,
            organization: job.organization,
            update_time: job.update_time,
            job_link: job.job_link,
          })),
          { onConflict: 'job_id' }
        );

      if (error) {
        console.error(`Error upserting batch ${i / batchSize + 1}:`, error);
      } else {
        console.log(`Successfully processed batch ${i / batchSize + 1} of ${Math.ceil(jobs.length / batchSize)}`);
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