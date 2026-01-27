-- AI/ML Service Database Schema
-- Extends the main gallery database with AI/ML specific tables

-- Enable pgvector extension for vector operations
CREATE EXTENSION IF NOT EXISTS vector;

-- ===========================================
-- AI/ML Tasks and Processing
-- ===========================================

-- Tasks table for tracking AI/ML processing jobs
CREATE TABLE ai_tasks (
    task_id SERIAL PRIMARY KEY,
    task_type VARCHAR(50) NOT NULL, -- 'image_analysis', 'pdf_processing', 'rag_query'
    status VARCHAR(20) NOT NULL DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
    priority VARCHAR(10) DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'

    -- Task parameters
    parameters JSONB,

    -- Results
    result JSONB,
    error_message TEXT,

    -- Timing
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    estimated_duration INTEGER, -- in seconds

    -- Relations
    artwork_id INTEGER REFERENCES artworks(artwork_id),
    document_id VARCHAR(100), -- for PDF documents
    user_id INTEGER REFERENCES users(user_id),

    -- Metadata
    processing_node VARCHAR(100), -- which service instance processed this
    retry_count INTEGER DEFAULT 0,
    max_retries INTEGER DEFAULT 3
);

-- Webhook configurations
CREATE TABLE webhooks (
    webhook_id SERIAL PRIMARY KEY,
    url VARCHAR(500) NOT NULL,
    events TEXT[], -- array of event types to listen for
    secret VARCHAR(255), -- for webhook signature verification
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_used_at TIMESTAMP
);

-- ===========================================
-- Image Analysis Results
-- ===========================================

-- Artwork analysis results
CREATE TABLE artwork_analysis (
    analysis_id SERIAL PRIMARY KEY,
    artwork_id INTEGER NOT NULL REFERENCES artworks(artwork_id),
    task_id INTEGER REFERENCES ai_tasks(task_id),

    -- Analysis results
    style VARCHAR(100),
    style_confidence DECIMAL(3,2),

    dominant_colors VARCHAR(100)[], -- array of hex colors
    composition_elements VARCHAR(100)[], -- array of composition techniques

    -- Object detection results
    detected_objects JSONB, -- array of detected objects with confidence and bounding boxes

    -- Image quality metrics
    image_quality JSONB, -- brightness, contrast, sharpness, resolution

    -- Additional metadata
    estimated_period VARCHAR(100),
    cultural_context TEXT,
    technical_notes TEXT,

    -- Processing metadata
    analysis_version VARCHAR(20) DEFAULT '1.0',
    model_used VARCHAR(100),
    processing_time DECIMAL(5,2), -- in seconds

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(artwork_id, analysis_version)
);

-- ===========================================
-- PDF Processing and Document Management
-- ===========================================

-- PDF documents table
CREATE TABLE pdf_documents (
    document_id VARCHAR(100) PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    s3_url VARCHAR(500) NOT NULL,
    file_size INTEGER, -- in bytes

    -- Document metadata
    title VARCHAR(500),
    author VARCHAR(255),
    subject VARCHAR(500),
    keywords TEXT[],
    language VARCHAR(10) DEFAULT 'ru',

    -- Processing metadata
    pages_count INTEGER,
    ocr_performed BOOLEAN DEFAULT false,
    ocr_confidence DECIMAL(3,2),

    -- Content analysis
    topics TEXT[],
    entities JSONB, -- named entities found in document

    -- Processing status
    processing_status VARCHAR(20) DEFAULT 'pending',
    processing_started_at TIMESTAMP,
    processing_completed_at TIMESTAMP,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PDF content chunks for RAG
CREATE TABLE pdf_chunks (
    chunk_id SERIAL PRIMARY KEY,
    document_id VARCHAR(100) NOT NULL REFERENCES pdf_documents(document_id),

    -- Content
    content TEXT NOT NULL,
    chunk_index INTEGER NOT NULL, -- order within document
    page_number INTEGER,

    -- Chunk metadata
    word_count INTEGER,
    token_count INTEGER,

    -- Embedding (will be populated by AI service)
    embedding vector(1536), -- OpenAI ada-002 dimension

    -- Context
    previous_chunk_id INTEGER REFERENCES pdf_chunks(chunk_id),
    next_chunk_id INTEGER REFERENCES pdf_chunks(chunk_id),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(document_id, chunk_index)
);

-- ===========================================
-- Vector Embeddings and RAG
-- ===========================================

-- General embeddings table (for artworks, text, etc.)
CREATE TABLE embeddings (
    embedding_id SERIAL PRIMARY KEY,

    -- What this embedding represents
    content_type VARCHAR(50) NOT NULL, -- 'artwork_image', 'pdf_chunk', 'artwork_description'
    content_id VARCHAR(100) NOT NULL, -- foreign key to the content

    -- Vector data
    embedding vector(1536), -- OpenAI ada-002 dimension
    embedding_model VARCHAR(100) DEFAULT 'text-embedding-ada-002',

    -- Metadata for filtering
    metadata JSONB, -- style, artist, period, language, etc.

    -- Quality metrics
    embedding_quality DECIMAL(3,2), -- confidence score

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(content_type, content_id, embedding_model)
);

-- RAG query history and analytics
CREATE TABLE rag_queries (
    query_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),

    -- Query data
    query_text TEXT NOT NULL,
    query_embedding vector(1536),

    -- Response data
    response_text TEXT,
    response_sources JSONB, -- array of source chunks with scores

    -- Performance metrics
    processing_time DECIMAL(5,2), -- in seconds
    tokens_used INTEGER,
    relevance_score DECIMAL(3,2), -- user feedback

    -- Context
    session_id VARCHAR(100),
    filters_used JSONB, -- applied filters

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================
-- Analytics and Monitoring
-- ===========================================

-- API usage statistics
CREATE TABLE api_usage (
    usage_id SERIAL PRIMARY KEY,
    endpoint VARCHAR(200) NOT NULL,
    method VARCHAR(10) NOT NULL,
    user_id INTEGER REFERENCES users(user_id),
    ip_address INET,

    -- Request/Response data
    request_size INTEGER, -- bytes
    response_size INTEGER, -- bytes
    processing_time DECIMAL(5,2), -- seconds

    -- External API costs
    external_api_calls JSONB, -- {openai: 2, google_vision: 1}
    estimated_cost DECIMAL(5,2), -- in USD

    status_code INTEGER,
    error_message TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Model performance tracking
CREATE TABLE model_performance (
    performance_id SERIAL PRIMARY KEY,
    model_name VARCHAR(100) NOT NULL,
    model_version VARCHAR(20),
    task_type VARCHAR(50), -- 'image_analysis', 'text_embedding', 'generation'

    -- Performance metrics
    accuracy DECIMAL(5,4),
    precision DECIMAL(5,4),
    recall DECIMAL(5,4),
    f1_score DECIMAL(5,4),

    -- Usage statistics
    total_requests INTEGER DEFAULT 0,
    successful_requests INTEGER DEFAULT 0,
    average_processing_time DECIMAL(5,2),

    -- Date range
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(model_name, model_version, task_type, period_start, period_end)
);

-- ===========================================
-- Indexes for Performance
-- ===========================================

-- AI Tasks
CREATE INDEX idx_ai_tasks_status ON ai_tasks(status);
CREATE INDEX idx_ai_tasks_type ON ai_tasks(task_type);
CREATE INDEX idx_ai_tasks_created ON ai_tasks(created_at);
CREATE INDEX idx_ai_tasks_artwork ON ai_tasks(artwork_id);

-- Artwork Analysis
CREATE INDEX idx_artwork_analysis_artwork ON artwork_analysis(artwork_id);
CREATE INDEX idx_artwork_analysis_style ON artwork_analysis(style);

-- PDF Documents
CREATE INDEX idx_pdf_documents_status ON pdf_documents(processing_status);
CREATE INDEX idx_pdf_documents_topics ON pdf_documents USING GIN(topics);

-- PDF Chunks
CREATE INDEX idx_pdf_chunks_document ON pdf_chunks(document_id);
CREATE INDEX idx_pdf_chunks_page ON pdf_chunks(page_number);

-- Embeddings (vector indexes)
CREATE INDEX idx_embeddings_type_id ON embeddings(content_type, content_id);
CREATE INDEX idx_embeddings_vector ON embeddings USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- RAG Queries
CREATE INDEX idx_rag_queries_user ON rag_queries(user_id);
CREATE INDEX idx_rag_queries_created ON rag_queries(created_at);
CREATE INDEX idx_rag_queries_vector ON rag_queries USING ivfflat (query_embedding vector_cosine_ops) WITH (lists = 50);

-- API Usage
CREATE INDEX idx_api_usage_endpoint ON api_usage(endpoint);
CREATE INDEX idx_api_usage_user ON api_usage(user_id);
CREATE INDEX idx_api_usage_created ON api_usage(created_at);

-- ===========================================
-- Constraints and Triggers
-- ===========================================

-- Ensure embedding dimensions are consistent
ALTER TABLE embeddings ADD CONSTRAINT check_embedding_dimension
    CHECK (vector_dims(embedding) = 1536);

-- Update timestamps trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_artwork_analysis_updated_at
    BEFORE UPDATE ON artwork_analysis
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pdf_documents_updated_at
    BEFORE UPDATE ON pdf_documents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_embeddings_updated_at
    BEFORE UPDATE ON embeddings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ===========================================
-- Initial Data
-- ===========================================

-- Insert default webhook for main application
INSERT INTO webhooks (url, events, secret) VALUES
('https://main-app.gallery.com/webhooks/ai-results', ARRAY['task_completed', 'task_failed'], 'default_webhook_secret');

-- Insert initial model performance baseline
INSERT INTO model_performance (model_name, model_version, task_type, period_start, period_end) VALUES
('text-embedding-ada-002', '2', 'text_embedding', CURRENT_DATE, CURRENT_DATE),
('gpt-4-vision-preview', 'preview', 'image_analysis', CURRENT_DATE, CURRENT_DATE),
('gpt-4', '0613', 'text_generation', CURRENT_DATE, CURRENT_DATE);