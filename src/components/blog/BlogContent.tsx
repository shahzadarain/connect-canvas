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
      <div className="prose-headings:font-serif prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:leading-relaxed prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-500 prose-img:rounded-xl prose-img:shadow-lg prose-pre:bg-gray-900 dark:prose-pre:bg-gray-800 prose-pre:text-gray-100 prose-pre:shadow-md prose-pre:p-6 prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-code:before:content-none prose-code:after:content-none prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300 prose-table:border-collapse prose-table:w-full prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-700 prose-td:p-2 prose-th:bg-gray-100 dark:prose-th:bg-gray-800 prose-th:border prose-th:border-gray-300 dark:prose-th:border-gray-700 prose-th:p-2">
        <BlogContentFormatter content={content} />
      </div>
    </div>
  );
};