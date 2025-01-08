import { serve } from 'https://deno.fresh.dev/std@v1/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Fetching Mapbox token from environment...');
    const token = Deno.env.get('MAPBOX_TOKEN');
    
    if (!token) {
      console.error('Mapbox token not found in environment variables');
      return new Response(
        JSON.stringify({ 
          error: 'Mapbox token not configured',
          status: 500 
        }),
        { 
          status: 500,
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      );
    }

    console.log('Successfully retrieved Mapbox token');
    return new Response(
      JSON.stringify({ token }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  } catch (error) {
    console.error('Error in get-mapbox-token function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message,
        status: 500 
      }),
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  }
});