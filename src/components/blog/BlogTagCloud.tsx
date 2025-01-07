import React from 'react';
import { Link } from 'react-router-dom';
import { Tag } from 'lucide-react';

interface BlogTagCloudProps {
  tags: string[];
  onTagClick: (tag: string) => void;
}

export const BlogTagCloud = ({ tags, onTagClick }: BlogTagCloudProps) => {
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
            className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 hover:bg-emerald-100 hover:text-emerald-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-emerald-900 dark:hover:text-emerald-400 transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};