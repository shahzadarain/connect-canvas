import { useEffect } from "react";
import { motion } from "framer-motion";
import { Brain, Shield, ChartBar, Calendar, Award, Filter } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import LearningTimeline from "@/components/learning/LearningTimeline";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Achievements = () => {
  const { data: achievements, isLoading } = useQuery({
    queryKey: ["achievements"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("achievements")
        .select("*")
        .order("date", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-primary">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(155,135,245,0.15)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[slide_20s_linear_infinite] opacity-30" />
        </div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 pt-20 pb-32 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-block p-4 bg-secondary/20 rounded-2xl mb-8 backdrop-blur-sm">
              <Award className="w-16 h-16 text-secondary" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              My Learning Journey
            </h1>
            <p className="text-xl text-secondary/90 leading-relaxed">
              Explore my continuous learning path through professional certifications, trainings, and achievements
            </p>
          </motion.div>
        </div>
        
        {/* Filter Section */}
        <div className="container mx-auto px-4 pb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/30">
              <Brain className="w-4 h-4 mr-1" /> AI & ML
            </Badge>
            <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/30">
              <Shield className="w-4 h-4 mr-1" /> Security
            </Badge>
            <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/30">
              <ChartBar className="w-4 h-4 mr-1" /> Data Science
            </Badge>
            <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/30">
              <Calendar className="w-4 h-4 mr-1" /> 2024
            </Badge>
            <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/30">
              <Filter className="w-4 h-4 mr-1" /> All
            </Badge>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary to-transparent" />
      </section>

      {/* Timeline Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollArea className="h-[600px] rounded-2xl border border-secondary/30 bg-white/[0.03] backdrop-blur-xl shadow-2xl">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
                </div>
              ) : (
                <LearningTimeline achievements={achievements || []} />
              )}
            </ScrollArea>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Achievements;