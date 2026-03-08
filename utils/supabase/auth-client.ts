import { createAuthClient } from "better-auth/react";

export const { signIn, signUp, useSession, signOut } = createAuthClient({
  // If we are in the browser, use the current domain (Vercel).
  // Otherwise, use localhost for local development.
  baseURL: typeof window !== "undefined" 
    ? window.location.origin 
    : "http://localhost:3000",
});