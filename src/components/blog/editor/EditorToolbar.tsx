import { type Editor } from '@tiptap/react'
import {
  Image as ImageIcon,
  Code,
  Quote,
  ListOrdered,
  List,
  Link,
  MoreHorizontal,
} from 'lucide-react'
import { Toggle } from '@/components/ui/toggle'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

interface EditorToolbarProps {
  editor: Editor
  onImageUpload?: (file: File) => void
}

export const EditorToolbar = ({ editor, onImageUpload }: EditorToolbarProps) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0] && onImageUpload) {
      onImageUpload(e.target.files[0])
    }
  }

  return (
    <div className="flex items-center gap-1 border border-border rounded-full px-2 py-1 mb-4">
      <div className="relative">
        <Button
          size="sm"
          variant="ghost"
          className="rounded-full"
          onClick={() => document.getElementById('image-upload')?.click()}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <input
          id="image-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>

      <Separator orientation="vertical" className="h-4" />

      <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 1 })}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className="rounded-full"
      >
        H1
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 2 })}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className="rounded-full"
      >
        H2
      </Toggle>

      <Separator orientation="vertical" className="h-4" />

      <Toggle
        size="sm"
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        className="rounded-full"
      >
        <List className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        className="rounded-full"
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="h-4" />

      <Toggle
        size="sm"
        pressed={editor.isActive('blockquote')}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        className="rounded-full"
      >
        <Quote className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive('code')}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
        className="rounded-full"
      >
        <Code className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive('link')}
        onPressedChange={() => {
          const url = window.prompt('Enter URL')
          if (url) {
            editor.chain().focus().setLink({ href: url }).run()
          }
        }}
        className="rounded-full"
      >
        <Link className="h-4 w-4" />
      </Toggle>

      <Button
        size="sm"
        variant="ghost"
        className="rounded-full ml-auto"
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </div>
  )
}