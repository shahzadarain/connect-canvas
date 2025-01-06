import React from 'react';
import { format } from 'date-fns';
import { Clock, BookOpen } from 'lucide-react';
import { calculateReadingTime } from '@/utils/blogUtils';
import { BlogPost } from '@/integrations/supabase/types/blog';

interface BlogHeaderProps {
  post: BlogPost['Row'];
}

export const BlogHeader = ({ post }: BlogHeaderProps) => {
  return (
    <header className="mb-16 text-center animate-fade-in">
      <h1 className="text-5xl font-bold mb-8 leading-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent font-serif">
        {post.title}
      </h1>
      <div className="flex items-center justify-center gap-8 text-gray-600 dark:text-gray-400 mb-8">
        <span className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <BookOpen className="w-5 h-5 mr-2" />
          {post.author}
        </span>
        <span className="text-sm">
          {format(new Date(post.published_at || ''), 'MMMM d, yyyy')}
        </span>
        <span className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <Clock className="w-5 h-5 mr-2" />
          {calculateReadingTime(post.content)} min read
        </span>
      </div>
      {post.tags && (
        <div className="flex flex-wrap gap-3 justify-center mt-6">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </header>
  );
};