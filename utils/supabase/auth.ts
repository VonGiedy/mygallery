import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    // It uses the Vercel variable if it exists, otherwise it falls back to your hardcoded string
    connectionString: process.env.DATABASE_URL || "postgresql://postgres.eisnaljiulrvjnqiqlza:THISismyPASSWORD620@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres",
    ssl: {
      rejectUnauthorized: false, // Mandatory for Vercel
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  // CRITICAL: This must be the Vercel URL in production
  baseURL: process.env.BETTER_AUTH_URL || "https://mygallery-tan.vercel.app",
  secret: process.env.BETTER_AUTH_SECRET || "3GqNZ/AnMzezijUAAnrJiZms7sqEDiYE2SkTcBdXtI0=",
});