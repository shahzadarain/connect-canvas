import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { BlogPageHeader } from "@/components/blog/BlogPageHeader";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { BlogFilters } from "@/components/blog/BlogFilters";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogHero } from "@/components/blog/BlogHero";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { BlogPost } from "@/integrations/supabase/types/blog";
import { Helmet } from "react-helmet";

const POSTS_PER_PAGE = 9;

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const session = useSession();

  const { data: userRoles } = useQuery({
    queryKey: ["user-roles", session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);
      
      if (error) {
        console.error("Error fetching user roles:", error);
        throw error;
      }
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const isAdmin = userRoles?.some(role => role.role === 'admin');

  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts", sortDirection, searchTerm, selectedTag, selectedCategory, isAdmin, currentPage],
    queryFn: async () => {
      console.log("Fetching posts with filters:", { 
        sortDirection, 
        searchTerm, 
        selectedTag, 
        selectedCategory, 
        isAdmin,
        currentPage 
      });
      
      let query = supabase
        .from("blog_posts")
        .select("*", { count: 'exact' })
        .order("published_at", { ascending: sortDirection === 'asc' })
        .range((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE - 1);

      if (!isAdmin) {
        query = query.eq("status", "published");
      }

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`);
      }

      if (selectedTag) {
        query = query.contains('tags', [selectedTag]);
      }

      if (selectedCategory) {
        query = query.eq('category', selectedCategory);
      }

      const { data, error, count } = await query;

      if (error) {
        console.error("Error fetching posts:", error);
        toast.error("Failed to load blog posts");
        throw error;
      }

      return {
        posts: (data as BlogPost['Row'][]).map(post => ({
          ...post,
          font_settings: post.font_settings || {},
        })),
        totalCount: count || 0
      };
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["blog-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select('category')
        .not('category', 'is', null)
        .eq('status', 'published');

      if (error) throw error;

      return Array.from(new Set(data.map(post => post.category).filter(Boolean)));
    }
  });

  const totalPages = Math.ceil((posts?.totalCount || 0) / POSTS_PER_PAGE);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <Skeleton className="h-[400px] w-full rounded-xl mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-64 w-full rounded-xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const featuredPost = posts?.posts[0];
  const allTags = Array.from(
    new Set(
      posts?.posts.flatMap((post) => post.tags || []).filter(Boolean) || []
    )
  );

  return (
    <>
      <Helmet>
        <title>Blog | Your Website Name</title>
        <meta name="description" content="Explore our latest articles and insights" />
        <meta property="og:title" content="Blog | Your Website Name" />
        <meta property="og:description" content="Explore our latest articles and insights" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-900">
        <BlogHero />
        
        <div className="container mx-auto px-4 py-16">
          <BlogPageHeader isAdmin={isAdmin} />
          
          {featuredPost && (
            <FeaturedPost post={featuredPost} isAdmin={isAdmin} />
          )}
          
          <BlogFilters
            onSearch={setSearchTerm}
            onSortDirectionChange={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
            onViewModeChange={() => setViewMode(prev => prev === 'grid' ? 'list' : 'grid')}
            viewMode={viewMode}
            tags={allTags}
            selectedTag={selectedTag}
            onTagClick={(tag) => setSelectedTag(selectedTag === tag ? null : tag)}
            categories={categories || []}
            selectedCategory={selectedCategory}
            onCategoryClick={(category) => setSelectedCategory(selectedCategory === category ? null : category)}
          />

          <div className={viewMode === 'grid' ? 
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : 
            "space-y-8"
          }>
            {posts?.posts.slice(1).map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                viewMode={viewMode}
                isAdmin={isAdmin}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;