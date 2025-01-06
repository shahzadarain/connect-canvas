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
    <header className="mb-16 text-center">
      <h1 className="text-5xl font-bold mb-8 leading-tight text-gray-900 dark:text-white font-serif">
        {post.title}
      </h1>
      <div className="flex items-center justify-center gap-6 text-gray-600 dark:text-gray-400 mb-8">
        <span className="flex items-center">
          <BookOpen className="w-5 h-5 mr-2" />
          {post.author}
        </span>
        <span>{format(new Date(post.published_at || ''), 'MMMM d, yyyy')}</span>
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
  );
};