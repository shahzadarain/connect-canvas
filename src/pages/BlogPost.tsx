import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { PageTransition } from '@/components/ui/page-transition';
import { BlogContent } from '@/components/blog/BlogContent';
import { Avatar } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { ReadingProgress } from '@/components/blog/ReadingProgress';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { calculateReadingTime, generateTableOfContents } from '@/utils/blogUtils';

const BlogPost = () => {
  const { slug } = useParams();
  const [readingProgress, setReadingProgress] = useState(0);
  const [tocItems, setTocItems] = useState([]);

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

  useEffect(() => {
    if (post?.content) {
      const items = generateTableOfContents(post.content);
      setTocItems(items);
    }
  }, [post?.content]);

  useEffect(() => {
    const updateReadingProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', updateReadingProgress);
    return () => window.removeEventListener('scroll', updateReadingProgress);
  }, []);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-[60vh] bg-gray-200 dark:bg-gray-800" />
        <div className="max-w-3xl mx-auto px-4 -mt-32 relative">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 w-3/4 rounded mb-4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 w-1/2 rounded mb-8" />
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
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
          <p className="text-gray-600 dark:text-gray-400">The blog post you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const readingTime = calculateReadingTime(post.content);

  return (
    <PageTransition>
      <article className="min-h-screen bg-white dark:bg-gray-900">
        <ReadingProgress progress={readingProgress} />
        
        {/* Hero Image */}
        <div className="relative h-[70vh] overflow-hidden">
          <img
            src={post.featured_image || `https://source.unsplash.com/random/1920x1080?${post.tags?.[0] || 'blog'}`}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 -mt-48 relative">
          <header className="text-center mb-16">
            <div className="inline-flex gap-2 mb-6">
              {post.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-center gap-6 text-white/90">
              <time className="text-sm">
                {format(new Date(post.published_at), 'MMMM d, yyyy')}
              </time>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{readingTime} min read</span>
              </span>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
            {/* Main Content */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 mb-16">
              <BlogContent content={post.content} />
              <ShareButtons url={window.location.href} title={post.title} />
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              <div className="sticky top-8">
                <TableOfContents items={tocItems} />
                
                {/* Author Bio */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mt-8">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <img 
                        src={`https://source.unsplash.com/random/200x200?portrait`} 
                        alt={post.author}
                        className="object-cover"
                      />
                    </Avatar>
                    <div>
                      <h3 className="font-serif text-lg mb-2">{post.author}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        A passionate writer and technology enthusiast sharing insights about the latest developments in tech and innovation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* Navigation */}
          <nav className="flex justify-between items-center py-8 border-t border-gray-200 dark:border-gray-700 mt-16">
            <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
              <ArrowLeft className="w-4 h-4" />
              Previous Post
            </button>
            <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
              Next Post
              <ArrowRight className="w-4 h-4" />
            </button>
          </nav>
        </div>
      </article>
    </PageTransition>
  );
};

export default BlogPost;