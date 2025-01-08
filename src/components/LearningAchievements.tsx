import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from 'framer-motion';
import AchievementCard from './learning/AchievementCard';
import AchievementFilters from './learning/AchievementFilters';
import AchievementHeader from './learning/AchievementHeader';

interface Achievement {
  id: number;
  title: string;
  issuer: string;
  date: string;
  about_learning: string;
}

const LearningAchievements = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const { data: achievements, isLoading } = useQuery({
    queryKey: ["achievements"],
    queryFn: async () => {
      console.log("Fetching achievements");
      const { data, error } = await supabase
        .from("achievements")
        .select("*")
        .order('date', { ascending: false });

      if (error) {
        console.error("Error fetching achievements:", error);
        throw error;
      }
      
      console.log("Fetched achievements:", data);
      return data as Achievement[];
    },
  });

  const getCategoryFromTitle = (title: string): string => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('ai') || lowerTitle.includes('machine learning')) return 'ai';
    if (lowerTitle.includes('security') || lowerTitle.includes('gdpr')) return 'security';
    if (lowerTitle.includes('data') || lowerTitle.includes('analytics')) return 'data';
    return 'other';
  };

  const years = [...new Set(achievements?.map(a => a.date.split('-')[0]))].sort().reverse();

  const filteredAchievements = achievements?.filter(achievement => {
    const matchesSearch = searchQuery === "" || 
      achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      achievement.about_learning.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = !selectedCategory || 
      getCategoryFromTitle(achievement.title) === selectedCategory;

    const matchesYear = !selectedYear || 
      achievement.date.startsWith(selectedYear);

    return matchesSearch && matchesCategory && matchesYear;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <AchievementHeader achievementCount={achievements?.length || 0} />
        
        <AchievementFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          years={years}
        />

        <AnimatePresence mode="popLayout">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredAchievements?.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LearningAchievements;