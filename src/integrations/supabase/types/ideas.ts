import { Json } from './common';

export interface Idea {
  Row: {
    id: number
    created_at: string
    email: string | null
    idea: string | null
    name: string | null
    approval_status: string | null
    display_order: number | null
  }
  Insert: {
    id?: number
    created_at?: string
    email?: string | null
    idea?: string | null
    name?: string | null
    approval_status?: string | null
    display_order?: number | null
  }
  Update: {
    id?: number
    created_at?: string
    email?: string | null
    idea?: string | null
    name?: string | null
    approval_status?: string | null
    display_order?: number | null
  }
}