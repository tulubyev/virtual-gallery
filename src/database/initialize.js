// Direct database initialization script
// Run with: npm run init-db

const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

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
const schemaPath = path.join(__dirname, 'src', 'database', 'schema.sql');
const schemaSQL = fs.readFileSync(schemaPath, 'utf8');

async function initializeDatabase() {
    const client = await pool.connect();
    
    try {
        console.log('Starting database initialization...');
        
        // Begin a transaction
        await client.query('BEGIN');
        
        // Execute the schema SQL
        await client.query(schemaSQL);
        
        // Commit the transaction
        await client.query('COMMIT');
        
        console.log('Database initialized successfully!');
        console.log('All tables created according to the schema.');
    } catch (err) {
        // Rollback the transaction in case of error
        await client.query('ROLLBACK');
        console.error('Error initializing database:', err.message);
        throw err;
    } finally {
        client.release();
        await pool.end(); // Close the connection pool
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