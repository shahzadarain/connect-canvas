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
}