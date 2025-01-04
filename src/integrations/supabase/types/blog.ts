import { Json } from './common';

export interface BlogPost {
  Row: {
    author: string
    content: string
    created_at: string | null
    excerpt: string | null
    featured_image: string | null
    id: number
    meta_description: string | null
    meta_keywords: string[] | null
    published_at: string | null
    slug: string
    status: string | null
    tags: string[] | null
    title: string
    updated_at: string | null
  }
  Insert: {
    author: string
    content: string
    created_at?: string | null
    excerpt?: string | null
    featured_image?: string | null
    id?: number
    meta_description?: string | null
    meta_keywords?: string[] | null
    published_at?: string | null
    slug: string
    status?: string | null
    tags?: string[] | null
    title: string
    updated_at?: string | null
  }
  Update: {
    author?: string
    content?: string
    created_at?: string | null
    excerpt?: string | null
    featured_image?: string | null
    id?: number
    meta_description?: string | null
    meta_keywords?: string[] | null
    published_at?: string | null
    slug?: string
    status?: string | null
    tags?: string[] | null
    title?: string
    updated_at?: string | null
  }
}