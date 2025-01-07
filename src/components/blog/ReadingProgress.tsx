import React from 'react';

interface ReadingProgressProps {
  progress: number;
}

export const ReadingProgress = ({ progress }: ReadingProgressProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 z-50">
      <div 
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-200"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};