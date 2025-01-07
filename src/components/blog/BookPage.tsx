import React from 'react';
import { cn } from '@/lib/utils';

interface BookPageProps {
  children: React.ReactNode;
  className?: string;
}

export const BookPage = ({ children, className }: BookPageProps) => {
  return (
    <div 
      className={cn(
        "relative max-w-[65ch] mx-auto px-8 md:px-12 py-10",
        "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm",
        "border border-gray-200 dark:border-gray-800",
        "rounded-lg md:rounded-xl shadow-xl dark:shadow-2xl",
        "before:absolute before:inset-0",
        "before:bg-gradient-to-b before:from-white/50 before:to-transparent",
        "dark:before:from-gray-900/50 dark:before:to-transparent",
        "before:pointer-events-none",
        className
      )}
    >
      {children}
    </div>
  );
};