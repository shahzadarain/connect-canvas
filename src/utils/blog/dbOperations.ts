import { supabase } from "@/integrations/supabase/client";
import { BlogPostInput } from "./types";

export const createBlogPost = async (post: BlogPostInput) => {
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

export const initializeBlogPosts = async () => {
  console.log('Initializing blog posts...');
  
  const { initialBlogPosts } = await import('./initialPosts');
  
  for (const post of initialBlogPosts) {
    try {
      console.log(`Checking if blog post exists: ${post.slug}`);
      const { data: existingPost, error } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', post.slug)
        .maybeSingle();
      
      if (error) {
        console.error(`Error checking for existing post ${post.slug}:`, error);
        continue;
      }

      if (!existingPost) {
        console.log(`Creating blog post: ${post.title}`);
        await createBlogPost({
          ...post,
          published_at: new Date().toISOString(),
        });
      } else {
        console.log(`Blog post already exists: ${post.title}`);
      }
    } catch (error) {
      console.error(`Error processing blog post ${post.title}:`, error);
      // Continue with next post even if one fails
      continue;
    }
  }
  
  console.log('Blog posts initialization completed');
};