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

  const formatContent = (content: string) => {
    let inCodeBlock = false;
    let currentLanguage = '';
    let currentCode = '';
    const formattedContent: JSX.Element[] = [];
    let currentIndex = 0;

    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Handle code block start
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          currentLanguage = line.trim().slice(3).toLowerCase() || 'plaintext';
          currentCode = '';
          continue;
        } else {
          // End of code block
          inCodeBlock = false;
          formattedContent.push(
            <div key={currentIndex} className="my-8">
              <div className="bg-code border border-code-border rounded-t-lg px-4 py-2">
                <span className="text-sm font-mono text-code-foreground">
                  {currentLanguage}
                </span>
              </div>
              <pre className="bg-code border border-code-border border-t-0 rounded-b-lg p-4">
                <code className="text-code-foreground whitespace-pre">
                  {currentCode.trim()}
                </code>
              </pre>
            </div>
          );
          currentIndex++;
          continue;
        }
      }

      // Inside code block
      if (inCodeBlock) {
        currentCode += line + '\n';
        continue;
      }

      // Handle empty lines between paragraphs
      if (line.trim() === '') {
        continue;
      }

      // Handle headings
      if (line.startsWith('#')) {
        const level = line.match(/^#+/)[0].length;
        const text = line.replace(/^#+\s/, '');
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const headingClasses = {
          1: 'text-4xl font-bold mb-8 mt-12 leading-tight scroll-mt-20',
          2: 'text-3xl font-bold mb-6 mt-10 leading-tight scroll-mt-20',
          3: 'text-2xl font-bold mb-4 mt-8 leading-tight scroll-mt-20',
          4: 'text-xl font-bold mb-3 mt-6 leading-tight scroll-mt-20',
        }[level] || 'text-lg font-bold mb-2 mt-4 scroll-mt-20';
        
        formattedContent.push(
          <h1 key={currentIndex} id={id} className={headingClasses}>
            {text}
          </h1>
        );
        currentIndex++;
        continue;
      }

      // Handle lists
      if (line.trim().startsWith('- ') || line.trim().match(/^\d+\./)) {
        let listItems = [line];
        // Collect all consecutive list items
        while (i + 1 < lines.length && 
               (lines[i + 1].trim().startsWith('- ') || 
                lines[i + 1].trim().match(/^\d+\./))) {
          i++;
          listItems.push(lines[i]);
        }
        
        formattedContent.push(
          <ul key={currentIndex} className="list-disc list-inside space-y-4 mb-6 ml-6">
            {listItems.map((item, idx) => (
              <li key={idx} className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">
                {item.replace(/^-\s|^\d+\.\s/, '').trim()}
              </li>
            ))}
          </ul>
        );
        currentIndex++;
        continue;
      }

      // Regular paragraphs
      formattedContent.push(
        <p key={currentIndex} className="text-xl leading-relaxed mb-8 text-gray-700 dark:text-gray-300 font-serif">
          {line}
        </p>
      );
      currentIndex++;
    }

    return formattedContent;
  };

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
                        className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-4 py-2 rounded-full text-sm font-medium"
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
            </article>
          </>
        )}
      </main>
    </>
  );
};

export default BlogPost;
