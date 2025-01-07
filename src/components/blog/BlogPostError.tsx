import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface BlogPostErrorProps {
  message?: string;
}

export const BlogPostError = ({ message = "The blog post you're looking for doesn't exist or has been removed." }: BlogPostErrorProps) => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </div>
  );
};