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
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 group transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
        Back to Blog
      </Link>

      {/* Featured Image */}
      {featuredImage && (
        <div className="mb-8 rounded-xl overflow-hidden shadow-xl">
          <BlogCoverImage featuredImage={featuredImage} />
        </div>
      )}

      {/* Content */}
      <div 
        className="
          prose prose-lg max-w-none
          prose-headings:font-serif prose-headings:tracking-tight prose-headings:text-gray-900 dark:prose-headings:text-gray-100
          prose-h1:text-4xl prose-h1:md:text-5xl prose-h1:font-bold prose-h1:mb-6 prose-h1:leading-tight
          prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-2xl prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-lg prose-p:leading-relaxed prose-p:mb-4 prose-p:text-gray-700 dark:prose-p:text-gray-300
          prose-blockquote:border-l-4 prose-blockquote:border-blue-500/50 prose-blockquote:pl-4 prose-blockquote:my-6 
          prose-blockquote:italic prose-blockquote:text-xl prose-blockquote:text-gray-700/90 dark:prose-blockquote:text-gray-300/90
          prose-ul:my-4 prose-ul:space-y-2 prose-ul:list-none
          prose-li:flex prose-li:items-start prose-li:gap-3 prose-li:text-gray-700 dark:prose-li:text-gray-300
          prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8
          prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-a:no-underline hover:prose-a:underline
          prose-code:px-1.5 prose-code:py-0.5 prose-code:bg-gray-100 dark:prose-code:bg-gray-800/80 prose-code:rounded 
          prose-code:text-sm prose-code:font-mono prose-code:text-gray-800 dark:prose-code:text-gray-200
          prose-pre:p-4 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800/80 prose-pre:rounded-lg 
          prose-pre:overflow-x-auto prose-pre:my-6 prose-pre:shadow-sm
          selection:bg-blue-100/30 dark:selection:bg-blue-900/30
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