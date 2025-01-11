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

async function fetchJobsFromPage(pageUrl: string): Promise<{ jobs: UNJob[], nextPageNumber: number | null }> {
  try {
    console.log('Fetching jobs from:', pageUrl);
    const response = await fetch(pageUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    const $ = cheerio.load(html);
    const jobs: UNJob[] = [];

    console.log('Parsing HTML content...');
    $('.job').each((_, element) => {
      try {
        const jobElement = $(element);
        const titleElement = jobElement.find('a.jtitle');
        const timeElement = jobElement.find('time.upd.timeago');
        
        const job_id = jobElement.attr('id')?.trim() || '';
        const title = titleElement.text().trim();
        // Get the relative URL path and ensure it starts with a forward slash
        const jobPath = titleElement.attr('href')?.startsWith('/') 
          ? titleElement.attr('href') 
          : `/${titleElement.attr('href')}` || '';
        const organization = jobElement.find('br').get(0)?.nextSibling?.nodeValue?.trim() || '';
        const update_time = timeElement.attr('datetime') || '';

        if (job_id && title && organization && update_time && jobPath) {
          console.log(`Found valid job: ${job_id} - ${title}`);
          jobs.push({
            job_id,
            title,
            organization,
            update_time,
            job_link: `https://unjobs.org${jobPath}`, // Correctly construct the URL
          });
        } else {
          console.log('Skipped invalid job entry:', { job_id, title, organization });
        }
      } catch (error) {
        console.error('Error processing individual job:', error);
      }
    });

    // Get the total number of jobs found on this page
    console.log(`Found ${jobs.length} jobs on current page`);

    // Check for next page by looking at pagination
    const nextPageElement = $('.next');
    const hasNextPage = nextPageElement.length > 0;
    
    // Extract current page number from URL or default to 1
    const currentPageMatch = pageUrl.match(/\/new\/(\d+)$/);
    const currentPage = currentPageMatch ? parseInt(currentPageMatch[1]) : 1;
    
    console.log('Current page:', currentPage, 'Has next page:', hasNextPage);
    
    return {
      jobs,
      nextPageNumber: hasNextPage ? currentPage + 1 : null
    };
  } catch (error) {
    console.error('Error fetching jobs from page:', error);
    throw error;
  }
}

async function fetchAllJobs(): Promise<UNJob[]> {
  const allJobs: UNJob[] = [];
  let currentPage = 1;
  const MAX_PAGES = 10; // Fetch up to 10 pages to get around 250 jobs

  while (currentPage <= MAX_PAGES) {
    // Construct the URL for the current page
    const pageUrl = currentPage === 1 
      ? 'https://unjobs.org/new' 
      : `https://unjobs.org/new/${currentPage}`;
    
    console.log(`Fetching page ${currentPage}/${MAX_PAGES} from URL: ${pageUrl}`);
    
    try {
      const { jobs, nextPageNumber } = await fetchJobsFromPage(pageUrl);
      
      if (jobs.length === 0) {
        console.log('No jobs found on current page, stopping pagination');
        break;
      }
      
      allJobs.push(...jobs);
      console.log(`Added ${jobs.length} jobs. Total jobs collected: ${allJobs.length}`);
      
      if (!nextPageNumber) {
        console.log('No more pages available');
        break;
      }
      
      currentPage = nextPageNumber;
      
      // Add a delay between requests to be respectful to the server
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Error fetching page ${currentPage}:`, error);
      break;
    }
  }

  console.log(`Completed fetching all jobs. Total jobs collected: ${allJobs.length}`);
  return allJobs;
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

    const jobs = await fetchAllJobs();
    console.log(`Fetched total of ${jobs.length} jobs, preparing to update database`);

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