import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bzcjzakkcvkjsmdebajv.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6Y2p6YWtrY3ZranNtZGViYWp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcyMjA4NzksImV4cCI6MjAyMjc5Njg3OX0.46UKwpGX9arfrsrj0WhFlF_xdqjBmzM2vrJsClYZc2g";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;