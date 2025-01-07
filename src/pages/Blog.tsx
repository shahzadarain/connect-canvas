import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { BlogPost } from "@/integrations/supabase/types/blog";
import { Skeleton } from "@/components/ui/skeleton";

const Blog = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (error) {
        console.error("Error fetching blog posts:", error);
        throw error;
      }

      console.log("Fetched blog posts:", data);
      return data as BlogPost["Row"][];
    },
  });

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-center mb-16 tracking-tight">
          Journal
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {isLoading
            ? Array(6)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="w-full aspect-[4/3]" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ))
            : posts?.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group block"
                >
                  <article className="space-y-4">
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                      {post.featured_image ? (
                        <img
                          src={post.featured_image}
                          alt={post.title}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700" />
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex gap-2 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                        {post.tags?.slice(0, 2).map((tag, index) => (
                          <span key={index}>{tag}</span>
                        ))}
                      </div>
                      
                      <h2 className="font-serif text-2xl tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </h2>
                      
                      <p className="text-gray-600 dark:text-gray-400 line-clamp-2 text-sm">
                        {post.excerpt}
                      </p>
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