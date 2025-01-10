import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { BlogPageHeader } from "@/components/blog/BlogPageHeader";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { BlogFilters } from "@/components/blog/BlogFilters";
import { BlogCard } from "@/components/blog/BlogCard";
import type { BlogPost } from "@/integrations/supabase/types/blog";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
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
    queryKey: ["blog-posts", sortDirection, searchTerm, selectedTag, isAdmin],
    queryFn: async () => {
      console.log("Fetching posts with filters:", { sortDirection, searchTerm, selectedTag, isAdmin });
      let query = supabase
        .from("blog_posts")
        .select("*")
        .order("published_at", { ascending: sortDirection === 'asc' });

      if (!isAdmin) {
        query = query.eq("status", "published");
      }

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

      // Ensure font_settings is always a Record<string, unknown>
      return (data as BlogPost['Row'][]).map(post => ({
        ...post,
        font_settings: post.font_settings || {},
      }));
    },
  });

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
  const allTags = Array.from(
    new Set(
      posts?.flatMap((post) => post.tags || []).filter(Boolean) || []
    )
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
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
        />

        <div className={viewMode === 'grid' ? 
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12" : 
          "space-y-8"
        }>
          {posts?.slice(1).map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              viewMode={viewMode}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;