import React from 'react';
import { BlogContentFormatter } from './BlogContentFormatter';

interface BlogContentProps {
  content: string;
}

export const BlogContent = ({ content }: BlogContentProps) => {
  return (
    <div className="prose prose-lg max-w-none font-serif prose-headings:font-sans prose-headings:font-bold prose-p:text-gray-700 prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-img:rounded-lg prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg">
      <BlogContentFormatter content={content} />
    </div>
  );
};