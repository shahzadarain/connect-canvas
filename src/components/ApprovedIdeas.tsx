import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Card } from "./ui/card";
import { CheckCircle, Loader2 } from "lucide-react";

const ApprovedIdeas = () => {
  const { data: ideas, isLoading, error } = useQuery({
    queryKey: ['approved-ideas'],
    queryFn: async () => {
      console.log('Fetching approved ideas...');
      const { data, error } = await supabase
        .from('ideas')
        .select('*')
        .eq('approval_status', 'approved')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching approved ideas:', error);
        throw error;
      }
      
      console.log('Fetched approved ideas:', data);
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-secondary" />
      </div>
    );
  }

  if (error) {
    console.error('Error in ApprovedIdeas component:', error);
    return null;
  }

  if (!ideas?.length) {
    return null;
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#F8F9FF]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block p-2 bg-[#E5DEFF] rounded-full mb-4">
            <CheckCircle className="w-6 h-6 text-[#8B5CF6]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A1F2C] mb-4">
            Community Ideas
          </h2>
          <p className="text-lg text-[#403E43] md:text-xl max-w-2xl mx-auto">
            Discover innovative ideas shared by our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <Card key={idea.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-xl text-[#1A1F2C] line-clamp-2">
                    {idea.name}
                  </h3>
                </div>
                <p className="text-[#4B5563] line-clamp-4">
                  {idea.idea}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApprovedIdeas;