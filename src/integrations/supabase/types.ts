export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achievements: {
        Row: {
          About_Learning: string | null
          alt_text: string | null
          created_at: string | null
          date: string
          id: number
          image_url: string | null
          issuer: string
          link: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          About_Learning?: string | null
          alt_text?: string | null
          created_at?: string | null
          date: string
          id?: number
          image_url?: string | null
          issuer: string
          link?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          About_Learning?: string | null
          alt_text?: string | null
          created_at?: string | null
          date?: string
          id?: number
          image_url?: string | null
          issuer?: string
          link?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      ai_tools: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: number
          image_url: string | null
          name: string
          pricing_type: string | null
          tags: string[] | null
          updated_at: string | null
          url: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: never
          image_url?: string | null
          name: string
          pricing_type?: string | null
          tags?: string[] | null
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: never
          image_url?: string | null
          name?: string
          pricing_type?: string | null
          tags?: string[] | null
          updated_at?: string | null
          url?: string | null
        }
        Relationships: []
      }
      blog_posts: {
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
        Relationships: []
      }
      ideas: {
        Row: {
          approval_status: string | null
          created_at: string
          display_order: number | null
          email: string | null
          id: number
          idea: string | null
          name: string | null
        }
        Insert: {
          approval_status?: string | null
          created_at?: string
          display_order?: number | null
          email?: string | null
          id?: number
          idea?: string | null
          name?: string | null
        }
        Update: {
          approval_status?: string | null
          created_at?: string
          display_order?: number | null
          email?: string | null
          id?: number
          idea?: string | null
          name?: string | null
        }
        Relationships: []
      }
      learning_resources: {
        Row: {
          author: string | null
          category: string | null
          created_at: string | null
          description: string | null
          external_url: string | null
          featured: boolean | null
          id: number
          status: string | null
          tags: string[] | null
          title: string
          type: string
          updated_at: string | null
          views: number | null
        }
        Insert: {
          author?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          external_url?: string | null
          featured?: boolean | null
          id?: number
          status?: string | null
          tags?: string[] | null
          title: string
          type?: string
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          author?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          external_url?: string | null
          featured?: boolean | null
          id?: number
          status?: string | null
          tags?: string[] | null
          title?: string
          type?: string
          updated_at?: string | null
          views?: number | null
        }
        Relationships: []
      }
      news_articles: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: number
          published_at: string | null
          title: string
          url: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          published_at?: string | null
          title: string
          url?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          published_at?: string | null
          title?: string
          url?: string | null
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string | null
          email: string
          id: number
          status: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: never
          status?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: never
          status?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      project_sections: {
        Row: {
          category: string
          created_at: string | null
          display_order: number | null
          icon: string
          id: number
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          display_order?: number | null
          icon: string
          id?: number
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          display_order?: number | null
          icon?: string
          id?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: number
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: number
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: number
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_category"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "project_sections"
            referencedColumns: ["category"]
          },
        ]
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
