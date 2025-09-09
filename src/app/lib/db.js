import { Pool } from "pg";
 
// Para producción (Vercel con Neon), necesitamos SSL.
// Para desarrollo, no es necesario.
const poolConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
};

const pool = new Pool(poolConfig);
 
export default pool;