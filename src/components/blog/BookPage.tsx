import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

interface BookPageProps {
  children: React.ReactNode;
  className?: string;
}

export const BookPage = ({ children, className }: BookPageProps) => {
  const { theme } = useTheme();
  
  return (
    <div 
      className={cn(
        "relative max-w-[65ch] mx-auto px-8 md:px-12 py-10",
        "transition-colors duration-300 ease-in-out",
        // Light theme styles
        theme === 'light' && "bg-[#F8F5F0] text-gray-800",
        // Dark theme styles
        theme === 'dark' && "bg-gray-900 text-gray-100",
        // Common styles
        "border border-gray-200 dark:border-gray-800",
        "rounded-lg md:rounded-xl shadow-xl",
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