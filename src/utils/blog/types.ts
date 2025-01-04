import { BlogPost } from "@/integrations/supabase/types";

export type BlogPostInput = Omit<BlogPost['Insert'], 'id' | 'created_at' | 'updated_at'>;