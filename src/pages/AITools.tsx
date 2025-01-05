import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { RefreshCw } from 'lucide-react';
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AITool } from '@/integrations/supabase/types/ai-tools';
import AIToolCard from '@/components/ai-tools/AIToolCard';
import ToolsHeader from '@/components/ai-tools/ToolsHeader';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { ToolsGridSkeleton } from '@/components/ui/loading-skeleton';

const AITools = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortField, setSortField] = useState<'name' | 'category'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [savedTools, setSavedTools] = useState<number[]>([]);
  const [compareTools, setCompareTools] = useState<AITool['Row'][]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('savedTools');
    if (saved) {
      setSavedTools(JSON.parse(saved));
    }
  }, []);

  const { data: tools, isLoading, refetch } = useQuery({
    queryKey: ['ai-tools', sortField, sortOrder],
    queryFn: async () => {
      console.log('Fetching AI tools...');
      const { data, error } = await supabase
        .from('ai_tools')
        .select('*')
        .order(sortField, { ascending: sortOrder === 'asc' });

      if (error) throw error;
      return data as AITool['Row'][];
    },
  });

  const filteredTools = React.useMemo(() => {
    if (!tools) return [];
    let filtered = [...tools];
    if (selectedCategory) {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }
    return filtered;
  }, [tools, selectedCategory]);

  const categories = React.useMemo(() => {
    if (!tools) return [];
    return Array.from(new Set(tools.map(tool => tool.category).filter(Boolean)));
  }, [tools]);

  const toggleSaveTool = (toolId: number) => {
    const newSavedTools = savedTools.includes(toolId)
      ? savedTools.filter(id => id !== toolId)
      : [...savedTools, toolId];
    
    setSavedTools(newSavedTools);
    localStorage.setItem('savedTools', JSON.stringify(newSavedTools));
    
    toast({
      title: savedTools.includes(toolId) ? "Tool removed" : "Tool saved",
      description: savedTools.includes(toolId) 
        ? "The tool has been removed from your saved list" 
        : "The tool has been saved to your list",
      className: "bg-white dark:bg-gray-800",
    });
  };

  const toggleCompare = (tool: AITool['Row']) => {
    if (compareTools.find(t => t.id === tool.id)) {
      setCompareTools(compareTools.filter(t => t.id !== tool.id));
      toast({
        title: "Removed from comparison",
        description: "Tool removed from comparison list",
        className: "bg-white dark:bg-gray-800",
      });
    } else if (compareTools.length < 2) {
      setCompareTools([...compareTools, tool]);
      toast({
        title: "Added to comparison",
        description: "Tool added to comparison list",
        className: "bg-white dark:bg-gray-800",
      });
    } else {
      toast({
        title: "Comparison limit reached",
        description: "You can only compare two tools at a time",
        variant: "destructive",
      });
    }
  };

  const updateTools = async () => {
    try {
      setIsUpdating(true);
      const { error } = await supabase.functions.invoke('fetch-ai-tools', {
        method: 'POST',
      });

      if (error) throw error;

      await refetch();
      toast({
        title: "Success",
        description: "AI tools have been updated successfully",
        className: "bg-white dark:bg-gray-800",
      });
    } catch (error) {
      console.error('Error updating AI tools:', error);
      toast({
        title: "Error",
        description: "Failed to update AI tools. Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <main className="container mx-auto px-4 py-24">
        <div className="flex flex-col items-center gap-8 mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            AI Tools Directory
          </h1>
          <p className="text-lg text-center text-muted-foreground max-w-2xl">
            Discover the latest AI tools and technologies that are shaping the future of innovation.
          </p>
        </div>

        {isLoading ? (
          <ToolsGridSkeleton />
        ) : (
          <>
            <ToolsHeader
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              sortField={sortField}
              setSortField={setSortField}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />

            <div className={`${
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'flex flex-col gap-4'
            } mb-12`}>
              {filteredTools.map((tool) => (
                <AIToolCard
                  key={tool.id}
                  tool={tool}
                  viewMode={viewMode}
                  isSaved={savedTools.includes(tool.id)}
                  isCompared={compareTools.some(t => t.id === tool.id)}
                  onSave={toggleSaveTool}
                  onCompare={toggleCompare}
                />
              ))}
            </div>

            <Dialog open={showComparison} onOpenChange={setShowComparison}>
              <DialogContent className="max-w-4xl bg-background">
                <DialogHeader>
                  <DialogTitle>Tool Comparison</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  {compareTools.map((tool) => (
                    <div key={tool.id} className="p-4 border rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{tool.description}</p>
                      <div className="text-sm">
                        <p><strong>Category:</strong> {tool.category}</p>
                        <p><strong>Pricing:</strong> {tool.pricing_type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>

            <div className="flex justify-center mt-8 gap-4">
              <Button
                onClick={updateTools}
                disabled={isUpdating}
                className="flex items-center gap-2 transition-transform hover:scale-105"
              >
                <RefreshCw className={`w-4 h-4 ${isUpdating ? 'animate-spin' : ''}`} />
                Update Tools
              </Button>
              {compareTools.length > 0 && (
                <Button
                  onClick={() => setShowComparison(true)}
                  className="transition-transform hover:scale-105"
                >
                  Compare Selected ({compareTools.length})
                </Button>
              )}
            </div>
          </>
        )}
      </main>
      <ThemeToggle />
      <Footer />
    </div>
  );
};

export default AITools;