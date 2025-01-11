import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Newspaper, ExternalLink, RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "@supabase/auth-helpers-react";
import { useState } from "react";

const AINews = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const session = useSession();
  const { toast } = useToast();
  
  const { data: articles, isLoading, error, refetch } = useQuery({
    queryKey: ["ai-news"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news_articles")
        .select("*")
        .order("published_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const { data: userRole } = useQuery({
    queryKey: ["user-role", session?.user?.id],
    enabled: !!session?.user?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session?.user?.id)
        .single();
      
      if (error) throw error;
      return data?.role;
    },
  });

  const updateNews = async () => {
    try {
      setIsUpdating(true);
      const { error } = await supabase.functions.invoke('fetch-ai-news', {
        method: 'POST',
      });

      if (error) throw error;

      await refetch();
      toast({
        title: "Success",
        description: "AI news have been updated successfully",
        className: "bg-white dark:bg-gray-800",
      });
    } catch (error) {
      console.error('Error updating AI news:', error);
      toast({
        title: "Error",
        description: "Failed to update AI news. Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (error) {
    console.error("Error fetching news:", error);
    return (
      <Alert variant="destructive" className="max-w-4xl mx-auto mt-8">
        <AlertDescription>
          There was an error loading the news articles. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-4 font-serif">
            <Newspaper className="inline-block mr-4 h-12 w-12" />
            AI Daily Chronicle
          </h1>
          <p className="text-xl text-gray-500 mb-8">
            Your daily source for the latest in artificial intelligence
          </p>
          {userRole === 'admin' && (
            <Button
              onClick={updateNews}
              disabled={isUpdating}
              className="flex items-center gap-2 transition-transform hover:scale-105 mx-auto"
            >
              <RefreshCw className={`w-4 h-4 ${isUpdating ? 'animate-spin' : ''}`} />
              {isUpdating ? 'Updating News...' : 'Update News'}
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                <Skeleton className="h-4 w-3/4 mb-4" />
                <Skeleton className="h-8 w-full mb-4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles?.map((article) => (
              <article
                key={article.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <time className="text-sm text-gray-500 font-serif">
                    {format(new Date(article.published_at), "MMMM d, yyyy")}
                  </time>
                  <span className="text-sm text-blue-600 font-medium">
                    {article.category || 'AI News'}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 font-serif leading-tight">
                  {article.title}
                </h2>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  Read full article
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AINews;