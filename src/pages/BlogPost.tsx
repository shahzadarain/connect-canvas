import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PageTransition } from '@/components/ui/page-transition';
import { BlogContent } from '@/components/blog/BlogContent';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { ReadingProgress } from '@/components/blog/ReadingProgress';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { BlogPostHero } from '@/components/blog/BlogPostHero';
import { BlogPostAuthor } from '@/components/blog/BlogPostAuthor';
import { BlogPostNavigation } from '@/components/blog/BlogPostNavigation';
import { toast } from 'sonner';
import { RelatedPosts } from '@/components/blog/RelatedPosts';

const BlogPost = () => {
  const { slug } = useParams();
  const [readingProgress, setReadingProgress] = React.useState(0);
  const [tocItems, setTocItems] = React.useState([]);

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      console.log('Fetching blog post:', slug);
      
      const { data: post, error: fetchError } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle();
      
      if (fetchError) {
        console.error('Error fetching blog post:', fetchError);
        toast.error('Failed to load blog post');
        throw fetchError;
      }

      if (!post) {
        console.log('No post found with slug:', slug);
        return null;
      }

      // Increment view count
      const { error: updateError } = await supabase
        .from('blog_posts')
        .update({ view_count: (post.view_count || 0) + 1 })
        .eq('id', post.id);

      if (updateError) {
        console.error('Error updating view count:', updateError);
      }
      
      return post;
    },
  });

  React.useEffect(() => {
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
          <Skeleton className="h-8 w-3/4 rounded mb-4" />
          <Skeleton className="h-4 w-1/2 rounded mb-8" />
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-full rounded" />
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
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <Helmet>
        <title>{post.title} | Your Blog</title>
        <meta name="description" content={post.excerpt || post.meta_description} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || post.meta_description} />
        <meta property="og:image" content={post.featured_image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <article className="min-h-screen bg-white dark:bg-gray-900">
        <ReadingProgress progress={readingProgress} />
        <BlogPostHero post={post} />
        
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
                <BlogContent content={post.content} />
                <ShareButtons url={window.location.href} title={post.title} />
              </div>
              <BlogPostNavigation />
              <RelatedPosts currentPostId={post.id} category={post.category} tags={post.tags} />
            </div>

            <aside className="space-y-8">
              <div className="sticky top-8">
                <TableOfContents items={tocItems} />
                <BlogPostAuthor author={post.author} />
                <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Views</span>
                    <span className="font-medium">{post.view_count || 0}</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </PageTransition>
  );
};

export default BlogPost;