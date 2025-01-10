import React from 'react';
import DOMPurify from 'dompurify';

interface BlogParagraphProps {
  content: string;
  formatContent: (text: string) => string;
}

export const BlogParagraph = ({ content, formatContent }: BlogParagraphProps) => {
  // Sanitize the HTML content to prevent XSS attacks
  const sanitizedContent = DOMPurify.sanitize(content, {
    ADD_TAGS: ['table', 'tr', 'td', 'th', 'thead', 'tbody', 'style'],
    ADD_ATTR: ['class', 'style']
  });

  return (
    <div 
      className="text-lg leading-relaxed mb-6 text-gray-800 dark:text-gray-200 font-serif tracking-wide"
      dangerouslySetInnerHTML={{ 
        __html: sanitizedContent
      }}
    />
  );
};