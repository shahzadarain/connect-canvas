import React from 'react';

interface BlogParagraphProps {
  content: string;
  formatContent: (text: string) => string;
}

export const BlogParagraph = ({ content, formatContent }: BlogParagraphProps) => {
  return (
    <p
      className="text-xl leading-relaxed mb-8 font-serif tracking-wide 
        first-letter:text-4xl first-letter:font-bold first-letter:mr-1 
        first-letter:float-left first-letter:text-blue-600 
        dark:first-letter:text-blue-400 animate-fade-in
        selection:bg-yellow-200/30 dark:selection:bg-yellow-500/30"
    >
      <span 
        dangerouslySetInnerHTML={{ 
          __html: formatContent(content) 
        }}
        className="font-serif text-xl leading-relaxed 
          bg-gradient-to-br from-gray-700 to-gray-900 
          dark:from-gray-300 dark:to-gray-100 bg-clip-text"
      />
    </p>
  );
};