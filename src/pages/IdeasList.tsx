import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const IdeasList = () => {
  const { data: ideas, isLoading, error } = useQuery({
    queryKey: ['all-ideas'],
    queryFn: async () => {
      console.log('Fetching all ideas...');
      const { data, error } = await supabase
        .from('ideas')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching ideas:', error);
        throw error;
      }
      
      console.log('Fetched ideas:', data);
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    console.error('Error in IdeasList component:', error);
    return (
      <div className="text-center text-red-500 py-8">
        Failed to load ideas. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Community Ideas
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas?.map((idea) => (
            <Card key={idea.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-xl text-foreground">
                    {idea.name}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {new Date(idea.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-muted-foreground">
                  {idea.idea}
                </p>
                <div className="flex justify-between items-center">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    idea.approval_status === 'approved' 
                      ? 'bg-green-100 text-green-800' 
                      : idea.approval_status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {idea.approval_status}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IdeasList;