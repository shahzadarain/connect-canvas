import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'
import { Configuration, OpenAIApi } from 'https://esm.sh/openai@3.3.0'

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
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Check for required environment variables
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error('OPENAI_API_KEY is required')
    }

    // Check for recent articles in the database
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000)
    const { data: existingArticles } = await supabaseClient
      .from('news_articles')
      .select('*')
      .gt('created_at', thirtyMinutesAgo.toISOString())
      .order('created_at', { ascending: false })

    if (existingArticles && existingArticles.length >= 6) {
      console.log('Returning existing articles from database')
      return new Response(
        JSON.stringify({ articles: existingArticles }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Initialize OpenAI
    const configuration = new Configuration({
      apiKey: openaiApiKey,
    })
    const openai = new OpenAIApi(configuration)

    // Generate new articles using OpenAI
    console.log('Generating new articles using OpenAI')
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a technology news curator. Generate 6 realistic and current news articles about technology and AI advancements. Each article should:
          - Have a clear, concise title
          - Include a detailed description (2-3 sentences)
          - Be categorized as either "tech" or "ai"
          - Focus on real technological trends and developments
          Return the response in JSON format with an array of articles containing title, description, and category fields.`
        },
        {
          role: 'user',
          content: 'Generate 6 current technology and AI news articles. Make them sound like real news articles with accurate technical details and industry trends.'
        }
      ],
      temperature: 0.6,
      max_tokens: 1000,
    })

    const generatedArticles = JSON.parse(completion.data.choices[0].message.content)

    // Store the new articles in the database
    const { data: insertedArticles, error: insertError } = await supabaseClient
      .from('news_articles')
      .insert(
        generatedArticles.articles.map((article: any) => ({
          title: article.title,
          description: article.description,
          category: article.category,
          created_at: new Date().toISOString(),
        }))
      )
      .select()

    if (insertError) {
      console.error('Error inserting articles:', insertError)
      throw insertError
    }

    return new Response(
      JSON.stringify({ articles: insertedArticles }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})