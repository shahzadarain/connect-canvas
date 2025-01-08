import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';

interface AchievementHeaderProps {
  achievementCount: number;
}

const AchievementHeader = ({ achievementCount }: AchievementHeaderProps) => {
  return (
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
      
      <div className="mt-8 flex items-center justify-center gap-2 text-lg font-medium">
        <Award className="w-6 h-6 text-primary" />
        <span>{achievementCount} Achievements Completed</span>
      </div>
    </motion.div>
  );
};

export default AchievementHeader;