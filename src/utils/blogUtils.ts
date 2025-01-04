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
}) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([post])
    .select()
    .single();

  if (error) throw error;
  return data;
};