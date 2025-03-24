
import React from 'react';

interface BlogParagraphProps {
  content: string;
  formatContent: (text: string) => React.ReactNode;
}

export const BlogParagraph = ({ content, formatContent }: BlogParagraphProps) => {
  // Add data-keywords attribute for SEO
  return (
    <div 
      className="prose prose-lg dark:prose-invert max-w-none mb-6"
      data-keywords="poverty mapping, geospatial analysis, humanitarian data"
    >
      {formatContent(content)}
    </div>
  );
};
