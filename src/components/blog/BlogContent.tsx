import React from 'react';
import { CodeBlock } from './CodeBlock';
import { BlogListItem } from './BlogListItem';
import { BlogHeading } from './BlogHeading';
import { BookOpen, Video } from 'lucide-react';

interface BlogContentProps {
  content: string;
}

export const BlogContent = ({ content }: BlogContentProps) => {
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

    // Replace [Video] and [Reading] with icon spans
    const withIcons = decodedText
      .replace(
        /\[Video\]/gi,
        '<span class="inline-flex items-center gap-1 text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-md text-sm font-medium"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2" ry="2"/></svg>Video</span>'
      )
      .replace(
        /\[Reading\]/gi,
        '<span class="inline-flex items-center gap-1 text-purple-500 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-2 py-1 rounded-md text-sm font-medium"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>Reading</span>'
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

      // Skip lines that only contain "---"
      if (line === '---') {
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

      const formattedText = formatLinks(formatInlineText(line));
      formattedContent.push(
        <p
          key={currentIndex}
          className="text-xl leading-relaxed mb-6 text-gray-700 dark:text-gray-300 font-serif tracking-wide first-letter:text-3xl first-letter:font-bold first-letter:mr-1 first-letter:float-left first-letter:text-blue-600 dark:first-letter:text-blue-400 animate-fade-in"
        >
          <span dangerouslySetInnerHTML={{ __html: formattedText }} />
        </p>
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
    <article className="prose prose-xl max-w-none dark:prose-invert prose-headings:font-serif prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-800 dark:hover:prose-a:text-blue-300 prose-img:rounded-xl prose-img:shadow-lg">
      {formatContent(content)}
    </article>
  );
};