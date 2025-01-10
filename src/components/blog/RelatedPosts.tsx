import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, Link2 } from 'lucide-react';

interface RelatedPostsProps {
  currentPostId: number;
  category?: string | null;
  tags?: string[] | null;
}

export const RelatedPosts = ({ currentPostId, category, tags }: RelatedPostsProps) => {
  const { data: relatedPosts } = useQuery({
    queryKey: ['related-posts', currentPostId, category, tags],
    queryFn: async () => {
      console.log('Fetching related posts for:', { currentPostId, category, tags });
      
      let query = supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .neq('id', currentPostId)
        .limit(3);

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching related posts:', error);
        throw error;
      }

      return data;
    },
  });

  if (!relatedPosts?.length) return null;

  return (
    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
      <div className="flex items-center gap-2 mb-6">
        <Link2 className="w-5 h-5 text-blue-500" />
        <h2 className="text-xl font-semibold">Related Articles</h2>
      </div>
      <div className="grid gap-6">
        {relatedPosts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="group block p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex gap-4">
              {post.featured_image && (
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-lg mb-2 group-hover:text-blue-500 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>{post.author}</span>
                  <time className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(post.published_at || post.created_at), 'MMM d, yyyy')}
                  </time>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};