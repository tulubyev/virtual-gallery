-- Migration: Create external_artworks table
-- Stores indexed artworks from external sources (MET, WikiArt, Rijksmuseum, Harvard, etc.)

CREATE TABLE IF NOT EXISTS external_artworks (
    id SERIAL PRIMARY KEY,
    external_id VARCHAR(255) NOT NULL,
    source VARCHAR(100) NOT NULL,
    title TEXT,
    artist VARCHAR(500),
    metadata JSONB,
    image_url TEXT,
    gallery_url TEXT,
    searchable_text TEXT,
    indexed_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(source, external_id)
);

CREATE INDEX IF NOT EXISTS idx_external_artworks_source ON external_artworks(source);
CREATE INDEX IF NOT EXISTS idx_external_artworks_artist ON external_artworks(artist);
CREATE INDEX IF NOT EXISTS idx_external_artworks_indexed_at ON external_artworks(indexed_at);
CREATE INDEX IF NOT EXISTS idx_external_artworks_metadata ON external_artworks USING GIN (metadata);

CREATE INDEX IF NOT EXISTS idx_external_artworks_searchable ON external_artworks USING GIN (to_tsvector('english', searchable_text));

COMMENT ON TABLE external_artworks IS 'Artworks indexed from external museum and art APIs';
COMMENT ON COLUMN external_artworks.source IS 'Source API: met, wikiart, rijksmuseum, harvard, etc.';
COMMENT ON COLUMN external_artworks.external_id IS 'Original ID from the source API';
COMMENT ON COLUMN external_artworks.metadata IS 'Normalized metadata: date, period, medium, culture, etc.';
COMMENT ON COLUMN external_artworks.searchable_text IS 'Combined text for full-text search';
