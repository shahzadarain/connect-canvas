import React from 'react';
import { BlogPost } from '@/integrations/supabase/types/blog';
import { formatDistanceToNow } from 'date-fns';
import { Clock } from 'lucide-react';
import { calculateReadingTime } from '@/utils/blogUtils';
import { Badge } from '../ui/badge';

export interface BlogHeaderProps {
  post: BlogPost['Row'];
}

export const BlogHeader: React.FC<BlogHeaderProps> = ({ post }) => {
  return (
    <header className="mb-8">
      <div className="flex gap-2 mb-4">
        {post.status === 'draft' && (
          <Badge variant="secondary">Draft</Badge>
        )}
        {post.tags?.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <h1 className="text-4xl font-serif mb-4">
        {post.title}
      </h1>
      
      <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400">
        <span>{post.author}</span>
        <time>
          {formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
        </time>
        <span className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          {calculateReadingTime(post.content)} min read
        </span>
      </div>
    </header>
  );
};