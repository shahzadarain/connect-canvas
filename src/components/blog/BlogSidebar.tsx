import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost } from '@/integrations/supabase/types/blog';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

export const BlogSidebar = ({ currentPostId }: { currentPostId: number }) => {
  const { data: relatedPosts, isLoading } = useQuery({
    queryKey: ['related-posts', currentPostId],
    queryFn: async () => {
      console.log('Fetching related posts for:', currentPostId);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .neq('id', currentPostId)
        .order('published_at', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error fetching related posts:', error);
        throw error;
      }
      
      console.log('Fetched related posts:', data);
      return data as BlogPost['Row'][];
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex-1">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="w-16 h-16 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <aside className="w-full max-w-xs">
      <h2 className="text-lg font-semibold mb-6 text-emerald-500">Top Stories</h2>
      <div className="space-y-6">
        {relatedPosts?.map((post, index) => (
          <Link 
            key={post.id}
            to={`/blog/${post.slug}`}
            className="group flex gap-4 items-start hover:bg-gray-50 dark:hover:bg-gray-800/50 p-2 rounded-lg transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium">
                  {index + 1}
                </span>
                <span>{post.author}</span>
                <span>·</span>
                <time>{format(new Date(post.published_at || ''), 'MMM dd')}</time>
              </div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-emerald-500 transition-colors">
                {post.title}
              </h3>
            </div>
            {post.featured_image && (
              <img 
                src={post.featured_image} 
                alt={post.title}
                className="w-16 h-16 object-cover rounded bg-gray-100 dark:bg-gray-800"
              />
            )}
          </Link>
        ))}
      </div>
    </aside>
  );
};