import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { Helmet } from 'react-helmet';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { generateTableOfContents } from '@/utils/blogUtils';
import { BlogHeader } from '@/components/blog/BlogHeader';
import { BlogContent } from '@/components/blog/BlogContent';
import { BlogSidebar } from '@/components/blog/BlogSidebar';

const BlogPost = () => {
  const { slug } = useParams();

  const { data: post, isLoading } = useQuery({
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
    <>
      <main className="min-h-screen pt-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        {isLoading ? (
          <div className="container mx-auto px-4 py-8 max-w-6xl">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ) : !post ? (
          <div className="container mx-auto px-4 py-8 max-w-6xl">
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
            <div className="container mx-auto px-4 py-12 max-w-6xl">
              <div className="flex flex-col lg:flex-row gap-12">
                <article className="flex-1">
                  <BlogHeader post={post} />
                  <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 mb-8">
                    <TableOfContents items={generateTableOfContents(post.content)} />
                    <BlogContent 
                      content={post.content} 
                      featuredImage={post.featured_image}
                    />
                    <ShareButtons 
                      url={window.location.href} 
                      title={post.title} 
                    />
                  </div>
                </article>
                <BlogSidebar currentPostId={post.id} />
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default BlogPost;