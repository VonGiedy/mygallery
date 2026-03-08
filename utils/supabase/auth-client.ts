import { createAuthClient } from "better-auth/react";


export const { signIn, signUp, useSession, signOut } = createAuthClient({
  // If the app is running on Vercel, it uses the current window URL.
  // Otherwise, it falls back to localhost for your development.
  baseURL: typeof window !== "undefined" 
    ? window.location.origin 
    : "http://localhost:3000",
});