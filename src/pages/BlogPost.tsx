import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { PageTransition } from '@/components/ui/page-transition';
import { BlogContent } from '@/components/blog/BlogContent';
import { Avatar } from '@/components/ui/avatar';
import { toast } from 'sonner';

const BlogPost = () => {
  const { slug } = useParams();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      console.log('Fetching blog post:', slug);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();
      
      if (error) {
        console.error('Error fetching blog post:', error);
        toast.error('Failed to load blog post');
        throw error;
      }
      
      console.log('Fetched blog post:', data);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-[60vh] bg-gray-200" />
        <div className="max-w-3xl mx-auto px-4 -mt-32 relative">
          <div className="h-8 bg-gray-200 w-3/4 rounded mb-4" />
          <div className="h-4 bg-gray-200 w-1/2 rounded mb-8" />
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif mb-4">Post Not Found</h1>
          <p className="text-gray-600">The blog post you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <article className="min-h-screen bg-white">
        {/* Hero Image */}
        <div className="relative h-[60vh] overflow-hidden">
          <img
            src={post.featured_image || `https://source.unsplash.com/random/1920x1080?${post.tags?.[0] || 'blog'}`}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 -mt-32 relative">
          <header className="text-center mb-16">
            <div className="inline-flex gap-2 mb-6">
              {post.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/90 text-gray-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4 leading-tight">
              {post.title}
            </h1>
            
            <div className="text-white/90 mb-8">
              <time className="text-sm">
                {format(new Date(post.published_at), 'MMMM d, yyyy')}
              </time>
            </div>
          </header>

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-xl p-8 mb-16">
            <BlogContent content={post.content} />
          </div>

          {/* Author Bio */}
          <footer className="bg-gray-50 rounded-lg p-8 mb-16">
            <div className="flex items-center gap-6">
              <Avatar className="w-16 h-16">
                <img 
                  src={`https://source.unsplash.com/random/200x200?portrait`} 
                  alt={post.author}
                  className="object-cover"
                />
              </Avatar>
              <div>
                <h3 className="font-serif text-xl mb-2">{post.author}</h3>
                <p className="text-gray-600">
                  A passionate writer and technology enthusiast sharing insights about the latest developments in tech and innovation.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </article>
    </PageTransition>
  );
};

export default BlogPost;