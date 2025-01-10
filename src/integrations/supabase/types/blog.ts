import { Json } from './common';

export interface BlogPost {
  Row: {
    id: number
    title: string
    slug: string
    content: string
    excerpt: string | null
    author: string
    published_at: string | null
    created_at: string | null
    updated_at: string | null
    status: string | null
    featured_image: string | null
    tags: string[] | null
    meta_description: string | null
    meta_keywords: string[] | null
    meta_title: string | null
    draft_content: string | null
    last_autosave_at: string | null
    theme: string | null
    font_settings: Json | null
    author_id: string | null
    category: string | null
    view_count: number | null
  }
  Insert: {
    id?: number
    title: string
    slug: string
    content: string
    excerpt?: string | null
    author: string
    published_at?: string | null
    created_at?: string | null
    updated_at?: string | null
    status?: string | null
    featured_image?: string | null
    tags?: string[] | null
    meta_description?: string | null
    meta_keywords?: string[] | null
    meta_title?: string | null
    draft_content?: string | null
    last_autosave_at?: string | null
    theme?: string | null
    font_settings?: Json | null
    author_id?: string | null
    category?: string | null
    view_count?: number | null
  }
  Update: {
    id?: number
    title?: string
    slug?: string
    content?: string
    excerpt?: string | null
    author?: string
    published_at?: string | null
    created_at?: string | null
    updated_at?: string | null
    status?: string | null
    featured_image?: string | null
    tags?: string[] | null
    meta_description?: string | null
    meta_keywords?: string[] | null
    meta_title?: string | null
    draft_content?: string | null
    last_autosave_at?: string | null
    theme?: string | null
    font_settings?: Json | null
    author_id?: string | null
    category?: string | null
    view_count?: number | null
  }
  Relationships: []
}

export type BlogPostInput = {
  title: string
  slug: string
  content: string
  excerpt?: string
  author: string
  status?: string
  featured_image?: string
  tags?: string[]
  meta_description?: string
  meta_keywords?: string[]
  meta_title?: string
  theme?: string
  font_settings?: Json
  category?: string
}