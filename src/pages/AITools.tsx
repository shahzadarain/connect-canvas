import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink, RefreshCw } from 'lucide-react';
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface AITool {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  url: string | null;
  category: string | null;
  pricing_type: string | null;
  tags: string[] | null;
}

const AITools = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const { data: tools, isLoading, refetch } = useQuery({
    queryKey: ['ai-tools'],
    queryFn: async () => {
      console.log('Fetching AI tools from Supabase...');
      const { data, error } = await supabase
        .from('ai_tools')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching AI tools:', error);
        throw error;
      }

      console.log('Successfully fetched AI tools:', data);
      return data as AITool[];
    },
  });

  const updateTools = async () => {
    try {
      setIsUpdating(true);
      console.log('Initiating AI tools update...');
      
      const { data, error } = await supabase.functions.invoke('fetch-ai-tools', {
        method: 'POST',
      });

      if (error) {
        throw error;
      }

      console.log('Update result:', data);
      
      await refetch();
      
      toast({
        title: "Success",
        description: "AI tools have been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating AI tools:', error);
      toast({
        title: "Error",
        description: "Failed to update AI tools. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-24">
        <div className="flex flex-col items-center gap-8 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            AI Tools Directory
          </h1>
          <p className="text-lg text-center text-muted-foreground max-w-2xl">
            Discover the latest AI tools and technologies that are shaping the future of innovation.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {tools?.map((tool) => (
                <div
                  key={tool.id}
                  className="group bg-white dark:bg-gray-800/50 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-video bg-gray-100 dark:bg-gray-900 relative">
                    {tool.image_url ? (
                      <img
                        src={tool.image_url}
                        alt={tool.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No image available
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                      {tool.name}
                    </h3>
                    
                    {tool.category && (
                      <div className="mb-2">
                        <span className="text-sm px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                          {tool.category}
                        </span>
                      </div>
                    )}
                    
                    {tool.description && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                        {tool.description}
                      </p>
                    )}

                    {tool.url && (
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors"
                      >
                        Learn More
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button
                onClick={updateTools}
                disabled={isUpdating}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isUpdating ? 'animate-spin' : ''}`} />
                Update Tools
              </Button>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AITools;