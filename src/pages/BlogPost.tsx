import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BlogPostSkeleton } from '@/components/blog/BlogPostSkeleton';
import { BlogPostError } from '@/components/blog/BlogPostError';
import { BlogPostMeta } from '@/components/blog/BlogPostMeta';
import { BlogPostLayout } from '@/components/blog/BlogPostLayout';
import { PageTransition } from '@/components/ui/page-transition';
import { toast } from 'sonner';

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
        toast.error('Failed to load blog post');
        throw error;
      }
      console.log('Fetched blog post:', data);
      return data;
    },
  });

  return (
    <PageTransition>
      <main className="min-h-screen pt-20 bg-gradient-to-b from-background to-muted dark:from-primary-dark dark:to-card-dark transition-colors duration-300">
        {isLoading ? (
          <div className="animate-fade-in">
            <BlogPostSkeleton />
          </div>
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
    </PageTransition>
  );
};

export default BlogPost;