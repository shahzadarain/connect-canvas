import { motion } from 'framer-motion';
import { Brain, Shield, BarChart3, Calendar, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Achievement {
  id: number;
  title: string;
  issuer: string;
  date: string;
  about_learning: string;
}

interface AchievementCardProps {
  achievement: Achievement;
}

const getCategoryIcon = (title: string) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('ai') || lowerTitle.includes('machine learning')) return <Brain className="w-4 h-4" />;
  if (lowerTitle.includes('security') || lowerTitle.includes('gdpr')) return <Shield className="w-4 h-4" />;
  if (lowerTitle.includes('data') || lowerTitle.includes('analytics')) return <BarChart3 className="w-4 h-4" />;
  return <Award className="w-4 h-4" />;
};

const getCategoryStyles = (title: string): { bg: string; text: string } => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('ai') || lowerTitle.includes('machine learning')) {
    return {
      bg: 'bg-purple-100 dark:bg-purple-900/30',
      text: 'text-purple-700 dark:text-purple-300'
    };
  }
  if (lowerTitle.includes('security') || lowerTitle.includes('gdpr')) {
    return {
      bg: 'bg-red-100 dark:bg-red-900/30',
      text: 'text-red-700 dark:text-red-300'
    };
  }
  if (lowerTitle.includes('data') || lowerTitle.includes('analytics')) {
    return {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      text: 'text-blue-700 dark:text-blue-300'
    };
  }
  return {
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    text: 'text-emerald-700 dark:text-emerald-300'
  };
};

const getCategoryName = (title: string): string => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('ai') || lowerTitle.includes('machine learning')) return 'AI & ML';
  if (lowerTitle.includes('security') || lowerTitle.includes('gdpr')) return 'Cybersecurity';
  if (lowerTitle.includes('data') || lowerTitle.includes('analytics')) return 'Data Science';
  return 'Other';
};

const AchievementCard = ({ achievement }: AchievementCardProps) => {
  const categoryStyles = getCategoryStyles(achievement.title);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group h-full"
      whileHover={{ scale: 1.02 }}
    >
      <Card className="h-full overflow-hidden transition-all duration-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-primary dark:text-primary-foreground line-clamp-2">
            {achievement.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Award className="w-4 h-4" />
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
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${categoryStyles.bg} ${categoryStyles.text}`}>
                {getCategoryIcon(achievement.title)}
                <span className="ml-1">{getCategoryName(achievement.title)}</span>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AchievementCard;