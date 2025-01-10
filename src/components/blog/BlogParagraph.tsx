import React from 'react';

interface BlogParagraphProps {
  content: string;
  formatContent: (text: string) => string;
}

export const BlogParagraph = ({ content, formatContent }: BlogParagraphProps) => {
  return (
    <p className="text-lg leading-relaxed mb-6 text-gray-800 dark:text-gray-200 font-serif tracking-wide">
      <span 
        dangerouslySetInnerHTML={{ 
          __html: formatContent(content) 
        }}
        className="prose-p:my-6"
      />
    </p>
  );
};