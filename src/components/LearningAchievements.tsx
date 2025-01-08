import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Award, GraduationCap, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

  const categories = [
    { id: 'ai', label: 'AI & ML', icon: '🧠' },
    { id: 'security', label: 'Cybersecurity', icon: '🔒' },
    { id: 'data', label: 'Data Science', icon: '📊' },
    { id: 'cloud', label: 'Cloud', icon: '☁️' },
  ];

  const years = [...new Set(achievements?.map(a => a.date.split('-')[0]))].sort().reverse();

  const getCategoryFromTitle = (title: string): string => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('ai') || lowerTitle.includes('machine learning')) return 'ai';
    if (lowerTitle.includes('security') || lowerTitle.includes('gdpr')) return 'security';
    if (lowerTitle.includes('data') || lowerTitle.includes('analytics')) return 'data';
    if (lowerTitle.includes('cloud')) return 'cloud';
    return 'other';
  };

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
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block p-4 bg-primary/10 rounded-2xl mb-8">
            <GraduationCap className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
            Learning Journey
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore my continuous learning path through professional certifications and achievements
          </p>
          
          {/* Achievement Counter */}
          <div className="mt-8 flex items-center justify-center gap-2 text-lg font-medium">
            <Award className="w-6 h-6 text-primary" />
            <span>{achievements?.length || 0} Achievements Completed</span>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-12 space-y-6">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search achievements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className="min-w-[100px]"
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="min-w-[120px]"
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </Button>
            ))}
          </div>

          {/* Year Filters */}
          <div className="flex flex-wrap gap-3 justify-center">
            {years.map((year) => (
              <Button
                key={year}
                variant={selectedYear === year ? "default" : "outline"}
                onClick={() => setSelectedYear(selectedYear === year ? null : year)}
                className="min-w-[100px]"
              >
                <Calendar className="w-4 h-4 mr-2" />
                {year}
              </Button>
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredAchievements?.map((achievement) => (
              <motion.div
                key={achievement.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <Card className="h-full overflow-hidden transition-all duration-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg group-hover:scale-[1.02]">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-primary dark:text-primary-foreground line-clamp-2">
                      {achievement.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <GraduationCap className="w-4 h-4" />
                          {achievement.issuer}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {achievement.date}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                        {achievement.about_learning}
                      </p>
                      
                      <div className="pt-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-foreground">
                          {categories.find(c => c.id === getCategoryFromTitle(achievement.title))?.icon}
                          <span className="ml-1">
                            {categories.find(c => c.id === getCategoryFromTitle(achievement.title))?.label}
                          </span>
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LearningAchievements;