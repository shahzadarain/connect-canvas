import React from 'react';

interface BlogParagraphProps {
  content: string;
  formatContent: (text: string) => string;
}

export const BlogParagraph = ({ content, formatContent }: BlogParagraphProps) => {
  return (
    <div 
      className="prose prose-lg dark:prose-invert max-w-none mb-6"
      dangerouslySetInnerHTML={{ 
        __html: formatContent(content)
      }}
    />
  );
};