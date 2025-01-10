import type { BlogPost } from "@/integrations/supabase/types/blog";
import type { Json } from '@supabase/supabase-js';

export type BlogPostInput = Omit<BlogPost['Insert'], 'id' | 'created_at' | 'updated_at'> & {
  font_settings?: Json;
};