import React, { useEffect, useState } from 'react';
import { BookOpen, Headphones, FileText, ExternalLink, Search } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

interface Resource {
  id: number;
  title: string;
  author: string | null;
  type: string;
  external_url: string | null;
  category: string | null;
  created_at?: string;
  updated_at?: string;
  description?: string;
  duration?: string;
  views?: number;
  featured?: boolean;
  tags?: string[];
  status?: string;
}

const ReadingList = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      console.log('Fetching resources from Supabase...');
      const { data, error } = await supabase
        .from('learning_resources')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching resources:', error);
        toast({
          title: "Error",
          description: "Failed to load resources. Please try again later.",
          variant: "destructive",
        });
        return;
      }

      console.log('Resources fetched successfully:', data);
      setResources(data || []);
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'audio':
        return <Headphones className="w-5 h-5" />;
      case 'pdf':
        return <FileText className="w-5 h-5" />;
      case 'external_link':
        return <ExternalLink className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const filteredResources = resources.filter(resource => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      resource.title.toLowerCase().includes(searchTerm) ||
      (resource.author?.toLowerCase().includes(searchTerm)) ||
      (resource.description?.toLowerCase().includes(searchTerm)) ||
      (resource.category?.toLowerCase().includes(searchTerm))
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-background via-background/80 to-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8 mb-12">
          <div className="flex items-center justify-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-500" />
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Learning Resources
            </h2>
          </div>
          
          <div className="w-full max-w-2xl">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search resources by title, author, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-lg border-2 border-blue-200 focus:border-blue-500 rounded-xl shadow-md hover:shadow-lg transition-all"
              />
              <Search className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
            </div>
          </div>
        </div>
        
        {filteredResources.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-8">
            {searchQuery ? "No resources found matching your search." : "No resources available at the moment."}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <a
                key={resource.id}
                href={resource.external_url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white dark:bg-gray-800/50 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors line-clamp-2">
                      {resource.title}
                    </h3>
                    {resource.author && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        by {resource.author}
                      </p>
                    )}
                  </div>
                  <span className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm">
                    {getResourceIcon(resource.type)}
                    <span className="hidden md:inline capitalize ml-1">
                      {resource.type}
                    </span>
                  </span>
                </div>
                
                {resource.description && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                    {resource.description}
                  </p>
                )}

                {resource.category && (
                  <div className="flex items-center gap-2 mt-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                      {resource.category}
                    </span>
                  </div>
                )}

                <div className="mt-4 flex justify-end">
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-500 group-hover:text-blue-600 transition-colors">
                    Access Resource
                    <ExternalLink className="w-4 h-4" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReadingList;