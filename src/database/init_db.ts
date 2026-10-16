// Database initialization script for Virtual Art Gallery
// This script creates all required tables based on the schema

import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

// Create a connection pool
const pool = new Pool({
    connectionString: process.env.DB_STRING,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined // SSL только для внешних БД
});

// Read the schema SQL file
const schemaPath = path.join(__dirname, 'schema.sql');
const schemaSQL = fs.readFileSync(schemaPath, 'utf8');

async function initializeDatabase(): Promise<void> {
    const client = await pool.connect();

    try {
        // Begin a transaction
        await client.query('BEGIN');

        // Execute the schema SQL
        await client.query(schemaSQL);

        // Commit the transaction
        await client.query('COMMIT');

        console.log('Database initialized successfully!');
        console.log('All tables created according to the schema.');
    } catch (err: any) {
        // Rollback the transaction in case of error
        await client.query('ROLLBACK');
        console.error('Error initializing database:', err.message);
        throw err;
    } finally {
        client.release();
    }
}

// Run the initialization
initializeDatabase()
    .then(() => {
        console.log('Database initialization completed.');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Database initialization failed:', error);
        process.exit(1);
    });