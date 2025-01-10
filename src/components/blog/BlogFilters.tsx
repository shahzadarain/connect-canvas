import { Button } from "@/components/ui/button";
import { BlogSearch } from "@/components/blog/BlogSearch";
import { BlogTagCloud } from "@/components/blog/BlogTagCloud";
import { ArrowUpDown, Grid, List, Tag, Folder } from "lucide-react";
import { motion } from "framer-motion";

interface BlogFiltersProps {
  onSearch: (term: string) => void;
  onSortDirectionChange: () => void;
  onViewModeChange: () => void;
  viewMode: 'grid' | 'list';
  tags: string[];
  selectedTag: string | null;
  onTagClick: (tag: string) => void;
  categories: string[];
  selectedCategory: string | null;
  onCategoryClick: (category: string) => void;
}

export const BlogFilters = ({
  onSearch,
  onSortDirectionChange,
  onViewModeChange,
  viewMode,
  tags,
  selectedTag,
  onTagClick,
  categories,
  selectedCategory,
  onCategoryClick,
}: BlogFiltersProps) => {
  return (
    <div className="mb-12 space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="w-full sm:w-96">
          <BlogSearch onSearch={onSearch} />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onSortDirectionChange}
            className="ml-2"
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onViewModeChange}
            className="ml-2"
          >
            {viewMode === 'grid' ? (
              <List className="h-4 w-4" />
            ) : (
              <Grid className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-500">
            <Folder className="h-4 w-4" />
            <h3 className="font-semibold">Categories</h3>
          </div>
          <motion.div 
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryClick(category)}
                className={`rounded-full px-3 py-1 text-sm transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                    : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-blue-900 dark:hover:text-blue-400'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      )}
      
      <BlogTagCloud 
        tags={tags} 
        onTagClick={onTagClick} 
        selectedTag={selectedTag} 
      />
    </div>
  );
};