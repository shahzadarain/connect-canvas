import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { generateTableOfContents } from '@/utils/blogUtils';
import { BlogHeader } from '@/components/blog/BlogHeader';
import { BlogContent } from '@/components/blog/BlogContent';

const BlogPost = () => {
  const { slug } = useParams();

  const { data: post, isLoading } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      console.log('Fetching blog post:', slug);
      // First try to fetch by slug
      let { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle();
      
      if (!data && !error) {
        console.log('Post not found by slug, trying ID 45');
        // If not found by slug, try ID 45
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
    <>
      <Navigation />
      <main className="min-h-screen pt-20 bg-white dark:bg-gray-900">
        {isLoading ? (
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ) : !post ? (
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">Post not found</h1>
            <p>The blog post you're looking for doesn't exist or has been removed.</p>
          </div>
        ) : (
          <>
            <Helmet>
              <title>{post.title} | Shahzad ASGHAR</title>
              <meta name="description" content={post.meta_description || post.excerpt} />
              {post.meta_keywords && (
                <meta name="keywords" content={post.meta_keywords.join(', ')} />
              )}
              <meta property="og:title" content={post.title} />
              <meta property="og:description" content={post.meta_description || post.excerpt} />
              {post.featured_image && (
                <meta property="og:image" content={post.featured_image} />
              )}
            </Helmet>
            <article className="container mx-auto px-4 py-12 max-w-4xl">
              <BlogHeader post={post} />

              {post.featured_image && (
                <div className="mb-16">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-[500px] object-cover rounded-xl shadow-xl"
                  />
                </div>
              )}

              <TableOfContents items={generateTableOfContents(post.content)} />
              
              <BlogContent content={post.content} />

              <ShareButtons 
                url={window.location.href} 
                title={post.title} 
              />
            </article>
          </>
        )}
      </main>
    </>
  );
};

export default BlogPost;