import React from 'react';

interface BlogHeadingProps {
  level: 1 | 2 | 3 | 4 | 5;
  content: string;
  id: string;
  formatContent: (text: string) => React.ReactNode;
}

export const BlogHeading: React.FC<BlogHeadingProps> = ({ level, content, id, formatContent }) => {
  const headingClasses = {
    1: 'text-4xl md:text-5xl font-bold mb-8 bg-emerald-100 text-emerald-900 px-4 py-2 rounded-lg inline-block',
    2: 'text-3xl font-bold mb-6 bg-purple-100 text-purple-900 px-4 py-2 rounded-lg inline-block',
    3: 'text-2xl font-bold mb-4 bg-blue-100 text-blue-900 px-4 py-2 rounded-lg inline-block',
    4: 'text-xl font-bold mb-3 bg-orange-100 text-orange-900 px-4 py-2 rounded-lg inline-block',
    5: 'text-lg font-bold mb-2 bg-red-100 text-red-900 px-4 py-2 rounded-lg inline-block'
  } as const;

  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
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