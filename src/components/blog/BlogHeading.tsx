import React from 'react';

interface BlogHeadingProps {
  level: number;
  content: string;
  id: string;
  formatContent: (text: string) => string;
}

export const BlogHeading = ({ level, content, id, formatContent }: BlogHeadingProps) => {
  const headingClasses = {
    1: 'text-5xl font-bold mb-12 mt-16 leading-tight scroll-mt-20 font-serif tracking-tight animate-fade-in relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-gradient-to-r after:from-blue-600/20 after:to-purple-600/20 dark:after:from-blue-400/20 dark:after:to-purple-400/20',
    2: 'text-4xl font-bold mb-8 mt-12 leading-tight scroll-mt-20 font-serif tracking-tight animate-fade-in',
    3: 'text-3xl font-bold mb-6 mt-8 leading-tight scroll-mt-20 font-serif tracking-tight animate-fade-in',
    4: 'text-2xl font-bold mb-4 mt-6 leading-tight scroll-mt-20 font-serif animate-fade-in',
  }[level] || 'text-xl font-bold mb-3 mt-4 scroll-mt-20 font-serif animate-fade-in';

  return (
    <div className="relative group">
      <h1 
        id={id} 
        className={headingClasses}
      >
        <span 
          dangerouslySetInnerHTML={{ 
            __html: formatContent(content) 
          }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 
            dark:from-gray-100 dark:to-gray-200 bg-clip-text 
            selection:bg-yellow-200/30 dark:selection:bg-yellow-500/30"
        />
      </h1>
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