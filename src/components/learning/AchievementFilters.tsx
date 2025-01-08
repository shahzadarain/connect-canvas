import { motion } from 'framer-motion';
import { Brain, Shield, BarChart3, Calendar, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AchievementFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedYear: string | null;
  setSelectedYear: (year: string | null) => void;
  years: string[];
}

const categories = [
  { id: 'ai', label: 'AI & ML', icon: <Brain className="w-4 h-4" /> },
  { id: 'security', label: 'Cybersecurity', icon: <Shield className="w-4 h-4" /> },
  { id: 'data', label: 'Data Science', icon: <BarChart3 className="w-4 h-4" /> },
];

const AchievementFilters = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedYear,
  setSelectedYear,
  years,
}: AchievementFiltersProps) => {
  return (
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

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap gap-3 justify-center"
      >
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
            {category.icon}
            <span className="ml-2">{category.label}</span>
          </Button>
        ))}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap gap-3 justify-center"
      >
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
      </motion.div>
    </div>
  );
};

export default AchievementFilters;