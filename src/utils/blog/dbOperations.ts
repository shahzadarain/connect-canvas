import { supabase } from "@/integrations/supabase/client";
import { initialBlogPosts } from "./initialPosts";
import { BlogPostInput } from "./types";

export const initializeBlogPosts = async () => {
  console.log("Initializing blog posts...");
  
  try {
    // Check if posts already exist
    const { data: existingPosts, error: checkError } = await supabase
      .from("blog_posts")
      .select("slug");

    if (checkError) {
      console.error("Error checking existing posts:", checkError);
      throw checkError;
    }

    const existingSlugs = new Set(existingPosts?.map(post => post.slug));
    const postsToInsert = initialBlogPosts.filter(post => !existingSlugs.has(post.slug));

    if (postsToInsert.length === 0) {
      console.log("No new posts to insert");
      return;
    }

    console.log(`Inserting ${postsToInsert.length} new posts...`);
    const { data, error } = await supabase
      .from("blog_posts")
      .insert(postsToInsert)
      .select();

    if (error) {
      console.error("Error inserting blog posts:", error);
      throw error;
    }

    console.log("Successfully inserted blog posts:", data);
    return data;
  } catch (error) {
    console.error("Error in initializeBlogPosts:", error);
    throw error;
  }
};

export const createBlogPost = async (post: BlogPostInput) => {
  const { data, error } = await supabase
    .from("blog_posts")
    .insert([post])
    .select();

  if (error) throw error;
  return data;
};