import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Helmet } from 'react-helmet';

const Blog = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      console.log('Fetching blog posts...');
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching blog posts:', error);
        throw error;
      }
      console.log('Fetched blog posts:', data);
      return data;
    },
  });

  return (
    <>
      <Helmet>
        <title>Blog | Shahzad ASGHAR</title>
        <meta name="description" content="Read about AI, technology, and global development from my experiences and insights." />
      </Helmet>
      <Navigation />
      <main className="min-h-screen pt-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-6xl font-bold mb-16 text-center text-gray-900 dark:text-white font-serif">
            Blog
          </h1>
          {isLoading ? (
            <div className="space-y-12 max-w-4xl mx-auto">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="mb-8 border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <Skeleton className="h-8 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="space-y-12 max-w-4xl mx-auto">
              {posts.map((post) => (
                <Link to={`/blog/${post.slug}`} key={post.id}>
                  <Card className="mb-8 border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white dark:bg-gray-800 overflow-hidden group">
                    {post.featured_image && (
                      <div className="w-full h-64 overflow-hidden">
                        <img
                          src={post.featured_image}
                          alt={post.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardContent className="p-10">
                      <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-serif leading-tight">
                        {post.title}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 font-medium">
                        {format(new Date(post.published_at), 'MMMM d, yyyy')} • {post.author}
                      </p>
                      <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed font-serif">
                        {post.excerpt}
                      </p>
                      {post.tags && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-xl text-gray-600 dark:text-gray-400">
              No blog posts found.
            </p>
          )}
        </div>
      </main>
    </>
  );
};

export default Blog;