import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'
import TextAlign from '@tiptap/extension-text-align'
import { EditorToolbar } from './EditorToolbar'
import { useToast } from '@/hooks/use-toast'
import { useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'

interface TipTapEditorProps {
  content: string
  onChange: (content: string) => void
  onImageUpload?: (url: string) => void
}

export const TipTapEditor = ({ content, onChange, onImageUpload }: TipTapEditorProps) => {
  const { toast } = useToast()
  const lowlight = createLowlight(common)

  const uploadImage = useCallback(async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop()
      const filePath = `${crypto.randomUUID()}.${fileExt}`

      const { error: uploadError, data } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath)

      return publicUrl
    } catch (error) {
      console.error('Error uploading image:', error)
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      })
      return null
    }
  }, [toast])

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) return null

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <EditorToolbar 
        editor={editor} 
        onImageUpload={async (file) => {
          const url = await uploadImage(file)
          if (url && onImageUpload) {
            onImageUpload(url)
            editor.chain().focus().setImage({ src: url }).run()
          }
        }} 
      />
      <EditorContent editor={editor} />
    </div>
  )
}