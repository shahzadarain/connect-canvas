import { BlogPost } from './blog';
import { LearningResource } from './learning';
import { Idea } from './ideas';
import { NewsArticle } from './news';
import { NewsletterSubscriber } from './newsletter';
import { AITool } from './ai-tools';

export type Database = {
  public: {
    Tables: {
      blog_posts: BlogPost
      ideas: Idea
      learning_resources: LearningResource
      news_articles: NewsArticle
      newsletter_subscribers: NewsletterSubscriber
      ai_tools: AITool
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

export type { BlogPost } from './blog';
export type { LearningResource } from './learning';
export type { Idea } from './ideas';
export type { NewsArticle } from './news';
export type { NewsletterSubscriber } from './newsletter';
export type { AITool } from './ai-tools';