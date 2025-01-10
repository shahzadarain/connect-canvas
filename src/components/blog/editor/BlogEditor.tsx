import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight'
import TextAlign from '@tiptap/extension-text-align'
import { EditorToolbar } from './EditorToolbar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface BlogEditorProps {
  initialContent?: string;
  postId?: number;
}

export const BlogEditor = ({ initialContent = '', postId }: BlogEditorProps) => {
  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const lowlight = createLowlight(common)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
      },
    },
  });

  const handleSave = async () => {
    if (!editor) return;
    
    setSaving(true);
    try {
      const content = editor.getHTML();
      const { error } = await supabase
        .from('blog_posts')
        .upsert({
          id: postId,
          title,
          content,
          slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          status: 'draft',
          author: 'Admin', // You might want to get this from the authenticated user
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post saved successfully",
      });
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast({
        title: "Error",
        description: "Failed to save blog post",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title..."
          className="text-3xl font-bold w-full bg-transparent border-none focus:outline-none"
        />
        <Button 
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Draft'}
        </Button>
      </div>
      
      <EditorToolbar editor={editor} />
      
      <div className="min-h-[500px] w-full border rounded-lg p-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};