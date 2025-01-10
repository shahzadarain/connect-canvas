import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSession } from '@supabase/auth-helpers-react'
import { TipTapEditor } from './TipTapEditor'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/integrations/supabase/client'
import { Bell, MoreHorizontal, Image as ImageIcon } from 'lucide-react'

const BlogEditor = () => {
  const [searchParams] = useSearchParams()
  const postId = searchParams.get('id')
  const session = useSession()
  const navigate = useNavigate()
  const { toast } = useToast()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [saving, setSaving] = useState(false)
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout>()
  const [wordCount, setWordCount] = useState(0)
  const [readingTime, setReadingTime] = useState(0)

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
      setCoverImage(post.featured_image || '')
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

  const calculateReadingStats = useCallback(() => {
    const words = content.trim().split(/\s+/).length
    setWordCount(words)
    setReadingTime(Math.ceil(words / 200)) // Assuming 200 words per minute reading speed
  }, [content])

  useEffect(() => {
    calculateReadingStats()
  }, [content, calculateReadingStats])

  const autoSave = useCallback(async () => {
    if (!postId || !title || !content) return

    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({
          title,
          content,
          last_autosave_at: new Date().toISOString(),
          font_settings: {},
        })
        .eq('id', parseInt(postId, 10))

      if (error) throw error

      console.log('Auto-saved successfully')
    } catch (error) {
      console.error('Error auto-saving:', error)
    }
  }, [postId, title, content])

  useEffect(() => {
    if (autoSaveTimer) clearTimeout(autoSaveTimer)
    const timer = setTimeout(autoSave, 3000)
    setAutoSaveTimer(timer)
    return () => clearTimeout(timer)
  }, [title, content, autoSave])

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
            status,
            featured_image: coverImage,
            updated_at: new Date().toISOString(),
            font_settings: {},
          })
          .eq('id', parseInt(postId, 10))

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([{
            title,
            content,
            slug,
            status,
            featured_image: coverImage,
            author: session?.user?.email || 'Anonymous',
            author_id: session?.user?.id,
            font_settings: {},
          }])

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

  const handleCoverImageUpload = async (file: File): Promise<string> => {
    try {
      const fileExt = file.name.split('.').pop()
      const filePath = `${crypto.randomUUID()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath)

      setCoverImage(publicUrl)
      return publicUrl
    } catch (error) {
      console.error('Error uploading cover image:', error)
      toast({
        title: "Error",
        description: "Failed to upload cover image",
        variant: "destructive",
      })
      throw error
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/blog')}
            >
              ✕
            </Button>
            <span className="text-sm text-muted-foreground">
              Draft in {session?.user?.email}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">
              {wordCount} words · {readingTime} min read
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
            >
              <Bell className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSave('draft')}
              disabled={saving}
            >
              Save draft
            </Button>
            <Button
              size="sm"
              onClick={() => handleSave('published')}
              disabled={saving}
              className="bg-green-600 hover:bg-green-700"
            >
              Publish
            </Button>
          </div>
        </div>
      </header>

      {/* Editor */}
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Cover Image Upload */}
        {!coverImage && (
          <div className="mb-8">
            <Button
              variant="outline"
              onClick={() => document.getElementById('cover-image-upload')?.click()}
              className="w-full h-40 border-dashed"
            >
              <div className="flex flex-col items-center gap-2">
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                <span className="text-muted-foreground">Add cover image</span>
              </div>
            </Button>
            <input
              id="cover-image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleCoverImageUpload(e.target.files[0])}
            />
          </div>
        )}
        
        {coverImage && (
          <div className="relative mb-8 group">
            <img
              src={coverImage}
              alt="Cover"
              className="w-full h-[60vh] object-cover rounded-lg"
            />
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCoverImage('')}
              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Remove cover
            </Button>
          </div>
        )}

        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="text-4xl font-bold border-none px-0 mb-8 focus-visible:ring-0"
        />
        <TipTapEditor
          content={content}
          onChange={setContent}
          onImageUpload={handleCoverImageUpload}
        />
      </div>
    </div>
  )
}

export default BlogEditor
