import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { format } from 'date-fns';
import { Clock, Calendar, User } from 'lucide-react';
import { calculateReadingTime } from '@/utils/blogUtils';
import { BlogPost } from '@/integrations/supabase/types/blog';
import type { Json } from '@/integrations/supabase/types/common';

interface BlogPostHeroProps {
  post: BlogPost['Row'];
}

export const BlogPostHero = ({ post }: BlogPostHeroProps) => {
  const readingTime = calculateReadingTime(post.content);

  return (
    <div className="relative h-[70vh] overflow-hidden mb-16">
      <AspectRatio ratio={21/9} className="h-full">
        <img
          src={post.featured_image || `https://source.unsplash.com/random/1920x1080?${post.tags?.[0] || 'blog'}`}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      </AspectRatio>
      
      <div className="absolute inset-x-0 bottom-0 p-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-3 mb-8">
            {post.category && (
              <span className="px-4 py-1.5 bg-purple-500/20 backdrop-blur-sm rounded-full text-sm font-medium text-purple-200 border border-purple-400/20">
                {post.category}
              </span>
            )}
            {post.tags?.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-gray-100 border border-white/20"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-8 leading-tight text-white font-bold tracking-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-8 text-gray-200">
            <span className="flex items-center gap-2">
              <User className="w-5 h-5" />
              {post.author}
            </span>
            <time className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {format(new Date(post.published_at || post.created_at || ''), 'MMMM d, yyyy')}
            </time>
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {readingTime} min read
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};