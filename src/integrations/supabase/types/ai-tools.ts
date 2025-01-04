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
  }
  Relationships: []
}