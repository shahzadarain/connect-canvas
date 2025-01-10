import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BlogContent } from '../BlogContent';
import { BlogHeader } from '../BlogHeader';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BlogPost } from '@/integrations/supabase/types/blog';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Partial<BlogPost['Row']>;
}

export const PreviewModal = ({ isOpen, onClose, post }: PreviewModalProps) => {
  if (!post.title || !post.content) return null;

  const previewPost: BlogPost['Row'] = {
    id: 0,
    title: post.title,
    content: post.content,
    slug: '',
    author: post.author || 'Preview Author',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: new Date().toISOString(),
    status: 'draft',
    featured_image: post.featured_image || null,
    tags: post.tags || [],
    excerpt: post.excerpt || '',
    meta_description: post.meta_description || '',
    meta_keywords: post.meta_keywords || [],
    meta_title: post.meta_title || '',
    theme: post.theme || 'light',
    font_settings: post.font_settings || {},
    draft_content: null,
    last_autosave_at: null,
    author_id: null
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl h-[90vh]">
        <DialogHeader>
          <DialogTitle>Preview Post</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full pr-4">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <BlogHeader post={previewPost} />
            <BlogContent 
              content={previewPost.content} 
              featuredImage={previewPost.featured_image}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};