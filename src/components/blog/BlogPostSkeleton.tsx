import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const BlogPostSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Skeleton className="h-12 w-3/4 mb-4" />
      <Skeleton className="h-6 w-1/2 mb-8" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
};