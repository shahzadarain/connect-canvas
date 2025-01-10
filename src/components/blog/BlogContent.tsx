import React from 'react';
import { CodeBlock } from './CodeBlock';
import { BlogHeading } from './BlogHeading';
import { BlogParagraph } from './BlogParagraph';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface BlogContentProps {
  content: string;
  featuredImage?: string | null;
}

export const BlogContent: React.FC<BlogContentProps> = ({ content, featuredImage }) => {
  const processContent = (content: string) => {
    console.log('Processing blog content');
    const lines = content.split('\n');
    const processedContent: JSX.Element[] = [];
    let codeBlock = '';
    let inCodeBlock = false;
    let key = 0;

    const formatContent = (text: string) => {
      // Add your content formatting logic here
      return text;
    };

    lines.forEach((line, index) => {
      // Handle code blocks with improved styling
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          processedContent.push(
            <div key={key++} className="my-8">
              <CodeBlock code={codeBlock} language={line.slice(3)} />
            </div>
          );
          codeBlock = '';
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeBlock += line + '\n';
        return;
      }

      // Handle images with proper sizing and error handling
      if (line.startsWith('![')) {
        const altTextMatch = line.match(/!\[(.*?)\]/);
        const urlMatch = line.match(/\((.*?)\)/);
        if (altTextMatch && urlMatch) {
          const altText = altTextMatch[1];
          const url = urlMatch[1];
          console.log('Processing image:', { url, altText });
          processedContent.push(
            <div key={key++} className="my-12">
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <img
                  src={url}
                  alt={altText}
                  className="rounded-lg shadow-lg w-full h-full object-cover hover:opacity-95 transition-opacity duration-200"
                  onError={(e) => {
                    console.error('Error loading image:', url);
                    e.currentTarget.src = '/lovable-uploads/6f128401-a85d-463e-b38e-a398900209ed.png';
                  }}
                />
              </AspectRatio>
              <p className="text-sm text-muted-foreground mt-2 text-center italic">
                {altText}
              </p>
            </div>
          );
        }
        return;
      }

      // Handle headings with improved spacing
      if (line.startsWith('#')) {
        const level = line.match(/^#+/)?.[0].length || 1;
        const text = line.replace(/^#+\s/, '');
        const id = text.toLowerCase().replace(/[^\w]+/g, '-');
        if (level >= 1 && level <= 5) {
          processedContent.push(
            <BlogHeading 
              key={key++} 
              level={level as 1 | 2 | 3 | 4 | 5} 
              content={text}
              id={id}
              formatContent={formatContent}
            />
          );
        }
        return;
      }

      // Handle paragraphs with better typography
      if (line.trim()) {
        processedContent.push(
          <BlogParagraph 
            key={key++} 
            content={line}
            formatContent={formatContent}
          />
        );
      } else {
        processedContent.push(<div key={key++} className="h-4" />);
      }
    });

    return processedContent;
  };

  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      {featuredImage && (
        <div className="mb-12">
          <AspectRatio ratio={21 / 9}>
            <img
              src={featuredImage}
              alt="Featured"
              className="w-full h-full object-cover rounded-xl shadow-lg"
              onError={(e) => {
                console.error('Error loading featured image:', featuredImage);
                e.currentTarget.src = '/lovable-uploads/6f128401-a85d-463e-b38e-a398900209ed.png';
              }}
            />
          </AspectRatio>
        </div>
      )}
      <div className="space-y-6">
        {processContent(content)}
      </div>
    </article>
  );
};