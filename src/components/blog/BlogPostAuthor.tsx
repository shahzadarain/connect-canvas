import React from 'react';
import { Avatar } from '@/components/ui/avatar';

interface BlogPostAuthorProps {
  author: string;
}

export const BlogPostAuthor = ({ author }: BlogPostAuthorProps) => {
  // Use different profile image and bio based on author name
  const getAuthorInfo = (authorName: string) => {
    if (authorName === "Muhammad Sohaib") {
      return {
        image: "https://i.ibb.co/djnm7xC/sohaib.png",
        bio: "AI researcher, ex-Junior Researcher at OpenAI, now at UN on Co-polit Project, advancing AI for global impact."
      };
    }
    
    // Default author info
    return {
      image: "/lovable-uploads/d400063e-16df-4a64-8f55-cd37a44b6c3b.png",
      bio: "Data and AI expert at the United Nations specializing in data-driven solutions, machine learning, and ethical AI. Proven leadership in advancing innovation and digital transformation for global impact."
    };
  };

  const authorInfo = getAuthorInfo(author);

  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mt-8">
      <div className="flex items-center gap-4">
        <Avatar className="w-16 h-16">
          <img 
            src={authorInfo.image}
            alt={`${author}'s profile picture`}
            className="object-cover w-full h-full"
          />
        </Avatar>
        <div>
          <h3 className="font-serif text-lg mb-2">{author}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {authorInfo.bio}
          </p>
        </div>
      </div>
    </div>
  );
};