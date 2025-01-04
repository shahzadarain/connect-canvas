import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';

const BlogPost = () => {
  const { slug } = useParams();

  const { data: post, isLoading } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      console.log('Fetching blog post:', slug);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle();
      
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
      <main className="min-h-screen pt-20">
        {isLoading ? (
          <div className="container mx-auto px-4 py-8">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ) : !post ? (
          <div className="container mx-auto px-4 py-8">
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
            <article className="container mx-auto px-4 py-8 max-w-4xl">
              <header className="mb-8">
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <div className="text-muted-foreground">
                  {format(new Date(post.published_at), 'MMMM d, yyyy')} • {post.author}
                </div>
                {post.tags && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>
              {post.featured_image && (
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-[400px] object-cover rounded-lg mb-8"
                />
              )}
              <div 
                className="prose prose-lg max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>
          </>
        )}
      </main>
    </>
  );
};

export default BlogPost;