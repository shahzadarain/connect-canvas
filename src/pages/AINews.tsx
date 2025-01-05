import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Newspaper, RefreshCcw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const AINews = () => {
  const { toast } = useToast();

  const { data: newsData, isLoading, error, refetch } = useQuery({
    queryKey: ["ai-news"],
    queryFn: async () => {
      const { data } = await supabase
        .from('news_articles')
        .select('*')
        .order('published_at', { ascending: false });
      return data;
    },
  });

  const handleUpdateNews = async () => {
    try {
      const { data } = await supabase.functions.invoke("fetch-ai-news");
      await refetch();
      toast({
        title: "Success",
        description: "AI news has been updated successfully",
      });
    } catch (error) {
      console.error("Error updating news:", error);
      toast({
        title: "Error",
        description: "Failed to update AI news",
        variant: "destructive",
      });
    }
  };

  if (error) {
    console.error("Error fetching news:", error);
  }

  return (
    <section className="w-full py-12 bg-gradient-to-b from-background to-background/80">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Latest AI News
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Stay updated with the latest developments in artificial intelligence
            </p>
          </div>
        </div>
        
        <div className="mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch py-8">
          {isLoading ? (
            Array(6).fill(0).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="h-32 bg-gray-200 dark:bg-gray-800" />
                <CardContent className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
                </CardContent>
              </Card>
            ))
          ) : (
            newsData?.map((article: any, index: number) => (
              <Card 
                key={index}
                className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-center space-x-2 mb-2">
                    <Newspaper className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-blue-500 font-medium">
                      {article.source}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-2 group-hover:text-blue-500 transition-colors">
                    {article.title}
                  </CardTitle>
                  <CardDescription>
                    {new Date(article.published_at).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-blue-500 hover:text-blue-700 mt-4"
                  >
                    Read more →
                  </a>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="flex justify-center mt-8">
          <Button
            onClick={handleUpdateNews}
            className="flex items-center gap-2"
          >
            <RefreshCcw className="w-4 h-4" />
            Update News
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AINews;