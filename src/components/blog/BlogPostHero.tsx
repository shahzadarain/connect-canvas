import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { format } from 'date-fns';
import { Clock, Calendar, User } from 'lucide-react';
import { calculateReadingTime } from '@/utils/blogUtils';
import { BlogPost } from '@/integrations/supabase/types/blog';

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
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      </AspectRatio>
      
      <div className="absolute inset-x-0 bottom-0 p-8 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            {post.category && (
              <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
                {post.category}
              </span>
            )}
            {post.tags?.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-white/90">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.author}
            </span>
            <time className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {format(new Date(post.published_at), 'MMMM d, yyyy')}
            </time>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {readingTime} min read
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};