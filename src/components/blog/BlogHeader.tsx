import React from 'react';
import { format } from 'date-fns';
import { Clock, BookOpen } from 'lucide-react';
import { calculateReadingTime } from '@/utils/blogUtils';
import { BlogPost } from '@/integrations/supabase/types/blog';

interface BlogHeaderProps {
  post: BlogPost['Row'];
}

export const BlogHeader = ({ post }: BlogHeaderProps) => {
  const processImageUrl = (url: string | null) => {
    if (!url) return null;
    
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }

    return url.startsWith('/') ? `${window.location.origin}${url}` : `${window.location.origin}/${url}`;
  };

  const featuredImage = processImageUrl(post.featured_image);

  return (
    <header className="relative w-full mb-16">
      {/* Hero Image Container */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        {featuredImage && (
          <img
            src={featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error('Error loading featured image:', featuredImage);
              e.currentTarget.src = `https://images.unsplash.com/photo-1486718448742-163732cd1544?auto=format&fit=crop&w=2000&q=80`;
            }}
          />
        )}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
      </div>

      {/* Content Container - Positioned absolutely over the image */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl px-4">
        {/* Tags */}
        {post.tags && (
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-white/90 text-gray-800 px-4 py-2 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight text-center">
          {post.title}
        </h1>

        {/* Metadata */}
        <div className="flex items-center justify-center gap-8 text-white/90">
          <span className="flex items-center">
            <BookOpen className="w-5 h-5 mr-2" aria-hidden="true" />
            <span>{post.author}</span>
          </span>
          <time dateTime={post.published_at || ''} className="text-sm font-medium">
            {format(new Date(post.published_at || ''), 'MMMM d, yyyy')}
          </time>
          <span className="flex items-center">
            <Clock className="w-5 h-5 mr-2" aria-hidden="true" />
            <span>{calculateReadingTime(post.content)} min read</span>
          </span>
        </div>
      </div>
    </header>
  );
};