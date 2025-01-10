import React from 'react';
import { CodeBlock } from './CodeBlock';
import { BlogListItem } from './BlogListItem';
import { BlogHeading } from './BlogHeading';
import { BlogParagraph } from './BlogParagraph';
import { formatLinks, formatInlineText } from '@/utils/blogFormatters';
import DOMPurify from 'dompurify';

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

    // Configure DOMPurify to allow certain HTML tags and attributes
    DOMPurify.setConfig({
      ADD_TAGS: ['table', 'tr', 'td', 'th', 'thead', 'tbody', 'style'],
      ADD_ATTR: ['class', 'style', 'id', 'colspan', 'rowspan', 'align', 'width', 'height', 'valign'],
      FORBID_TAGS: ['script'],
      FORBID_ATTR: ['onerror', 'onload', 'onclick']
    });

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
                  formatContent={(text) => DOMPurify.sanitize(text)} 
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
          currentLanguage = line.slice(3).toLowerCase() || 'plaintext';
          currentCode = '';
          continue;
        } else {
          inCodeBlock = false;
          formattedContent.push(
            <div key={currentIndex} className="my-6 animate-fade-in">
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
            formatContent={(text) => DOMPurify.sanitize(text)}
          />
        );
        currentIndex++;
        continue;
      }

      // Handle lists
      if (line.startsWith('- ') || line.startsWith('* ') || line.match(/^\d+\./)) {
        inList = true;
        const itemContent = line.replace(/^[-*]\s|^\d+\.\s/, '');
        listItems.push(itemContent);
        continue;
      }

      // Handle HTML content and regular paragraphs
      const sanitizedContent = DOMPurify.sanitize(line, {
        ADD_TAGS: ['table', 'tr', 'td', 'th', 'thead', 'tbody', 'style'],
        ADD_ATTR: ['class', 'style', 'id', 'colspan', 'rowspan', 'align', 'width', 'height', 'valign']
      });

      if (sanitizedContent.trim()) {
        formattedContent.push(
          <div
            key={currentIndex}
            className="prose prose-lg dark:prose-invert max-w-none mb-6 [&_table]:w-full [&_table]:border-collapse [&_table]:my-4 
              [&_th]:border [&_th]:border-gray-300 [&_th]:dark:border-gray-700 [&_th]:p-2 [&_th]:bg-gray-100 [&_th]:dark:bg-gray-800
              [&_td]:border [&_td]:border-gray-300 [&_td]:dark:border-gray-700 [&_td]:p-2
              [&_tr:nth-child(even)]:bg-gray-50 [&_tr:nth-child(even)]:dark:bg-gray-900/50"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
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