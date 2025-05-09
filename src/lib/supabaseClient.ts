// Import the Supabase client creator
import { createClient } from '@supabase/supabase-js';

// Load Supabase project URL and anon key from environment variables
// These are injected via Vite's `import.meta.env` system
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a single Supabase client instance for the whole app
// This client handles authentication, database reads/writes, etc.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
