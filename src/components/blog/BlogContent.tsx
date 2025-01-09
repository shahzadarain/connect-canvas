import React from 'react';
import { BlogContentFormatter } from './BlogContentFormatter';
import { BlogCoverImage } from './BlogCoverImage';
import { Share2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogContentProps {
  content: string;
  featuredImage?: string | null;
}

export const BlogContent = ({ content, featuredImage }: BlogContentProps) => {
  return (
    <article className="max-w-[728px] mx-auto px-4 md:px-0">
      {/* Back to Blog Link */}
      <Link 
        to="/blog" 
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
        Back to Blog
      </Link>

      {/* Featured Image */}
      {featuredImage && (
        <div className="mb-12">
          <BlogCoverImage featuredImage={featuredImage} />
        </div>
      )}

      {/* Content */}
      <div 
        className="
          prose prose-lg max-w-none font-serif selection:bg-yellow-100 dark:selection:bg-yellow-800/30
          prose-headings:font-serif prose-headings:tracking-tight
          prose-h1:text-4xl prose-h1:md:text-5xl prose-h1:font-bold prose-h1:mb-8
          prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6
          prose-h3:text-2xl prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-4
          prose-p:text-xl prose-p:leading-relaxed prose-p:mb-6 prose-p:text-gray-800 dark:prose-p:text-gray-200
          prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-6 prose-blockquote:my-8 
          prose-blockquote:italic prose-blockquote:text-2xl prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300
          prose-ul:space-y-4 prose-ul:my-8 prose-ul:list-none prose-ul:pl-0
          prose-li:flex prose-li:items-start prose-li:space-x-4 prose-li:text-lg prose-li:leading-relaxed
          prose-img:rounded-lg prose-img:shadow-lg prose-img:my-12
          prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-a:underline-offset-4 prose-a:decoration-blue-500/30 hover:prose-a:decoration-blue-500
          prose-code:px-2 prose-code:py-1 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:rounded prose-code:text-sm prose-code:font-mono
          prose-pre:p-4 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:my-8
        "
      >
        <BlogContentFormatter content={content} />
      </div>

      {/* Share Section */}
      <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Share this article</h3>
          <div className="flex space-x-4">
            <button 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}`, '_blank')}
            >
              <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};