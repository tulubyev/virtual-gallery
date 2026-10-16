/**
 * Database initialization script for beget.com PostgreSQL
 * Initializes the AI/ML service database schema
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

async function initBegetDatabase() {
  // Debug: Show what DATABASE_URL we're using
  console.log('🔍 DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET');
  if (process.env.DATABASE_URL) {
    console.log('🔗 Connection string:', process.env.DATABASE_URL.replace(/:[^:]+@/, ':***@'));
  }

  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL environment variable is not set!');
    console.log('💡 Set it with: export DATABASE_URL="postgresql://tulubyev:CHANGE_ME@your-db-host:5432/aimlservice_db"');
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Add connection timeout and other options for beget.com
    connectionTimeoutMillis: 10000,
    query_timeout: 10000,
    statement_timeout: 60000
  });

  try {
    console.log('🔄 Connecting to beget.com PostgreSQL database...');

    // Test connection
    const client = await pool.connect();
    console.log('✅ Connected successfully!');

    // Test query
    const testResult = await client.query('SELECT version()');
    console.log('📊 PostgreSQL version:', testResult.rows[0].version.split(' ')[1]);

    // Execute basic schema setup first
    console.log('📄 Setting up basic schema...');

    // Try to enable pgvector extension (may not be available on shared hosting)
    let pgvectorAvailable = false;
    try {
      await client.query('CREATE EXTENSION IF NOT EXISTS vector;');
      console.log('✅ pgvector extension enabled');
      pgvectorAvailable = true;
    } catch (error) {
      console.warn('⚠️  pgvector extension not available:', error.message);
      console.log('📝 Creating schema without vector columns (will use Qdrant for vectors)');
    }

    // Create tables one by one
    const tables = [
      `CREATE TABLE ai_tasks (
          task_id SERIAL PRIMARY KEY,
          task_type VARCHAR(50) NOT NULL,
          status VARCHAR(20) NOT NULL DEFAULT 'pending',
          priority VARCHAR(10) DEFAULT 'normal',
          parameters JSONB,
          result JSONB,
          error_message TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          started_at TIMESTAMP,
          completed_at TIMESTAMP,
          estimated_duration INTEGER,
          artwork_id INTEGER,
          document_id VARCHAR(100),
          user_id INTEGER,
          processing_node VARCHAR(100),
          retry_count INTEGER DEFAULT 0,
          max_retries INTEGER DEFAULT 3
      )`,

      `CREATE TABLE webhooks (
          webhook_id SERIAL PRIMARY KEY,
          url VARCHAR(500) NOT NULL,
          events TEXT[],
          secret VARCHAR(255),
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          last_used_at TIMESTAMP
      )`,

      `CREATE TABLE artwork_analysis (
          analysis_id SERIAL PRIMARY KEY,
          artwork_id INTEGER NOT NULL,
          task_id INTEGER REFERENCES ai_tasks(task_id),
          style VARCHAR(100),
          style_confidence DECIMAL(3,2),
          dominant_colors VARCHAR(100)[],
          composition_elements VARCHAR(100)[],
          detected_objects JSONB,
          image_quality JSONB,
          estimated_period VARCHAR(100),
          cultural_context TEXT,
          technical_notes TEXT,
          analysis_version VARCHAR(20) DEFAULT '1.0',
          model_used VARCHAR(100),
          processing_time DECIMAL(5,2),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(artwork_id, analysis_version)
      )`,

      `CREATE TABLE pdf_documents (
          document_id VARCHAR(100) PRIMARY KEY,
          filename VARCHAR(255) NOT NULL,
          s3_url VARCHAR(500) NOT NULL,
          file_size INTEGER,
          title VARCHAR(500),
          author VARCHAR(255),
          subject VARCHAR(500),
          keywords TEXT[],
          language VARCHAR(10) DEFAULT 'ru',
          pages_count INTEGER,
          ocr_performed BOOLEAN DEFAULT false,
          ocr_confidence DECIMAL(3,2),
          topics TEXT[],
          entities JSONB,
          processing_status VARCHAR(20) DEFAULT 'pending',
          processing_started_at TIMESTAMP,
          processing_completed_at TIMESTAMP,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,

      `CREATE TABLE pdf_chunks (
          chunk_id SERIAL PRIMARY KEY,
          document_id VARCHAR(100) NOT NULL REFERENCES pdf_documents(document_id),
          content TEXT NOT NULL,
          chunk_index INTEGER NOT NULL,
          page_number INTEGER,
          word_count INTEGER,
          token_count INTEGER,
          ${pgvectorAvailable ? 'embedding vector(1536),' : 'embedding_vector TEXT,'}
          previous_chunk_id INTEGER,
          next_chunk_id INTEGER,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(document_id, chunk_index)
      )`,

      `CREATE TABLE embeddings (
          embedding_id SERIAL PRIMARY KEY,
          content_type VARCHAR(50) NOT NULL,
          content_id VARCHAR(100) NOT NULL,
          ${pgvectorAvailable ? 'embedding vector(1536),' : 'embedding_vector TEXT,'}
          embedding_model VARCHAR(100) DEFAULT 'text-embedding-ada-002',
          metadata JSONB,
          embedding_quality DECIMAL(3,2),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(content_type, content_id, embedding_model)
      )`,

      `CREATE TABLE rag_queries (
          query_id SERIAL PRIMARY KEY,
          user_id INTEGER,
          query_text TEXT NOT NULL,
          ${pgvectorAvailable ? 'query_embedding vector(1536),' : 'query_embedding_vector TEXT,'}
          response_text TEXT,
          response_sources JSONB,
          processing_time DECIMAL(5,2),
          tokens_used INTEGER,
          relevance_score DECIMAL(3,2),
          session_id VARCHAR(100),
          filters_used JSONB,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,

      `CREATE TABLE api_usage (
          usage_id SERIAL PRIMARY KEY,
          endpoint VARCHAR(200) NOT NULL,
          method VARCHAR(10) NOT NULL,
          user_id INTEGER,
          ip_address INET,
          request_size INTEGER,
          response_size INTEGER,
          processing_time DECIMAL(5,2),
          external_api_calls JSONB,
          estimated_cost DECIMAL(5,2),
          status_code INTEGER,
          error_message TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,

      `CREATE TABLE model_performance (
          performance_id SERIAL PRIMARY KEY,
          model_name VARCHAR(100) NOT NULL,
          model_version VARCHAR(20),
          task_type VARCHAR(50),
          accuracy DECIMAL(5,4),
          precision DECIMAL(5,4),
          recall DECIMAL(5,4),
          f1_score DECIMAL(5,4),
          total_requests INTEGER DEFAULT 0,
          successful_requests INTEGER DEFAULT 0,
          average_processing_time DECIMAL(5,2),
          period_start DATE NOT NULL,
          period_end DATE NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(model_name, model_version, task_type, period_start, period_end)
      )`
    ];

    console.log('📝 Creating tables...');
    for (let i = 0; i < tables.length; i++) {
      try {
        await client.query(tables[i]);
        console.log(`✅ Table ${i + 1}/${tables.length} created`);
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`⚠️  Table ${i + 1} already exists`);
        } else {
          console.warn(`❌ Table ${i + 1} creation failed:`, error.message);
        }
      }
    }

    // Create indexes
    console.log('📝 Creating indexes...');
    const indexes = [
      'CREATE INDEX IF NOT EXISTS idx_ai_tasks_status ON ai_tasks(status)',
      'CREATE INDEX IF NOT EXISTS idx_ai_tasks_type ON ai_tasks(task_type)',
      'CREATE INDEX IF NOT EXISTS idx_ai_tasks_created ON ai_tasks(created_at)',
      'CREATE INDEX IF NOT EXISTS idx_artwork_analysis_artwork ON artwork_analysis(artwork_id)',
      'CREATE INDEX IF NOT EXISTS idx_pdf_documents_status ON pdf_documents(processing_status)',
      'CREATE INDEX IF NOT EXISTS idx_pdf_chunks_document ON pdf_chunks(document_id)',
      'CREATE INDEX IF NOT EXISTS idx_embeddings_type_id ON embeddings(content_type, content_id)',
      'CREATE INDEX IF NOT EXISTS idx_rag_queries_user ON rag_queries(user_id)',
      'CREATE INDEX IF NOT EXISTS idx_api_usage_endpoint ON api_usage(endpoint)'
    ];

    // Add vector indexes only if pgvector is available
    if (pgvectorAvailable) {
      indexes.push(
        'CREATE INDEX IF NOT EXISTS idx_embeddings_vector ON embeddings USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100)',
        'CREATE INDEX IF NOT EXISTS idx_rag_queries_vector ON rag_queries USING ivfflat (query_embedding vector_cosine_ops) WITH (lists = 50)'
      );
    }

    for (const index of indexes) {
      try {
        await client.query(index);
      } catch (error) {
        console.warn('⚠️  Index creation failed:', error.message);
      }
    }

    // Insert initial data
    console.log('📝 Inserting initial data...');
    try {
      await client.query(`
        INSERT INTO webhooks (url, events, secret) VALUES
        ('https://main-app.gallery.com/webhooks/ai-results', ARRAY['task_completed', 'task_failed'], 'default_webhook_secret')
        ON CONFLICT DO NOTHING
      `);
      console.log('✅ Initial data inserted');
    } catch (error) {
      console.warn('⚠️  Initial data insertion failed:', error.message);
    }

    console.log('✅ AI/ML database schema initialized successfully!');

    // Verify tables were created
    const tablesResult = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name LIKE 'ai_%'
      ORDER BY table_name
    `);

    console.log('📋 Created AI/ML tables:');
    tablesResult.rows.forEach(row => {
      console.log(`  - ${row.table_name}`);
    });

    client.release();

  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
    console.log('🔌 Database connection closed');
  }
}

// Run if called directly
if (require.main === module) {
  initBegetDatabase();
}

module.exports = { initBegetDatabase };