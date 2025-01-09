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
      className="flex items-start gap-2 text-gray-700 dark:text-gray-300 
        py-1 rounded-lg transition-colors duration-200 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <span className="flex-shrink-0 w-2 h-2 mt-2.5">
        <Circle className="w-2 h-2 text-blue-500 fill-current" />
      </span>
      <span className="flex-1 text-base leading-relaxed">
        {formatContent(content)}
      </span>
    </li>
  );
};