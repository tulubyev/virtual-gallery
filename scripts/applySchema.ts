import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://tulubyev:CrossBaikal6times!@quoquuquosijo.beget.app:5432/virtual_gallery_db'
});

async function applySchema() {
  try {
    console.log('🔄 Applying database schema...');

    // Read the schema file
    const schemaPath = path.join(__dirname, '../src/database/enhanced_schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');

    // Split the schema into individual statements
    const statements = schemaSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    console.log(`📄 Found ${statements.length} SQL statements to execute`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        try {
          console.log(`⚡ Executing statement ${i + 1}/${statements.length}...`);
          await pool.query(statement);
          console.log(`✅ Statement ${i + 1} executed successfully`);
        } catch (error: any) {
          // Ignore "already exists" errors for tables and indexes
          if (error.code === '42P07' || error.code === '42710') {
            console.log(`⚠️  Statement ${i + 1} skipped (already exists): ${error.message}`);
          } else {
            console.error(`❌ Error in statement ${i + 1}:`, error.message);
            throw error;
          }
        }
      }
    }

    console.log('🎉 Database schema applied successfully!');
    console.log('📊 New tables created: room_types, room_instances, room_analytics');

  } catch (error) {
    console.error('💥 Error applying schema:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run the schema application
applySchema().catch(console.error);import * as fs from 'fs';
import * as path from 'path';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://tulubyev:CrossBaikal6times!@quoquuquosijo.beget.app:5432/virtual_gallery_db'
});

async function applySchema() {
  try {
    console.log('🔄 Applying database schema...');

    // Read the schema file
    const schemaPath = path.join(__dirname, '../src/database/enhanced_schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');

    // Split the schema into individual statements
    const statements = schemaSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    console.log(`📄 Found ${statements.length} SQL statements to execute`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        try {
          console.log(`⚡ Executing statement ${i + 1}/${statements.length}...`);
          await pool.query(statement);
          console.log(`✅ Statement ${i + 1} executed successfully`);
        } catch (error: any) {
          // Ignore "already exists" errors for tables and indexes
          if (error.code === '42P07' || error.code === '42710') {
            console.log(`⚠️  Statement ${i + 1} skipped (already exists): ${error.message}`);
          } else {
            console.error(`❌ Error in statement ${i + 1}:`, error.message);
            throw error;
          }
        }
      }
    }

    console.log('🎉 Database schema applied successfully!');
    console.log('📊 New tables created: room_types, room_instances, room_analytics');

  } catch (error) {
    console.error('💥 Error applying schema:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run the schema application
applySchema().catch(console.error);
