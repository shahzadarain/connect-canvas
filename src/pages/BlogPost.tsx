import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { Clock, BookOpen } from 'lucide-react';
import { calculateReadingTime, generateTableOfContents } from '@/utils/blogUtils';

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

  const { data: relatedPosts } = useQuery({
    queryKey: ['related-posts', post?.tags],
    enabled: !!post?.tags,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .neq('id', post.id)
        .eq('status', 'published')
        .contains('tags', post.tags)
        .limit(3);

      if (error) throw error;
      return data;
    },
  });

  // Function to format content with proper spacing and styling
  const formatContent = (content: string) => {
    const paragraphs = content.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      if (paragraph.startsWith('#')) {
        const level = paragraph.match(/^#+/)[0].length;
        const text = paragraph.replace(/^#+\s/, '');
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const headingClasses = {
          1: 'text-4xl font-bold mb-8 mt-12 leading-tight scroll-mt-20',
          2: 'text-3xl font-bold mb-6 mt-10 leading-tight scroll-mt-20',
          3: 'text-2xl font-bold mb-4 mt-8 leading-tight scroll-mt-20',
          4: 'text-xl font-bold mb-3 mt-6 leading-tight scroll-mt-20',
        }[level] || 'text-lg font-bold mb-2 mt-4 scroll-mt-20';
        
        return <h1 key={index} id={id} className={headingClasses}>{text}</h1>;
      }
      
      if (paragraph.trim().startsWith('- ') || paragraph.trim().match(/^\d+\./)) {
        const items = paragraph.split('\n').map(item => 
          item.replace(/^-\s|^\d+\.\s/, '').trim()
        );
        
        return (
          <ul key={index} className="list-disc list-inside space-y-4 mb-6 ml-6">
            {items.map((item, i) => (
              <li key={i} className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">
                {item}
              </li>
            ))}
          </ul>
        );
      }
      
      return (
        <p key={index} className="text-xl leading-relaxed mb-8 text-gray-700 dark:text-gray-300 font-serif">
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
          <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ) : !post ? (
          <div className="container mx-auto px-4 py-8 max-w-3xl">
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
            <article className="container mx-auto px-4 py-12 max-w-3xl">
              <header className="mb-16 text-center">
                <h1 className="text-5xl font-bold mb-8 leading-tight text-gray-900 dark:text-white font-serif">
                  {post.title}
                </h1>
                <div className="flex items-center justify-center gap-6 text-gray-600 dark:text-gray-400 mb-8">
                  <span className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    {post.author}
                  </span>
                  <span>{format(new Date(post.published_at), 'MMMM d, yyyy')}</span>
                  <span className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    {calculateReadingTime(post.content)} min read
                  </span>
                </div>
                {post.tags && (
                  <div className="flex flex-wrap gap-3 justify-center mt-6">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>

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
              
              <div className="prose prose-xl max-w-none dark:prose-invert prose-headings:font-serif prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-800 dark:hover:prose-a:text-blue-300">
                {formatContent(post.content)}
              </div>

              <ShareButtons 
                url={window.location.href} 
                title={post.title} 
              />

              {relatedPosts && relatedPosts.length > 0 && (
                <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <a
                        key={relatedPost.id}
                        href={`/blog/${relatedPost.slug}`}
                        className="group block bg-gray-50 dark:bg-gray-800 rounded-lg p-6 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-500 transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between text-lg">
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