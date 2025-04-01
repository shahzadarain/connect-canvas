
import React from 'react';

interface BlogParagraphProps {
  content: string;
  formatContent: (text: string) => React.ReactNode;
}

export const BlogParagraph = ({ content, formatContent }: BlogParagraphProps) => {
  return (
    <div 
      className="prose prose-lg dark:prose-invert max-w-none mb-6 leading-relaxed 
        text-gray-800 dark:text-gray-200 bg-white/50 dark:bg-gray-900/50 
        p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800"
      data-keywords="poverty mapping, geospatial analysis, humanitarian data, AI industry impact"
    >
      {formatContent(content)}
    </div>
  );
};
