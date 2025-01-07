import React from 'react';

interface BlogParagraphProps {
  content: string;
  formatContent: (text: string) => string;
}

export const BlogParagraph = ({ content, formatContent }: BlogParagraphProps) => {
  return (
    <p
      className="text-xl leading-relaxed mb-6 text-gray-800 dark:text-gray-200 
        font-serif tracking-wide first-letter:text-4xl first-letter:font-bold 
        first-letter:mr-1 first-letter:float-left first-letter:text-blue-600 
        dark:first-letter:text-blue-400 animate-fade-in"
    >
      <span dangerouslySetInnerHTML={{ __html: formatContent(content) }} />
    </p>
  );
};