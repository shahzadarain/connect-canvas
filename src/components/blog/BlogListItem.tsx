import React from 'react';
import { Check } from 'lucide-react';

interface BlogListItemProps {
  content: string;
  index: number;
  formatContent: (text: string) => string;
}

export const BlogListItem = ({ content, index, formatContent }: BlogListItemProps) => {
  return (
    <li
      className="flex items-start space-x-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300 
        font-serif group animate-fade-in hover:bg-gray-50 dark:hover:bg-gray-800/50 
        p-4 rounded-lg transition-colors duration-200"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <span className="flex-shrink-0 w-6 h-6 mt-1">
        <Check className="w-6 h-6 text-blue-500 dark:text-blue-400" />
      </span>
      <span 
        className="flex-1 font-serif text-lg leading-relaxed"
        dangerouslySetInnerHTML={{ 
          __html: formatContent(content)
        }} 
      />
    </li>
  );
};