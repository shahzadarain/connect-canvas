import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { ReadingProgress } from './ReadingProgress';
import { useTheme } from 'next-themes';
import { BookPage } from './BookPage';
import { BlogCoverImage } from './BlogCoverImage';
import { BlogContentFormatter } from './BlogContentFormatter';

interface BlogContentProps {
  content: string;
  featuredImage?: string | null;
}

export const BlogContent = ({ content, featuredImage }: BlogContentProps) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const { theme } = useTheme();
  
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
    <article className="relative max-w-4xl mx-auto px-4 md:px-0">
      <ReadingProgress progress={readingProgress} />
      
      <BlogCoverImage featuredImage={featuredImage} />
      
      <BookPage>
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <BookOpen className="w-8 h-8 text-blue-500 dark:text-blue-400" />
        </div>
        
        <div className="prose prose-xl max-w-none dark:prose-invert">
          <BlogContentFormatter content={content} />
        </div>
      </BookPage>
    </article>
  );
};