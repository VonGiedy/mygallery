import { auth } from "@/utils/supabase/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function AboutPage() {
  // 1. Get the session from Better Auth
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 2. Fallback if someone manually types /about without logging in
  if (!session?.user) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-gray-500">Please log in to view this profile.</p>
        <Link href="/login" className="mt-4 text-blue-600 hover:underline">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            About {session.user.name.split(' ')[0]} {/* This shows "Von" or "Jedy" */}
          </h1>
          <p className="text-lg text-gray-500 mt-2">Personal Portfolio & Gallery</p>
        </header>

        <section className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            Hello! I am <strong>{session.user.name}</strong>, a second-year Computer Science 
            student at Ateneo de Davao University.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="p-4 bg-blue-50 rounded-2xl">
              <h3 className="font-semibold text-blue-900">Education</h3>
              <p className="text-sm text-blue-800">BS Computer Science @ AdDU</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl">
              <h3 className="font-semibold text-gray-900">Interests</h3>
              <p className="text-sm text-gray-600">Photography, Programming, Minecraft</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}