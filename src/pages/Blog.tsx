import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";

const TECH_PLACEHOLDER_IMAGES = [
  'photo-1488590528505-98d2b5aba04b', // Turned on gray laptop computer
  'photo-1518770660439-4636190af475', // Macro photography of black circuit board
  'photo-1461749280684-dccba630e2f6', // Monitor showing Java programming
  'photo-1485827404703-89b55fcc595e', // White robot near brown wall
  'photo-1526374965328-7f61d4dc18c5', // Matrix movie still
  'photo-1487058792275-0ad4aaf24ca7', // Colorful software or web code
  'photo-1498050108023-c5249f4df085', // MacBook with code
  'photo-1581092795360-fd1ca04f0952', // Tech workspace
];

const getRandomTechImage = () => {
  const randomIndex = Math.floor(Math.random() * TECH_PLACEHOLDER_IMAGES.length);
  const imageId = TECH_PLACEHOLDER_IMAGES[randomIndex];
  return `https://images.unsplash.com/${imageId}?auto=format&fit=crop&w=800&q=80`;
};

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
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-serif text-center mb-16">Journal</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardContent className="p-6">
                <Skeleton className="h-4 w-3/4 mb-4" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-serif text-center mb-16">Journal</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts?.map((post) => (
          <Link key={post.id} to={`/blog/${post.slug}`}>
            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 h-full">
              <div className="relative h-48 overflow-hidden">
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
              <CardContent className="p-6">
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