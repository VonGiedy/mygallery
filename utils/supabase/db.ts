import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // This forces the secure connection Supabase requires:
  ssl: {
    rejectUnauthorized: false,
  },
});