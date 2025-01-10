import React from 'react';
import { BlogContentFormatter } from './BlogContentFormatter';
import { BlogCoverImage } from './BlogCoverImage';

interface BlogContentProps {
  content: string;
  featuredImage?: string | null;
}

export const BlogContent: React.FC<BlogContentProps> = ({ content, featuredImage }) => {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {featuredImage && (
        <div className="mb-12">
          <BlogCoverImage featuredImage={featuredImage} />
        </div>
      )}
      <div className="
        prose-headings:font-serif prose-headings:font-bold 
        prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl 
        prose-p:leading-relaxed prose-p:text-gray-700 dark:prose-p:text-gray-300
        prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-500 
        prose-img:rounded-xl prose-img:shadow-lg 
        prose-pre:bg-gray-900 dark:prose-pre:bg-gray-800 prose-pre:text-gray-100 prose-pre:shadow-md prose-pre:p-6 
        prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-code:before:content-none prose-code:after:content-none 
        prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300
        [&_table]:w-full [&_table]:border-collapse [&_table]:my-8 [&_table]:bg-white dark:[&_table]:bg-gray-800 [&_table]:shadow-lg [&_table]:rounded-lg overflow-hidden
        [&_thead]:bg-gray-50 dark:[&_thead]:bg-gray-800
        [&_th]:border [&_th]:border-gray-200 dark:[&_th]:border-gray-700 [&_th]:p-4 [&_th]:text-left [&_th]:font-semibold [&_th]:text-gray-900 dark:[&_th]:text-gray-100
        [&_td]:border [&_td]:border-gray-200 dark:[&_td]:border-gray-700 [&_td]:p-4 [&_td]:text-gray-700 dark:[&_td]:text-gray-300
        [&_tr:nth-child(even)]:bg-gray-50 dark:[&_tr:nth-child(even)]:bg-gray-900/50
        prose-ul:list-disc prose-ul:pl-6 prose-ul:my-6 prose-ul:space-y-2
        prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-6 prose-ol:space-y-2
        prose-li:text-gray-700 dark:prose-li:text-gray-300
        [&>*:first-child]:mt-0 [&>*:last-child]:mb-0
      ">
        <BlogContentFormatter content={content} />
      </div>
    </div>
  );
};