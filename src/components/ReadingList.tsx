import React, { useEffect, useState } from 'react';
import { BookOpen, Headphones, FileText, ExternalLink } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Resource {
  id: number;
  title: string;
  author: string | null;
  type: string;
  file_path: string | null;
  external_url: string | null;
  category: string | null;
  created_at?: string;
  updated_at?: string;
  description?: string;
  duration?: string;
}

const ReadingList = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
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

  const getCoverImage = (resource: Resource) => {
    // Map resource types to specific images
    const imageMap: { [key: string]: string } = {
      'pdf': 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      'audio': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
      'external_link': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
      'book': 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d'
    };

    return imageMap[resource.type.toLowerCase()] || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-background via-background/80 to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 mb-12">
          <BookOpen className="w-8 h-8 text-blue-500" />
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Learning Resources
          </h2>
        </div>
        
        {resources.length === 0 ? (
          <div className="text-center text-gray-500">
            No resources available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {resources.map((resource) => (
              <a
                key={resource.id}
                href={resource.external_url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={getCoverImage(resource)}
                    alt={`Cover of ${resource.title}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-bold text-xl mb-2 text-white line-clamp-2">{resource.title}</h3>
                      {resource.author && (
                        <p className="text-gray-200 text-sm mb-2">{resource.author}</p>
                      )}
                      {resource.description && (
                        <p className="text-gray-300 text-sm line-clamp-3">{resource.description}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Access Resource
                </div>
                <div className="absolute top-4 left-4 flex items-center gap-1 bg-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {getResourceIcon(resource.type)}
                  <span className="capitalize">{resource.type}</span>
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