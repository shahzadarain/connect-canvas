import React from 'react';

interface BlogHeadingProps {
  level: number;
  content: string;
  id: string;
  formatContent: (text: string) => string;
}

export const BlogHeading = ({ level, content, id, formatContent }: BlogHeadingProps) => {
  const headingClasses = {
    1: 'text-5xl font-bold mb-12 mt-16 leading-tight scroll-mt-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent font-serif tracking-tight animate-fade-in relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-gradient-to-r after:from-blue-600/20 after:to-purple-600/20 dark:after:from-blue-400/20 dark:after:to-purple-400/20',
    2: 'text-4xl font-bold mb-8 mt-12 leading-tight scroll-mt-20 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-300 dark:to-purple-300 bg-clip-text text-transparent font-serif tracking-tight animate-fade-in',
    3: 'text-3xl font-bold mb-6 mt-8 leading-tight scroll-mt-20 bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-200 dark:to-purple-200 bg-clip-text text-transparent font-serif tracking-tight animate-fade-in',
    4: 'text-2xl font-bold mb-4 mt-6 leading-tight scroll-mt-20 text-blue-600 dark:text-blue-400 font-serif animate-fade-in',
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
          className="first-letter:text-4xl first-letter:font-bold first-letter:mr-1 first-letter:float-left first-letter:text-blue-600 dark:first-letter:text-blue-400"
        />
      </h1>
      <a 
        href={`#${id}`}
        className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        aria-label="Link to section"
      >
        #
      </a>
    </div>
  );
};