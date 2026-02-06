require('dotenv').config();
const { Pool } = require('pg');

const dbConnectionString = process.env.DB_STRING || process.env.DATABASE_URL;
console.log('Database connection:', process.env.DB_STRING ? 'Using DB_STRING (beget.com)' : 'Using DATABASE_URL (Replit)');

const pool = new Pool({
  connectionString: dbConnectionString,
  ...(process.env.DB_STRING ? {} : { ssl: { rejectUnauthorized: false } })
});

module.exports = pool;
