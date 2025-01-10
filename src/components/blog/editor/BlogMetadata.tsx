import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface BlogMetadataProps {
  title: string;
  setTitle: (title: string) => void;
  excerpt: string;
  setExcerpt: (excerpt: string) => void;
  metaDescription: string;
  setMetaDescription: (desc: string) => void;
  metaKeywords: string[];
  setMetaKeywords: (keywords: string[]) => void;
}

export const BlogMetadata = ({
  title,
  setTitle,
  excerpt,
  setExcerpt,
  metaDescription,
  setMetaDescription,
  metaKeywords,
  setMetaKeywords,
}: BlogMetadataProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title..."
          className="text-3xl font-bold"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Brief description of the post..."
          className="h-20"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="metaDescription">Meta Description (SEO)</Label>
        <Textarea
          id="metaDescription"
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          placeholder="SEO description..."
          className="h-20"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="metaKeywords">Meta Keywords (comma separated)</Label>
        <Input
          id="metaKeywords"
          value={metaKeywords.join(', ')}
          onChange={(e) => setMetaKeywords(e.target.value.split(',').map(k => k.trim()))}
          placeholder="keyword1, keyword2, keyword3..."
        />
      </div>
    </div>
  );
};