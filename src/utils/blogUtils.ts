import { supabase } from "@/integrations/supabase/client";

export const createBlogPost = async (post: {
  title: string;
  content: string;
  excerpt?: string;
  author: string;
  slug: string;
  tags?: string[];
  meta_description?: string;
  meta_keywords?: string[];
  status?: string;
  published_at?: string;
}) => {
  console.log('Creating blog post with data:', { ...post, content: '...[content truncated]...' });
  
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([post])
    .select()
    .single();

  if (error) {
    console.error('Error from Supabase:', error);
    throw error;
  }
  
  console.log('Blog post created successfully:', data);
  return data;
};