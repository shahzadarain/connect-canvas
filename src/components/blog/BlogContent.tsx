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
    let inList = false;
    let listItems: string[] = [];

    const lines = content.split('\n');

    const formatLinks = (text: string) => {
      return text.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline decoration-2 underline-offset-2 transition-colors duration-200">$1</a>'
      );
    };

    const formatInlineText = (text: string) => {
      // Decode HTML entities
      const decodedText = text
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');

      return decodedText
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900 dark:text-gray-100">$1</strong>')
        .replace(
          /`(.*?)`/g,
          '<code class="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 font-mono text-sm text-gray-800 dark:text-gray-200">$1</code>'
        );
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Skip empty lines between paragraphs
      if (line === '') {
        if (inList) {
          formattedContent.push(
            <ul key={currentIndex} className="space-y-4 my-8 list-disc list-outside ml-6">
              {listItems.map((item, idx) => (
                <li
                  key={idx}
                  className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 pl-2"
                >
                  <span dangerouslySetInnerHTML={{ __html: formatLinks(formatInlineText(item)) }} />
                </li>
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
            <CodeBlock key={currentIndex} language={currentLanguage} code={currentCode} />
          );
          currentIndex++;
          continue;
        }
      }

      if (inCodeBlock) {
        currentCode += line + '\n';
        continue;
      }

      // Handle headings
      if (line.startsWith('#')) {
        const level = line.match(/^#+/)[0].length;
        const text = line.replace(/^#+\s/, '');
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        
        const headingClasses = {
          1: 'text-4xl font-bold mb-8 mt-16 leading-tight scroll-mt-20 text-gray-900 dark:text-white font-serif tracking-tight',
          2: 'text-3xl font-bold mb-6 mt-12 leading-tight scroll-mt-20 text-gray-800 dark:text-gray-100 font-serif tracking-tight',
          3: 'text-2xl font-bold mb-4 mt-8 leading-tight scroll-mt-20 text-gray-800 dark:text-gray-100 font-serif tracking-tight',
          4: 'text-xl font-bold mb-3 mt-6 leading-tight scroll-mt-20 text-gray-700 dark:text-gray-200',
        }[level] || 'text-lg font-bold mb-2 mt-4 scroll-mt-20';
        
        formattedContent.push(
          <h1 key={currentIndex} id={id} className={`${headingClasses} animate-fade-in`}>
            <span dangerouslySetInnerHTML={{ __html: formatLinks(formatInlineText(text)) }} />
          </h1>
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

      // Handle paragraphs
      const formattedText = formatLinks(formatInlineText(line));
      formattedContent.push(
        <p
          key={currentIndex}
          className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300 font-serif tracking-wide"
        >
          <span dangerouslySetInnerHTML={{ __html: formattedText }} />
        </p>
      );
      currentIndex++;
    }

    // Handle any remaining list items
    if (inList && listItems.length > 0) {
      formattedContent.push(
        <ul key={currentIndex} className="space-y-4 my-8 list-disc list-outside ml-6">
          {listItems.map((item, idx) => (
            <li
              key={idx}
              className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 pl-2"
            >
              <span dangerouslySetInnerHTML={{ __html: formatLinks(formatInlineText(item)) }} />
            </li>
          ))}
        </ul>
      );
    }

    return formattedContent;
  };

  return (
    <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-serif prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-500 dark:prose-a:text-blue-400 hover:prose-a:text-blue-700 dark:hover:prose-a:text-blue-300 prose-img:rounded-xl prose-img:shadow-lg">
      {formatContent(content)}
    </article>
  );
};