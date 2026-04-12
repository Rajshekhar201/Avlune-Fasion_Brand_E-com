import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wzwewxxbahntbkxafrzv.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6d2V3eHhiYWhudGJreGFmcnp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4OTYzNjMsImV4cCI6MjA5MTQ3MjM2M30.LUjtdxLgdHH-jeNePrS2ESpqOTZlGjwjcqqtpzL8YVU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
