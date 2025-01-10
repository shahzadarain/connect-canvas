import { Link } from "react-router-dom";
import { Clock, Edit } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/integrations/supabase/types/blog";
import { calculateReadingTime } from "@/utils/blogUtils";

interface BlogCardProps {
  post: BlogPost["Row"];
  viewMode: 'grid' | 'list';
  isAdmin: boolean;
}

export const BlogCard = ({ post, viewMode, isAdmin }: BlogCardProps) => {
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
      className={`group transition-all duration-300 hover:-translate-y-1 block relative ${
        viewMode === 'list' ? 'flex gap-6 items-start' : ''
      }`}
    >
      <article className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 ${
        viewMode === 'list' ? 'flex-1 flex gap-6' : ''
      }`}>
        <div className={`relative ${viewMode === 'list' ? 'w-48' : 'h-64'} overflow-hidden`}>
          <img
            src={post.featured_image || getRandomImage(post.id)}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-6 flex-1">
          <div className="flex gap-2 mb-3">
            {post.status === 'draft' && (
              <Badge variant="secondary">Draft</Badge>
            )}
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
    </Link>
  );
};