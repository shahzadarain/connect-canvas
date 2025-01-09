import React from 'react';

interface BlogParagraphProps {
  content: string;
  formatContent: (text: string) => string;
}

export const BlogParagraph = ({ content, formatContent }: BlogParagraphProps) => {
  return (
    <p className="text-xl leading-relaxed mb-8 font-serif tracking-wide text-gray-800 dark:text-gray-200">
      <span 
        dangerouslySetInnerHTML={{ 
          __html: formatContent(content) 
        }}
      />
    </p>
  );
};