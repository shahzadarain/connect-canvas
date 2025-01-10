import React from 'react';
import { Avatar } from '@/components/ui/avatar';

interface BlogPostAuthorProps {
  author: string;
}

export const BlogPostAuthor = ({ author }: BlogPostAuthorProps) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mt-8">
      <div className="flex items-center gap-4">
        <Avatar className="w-16 h-16">
          <img 
            src={`https://source.unsplash.com/random/200x200?portrait`} 
            alt={author}
            className="object-cover"
          />
        </Avatar>
        <div>
          <h3 className="font-serif text-lg mb-2">{author}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            A passionate writer and technology enthusiast sharing insights about the latest developments in tech and innovation.
          </p>
        </div>
      </div>
    </div>
  );
};