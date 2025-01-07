import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost } from '@/integrations/supabase/types/blog';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { BlogSearch } from './BlogSearch';
import { BlogTagCloud } from './BlogTagCloud';
import { Calendar, List } from 'lucide-react';

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

  const { data: tags } = useQuery({
    queryKey: ['blog-tags'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('tags')
        .eq('status', 'published');

      if (error) throw error;

      // Flatten and deduplicate tags
      const allTags = data
        .flatMap(post => post.tags || [])
        .filter((tag): tag is string => Boolean(tag));
      
      return Array.from(new Set(allTags));
    }
  });

  const handleSearch = (term: string) => {
    console.log('Searching for:', term);
    // Implement search functionality
  };

  const handleTagClick = (tag: string) => {
    console.log('Selected tag:', tag);
    // Implement tag filtering
  };

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
    <aside className="w-full max-w-xs space-y-8">
      <BlogSearch onSearch={handleSearch} />
      
      {tags && tags.length > 0 && (
        <BlogTagCloud tags={tags} onTagClick={handleTagClick} />
      )}

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-emerald-500">
          <List className="h-4 w-4" />
          <h2 className="font-semibold">Top Stories</h2>
        </div>
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
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <time>{format(new Date(post.published_at || ''), 'MMM dd')}</time>
                  </div>
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
      </div>
    </aside>
  );
};