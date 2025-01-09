import React from 'react';
import { Check } from 'lucide-react';

interface BlogListItemProps {
  content: string;
  index: number;
  formatContent: (text: string) => React.ReactNode;
}

export const BlogListItem = ({ content, index, formatContent }: BlogListItemProps) => {
  return (
    <li
      className="flex items-start gap-2 text-gray-700 dark:text-gray-300 
        py-1.5 rounded-lg transition-colors duration-200 animate-fade-in group
        hover:bg-gray-50 dark:hover:bg-gray-800/50"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <span className="flex-shrink-0 w-4 h-4 mt-1.5">
        <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
      </span>
      <span className="flex-1 text-base leading-relaxed">
        {formatContent(content)}
      </span>
    </li>
  );
};