'use server';

import { createClient } from '@supabase/supabase-js';
import { Pool } from 'pg';
import { headers } from 'next/headers';
import { auth } from '../../utils/supabase/auth';
import { revalidatePath } from 'next/cache';

// 1. Setup Supabase Client (for Storage)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 2. Setup PostgreSQL Pool with the "Magic SSL" Fix
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Supabase Connection Pooler
  },
});

export async function uploadPhoto(formData: FormData) {
  // 3. Verify the user is logged in
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    throw new Error("You must be logged in to upload photos.");
  }

  const file = formData.get('image') as File;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;

  if (!file || !title) {
    throw new Error("File and Title are required.");
  }

  // 4. Upload the file to Supabase Storage
  // Make sure your bucket is named 'photos' and is set to PUBLIC in Supabase
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('photos')
    .upload(fileName, file, {
      upsert: false,
    });

  if (uploadError) {
    console.error("Storage Error:", uploadError);
    throw new Error("Failed to upload image to storage.");
  }

  // 5. Get the public URL of the newly uploaded image
  const { data: publicUrlData } = supabase.storage
    .from('photos')
    .getPublicUrl(fileName);
  
  const imageUrl = publicUrlData.publicUrl;

  // 6. Save the data to PostgreSQL
  try {
   await pool.query(
  `INSERT INTO photos ("userId", image_url, title, description) VALUES ($1, $2, $3, $4)`,
  [session.user.id, imageUrl, title, description] // session.user.id is the secret sauce!
);
  } catch (dbError) {
    console.error("Database Error:", dbError);
    throw new Error("Failed to save photo info to database.");
  }

  // 7. THE CRITICAL STEP: Tell Next.js to refresh the homepage
  revalidatePath('/');
  
  return { success: true };
}