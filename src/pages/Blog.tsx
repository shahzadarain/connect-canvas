import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { BlogPostSkeleton } from "@/components/blog/BlogPostSkeleton";
import { BlogSearch } from "@/components/blog/BlogSearch";
import { BlogTagCloud } from "@/components/blog/BlogTagCloud";
import { formatDistanceToNow } from "date-fns";
import { Grid, List, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const TECH_PLACEHOLDER_IMAGES = [
  'photo-1488590528505-98d2b5aba04b',
  'photo-1518770660439-4636190af475',
  'photo-1461749280684-dccba630e2f6',
  'photo-1485827404703-89b55fcc595e',
  'photo-1526374965328-7f61d4dc18c5',
  'photo-1487058792275-0ad4aaf24ca7',
  'photo-1498050108023-c5249f4df085',
  'photo-1581092795360-fd1ca04f0952',
];

const getRandomTechImage = () => {
  const randomIndex = Math.floor(Math.random() * TECH_PLACEHOLDER_IMAGES.length);
  const imageId = TECH_PLACEHOLDER_IMAGES[randomIndex];
  return `https://images.unsplash.com/${imageId}?auto=format&fit=crop&w=800&q=80`;
};

type ViewMode = 'grid' | 'list';
type SortDirection = 'asc' | 'desc';

const Blog = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

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

  // Get unique tags from all posts
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
    console.log("Sort direction changed to:", sortDirection === 'asc' ? 'desc' : 'asc');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-serif text-center mb-16">Journal</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <BlogPostSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-serif text-center mb-16">Journal</h1>
      
      <div className="mb-8 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="w-full sm:w-96">
            <BlogSearch onSearch={handleSearch} />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-primary/10' : ''}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-primary/10' : ''}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleSortDirection}
              className="ml-2"
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <BlogTagCloud tags={allTags} onTagClick={handleTagClick} />
      </div>

      <div className={
        viewMode === 'grid'
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          : "space-y-6"
      }>
        {posts?.map((post) => (
          <Link key={post.id} to={`/blog/${post.slug}`}>
            <Card className={`overflow-hidden group hover:shadow-lg transition-all duration-300 h-full ${
              viewMode === 'list' ? 'flex flex-row' : ''
            }`}>
              <div className={`relative ${
                viewMode === 'list' ? 'w-48' : 'h-48'
              } overflow-hidden`}>
                <img
                  src={post.featured_image || getRandomTechImage()}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    console.error('Error loading image:', e);
                    e.currentTarget.src = getRandomTechImage();
                  }}
                />
              </div>
              <CardContent className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex items-center gap-2 mb-3">
                  {post.tags?.slice(0, 2).map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <time className="text-xs text-gray-500 dark:text-gray-500">
                  {formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
                </time>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;