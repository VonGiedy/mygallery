import { createAuthClient } from "better-auth/react";

export const { signIn, signUp, useSession, signOut } = createAuthClient({
  // This uses the Vercel variable we just added, or defaults to local
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
});