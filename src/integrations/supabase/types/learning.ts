import { Json } from './common';

export interface LearningResource {
  Row: {
    id: number
    title: string
    category: string | null
    description: string | null
    external_url: string | null
    type: string
    author: string | null
    created_at: string | null
    updated_at: string | null
    status: string | null
    views: number | null
    featured: boolean | null
    tags: string[] | null
  }
  Insert: {
    id?: number
    title: string
    category?: string | null
    description?: string | null
    external_url?: string | null
    type?: string
    author?: string | null
    created_at?: string | null
    updated_at?: string | null
    status?: string | null
    views?: number | null
    featured?: boolean | null
    tags?: string[] | null
  }
  Update: {
    id?: number
    title?: string
    category?: string | null
    description?: string | null
    external_url?: string | null
    type?: string
    author?: string | null
    created_at?: string | null
    updated_at?: string | null
    status?: string | null
    views?: number | null
    featured?: boolean | null
    tags?: string[] | null
  }
}