import { Button } from "@/components/ui/button";
import { BlogSearch } from "@/components/blog/BlogSearch";
import { BlogTagCloud } from "@/components/blog/BlogTagCloud";
import { ArrowUpDown, Grid, List } from "lucide-react";

interface BlogFiltersProps {
  onSearch: (term: string) => void;
  onSortDirectionChange: () => void;
  onViewModeChange: () => void;
  viewMode: 'grid' | 'list';
  tags: string[];
  selectedTag: string | null;
  onTagClick: (tag: string) => void;
}

export const BlogFilters = ({
  onSearch,
  onSortDirectionChange,
  onViewModeChange,
  viewMode,
  tags,
  selectedTag,
  onTagClick,
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
      
      <BlogTagCloud 
        tags={tags} 
        onTagClick={onTagClick} 
        selectedTag={selectedTag} 
      />
    </div>
  );
};