import React, { useEffect, useState } from 'react';
import { BlogPost } from '@/integrations/supabase/types/blog';
import { BlogContent } from './BlogContent';
import { BlogSidebar } from './BlogSidebar';
import { ShareButtons } from './ShareButtons';
import { ReadingProgress } from './ReadingProgress';
import { BlogHeader } from './BlogHeader';

interface BlogPostLayoutProps {
  post: BlogPost['Row'];
}

export const BlogPostLayout = ({ post }: BlogPostLayoutProps) => {
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const updateReadingProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', updateReadingProgress);
    return () => window.removeEventListener('scroll', updateReadingProgress);
  }, []);

  return (
    <>
      <ReadingProgress progress={readingProgress} />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12">
            <article className="flex-1">
              <BlogHeader post={post} />
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 dark:border-gray-800">
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
            <aside className="lg:w-80">
              <div className="sticky top-8">
                <BlogSidebar currentPostId={post.id} />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};