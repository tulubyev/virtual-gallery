require('dotenv').config();
const { Pool } = require('pg');

const dbConnectionString = process.env.DB_STRING || process.env.DATABASE_URL;
const dbHost = (dbConnectionString || '').replace(/^.*@/, '').replace(/\/.*$/, '');
console.log('Database connection:', dbConnectionString ? `Using DB_STRING (${dbHost})` : 'Using DATABASE_URL (Replit)');

const pool = new Pool({
  connectionString: dbConnectionString,
  ...(process.env.DB_STRING ? {} : { ssl: { rejectUnauthorized: false } }),
  // Resilience settings
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000,
  max: 10,
});

// Prevent idle client errors from crashing the server
pool.on('error', (err) => {
  console.error('[DB] Unexpected error on idle client:', err.message);
});

// Thin wrapper that retries once on connection failure
const originalQuery = pool.query.bind(pool);
pool.query = async function resilientQuery(...args) {
  try {
    return await originalQuery(...args);
  } catch (err) {
    if (err.code === 'ECONNRESET' || err.code === 'ECONNREFUSED' || err.code === '57P01') {
      console.warn('[DB] Connection lost, retrying query once…');
      return await originalQuery(...args);
    }
    throw err;
  }
};

module.exports = pool;
