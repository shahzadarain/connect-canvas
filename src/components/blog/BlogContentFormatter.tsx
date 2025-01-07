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

  return <>{formatContent(content)}</>;
};