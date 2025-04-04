import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Newspaper, ExternalLink, RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const AINews = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();
  
  const { data: articles, isLoading, error, refetch } = useQuery({
    queryKey: ["ai-news"],
    queryFn: async () => {
      console.log('Fetching AI news articles from database...');
      const { data, error } = await supabase
        .from("news_articles")
        .select("*")
        .order('published_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching news articles:', error);
        throw error;
      }
      
      console.log('Fetched articles:', data?.length || 0, 'articles found');
      return data;
    },
  });

  const updateNews = async () => {
    try {
      setIsUpdating(true);
      console.log('Invoking fetch-ai-news function...');
      const { data, error } = await supabase.functions.invoke('fetch-ai-news');

      if (error) {
        console.error('Error from edge function:', error);
        throw error;
      }

      console.log('Edge function response:', data);

      await refetch();
      toast({
        title: "Success",
        description: "AI news have been updated successfully",
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
        ) : articles && articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
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
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.description}
                </p>
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
        ) : (
          <Alert className="max-w-4xl mx-auto">
            <AlertDescription>
              No news articles available at the moment. Click the Update News button to fetch the latest articles.
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-12 text-center">
          <Button
            onClick={updateNews}
            disabled={isUpdating}
            className="flex items-center gap-2 transition-transform hover:scale-105 mx-auto"
          >
            <RefreshCw className={`w-4 h-4 ${isUpdating ? 'animate-spin' : ''}`} />
            {isUpdating ? 'Updating News...' : 'Update News'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AINews;