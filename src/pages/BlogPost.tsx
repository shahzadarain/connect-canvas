import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BlogPostSkeleton } from '@/components/blog/BlogPostSkeleton';
import { BlogPostError } from '@/components/blog/BlogPostError';
import { BlogPostMeta } from '@/components/blog/BlogPostMeta';
import { BlogPostLayout } from '@/components/blog/BlogPostLayout';

const BlogPost = () => {
  const { slug } = useParams();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      console.log('Fetching blog post:', slug);
      let { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle();
      
      if (!data && !error) {
        console.log('Post not found by slug, trying ID 45');
        ({ data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', 45)
          .eq('status', 'published')
          .maybeSingle());
      }
      
      if (error) {
        console.error('Error fetching blog post:', error);
        throw error;
      }
      console.log('Fetched blog post:', data);
      return data;
    },
  });

  return (
    <main className="min-h-screen pt-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {isLoading ? (
        <BlogPostSkeleton />
      ) : error ? (
        <BlogPostError message={error.message} />
      ) : !post ? (
        <BlogPostError />
      ) : (
        <>
          <BlogPostMeta post={post} />
          <BlogPostLayout post={post} />
        </>
      )}
    </main>
  );
};

export default BlogPost;