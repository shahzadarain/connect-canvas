import React from 'react';
import DOMPurify from 'dompurify';

interface BlogParagraphProps {
  content: string;
  formatContent: (text: string) => string;
}

export const BlogParagraph = ({ content, formatContent }: BlogParagraphProps) => {
  // Configure DOMPurify to allow certain HTML tags and attributes
  DOMPurify.setConfig({
    ADD_TAGS: ['table', 'tr', 'td', 'th', 'thead', 'tbody', 'style'],
    ADD_ATTR: ['class', 'style']
  });

  // Sanitize the HTML content
  const sanitizedContent = DOMPurify.sanitize(formatContent(content), {
    ADD_TAGS: ['table', 'tr', 'td', 'th', 'thead', 'tbody', 'style'],
    ADD_ATTR: ['class', 'style']
  });

  return (
    <div 
      className="prose prose-lg dark:prose-invert max-w-none mb-6"
      dangerouslySetInnerHTML={{ 
        __html: sanitizedContent
      }}
    />
  );
};