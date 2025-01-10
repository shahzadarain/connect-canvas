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
  // Function to fix image paths in markdown content
  const fixImagePaths = (content: string) => {
    console.log('Original content:', content);
    
    return content.replace(
      /!\[(.*?)\]\((.*?)\)/g,
      (match, altText, path) => {
        console.log('Processing markdown image:', { match, altText, path });
        
        // If it's already a full URL, return as is
        if (path.startsWith('http://') || path.startsWith('https://')) {
          console.log('Using full URL:', path);
          return match;
        }
        
        // Handle lovable-uploads paths
        if (path.includes('lovable-uploads')) {
          // Remove any leading slashes and ensure proper path format
          const cleanPath = path.replace(/^\/+/, '');
          const fileName = cleanPath.split('lovable-uploads/').pop();
          const fullPath = `${window.location.origin}/lovable-uploads/${fileName}`;
          console.log('Using lovable-uploads path:', fullPath);
          return `![${altText}](${fullPath})`;
        }
        
        // Default case: assume it's a lovable-uploads file
        const fileName = path.split('/').pop();
        const fullPath = `${window.location.origin}/lovable-uploads/${fileName}`;
        console.log('Converting to full lovable-uploads path:', fullPath);
        return `![${altText}](${fullPath})`;
      }
    );
  };

  const processedContent = fixImagePaths(content);
  console.log('Processed content:', processedContent);

  return (
    <article className="max-w-[728px] mx-auto px-4 md:px-0">
      <Link 
        to="/blog" 
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 group transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
        Back to Blog
      </Link>

      {featuredImage && (
        <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
          <BlogCoverImage featuredImage={featuredImage} />
        </div>
      )}

      <div 
        className="
          prose prose-lg max-w-none
          prose-headings:font-sans prose-headings:tracking-tight
          prose-p:text-lg prose-p:leading-relaxed prose-p:mb-4 prose-p:text-gray-700 dark:prose-p:text-gray-300
          prose-ul:my-4 prose-ul:space-y-1
          prose-li:text-gray-700 dark:prose-li:text-gray-300
          prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8
          prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-a:no-underline hover:prose-a:underline
          selection:bg-blue-100/30 dark:selection:bg-blue-900/30
        "
      >
        <BlogContentFormatter content={processedContent} />
      </div>

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