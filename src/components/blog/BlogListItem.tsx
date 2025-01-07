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
        font-serif group animate-fade-in hover:bg-blue-50/50 dark:hover:bg-blue-900/20 
        p-4 rounded-lg transition-colors duration-200 relative overflow-hidden
        before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r 
        before:from-blue-500/0 before:to-purple-500/0 before:opacity-0 
        group-hover:before:opacity-10 before:transition-opacity before:duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <span className="flex-shrink-0 w-8 h-8 mt-1 relative">
        <Check 
          className="absolute inset-0 w-8 h-8 text-blue-500 dark:text-blue-400 
            opacity-0 group-hover:opacity-100 transition-all duration-200 
            scale-0 group-hover:scale-100"
        />
        <span className="absolute inset-0 w-3 h-3 m-2.5 bg-gradient-to-br 
          from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 
          rounded-full group-hover:opacity-0 transition-opacity duration-200 
          shadow-lg" />
      </span>
      <span 
        className="flex-1 font-serif text-xl leading-relaxed bg-gradient-to-br 
          from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-100 
          bg-clip-text selection:bg-yellow-200/30 dark:selection:bg-yellow-500/30"
        dangerouslySetInnerHTML={{ 
          __html: formatContent(content)
        }} 
      />
    </li>
  );
};