import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { BlogSearch } from "@/components/blog/BlogSearch";
import { BlogTagCloud } from "@/components/blog/BlogTagCloud";
import { formatDistanceToNow } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

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
      <div className="min-h-screen bg-white py-16">
        <div className="container mx-auto px-4 animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="mb-12">
              <div className="h-64 bg-gray-200 rounded-lg mb-4" />
              <div className="h-8 bg-gray-200 w-3/4 rounded mb-2" />
              <div className="h-4 bg-gray-200 w-1/2 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-serif text-center mb-16 text-gray-900">Journal</h1>
        
        <div className="mb-12 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="w-full sm:w-96">
              <BlogSearch onSearch={handleSearch} />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleSortDirection}
              className="ml-2"
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
          
          <BlogTagCloud tags={allTags} onTagClick={handleTagClick} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts?.map((post) => (
            <Link 
              key={post.id} 
              to={`/blog/${post.slug}`}
              className="group transition-all duration-300 hover:-translate-y-1"
            >
              <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={post.featured_image || `https://source.unsplash.com/random/800x600?${post.tags?.[0] || 'blog'}`}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    {post.tags?.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h2 className="text-xl font-serif mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 font-serif">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{post.author}</span>
                    <time>
                      {formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
                    </time>
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