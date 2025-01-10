import React from 'react';
import { Link } from 'react-router-dom';
import { Tag } from 'lucide-react';

interface BlogTagCloudProps {
  tags: string[];
  onTagClick: (tag: string) => void;
  selectedTag: string | null;
}

export const BlogTagCloud = ({ tags, onTagClick, selectedTag }: BlogTagCloudProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-emerald-500">
        <Tag className="h-4 w-4" />
        <h3 className="font-semibold">Popular Tags</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagClick(tag)}
            className={`rounded-full px-3 py-1 text-sm transition-colors ${
              selectedTag === tag
                ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400'
                : 'bg-gray-100 text-gray-600 hover:bg-emerald-100 hover:text-emerald-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-emerald-900 dark:hover:text-emerald-400'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};