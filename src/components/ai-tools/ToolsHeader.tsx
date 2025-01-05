import React from 'react';
import { Filter, ArrowUpDown, Grid3x3, List } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ToolsHeaderProps {
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  sortField: 'name' | 'category';
  setSortField: (field: 'name' | 'category') => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

const ToolsHeader = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
  viewMode,
  setViewMode,
}: ToolsHeaderProps) => {
  return (
    <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
      <div className="flex gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              {selectedCategory || 'All Categories'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
              All Categories
            </DropdownMenuItem>
            {categories.map((category) => (
              <DropdownMenuItem
                key={category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4" />
              Sort by {sortField}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSortField('name')}>
              Name
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortField('category')}>
              Category
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </Button>
      </div>

      <div className="flex gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setViewMode('grid')}
          className={viewMode === 'grid' ? 'bg-blue-100' : ''}
        >
          <Grid3x3 className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setViewMode('list')}
          className={viewMode === 'list' ? 'bg-blue-100' : ''}
        >
          <List className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ToolsHeader;