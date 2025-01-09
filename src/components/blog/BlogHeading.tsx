import React from 'react';

interface BlogHeadingProps {
  level: 1 | 2 | 3 | 4 | 5;  // Explicitly define allowed heading levels
  content: string;
  id: string;
  formatContent: (text: string) => React.ReactNode;
}

export const BlogHeading: React.FC<BlogHeadingProps> = ({ level, content, id, formatContent }) => {
  const headingClasses = {
    1: 'text-4xl md:text-5xl font-bold mb-6 mt-12 leading-tight scroll-mt-20',
    2: 'text-3xl font-bold mb-4 mt-10 leading-tight scroll-mt-16',
    3: 'text-2xl font-bold mb-3 mt-8 leading-tight scroll-mt-16',
    4: 'text-xl font-bold mb-2 mt-6 leading-tight scroll-mt-16',
    5: 'text-lg font-bold mb-2 mt-4 scroll-mt-16'
  } as const;

  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  const headingClass = headingClasses[level];

  return (
    <div className="relative group">
      <HeadingTag 
        id={id} 
        className={`${headingClass} font-serif tracking-tight text-gray-900 dark:text-gray-100 transition-colors duration-200`}
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