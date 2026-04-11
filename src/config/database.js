require('dotenv').config();
const { Pool } = require('pg');

const dbConnectionString = process.env.DB_STRING || process.env.DATABASE_URL;
const dbHost = (dbConnectionString || '').replace(/^.*@/, '').replace(/\/.*$/, '');
console.log('Database connection:', dbConnectionString ? `Using DB_STRING (${dbHost})` : 'Using DATABASE_URL (Replit)');

const pool = new Pool({
  connectionString: dbConnectionString,
  ...(process.env.DB_STRING ? {} : { ssl: { rejectUnauthorized: false } })
});

module.exports = pool;
