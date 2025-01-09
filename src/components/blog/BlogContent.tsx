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
      <div className="prose prose-lg max-w-none font-serif selection:bg-yellow-100 dark:selection:bg-yellow-800/30">
        {/* Typography Styles */}
        <style jsx global>{`
          .prose h1 {
            @apply text-4xl md:text-5xl font-bold mb-8 font-serif tracking-tight;
          }
          .prose h2 {
            @apply text-3xl font-bold mt-12 mb-6 font-serif tracking-tight;
          }
          .prose h3 {
            @apply text-2xl font-bold mt-8 mb-4 font-serif;
          }
          .prose p {
            @apply text-xl leading-relaxed mb-6 font-serif text-gray-800 dark:text-gray-200;
          }
          .prose blockquote {
            @apply border-l-4 border-blue-500 pl-6 my-8 italic text-2xl font-serif text-gray-700 dark:text-gray-300;
          }
          .prose ul {
            @apply space-y-4 my-8 list-none pl-0;
          }
          .prose li {
            @apply flex items-start space-x-4 text-lg leading-relaxed;
          }
          .prose img {
            @apply rounded-lg shadow-lg my-12;
          }
          .prose a {
            @apply text-blue-600 hover:text-blue-700 underline-offset-4 decoration-blue-500/30 hover:decoration-blue-500;
          }
          .prose code {
            @apply px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono;
          }
          .prose pre {
            @apply p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto my-8;
          }
        `}</style>

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