import { createAuthClient } from "better-auth/react";

export const { signIn, signUp, useSession, signOut } = createAuthClient({
  baseURL: "https://mygallery-tan.vercel.app", // Your local development URL
});