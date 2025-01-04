import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const Blog = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        {[1, 2, 3].map((i) => (
          <Card key={i} className="mb-6">
            <CardHeader>
              <Skeleton className="h-8 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      {posts?.map((post) => (
        <Card key={post.id} className="mb-6 hover:shadow-lg transition-shadow">
          <Link to={`/blog/${post.slug}`}>
            <CardHeader>
              <CardTitle className="text-2xl">{post.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {format(new Date(post.published_at), 'MMMM d, yyyy')} • {post.author}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{post.excerpt}</p>
              {post.tags && (
                <div className="flex gap-2 mt-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default Blog;