import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import TextAlign from '@tiptap/extension-text-align';
import { debounce } from 'lodash';
import { EditorToolbar } from './EditorToolbar';
import { BlogMetadata } from './BlogMetadata';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BlogPost } from '@/integrations/supabase/types/blog';

interface BlogEditorProps {
  initialContent?: string;
  postId?: number;
}

export const BlogEditor = ({ initialContent = '', postId }: BlogEditorProps) => {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaKeywords, setMetaKeywords] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState('');
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const { toast } = useToast();
  const lowlight = createLowlight(common);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
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
        class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none min-h-[500px]',
      },
    },
    onUpdate: ({ editor }) => {
      handleAutoSave(editor.getHTML());
    },
  });

  const handleAutoSave = debounce(async (content: string) => {
    if (!editor || !postId) return;
    
    try {
      setAutoSaveStatus('Saving...');
      const { error } = await supabase
        .from('blog_posts')
        .update({
          content,
          title,
          excerpt,
          meta_description: metaDescription,
          meta_keywords: metaKeywords,
          featured_image: featuredImage,
          updated_at: new Date().toISOString(),
        })
        .eq('id', postId);

      if (error) throw error;
      setAutoSaveStatus('Saved');
      
      setTimeout(() => setAutoSaveStatus(''), 2000);
    } catch (error) {
      console.error('Error auto-saving:', error);
      setAutoSaveStatus('Error saving');
      toast({
        title: "Error",
        description: "Failed to auto-save post",
        variant: "destructive",
      });
    }
  }, 2000);

  const handleFeaturedImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `lovable-uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('resources')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('resources')
        .getPublicUrl(filePath);

      setFeaturedImage(publicUrl);
      toast({
        title: "Success",
        description: "Featured image uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading featured image:', error);
      toast({
        title: "Error",
        description: "Failed to upload featured image",
        variant: "destructive",
      });
    }
  };

  const handleSave = async (status: 'draft' | 'published' = 'draft') => {
    if (!editor) return;
    
    setSaving(true);
    try {
      const content = editor.getHTML();
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      const postData = {
        title,
        content,
        slug,
        excerpt,
        meta_description: metaDescription,
        meta_keywords: metaKeywords,
        status,
        featured_image: featuredImage,
        author: 'Admin', // You might want to get this from the authenticated user
        published_at: status === 'published' ? new Date().toISOString() : null,
      };

      const { error } = await supabase
        .from('blog_posts')
        .upsert({
          id: postId,
          ...postData,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: `Blog post ${status === 'published' ? 'published' : 'saved as draft'}`,
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

  useEffect(() => {
    if (postId) {
      const fetchPost = async () => {
        const { data: post, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', postId)
          .single();

        if (error) {
          console.error('Error fetching post:', error);
          return;
        }

        if (post) {
          setTitle(post.title);
          setExcerpt(post.excerpt || '');
          setMetaDescription(post.meta_description || '');
          setMetaKeywords(post.meta_keywords || []);
          setFeaturedImage(post.featured_image);
          editor?.commands.setContent(post.content);
        }
      };

      fetchPost();
    }
  }, [postId, editor]);

  if (!editor) {
    return null;
  }

  const handleImageUpload = async (file: File): Promise<string> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `lovable-uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('resources')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('resources')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Tabs defaultValue="write">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="metadata">Metadata</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-4">
            {autoSaveStatus && (
              <span className="text-sm text-muted-foreground">{autoSaveStatus}</span>
            )}
            <Button 
              variant="outline"
              onClick={() => handleSave('draft')}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Draft'}
            </Button>
            <Button 
              onClick={() => handleSave('published')}
              disabled={saving}
            >
              {saving ? 'Publishing...' : 'Publish'}
            </Button>
          </div>
        </div>

        <TabsContent value="write" className="space-y-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title..."
            className="text-3xl font-bold w-full bg-transparent border-none focus:outline-none"
          />
          
          <div className="space-y-2">
            <label htmlFor="featured-image" className="block text-sm font-medium text-gray-700">
              Featured Image
            </label>
            <Input
              id="featured-image"
              type="file"
              accept="image/*"
              onChange={handleFeaturedImageUpload}
              className="w-full"
            />
            {featuredImage && (
              <img
                src={featuredImage}
                alt="Featured"
                className="mt-2 rounded-lg max-h-48 object-cover"
              />
            )}
          </div>
          
          <EditorToolbar editor={editor} />
          
          <div className="min-h-[500px] w-full border rounded-lg p-4">
            <EditorContent editor={editor} />
          </div>
        </TabsContent>

        <TabsContent value="metadata">
          <BlogMetadata
            title={title}
            setTitle={setTitle}
            excerpt={excerpt}
            setExcerpt={setExcerpt}
            metaDescription={metaDescription}
            setMetaDescription={setMetaDescription}
            metaKeywords={metaKeywords}
            setMetaKeywords={setMetaKeywords}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};