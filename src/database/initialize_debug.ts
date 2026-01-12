// Direct database initialization script with file logging
// Run with: node src/database/initialize_debug.js

import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

// Read database configuration from environment variables
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'virtual_gallery_db',
    user: process.env.DB_USER || 'tulubyev',
    password: process.env.DB_PASSWORD || 'CrossBaikal6times!',
    ssl: {
        rejectUnauthorized: false // Required for many hosted PostgreSQL services
    }
};

// Create a connection pool
const pool = new Pool(dbConfig);

// Read the schema SQL file
const schemaPath = path.join(__dirname, 'schema.sql');
const schemaSQL = fs.readFileSync(schemaPath, 'utf8');

async function initializeDatabase(): Promise<void> {
    let client;
    try {
        console.log('Starting database initialization...');
        fs.appendFileSync('db_init_log.txt', 'Starting database initialization...\n');

        client = await pool.connect();
        console.log('Connected to database');
        fs.appendFileSync('db_init_log.txt', 'Connected to database\n');

        // Begin a transaction
        await client.query('BEGIN');
        console.log('Transaction started');
        fs.appendFileSync('db_init_log.txt', 'Transaction started\n');

        // Execute the schema SQL
        await client.query(schemaSQL);
        console.log('Schema executed');
        fs.appendFileSync('db_init_log.txt', 'Schema executed\n');

        // Commit the transaction
        await client.query('COMMIT');
        console.log('Transaction committed');
        fs.appendFileSync('db_init_log.txt', 'Transaction committed\n');

        console.log('Database initialized successfully!');
        console.log('All tables created according to the schema.');
        fs.appendFileSync('db_init_log.txt', 'Database initialized successfully!\n');
    } catch (err: any) {
        console.error('Error initializing database:', err.message);
        fs.appendFileSync('db_init_log.txt', `Error initializing database: ${err.message}\n`);

        // Rollback the transaction in case of error
        if (client) {
            try {
                await client.query('ROLLBACK');
                console.log('Transaction rolled back');
                fs.appendFileSync('db_init_log.txt', 'Transaction rolled back\n');
            } catch (rollbackErr: any) {
                console.error('Error during rollback:', rollbackErr.message);
                fs.appendFileSync('db_init_log.txt', `Error during rollback: ${rollbackErr.message}\n`);
            }
        }
        throw err;
    } finally {
        if (client) {
            client.release();
        }
        await pool.end(); // Close the connection pool
        console.log('Connection pool closed');
        fs.appendFileSync('db_init_log.txt', 'Connection pool closed\n');
    }
}

// Run the initialization
initializeDatabase()
    .then(() => {
        console.log('Database initialization completed.');
        fs.appendFileSync('db_init_log.txt', 'Database initialization completed.\n');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Database initialization failed:', error);
        fs.appendFileSync('db_init_log.txt', `Database initialization failed: ${error}\n`);
        process.exit(1);
    });