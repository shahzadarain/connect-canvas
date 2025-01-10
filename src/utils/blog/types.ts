import type { BlogPost } from "@/integrations/supabase/types/blog";
import type { Json } from "@/integrations/supabase/types/common";

export type BlogPostInput = Omit<BlogPost['Insert'], 'id' | 'created_at' | 'updated_at'> & {
  font_settings?: Record<string, unknown>;
};