import { Link } from "react-router-dom";
import { Clock, Edit } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/integrations/supabase/types";
import { calculateReadingTime } from "@/utils/blogUtils";

interface FeaturedPostProps {
  post: BlogPost["Row"];
  isAdmin: boolean;
}

export const FeaturedPost = ({ post, isAdmin }: FeaturedPostProps) => {
  const getRandomImage = (seed: number) => {
    const placeholderImages = [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    ];
    return placeholderImages[seed % placeholderImages.length];
  };

  return (
    <Link 
      to={isAdmin && post.status === 'draft' ? `/blog/editor?id=${post.id}` : `/blog/${post.slug}`}
      className="block mb-16 group relative"
    >
      <article className="relative h-[60vh] rounded-2xl overflow-hidden">
        <img
          src={post.featured_image || getRandomImage(post.id)}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        {isAdmin && (
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4 rounded-full"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `/blog/editor?id=${post.id}`;
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex gap-2 mb-4">
            {post.status === 'draft' && (
              <Badge variant="secondary">Draft</Badge>
            )}
            {post.tags?.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/90 text-gray-800 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <h2 className="text-4xl font-serif text-white mb-4 group-hover:text-blue-200 transition-colors">
            {post.title}
          </h2>
          <div className="flex items-center gap-6 text-white/90">
            <span>{post.author}</span>
            <time>
              {formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
            </time>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {calculateReadingTime(post.content)} min read
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};