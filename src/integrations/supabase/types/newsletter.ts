import { Json } from './common';

export interface NewsletterSubscriber {
  Row: {
    id: number
    email: string
    created_at: string | null
    status: string | null
  }
  Insert: {
    id?: never
    email: string
    created_at?: string | null
    status?: string | null
  }
  Update: {
    id?: never
    email?: string
    created_at?: string | null
    status?: string | null
  }
}