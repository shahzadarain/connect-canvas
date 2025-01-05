import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink, RefreshCw, Grid3x3, List, Filter, ArrowUpDown, Save } from 'lucide-react';
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

type ViewMode = 'grid' | 'list';
type SortField = 'name' | 'category';
type SortOrder = 'asc' | 'desc';

const AITools = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [savedTools, setSavedTools] = useState<number[]>(() => {
    const saved = localStorage.getItem('savedTools');
    return saved ? JSON.parse(saved) : [];
  });
  const [compareTools, setCompareTools] = useState<AITool[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const { toast } = useToast();

  const { data: tools, isLoading, refetch } = useQuery({
    queryKey: ['ai-tools'],
    queryFn: async () => {
      console.log('Fetching AI tools from Supabase...');
      const { data, error } = await supabase
        .from('ai_tools')
        .select('*')
        .order(sortField, { ascending: sortOrder === 'asc' });

      if (error) {
        console.error('Error fetching AI tools:', error);
        throw error;
      }

      console.log('Successfully fetched AI tools:', data);
      return data as AITool[];
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
      title: savedTools.includes(toolId) ? "Tool removed from saved" : "Tool saved for later",
      description: "Your saved tools list has been updated.",
    });
  };

  const toggleCompare = (tool: AITool) => {
    if (compareTools.find(t => t.id === tool.id)) {
      setCompareTools(compareTools.filter(t => t.id !== tool.id));
    } else if (compareTools.length < 2) {
      setCompareTools([...compareTools, tool]);
    } else {
      toast({
        title: "Comparison limit reached",
        description: "You can only compare two tools at a time.",
        variant: "destructive",
      });
    }
  };

  const updateTools = async () => {
    try {
      setIsUpdating(true);
      console.log('Initiating AI tools update...');
      
      const { data, error } = await supabase.functions.invoke('fetch-ai-tools', {
        method: 'POST',
      });

      if (error) throw error;

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

  const renderToolCard = (tool: AITool) => {
    const isSaved = savedTools.includes(tool.id);
    const isCompared = compareTools.find(t => t.id === tool.id);

    return (
      <div
        key={tool.id}
        className={`group transition-all duration-300 ${
          viewMode === 'grid'
            ? 'bg-white dark:bg-gray-800/50 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1'
            : 'flex gap-4 bg-white dark:bg-gray-800/50 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg'
        }`}
      >
        <div className={`${viewMode === 'grid' ? 'aspect-video' : 'w-48'} bg-gray-100 dark:bg-gray-900 relative`}>
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
        
        <div className={`${viewMode === 'grid' ? 'p-6' : 'flex-1'}`}>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
              {tool.name}
            </h3>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleSaveTool(tool.id)}
                className={`${isSaved ? 'text-blue-500' : 'text-gray-500'}`}
              >
                <Save className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleCompare(tool)}
                className={`${isCompared ? 'text-blue-500' : 'text-gray-500'}`}
              >
                <ArrowUpDown className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
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
    );
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
            <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
              <div className="flex gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      {selectedCategory || 'All Categories'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
                      All Categories
                    </DropdownMenuItem>
                    {categories.map((category) => (
                      <DropdownMenuItem
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <ArrowUpDown className="w-4 h-4" />
                      Sort by {sortField}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSortField('name')}>
                      Name
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortField('category')}>
                      Category
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  variant="outline"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                >
                  {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                </Button>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-blue-100' : ''}
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-blue-100' : ''}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className={`${
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'flex flex-col gap-4'
            } mb-12`}>
              {filteredTools.map(renderToolCard)}
            </div>

            <Dialog open={showComparison} onOpenChange={setShowComparison}>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Tool Comparison</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  {compareTools.map((tool) => (
                    <div key={tool.id} className="p-4 border rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{tool.description}</p>
                      <div className="text-sm">
                        <p><strong>Category:</strong> {tool.category}</p>
                        <p><strong>Pricing:</strong> {tool.pricing_type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>

            <div className="flex justify-center mt-8">
              <Button
                onClick={updateTools}
                disabled={isUpdating}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isUpdating ? 'animate-spin' : ''}`} />
                Update Tools
              </Button>
              {compareTools.length > 0 && (
                <Button
                  onClick={() => setShowComparison(true)}
                  className="ml-4"
                >
                  Compare Selected ({compareTools.length})
                </Button>
              )}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AITools;