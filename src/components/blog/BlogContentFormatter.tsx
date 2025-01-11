import React from 'react';
import { CodeBlock } from './CodeBlock';
import { BlogListItem } from './BlogListItem';
import { BlogHeading } from './BlogHeading';
import { BlogParagraph } from './BlogParagraph';
import { formatLinks, formatInlineText } from '@/utils/blogFormatters';

interface BlogContentFormatterProps {
  content: string;
}

export const BlogContentFormatter = ({ content }: BlogContentFormatterProps) => {
  const formatContent = (content: string) => {
    let inCodeBlock = false;
    let currentLanguage = '';
    let currentCode = '';
    const formattedContent: JSX.Element[] = [];
    let currentIndex = 0;
    let inList = false;
    let listItems: string[] = [];

    // Extract and apply any style tags
    const styleTagRegex = /<style>([\s\S]*?)<\/style>/g;
    const styles = Array.from(content.matchAll(styleTagRegex));
    
    // Create a style element for each style block found
    styles.forEach((style, index) => {
      const styleElement = document.createElement('style');
      styleElement.id = `blog-content-style-${index}`;
      styleElement.textContent = style[1];
      // Remove any existing style with the same ID
      const existingStyle = document.getElementById(styleElement.id);
      if (existingStyle) {
        existingStyle.remove();
      }
      document.head.appendChild(styleElement);
    });

    // Remove style tags from content after applying them
    content = content.replace(styleTagRegex, '');

    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Skip empty lines
      if (line === '') {
        if (inList) {
          formattedContent.push(
            <ul key={currentIndex} className="space-y-1 my-4 list-none pl-0">
              {listItems.map((item, idx) => (
                <BlogListItem 
                  key={idx} 
                  content={item} 
                  index={idx} 
                  formatContent={(text) => text} 
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

      // Handle code blocks
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          // Support both 'js' and 'javascript' language identifiers
          const lang = line.slice(3).toLowerCase();
          currentLanguage = lang === 'js' || lang === 'javascript' ? 'javascript' : lang || 'plaintext';
          currentCode = '';
          continue;
        } else {
          inCodeBlock = false;
          formattedContent.push(
            <div key={currentIndex} className="my-6 animate-fade-in">
              <CodeBlock language={currentLanguage} code={currentCode.trim()} />
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

      // Handle images
      if (line.startsWith('![')) {
        const altTextMatch = line.match(/!\[(.*?)\]/);
        const urlMatch = line.match(/\((.*?)\)/);
        
        if (altTextMatch && urlMatch) {
          const altText = altTextMatch[1];
          let imageUrl = urlMatch[1];
          
          if (imageUrl.startsWith('/lovable-uploads/')) {
            imageUrl = `${window.location.origin}${imageUrl}`;
          }
          
          formattedContent.push(
            <div key={currentIndex} className="my-8">
              <img
                src={imageUrl}
                alt={altText}
                className="w-full rounded-lg shadow-lg"
                onError={(e) => {
                  console.error('Error loading image:', imageUrl);
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
              <p className="text-sm text-gray-500 mt-2 text-center italic">{altText}</p>
            </div>
          );
          currentIndex++;
          continue;
        }
      }

      // Handle headings
      if (line.startsWith('#')) {
        const level = Math.min(line.match(/^#+/)[0].length, 5) as 1 | 2 | 3 | 4 | 5;
        const text = line.replace(/^#+\s/, '');
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        
        formattedContent.push(
          <BlogHeading 
            key={currentIndex}
            level={level}
            content={text}
            id={id}
            formatContent={(text) => text}
          />
        );
        currentIndex++;
        continue;
      }

      // Handle lists
      if ((line.startsWith('- ') || line.startsWith('* ') || line.match(/^\d+\./)) && !line.includes('<')) {
        inList = true;
        const itemContent = line.replace(/^[-*]\s|^\d+\.\s/, '');
        listItems.push(itemContent);
        continue;
      }

      // Handle HTML content and regular paragraphs
      if (line.trim()) {
        const processedContent = line
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&amp;/g, '&');

        formattedContent.push(
          <div
            key={currentIndex}
            className="prose prose-lg dark:prose-invert max-w-none mb-6 
              [&_table]:w-full [&_table]:border-collapse [&_table]:my-8 
              [&_thead]:bg-gray-50 dark:[&_thead]:bg-gray-800
              [&_th]:border [&_th]:border-gray-200 dark:[&_th]:border-gray-700 [&_th]:p-4 [&_th]:text-left [&_th]:font-semibold [&_th]:text-gray-900 dark:[&_th]:text-gray-100
              [&_td]:border [&_td]:border-gray-200 dark:[&_td]:border-gray-700 [&_td]:p-4 [&_td]:text-gray-700 dark:[&_td]:text-gray-300
              [&_tr:nth-child(even)]:bg-gray-50 dark:[&_tr:nth-child(even)]:bg-gray-900/50
              [&_a]:text-blue-600 dark:[&_a]:text-blue-400 [&_a:hover]:text-blue-500 [&_a]:transition-colors [&_a]:duration-200
              [&_.task]:font-bold [&_.task]:text-red-600 dark:[&_.task]:text-red-400
              [&_br]:block [&_br]:content-[''] [&_br]:my-2"
            dangerouslySetInnerHTML={{ 
              __html: processedContent
            }}
          />
        );
        currentIndex++;
      }
    }

    return formattedContent;
  };

  // Cleanup function to remove added styles when component unmounts
  React.useEffect(() => {
    return () => {
      document.querySelectorAll('[id^="blog-content-style-"]').forEach(element => {
        element.remove();
      });
    };
  }, []);

  return <>{formatContent(content)}</>;
};