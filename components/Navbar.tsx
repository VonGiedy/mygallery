'use client';

import Link from 'next/link';
import { useSession, signOut } from '../utils/supabase/auth-client';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  // This hook grabs the current logged-in user
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-semibold tracking-tight text-blue-600">
            Gallery
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </Link>

            {/* If logged in, show About Me, Upload, and Logout. */}
            {session?.user ? (
              <>
                {/* MOVED: About Me now only shows for logged-in users */}
                <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                  About Me
                </Link>

                <div className="w-px h-4 bg-gray-300"></div> {/* Vertical divider line */}
                
                <Link href="/upload" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                  + Add Photo
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
                >
                  Log Out
                </button>
              </>
            ) : (
              /* If not logged in, only show the divider and Log In */
              <>
                <div className="w-px h-4 bg-gray-300"></div>
                <Link href="/login" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}