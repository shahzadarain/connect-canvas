import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper } from "lucide-react";
import { format, subDays } from "date-fns";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const AINews = () => {
  const thirtyDaysAgo = subDays(new Date(), 30).toISOString();

  const { data: newsData, isLoading } = useQuery({
    queryKey: ["ai-news"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .gte('published_at', thirtyDaysAgo)
        .order('published_at', { ascending: false });

      if (error) {
        console.error("Error fetching news:", error);
        throw error;
      }

      return data;
    },
  });

  const groupNewsByDate = (articles: any[]) => {
    return articles?.reduce((acc: any, article: any) => {
      const date = format(new Date(article.published_at), 'MMMM d, yyyy');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(article);
      return acc;
    }, {}) || {};
  };

  const groupedNews = groupNewsByDate(newsData);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
            AI Daily Chronicle
          </h1>
          <div className="w-40 h-1 bg-gray-900 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">
            Your Daily Source for AI News and Innovations
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="h-32 bg-gray-200" />
                <CardContent className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedNews).map(([date, articles]: [string, any[]]) => (
              <section key={date} className="border-b border-gray-200 pb-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-gray-900 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                  {date}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article: any, index: number) => (
                    <Card 
                      key={index}
                      className="group hover:shadow-lg transition-all duration-300 bg-white animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardHeader>
                        <div className="flex items-center space-x-2 mb-2">
                          <Newspaper className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-serif text-blue-600">
                            {article.source}
                          </span>
                        </div>
                        <CardTitle className="font-serif text-xl group-hover:text-blue-600 transition-colors line-clamp-2">
                          {article.title}
                        </CardTitle>
                        <CardDescription className="font-serif">
                          {format(new Date(article.published_at), 'h:mm a')}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-serif"
                        >
                          Read full article →
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default AINews;