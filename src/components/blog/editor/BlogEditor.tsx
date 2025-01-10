import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSession } from '@supabase/auth-helpers-react'
import { TipTapEditor } from './TipTapEditor'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/integrations/supabase/client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BlogPostMeta } from '../BlogPostMeta'
import { BlogContent } from '../BlogContent'

const BlogEditor = () => {
  const [searchParams] = useSearchParams()
  const postId = searchParams.get('id')
  const session = useSession()
  const navigate = useNavigate()
  const { toast } = useToast()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [saving, setSaving] = useState(false)
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout>()

  const loadPost = useCallback(async () => {
    if (!postId) return

    try {
      const { data: post, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', parseInt(postId, 10))
        .single()

      if (error) throw error

      setTitle(post.title || '')
      setContent(post.content || '')
      setMetaTitle(post.meta_title || '')
      setMetaDescription(post.meta_description || '')
    } catch (error) {
      console.error('Error loading post:', error)
      toast({
        title: "Error",
        description: "Failed to load blog post",
        variant: "destructive",
      })
    }
  }, [postId, toast])

  useEffect(() => {
    loadPost()
  }, [loadPost])

  const autoSave = useCallback(async () => {
    if (!postId || !title || !content) return

    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({
          title,
          content,
          meta_title: metaTitle,
          meta_description: metaDescription,
          last_autosave_at: new Date().toISOString(),
          font_settings: {},
        })
        .eq('id', parseInt(postId, 10))

      if (error) throw error

      console.log('Auto-saved successfully')
    } catch (error) {
      console.error('Error auto-saving:', error)
    }
  }, [postId, title, content, metaTitle, metaDescription])

  useEffect(() => {
    if (autoSaveTimer) clearTimeout(autoSaveTimer)
    const timer = setTimeout(autoSave, 3000)
    setAutoSaveTimer(timer)
    return () => clearTimeout(timer)
  }, [title, content, metaTitle, metaDescription, autoSave])

  const handleSave = async (status: 'draft' | 'published' = 'draft') => {
    if (!title || !content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setSaving(true)
    try {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      
      if (postId) {
        const { error } = await supabase
          .from('blog_posts')
          .update({
            title,
            content,
            meta_title: metaTitle,
            meta_description: metaDescription,
            status,
            updated_at: new Date().toISOString(),
            font_settings: {},
          })
          .eq('id', parseInt(postId, 10))

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert({
            title,
            content,
            slug,
            meta_title: metaTitle,
            meta_description: metaDescription,
            status,
            author: session?.user?.email || 'Anonymous',
            author_id: session?.user?.id,
            font_settings: {},
          })

        if (error) throw error
      }

      toast({
        title: "Success",
        description: `Blog post ${status === 'published' ? 'published' : 'saved as draft'}`,
      })

      navigate('/blog')
    } catch (error) {
      console.error('Error saving blog post:', error)
      toast({
        title: "Error",
        description: "Failed to save blog post",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <div className="space-y-6">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title..."
          className="text-3xl font-bold"
        />

        <Tabs defaultValue="editor">
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="min-h-[600px]">
            <TipTapEditor
              content={content}
              onChange={setContent}
            />
          </TabsContent>

          <TabsContent value="preview">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h1>{title}</h1>
              <BlogContent content={content} />
            </div>
          </TabsContent>

          <TabsContent value="seo" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Meta Title</label>
              <Input
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="SEO-friendly title..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Meta Description</label>
              <Input
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Brief description for search engines..."
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/blog')}
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSave('draft')}
            disabled={saving}
          >
            Save as Draft
          </Button>
          <Button
            onClick={() => handleSave('published')}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Publish'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BlogEditor