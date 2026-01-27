// database/init.ts
import DatabaseService from '../services/DatabaseService';
import * as fs from 'fs';
import * as path from 'path';

async function initializeDatabase(): Promise<void> {
  const resetPath = path.join(__dirname, 'reset.sql');
  const schemaPath = path.join(__dirname, '..', '..', 'src', 'database', 'schema.sql');

  const resetSQL = fs.readFileSync(resetPath, 'utf8');
  const schemaSQL = fs.readFileSync(schemaPath, 'utf8');

  const client = await DatabaseService.connect();

  try {
    // Begin a transaction
    await client.query('BEGIN');

    // Execute the reset SQL to drop existing tables
    await client.query(resetSQL);

    // Execute the schema SQL to create new tables
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