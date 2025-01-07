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
    <header 
      className="mb-16 text-center animate-fade-in"
      role="banner"
      aria-label="Blog post header"
    >
      <h1 className="text-5xl font-bold mb-8 leading-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-serif tracking-tight">
        {post.title}
      </h1>
      <div 
        className="flex items-center justify-center gap-8 text-gray-600 dark:text-gray-400 mb-8"
        role="contentinfo"
        aria-label="Post metadata"
      >
        <span className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <BookOpen className="w-5 h-5 mr-2" aria-hidden="true" />
          <span>{post.author}</span>
        </span>
        <time 
          dateTime={post.published_at || ''}
          className="text-sm font-medium"
        >
          {format(new Date(post.published_at || ''), 'MMMM d, yyyy')}
        </time>
        <span className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <Clock className="w-5 h-5 mr-2" aria-hidden="true" />
          <span>{calculateReadingTime(post.content)} min read</span>
        </span>
      </div>
      {post.tags && (
        <div 
          className="flex flex-wrap gap-3 justify-center mt-6"
          role="navigation"
          aria-label="Post tags"
        >
          {post.tags.map((tag) => (
            <span
              key={tag}
              role="link"
              tabIndex={0}
              className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 
                px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-100 
                dark:hover:bg-blue-900/50 transition-colors cursor-default shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                dark:focus:ring-blue-400 dark:focus:ring-offset-gray-900"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </header>
  );
};