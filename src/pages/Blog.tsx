import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Link } from "react-router-dom";
import { formatDate, calculateReadingTime } from "@/utils/blogUtils";
import { Clock } from "lucide-react";

type BlogPost = Tables<"blog_posts">;

const Blog = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (error) throw error;
      return data as BlogPost[];
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-48 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts?.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="group hover:no-underline"
          >
            <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 group-hover:transform group-hover:scale-105">
              {post.featured_image && (
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>{post.author}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {calculateReadingTime(post.content)} min read
                  </span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {formatDate(post.published_at)}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;