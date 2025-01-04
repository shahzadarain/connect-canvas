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

  // Function to format content with proper spacing and styling
  const formatContent = (content: string) => {
    // Split content by double newlines to separate paragraphs
    const paragraphs = content.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      // Check if the paragraph is a heading
      if (paragraph.startsWith('#')) {
        const level = paragraph.match(/^#+/)[0].length;
        const text = paragraph.replace(/^#+\s/, '');
        const headingClasses = {
          1: 'text-4xl font-bold mb-6 mt-8',
          2: 'text-3xl font-bold mb-5 mt-7',
          3: 'text-2xl font-bold mb-4 mt-6',
          4: 'text-xl font-bold mb-3 mt-5',
        }[level] || 'text-lg font-bold mb-2 mt-4';
        
        return <h1 key={index} className={headingClasses}>{text}</h1>;
      }
      
      // Check if the paragraph is a list item
      if (paragraph.trim().startsWith('- ') || paragraph.trim().match(/^\d+\./)) {
        const items = paragraph.split('\n').map(item => 
          item.replace(/^-\s|^\d+\.\s/, '').trim()
        );
        
        return (
          <ul key={index} className="list-disc list-inside space-y-2 mb-4 ml-4">
            {items.map((item, i) => (
              <li key={i} className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                {item}
              </li>
            ))}
          </ul>
        );
      }
      
      // Regular paragraph
      return (
        <p key={index} className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 bg-white dark:bg-gray-900">
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
            <article className="container mx-auto px-4 py-8 max-w-3xl">
              <header className="mb-12 text-center">
                <h1 className="text-5xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
                  {post.title}
                </h1>
                <div className="text-gray-600 dark:text-gray-400 mb-6">
                  {format(new Date(post.published_at), 'MMMM d, yyyy')} • {post.author}
                </div>
                {post.tags && (
                  <div className="flex flex-wrap gap-2 justify-center mt-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>
              {post.featured_image && (
                <div className="mb-12">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-[400px] object-cover rounded-lg shadow-lg"
                  />
                </div>
              )}
              <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-800 dark:hover:prose-a:text-blue-300">
                {formatContent(post.content)}
              </div>
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="text-gray-600 dark:text-gray-400">
                    Written by {post.author}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {format(new Date(post.published_at), 'MMMM d, yyyy')}
                  </div>
                </div>
              </div>
            </article>
          </>
        )}
      </main>
    </>
  );
};

export default BlogPost;