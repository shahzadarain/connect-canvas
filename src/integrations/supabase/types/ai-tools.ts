export interface AITool {
  Row: {
    id: number
    name: string
    description: string | null
    url: string | null
    category: string | null
    pricing_type: string | null
    image_url: string | null
    created_at: string | null
    updated_at: string | null
    tags: string[] | null
  }
  Insert: {
    id?: number
    name: string
    description?: string | null
    url?: string | null
    category?: string | null
    pricing_type?: string | null
    image_url?: string | null
    created_at?: string | null
    updated_at?: string | null
    tags?: string[] | null
  }
  Update: {
    id?: number
    name?: string
    description?: string | null
    url?: string | null
    category?: string | null
    pricing_type?: string | null
    image_url?: string | null
    created_at?: string | null
    updated_at?: string | null
    tags?: string[] | null
  }
  Relationships: []
}