-- Migration: Add categorization columns to pdf_documents
-- This migration adds columns for AI-extracted categories from PDF content

ALTER TABLE pdf_documents 
ADD COLUMN IF NOT EXISTS category VARCHAR(100),
ADD COLUMN IF NOT EXISTS styles JSONB,
ADD COLUMN IF NOT EXISTS artists JSONB,
ADD COLUMN IF NOT EXISTS techniques JSONB,
ADD COLUMN IF NOT EXISTS regions JSONB,
ADD COLUMN IF NOT EXISTS periods JSONB,
ADD COLUMN IF NOT EXISTS summary TEXT,
ADD COLUMN IF NOT EXISTS keywords JSONB;

-- Add index for category filtering
CREATE INDEX IF NOT EXISTS idx_pdf_documents_category ON pdf_documents(category);

-- Add GIN indexes for JSONB array searches
CREATE INDEX IF NOT EXISTS idx_pdf_documents_styles ON pdf_documents USING GIN (styles);
CREATE INDEX IF NOT EXISTS idx_pdf_documents_artists ON pdf_documents USING GIN (artists);
CREATE INDEX IF NOT EXISTS idx_pdf_documents_techniques ON pdf_documents USING GIN (techniques);
CREATE INDEX IF NOT EXISTS idx_pdf_documents_regions ON pdf_documents USING GIN (regions);

COMMENT ON COLUMN pdf_documents.category IS 'Document category: art_history, technique, artist_biography, museum_catalog, etc.';
COMMENT ON COLUMN pdf_documents.styles IS 'JSON array of art styles mentioned in document';
COMMENT ON COLUMN pdf_documents.artists IS 'JSON array of artist names mentioned in document';
COMMENT ON COLUMN pdf_documents.techniques IS 'JSON array of artistic techniques mentioned';
COMMENT ON COLUMN pdf_documents.regions IS 'JSON array of geographical regions/countries mentioned';
COMMENT ON COLUMN pdf_documents.periods IS 'JSON array of time periods mentioned';
COMMENT ON COLUMN pdf_documents.summary IS 'AI-generated summary of document content';
COMMENT ON COLUMN pdf_documents.keywords IS 'JSON array of key topic keywords';
