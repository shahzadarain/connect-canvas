
import React from 'react';

interface BlogHeadingProps {
  level: 1 | 2 | 3 | 4 | 5;
  content: string;
  id: string;
  formatContent: (text: string) => React.ReactNode;
}

type HeadingLevel = 1 | 2 | 3 | 4 | 5;
type HeadingClasses = Record<HeadingLevel, string>;

export const BlogHeading: React.FC<BlogHeadingProps> = ({ level, content, id, formatContent }) => {
  const headingClasses: HeadingClasses = {
    1: 'text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-gray-100',
    2: 'text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200',
    3: 'text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200',
    4: 'text-xl font-bold mb-3 text-gray-700 dark:text-gray-300',
    5: 'text-lg font-bold mb-2 text-gray-700 dark:text-gray-300'
  };

  const HeadingTag = `h${level}` as const;
  const headingClass = headingClasses[level];

  return (
    <div className="relative group">
      <HeadingTag 
        id={id} 
        className={`${headingClass} font-sans tracking-tight transition-colors duration-200`}
      >
        {formatContent(content)}
      </HeadingTag>
      <a 
        href={`#${id}`}
        className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 
          group-hover:opacity-100 transition-opacity duration-200 
          text-gray-400 hover:text-gray-600 dark:text-gray-500 
          dark:hover:text-gray-300"
        aria-label="Link to section"
      >
        #
      </a>
    </div>
  );
};
