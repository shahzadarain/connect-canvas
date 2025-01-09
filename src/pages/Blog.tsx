import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { BlogSearch } from "@/components/blog/BlogSearch";
import { BlogTagCloud } from "@/components/blog/BlogTagCloud";
import { formatDistanceToNow } from "date-fns";
import { ArrowUpDown, Clock, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { calculateReadingTime } from "@/utils/blogUtils";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts", sortDirection, searchTerm, selectedTag],
    queryFn: async () => {
      console.log("Fetching posts with filters:", { sortDirection, searchTerm, selectedTag });
      let query = supabase
        .from("blog_posts")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: sortDirection === 'asc' });

      if (searchTerm) {
        query = query.ilike("title", `%${searchTerm}%`);
      }

      if (selectedTag) {
        query = query.contains('tags', [selectedTag]);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching posts:", error);
        toast.error("Failed to load blog posts");
        throw error;
      }
      return data;
    },
  });

  const allTags = Array.from(
    new Set(
      posts?.flatMap((post) => post.tags || []).filter(Boolean) || []
    )
  );

  const handleSearch = (term: string) => {
    console.log("Searching for:", term);
    setSearchTerm(term);
  };

  const handleTagClick = (tag: string) => {
    console.log("Selected tag:", tag);
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4 animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="mb-12">
              <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-xl mb-4" />
              <div className="h-8 bg-gray-200 dark:bg-gray-800 w-3/4 rounded mb-2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 w-1/2 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const featuredPost = posts?.[0];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-serif text-center mb-16 text-gray-900 dark:text-gray-100">Journal</h1>
        
        {/* Featured Post */}
        {featuredPost && (
          <Link 
            to={`/blog/${featuredPost.slug}`}
            className="block mb-16 group"
          >
            <article className="relative h-[60vh] rounded-2xl overflow-hidden">
              <img
                src={featuredPost.featured_image || `https://source.unsplash.com/random/1920x1080?${featuredPost.tags?.[0] || 'blog'}`}
                alt={featuredPost.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex gap-2 mb-4">
                  {featuredPost.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/90 text-gray-800 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-4xl font-serif text-white mb-4 group-hover:text-blue-200 transition-colors">
                  {featuredPost.title}
                </h2>
                <div className="flex items-center gap-6 text-white/90">
                  <span>{featuredPost.author}</span>
                  <time>
                    {formatDistanceToNow(new Date(featuredPost.published_at), { addSuffix: true })}
                  </time>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {calculateReadingTime(featuredPost.content)} min read
                  </span>
                </div>
              </div>
            </article>
          </Link>
        )}
        
        <div className="mb-12 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="w-full sm:w-96">
              <BlogSearch onSearch={handleSearch} />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleSortDirection}
                className="ml-2"
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode(prev => prev === 'grid' ? 'list' : 'grid')}
                className="ml-2"
              >
                {viewMode === 'grid' ? (
                  <List className="h-4 w-4" />
                ) : (
                  <Grid className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          <BlogTagCloud tags={allTags} onTagClick={handleTagClick} />
        </div>

        <div className={viewMode === 'grid' ? 
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12" : 
          "space-y-8"
        }>
          {posts?.slice(1).map((post) => (
            <Link 
              key={post.id} 
              to={`/blog/${post.slug}`}
              className={`group transition-all duration-300 hover:-translate-y-1 block ${
                viewMode === 'list' ? 'flex gap-6 items-start' : ''
              }`}
            >
              <article className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 ${
                viewMode === 'list' ? 'flex-1 flex gap-6' : ''
              }`}>
                <div className={`relative ${viewMode === 'list' ? 'w-48' : 'h-64'} overflow-hidden`}>
                  <img
                    src={post.featured_image || `https://source.unsplash.com/random/800x600?${post.tags?.[0] || 'blog'}`}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6 flex-1">
                  <div className="flex gap-2 mb-3">
                    {post.tags?.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h2 className="text-xl font-serif mb-2 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 font-serif">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>{post.author}</span>
                    <div className="flex items-center gap-4">
                      <time>
                        {formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
                      </time>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {calculateReadingTime(post.content)} min
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;