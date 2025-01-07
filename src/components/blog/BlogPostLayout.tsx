import React from 'react';
import { BlogPost } from '@/integrations/supabase/types/blog';
import { BlogHeader } from './BlogHeader';
import { BlogContent } from './BlogContent';
import { BlogSidebar } from './BlogSidebar';
import { ShareButtons } from './ShareButtons';

interface BlogPostLayoutProps {
  post: BlogPost['Row'];
}

export const BlogPostLayout = ({ post }: BlogPostLayoutProps) => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-12">
        <article className="flex-1">
          <BlogHeader post={post} />
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 mb-8">
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
        <BlogSidebar currentPostId={post.id} />
      </div>
    </div>
  );
};