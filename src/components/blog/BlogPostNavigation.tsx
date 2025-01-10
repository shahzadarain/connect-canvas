import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const BlogPostNavigation = () => {
  return (
    <nav className="flex justify-between items-center py-8 border-t border-gray-200 dark:border-gray-700 mt-16">
      <Button variant="ghost" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Previous Post
      </Button>
      <Button variant="ghost" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
        Next Post
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </nav>
  );
};