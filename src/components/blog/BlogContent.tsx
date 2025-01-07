import React, { useState, useEffect } from 'react';
import { CodeBlock } from './CodeBlock';
import { BlogListItem } from './BlogListItem';
import { BlogHeading } from './BlogHeading';
import { BookOpen } from 'lucide-react';
import { ReadingProgress } from './ReadingProgress';
import { useTheme } from 'next-themes';
import { BookPage } from './BookPage';
import { BlogParagraph } from './BlogParagraph';

interface BlogContentProps {
  content: string;
}

export const BlogContent = ({ content }: BlogContentProps) => {
  const [readingProgress, setReadingProgress] = useState(0);
  
  useEffect(() => {
    const updateReadingProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', updateReadingProgress);
    return () => window.removeEventListener('scroll', updateReadingProgress);
  }, []);

  const formatLinks = (text: string) => {
    return text.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline decoration-2 underline-offset-4 transition-colors duration-200">$1</a>'
    );
  };

  const formatInlineText = (text: string) => {
    const decodedText = text
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&#x27;/g, "'")
      .replace(/&#x2F;/g, "/")
      .replace(/&#39;/g, "'")
      .replace(/&#47;/g, "/");

    const withIcons = decodedText
      .replace(
        /\[Video\]/gi,
        '<span class="inline-flex items-center gap-1 text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-md text-sm font-medium"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2" ry="2"/></svg></span>'
      )
      .replace(
        /\[Reading\]/gi,
        '<span class="inline-flex items-center gap-1 text-purple-500 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-2 py-1 rounded-md text-sm font-medium"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg></span>'
      );

    const dayFormatted = withIcons.replace(
      /(Day \d+:)/g,
      '<strong class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">$1</strong>'
    );

    return dayFormatted
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">$1</strong>')
      .replace(
        /`(.*?)`/g,
        '<code class="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 font-mono text-sm text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">$1</code>'
      );
  };

  const formatContent = (content: string) => {
    let inCodeBlock = false;
    let currentLanguage = '';
    let currentCode = '';
    const formattedContent: JSX.Element[] = [];
    let currentIndex = 0;
    let inList = false;
    let listItems: string[] = [];

    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line === '') {
        if (inList) {
          formattedContent.push(
            <ul key={currentIndex} className="space-y-4 my-8 list-none pl-0 bg-white/50 dark:bg-gray-900/50 rounded-xl p-4 shadow-xl backdrop-blur-sm">
              {listItems.map((item, idx) => (
                <BlogListItem 
                  key={idx} 
                  content={item} 
                  index={idx} 
                  formatContent={(text) => formatLinks(formatInlineText(text))} 
                />
              ))}
            </ul>
          );
          currentIndex++;
          inList = false;
          listItems = [];
        }
        continue;
      }

      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          currentLanguage = line.slice(3).toLowerCase() || 'plaintext';
          currentCode = '';
          continue;
        } else {
          inCodeBlock = false;
          formattedContent.push(
            <div key={currentIndex} className="my-8 animate-fade-in">
              <CodeBlock language={currentLanguage} code={currentCode} />
            </div>
          );
          currentIndex++;
          continue;
        }
      }

      if (inCodeBlock) {
        currentCode += line + '\n';
        continue;
      }

      if (line.startsWith('#')) {
        const level = line.match(/^#+/)[0].length;
        const text = line.replace(/^#+\s/, '');
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        
        formattedContent.push(
          <BlogHeading 
            key={currentIndex}
            level={level}
            content={text}
            id={id}
            formatContent={(text) => formatLinks(formatInlineText(text))}
          />
        );
        currentIndex++;
        continue;
      }

      if (line.startsWith('- ') || line.startsWith('* ') || line.match(/^\d+\./)) {
        inList = true;
        const itemContent = line.replace(/^[-*]\s|^\d+\.\s/, '');
        listItems.push(itemContent);
        continue;
      }

      formattedContent.push(
        <BlogParagraph
          key={currentIndex}
          content={line}
          formatContent={(text) => formatLinks(formatInlineText(text))}
        />
      );
      currentIndex++;
    }

    if (inList && listItems.length > 0) {
      formattedContent.push(
        <ul key={currentIndex} className="space-y-4 my-8 list-none pl-0 bg-white/50 dark:bg-gray-900/50 rounded-xl p-4 shadow-xl backdrop-blur-sm">
          {listItems.map((item, idx) => (
            <BlogListItem 
              key={idx} 
              content={item} 
              index={idx} 
              formatContent={(text) => formatLinks(formatInlineText(text))} 
            />
          ))}
        </ul>
      );
    }

    return formattedContent;
  };

  return (
    <article className="relative max-w-4xl mx-auto px-4 md:px-0">
      <ReadingProgress progress={readingProgress} />
      
      <BookPage>
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <BookOpen className="w-8 h-8 text-blue-500 dark:text-blue-400" />
        </div>
        
        <div className="prose prose-xl max-w-none dark:prose-invert">
          {formatContent(content)}
        </div>
      </BookPage>
    </article>
  );
};