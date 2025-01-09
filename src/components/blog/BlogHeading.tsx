import React from 'react';

interface BlogHeadingProps {
  level: number;
  content: string;
  id: string;
  formatContent: (text: string) => string;
}

export const BlogHeading = ({ level, content, id, formatContent }: BlogHeadingProps) => {
  const headingClasses = {
    1: 'text-5xl font-bold mb-12 mt-16 leading-tight scroll-mt-20 font-serif tracking-tight',
    2: 'text-3xl font-bold mb-8 mt-12 leading-tight scroll-mt-20 font-serif tracking-tight',
    3: 'text-2xl font-bold mb-6 mt-8 leading-tight scroll-mt-20 font-serif',
    4: 'text-xl font-bold mb-4 mt-6 leading-tight scroll-mt-20 font-serif',
  }[level] || 'text-lg font-bold mb-3 mt-4 scroll-mt-20 font-serif';

  const Component = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <div className="relative group">
      <Component 
        id={id} 
        className={`${headingClasses} text-gray-900 dark:text-gray-100`}
      >
        <span 
          dangerouslySetInnerHTML={{ 
            __html: formatContent(content) 
          }}
        />
      </Component>
      <a 
        href={`#${id}`}
        className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 
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