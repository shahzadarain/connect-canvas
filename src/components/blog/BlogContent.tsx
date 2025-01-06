import React from 'react';
import { CodeBlock } from './CodeBlock';

interface BlogContentProps {
  content: string;
}

export const BlogContent = ({ content }: BlogContentProps) => {
  const formatContent = (content: string) => {
    let inCodeBlock = false;
    let currentLanguage = '';
    let currentCode = '';
    const formattedContent: JSX.Element[] = [];
    let currentIndex = 0;

    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Handle code block start
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          currentLanguage = line.trim().slice(3).toLowerCase() || 'plaintext';
          currentCode = '';
          continue;
        } else {
          // End of code block
          inCodeBlock = false;
          formattedContent.push(
            <CodeBlock 
              key={currentIndex} 
              language={currentLanguage} 
              code={currentCode}
            />
          );
          currentIndex++;
          continue;
        }
      }

      // Inside code block
      if (inCodeBlock) {
        currentCode += line + '\n';
        continue;
      }

      // Handle empty lines between paragraphs
      if (line.trim() === '') {
        continue;
      }

      // Handle headings
      if (line.startsWith('#')) {
        const level = line.match(/^#+/)[0].length;
        const text = line.replace(/^#+\s/, '');
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const headingClasses = {
          1: 'text-4xl font-bold mb-8 mt-12 leading-tight scroll-mt-20',
          2: 'text-3xl font-bold mb-6 mt-10 leading-tight scroll-mt-20',
          3: 'text-2xl font-bold mb-4 mt-8 leading-tight scroll-mt-20',
          4: 'text-xl font-bold mb-3 mt-6 leading-tight scroll-mt-20',
        }[level] || 'text-lg font-bold mb-2 mt-4 scroll-mt-20';
        
        formattedContent.push(
          <h1 key={currentIndex} id={id} className={headingClasses}>
            {text}
          </h1>
        );
        currentIndex++;
        continue;
      }

      // Handle lists
      if (line.trim().startsWith('- ') || line.trim().match(/^\d+\./)) {
        let listItems = [line];
        while (i + 1 < lines.length && 
               (lines[i + 1].trim().startsWith('- ') || 
                lines[i + 1].trim().match(/^\d+\./))) {
          i++;
          listItems.push(lines[i]);
        }
        
        formattedContent.push(
          <ul key={currentIndex} className="list-disc list-inside space-y-4 mb-6 ml-6">
            {listItems.map((item, idx) => (
              <li key={idx} className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">
                {item.replace(/^-\s|^\d+\.\s/, '').trim()}
              </li>
            ))}
          </ul>
        );
        currentIndex++;
        continue;
      }

      // Regular paragraphs
      formattedContent.push(
        <p key={currentIndex} className="text-xl leading-relaxed mb-8 text-gray-700 dark:text-gray-300 font-serif">
          {line}
        </p>
      );
      currentIndex++;
    }

    return formattedContent;
  };

  return (
    <div className="prose prose-xl max-w-none dark:prose-invert prose-headings:font-serif prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-800 dark:hover:prose-a:text-blue-300">
      {formatContent(content)}
    </div>
  );
};