import { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { ResourceList } from './reading/ResourceList';
import { UserMenu } from './navigation/UserMenu';

interface Resource {
  id: number;
  title: string;
  author: string | null;
  type: string;
  external_url: string | null;
  category: string | null;
  description?: string;
}

const ReadingList = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      console.log('No session found, redirecting to login');
      navigate("/login");
      return;
    }
    
    fetchResources();
  }, [session, navigate]);

  const fetchResources = async () => {
    if (!session) {
      console.log('No session, skipping fetch');
      return;
    }

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

  if (!session) {
    return null;
  }

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
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-500" />
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Learning Resources
              </h2>
            </div>
            <UserMenu />
          </div>
          
          <ResourceList 
            resources={resources}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
      </div>
    </section>
  );
};

export default ReadingList;