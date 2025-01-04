import type { BlogPost } from "@/integrations/supabase/types/blog";

export type BlogPostInput = Omit<BlogPost['Insert'], 'id' | 'created_at' | 'updated_at'>;