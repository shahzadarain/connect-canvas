// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://mismxmgwmrknlxkaevde.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pc214bWd3bXJrbmx4a2FldmRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU2MDEwNjAsImV4cCI6MjA1MTE3NzA2MH0.pCE4LKH9v9Dqr0jJFNmstD-3diuD_dHHgdT-kVirhu0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);