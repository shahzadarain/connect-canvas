import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import TextAlign from '@tiptap/extension-text-align';
import { debounce } from 'lodash';
import { EditorToolbar } from './EditorToolbar';
import { EditorActions } from './EditorActions';
import { BlogMetadata } from './BlogMetadata';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';

interface BlogEditorProps {
  initialContent?: string;
  postId?: number;
}

export const BlogEditor = ({ initialContent = '', postId }: BlogEditorProps) => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaKeywords, setMetaKeywords] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!!id);
  const [autoSaveStatus, setAutoSaveStatus] = useState('');
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('draft');
  const { toast } = useToast();
  const navigate = useNavigate();
  const lowlight = createLowlight(common);

  const handleImageUpload = async (file: File): Promise<string> => {
    console.log('Handling image upload:', file.name);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `lovable-uploads/${fileName}`;

      console.log('Uploading file to path:', filePath);
      const { error: uploadError } = await supabase.storage
        .from('resources')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('resources')
        .getPublicUrl(filePath);

      console.log('File uploaded successfully:', publicUrl);
      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error uploading image",
        description: "Please try again or contact support if the issue persists.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
        },
        allowBase64: true,
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
    if (!editor || !id) return;
    
    try {
      console.log('Auto-saving content...');
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
        .eq('id', parseInt(id));

      if (error) {
        console.error('Auto-save error:', error);
        throw error;
      }
      
      console.log('Auto-save successful');
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

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        console.log('Fetching post:', id);
        setLoading(true);
        const { data: post, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', parseInt(id))
          .single();

        if (error) {
          console.error('Error fetching post:', error);
          throw error;
        }

        if (post) {
          console.log('Post fetched successfully:', post);
          setTitle(post.title);
          setExcerpt(post.excerpt || '');
          setMetaDescription(post.meta_description || '');
          setMetaKeywords(post.meta_keywords || []);
          setFeaturedImage(post.featured_image);
          setStatus(post.status || 'draft');
          editor?.commands.setContent(post.content);
        }
      } catch (error) {
        console.error('Error in fetchPost:', error);
        toast({
          title: "Error",
          description: "Failed to load blog post",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, editor]);

  const handleSave = async (newStatus: 'draft' | 'published' = 'draft') => {
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
        status: newStatus,
        featured_image: featuredImage,
        author: 'Admin', // You might want to get this from the authenticated user
        published_at: newStatus === 'published' ? new Date().toISOString() : null,
      };

      const { error } = await supabase
        .from('blog_posts')
        .upsert({
          id: postId ? parseInt(String(postId)) : undefined,
          ...postData,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: `Blog post ${newStatus === 'published' ? 'published' : 'saved as draft'}`,
      });

      setStatus(newStatus);
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

  const handleDelete = async () => {
    if (!postId) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });

      navigate('/blog');
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
    }
  };

  if (!editor) {
    return null;
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4 space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Tabs defaultValue="write">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="metadata">Metadata</TabsTrigger>
            {id && status === 'published' && (
              <TabsTrigger value="preview" asChild>
                <a 
                  href={`/blog/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Preview
                </a>
              </TabsTrigger>
            )}
          </TabsList>
          
          <EditorActions
            postId={id ? parseInt(id) : undefined}
            status={status}
            saving={saving}
            onSave={handleSave}
            onDelete={handleDelete}
            autoSaveStatus={autoSaveStatus}
          />
        </div>

        <TabsContent value="write" className="space-y-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title..."
            className="text-3xl font-bold w-full bg-transparent border-none focus:outline-none"
          />
          
          <EditorToolbar editor={editor} onImageUpload={handleImageUpload} />
          
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