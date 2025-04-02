
import React from 'react';
import { Circle } from 'lucide-react';

interface BlogListItemProps {
  content: string;
  index: number;
  formatContent: (text: string) => React.ReactNode;
}

export const BlogListItem = ({ content, index, formatContent }: BlogListItemProps) => {
  return (
    <li
      className="flex items-start gap-4 text-gray-700 dark:text-gray-300 
        py-3 px-4 rounded-lg transition-colors duration-200 animate-fade-in
        hover:bg-gray-50 dark:hover:bg-gray-800/50 mb-3"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <span className="flex-shrink-0 w-5 h-5 mt-1">
        <Circle className="w-4 h-4 text-blue-500 fill-blue-100 dark:fill-blue-900/30" />
      </span>
      <span className="flex-1 text-base leading-relaxed">
        {formatContent(content)}
      </span>
    </li>
  );
};
