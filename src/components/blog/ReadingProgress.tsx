import React from 'react';

interface ReadingProgressProps {
  progress: number;
}

export const ReadingProgress = ({ progress }: ReadingProgressProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
      <div
        className="h-full bg-blue-500 dark:bg-blue-400 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};