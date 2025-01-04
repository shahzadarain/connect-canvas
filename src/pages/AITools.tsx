import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Tables } from "@/integrations/supabase/types";
import { useSession } from '@supabase/auth-helpers-react';

type AITool = Tables<"ai_tools">;

const AITools = () => {
  const { toast } = useToast();
  const session = useSession();
  const isAdmin = session?.user?.email === 'admin@example.com'; // Replace with your admin email

  const { data: tools, isLoading, refetch } = useQuery({
    queryKey: ['ai-tools'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ai_tools')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as AITool[];
    },
  });

  const handleScrape = async () => {
    try {
      const response = await supabase.functions.invoke('scrape-ai-tools');
      
      if (response.error) throw response.error;
      
      toast({
        title: "Success",
        description: "AI tools have been updated successfully",
      });
      
      refetch();
    } catch (error) {
      console.error('Error scraping tools:', error);
      toast({
        title: "Error",
        description: "Failed to scrape AI tools",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="p-4 space-y-4">
            <Skeleton className="h-40 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">AI Tools Directory</h1>
          {isAdmin && (
            <Button onClick={handleScrape} variant="outline">
              Update Tools
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools?.map((tool) => (
            <Card key={tool.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {tool.image_url && (
                <div className="aspect-video w-full overflow-hidden bg-gray-100">
                  <img 
                    src={tool.image_url} 
                    alt={tool.name}
                    className="w-full h-full object-contain p-4"
                  />
                </div>
              )}
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-semibold">{tool.name}</h3>
                {tool.category && (
                  <Badge variant="secondary" className="mb-2">
                    {tool.category}
                  </Badge>
                )}
                <p className="text-muted-foreground text-sm line-clamp-2">{tool.description}</p>
                {tool.tags && tool.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tool.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                {tool.url && (
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-primary hover:underline"
                  >
                    Learn More →
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AITools;