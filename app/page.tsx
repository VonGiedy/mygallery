import PhotoCard from '../components/PhotoCard';
import { pool } from '../utils/supabase/db';
import { auth } from '../utils/supabase/auth'; // Added this
import { headers } from 'next/headers'; // Added this

export const dynamic = 'force-dynamic';

export default async function Home() {
  // 1. Get the session so we have the user's ID
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 2. Fetch photos ONLY for this specific user
  // If not logged in, we'll just show an empty state (or you can redirect)
  let photos = [];
  
  if (session?.user) {
    const { rows } = await pool.query(
      'SELECT * FROM photos WHERE "userId" = $1 ORDER BY "createdAt" DESC',
      [session.user.id]
    );
    photos = rows;
  }

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl font-medium tracking-tight text-gray-900">
          {session?.user ? `${session.user.name.split(' ')[0]}'s Favorites` : 'Favorites'}
        </h1>
      </header>

      {photos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-gray-500 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-lg font-medium text-gray-900">
            {session?.user ? "Your gallery is empty." : "Log in to see your photos."}
          </p>
          {!session?.user && (
            <p className="text-sm mt-1 text-blue-600">Please sign in to start uploading.</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <PhotoCard key={photo.id} photo={photo} />
          ))}
        </div>
      )}
    </div>
  );
}