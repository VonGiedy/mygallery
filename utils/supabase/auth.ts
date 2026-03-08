import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    // Using the || option as suggested by your instructor
    connectionString: process.env.DATABASE_URL || "YOUR_ACTUAL_SUPABASE_CONNECTION_STRING_HERE",
    ssl: {
      rejectUnauthorized: false, // Mandatory for Vercel + Supabase
    },
  }),
  // Better Auth needs to know its own URL to prevent "Failed to fetch" redirects
  baseURL: process.env.BETTER_AUTH_URL || "https://mygallery-tan.vercel.app",
  emailAndPassword: {
    enabled: true,
  },
  // If your instructor mentioned a secret, add it here or in Vercel
  secret: process.env.BETTER_AUTH_SECRET || "A_LONG_RANDOM_STRING_AT_LEAST_32_CHARS",
});