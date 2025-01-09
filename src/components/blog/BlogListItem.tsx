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
      className="flex items-start gap-3 text-gray-700 dark:text-gray-300 
        p-2 rounded-lg transition-colors duration-200 animate-fade-in group
        hover:bg-gray-50 dark:hover:bg-gray-800/50"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <span className="flex-shrink-0 w-5 h-5 mt-0.5">
        <Check className="w-5 h-5 text-blue-500 dark:text-blue-400" />
      </span>
      <span className="flex-1 text-lg leading-relaxed">
        {formatContent(content)}
      </span>
    </li>
  );
};