import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) console.warn("Supabase URL is missing!");
if (!supabaseKey) console.warn("Supabase Key is missing!");

export const supabase = createClient(
  supabaseUrl || "", 
  supabaseKey || ""
);