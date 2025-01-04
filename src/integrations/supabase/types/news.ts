import { Json } from './common';

export interface NewsArticle {
  Row: {
    id: number
    title: string
    description: string | null
    url: string | null
    published_at: string | null
    category: string | null
    created_at: string | null
  }
  Insert: {
    id?: number
    title: string
    description?: string | null
    url?: string | null
    published_at?: string | null
    category?: string | null
    created_at?: string | null
  }
  Update: {
    id?: number
    title?: string
    description?: string | null
    url?: string | null
    published_at?: string | null
    category?: string | null
    created_at?: string | null
  }
}