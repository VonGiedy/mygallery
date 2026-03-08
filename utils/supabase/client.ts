import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://eisnaljiulrvjnqiqlza.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpc25hbGppdWxydmpucWlxbHphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NzU5NDIsImV4cCI6MjA4ODU1MTk0Mn0.Oryvpk6OgfbBi7x_yoPr3aYpP405xyyEvYJYkunnOyw"
  )
}