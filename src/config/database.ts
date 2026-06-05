import dotenv from 'dotenv';
import { Pool, QueryResult } from 'pg';

dotenv.config();

const dbConnectionString = process.env.DB_STRING || process.env.DATABASE_URL;
const dbHost = (dbConnectionString || '').replace(/^.*@/, '').replace(/\/.*$/, '');
console.log('Database connection:', dbConnectionString ? `Using DB_STRING (${dbHost})` : 'Using DATABASE_URL (Replit)');

const pool = new Pool({
  connectionString: dbConnectionString,
  ...(process.env.DB_STRING ? {} : { ssl: { rejectUnauthorized: false } }),
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000,
  max: 10,
});

pool.on('error', (err: Error) => {
  console.error('[DB] Unexpected error on idle client:', err.message);
});

const originalQuery = (pool.query as Function).bind(pool);
(pool as any).query = async function resilientQuery(...args: any[]): Promise<QueryResult> {
  try {
    return await originalQuery(...args);
  } catch (err: any) {
    if (err.code === 'ECONNRESET' || err.code === 'ECONNREFUSED' || err.code === '57P01') {
      console.warn('[DB] Connection lost, retrying query once…');
      return await originalQuery(...args);
    }
    throw err;
  }
};

export = pool;
