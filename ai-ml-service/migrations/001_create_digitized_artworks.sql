-- Migration: Create digitized_artworks table
-- Date: 2025-01-27

CREATE TABLE IF NOT EXISTS digitized_artworks (
    id SERIAL PRIMARY KEY,
    task_id VARCHAR(64) UNIQUE NOT NULL,
    
    -- Basic metadata
    title VARCHAR(500) NOT NULL DEFAULT 'Без названия',
    artist VARCHAR(255),
    style VARCHAR(100),
    period VARCHAR(100),
    technique VARCHAR(100),
    genre VARCHAR(100),
    
    -- Image URLs
    front_url TEXT NOT NULL,
    back_url TEXT,
    front_watermarked_url TEXT,
    back_watermarked_url TEXT,
    thumbnail_url TEXT,
    
    -- AI Analysis results
    ai_analysis JSONB DEFAULT '{}',
    provenance TEXT,
    
    -- Status workflow
    status VARCHAR(50) DEFAULT 'pending_review' CHECK (status IN (
        'pending_review',
        'approved', 
        'rejected',
        'needs_revision',
        'published'
    )),
    
    -- Curator workflow
    curator_id INTEGER,
    curator_notes TEXT,
    approved_at TIMESTAMP,
    rejected_at TIMESTAMP,
    rejection_reason TEXT,
    
    -- NFT/TAE metadata
    nft_metadata JSONB,
    verification_hash VARCHAR(64),
    nft_minted BOOLEAN DEFAULT FALSE,
    nft_token_id VARCHAR(100),
    nft_contract_address VARCHAR(100),
    
    -- Watermark tracking
    visible_watermark_applied BOOLEAN DEFAULT FALSE,
    invisible_watermark_applied BOOLEAN DEFAULT FALSE,
    
    -- Ownership and copyright
    owner_id INTEGER,
    copyright_holder VARCHAR(255),
    license_type VARCHAR(100) DEFAULT 'all-rights-reserved',
    
    -- Analytics
    view_count INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Indexes will be created below
    CONSTRAINT check_front_url_not_empty CHECK (front_url IS NOT NULL AND front_url <> '')
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_digitized_artworks_status ON digitized_artworks(status);
CREATE INDEX IF NOT EXISTS idx_digitized_artworks_task_id ON digitized_artworks(task_id);
CREATE INDEX IF NOT EXISTS idx_digitized_artworks_artist ON digitized_artworks(artist);
CREATE INDEX IF NOT EXISTS idx_digitized_artworks_style ON digitized_artworks(style);
CREATE INDEX IF NOT EXISTS idx_digitized_artworks_period ON digitized_artworks(period);
CREATE INDEX IF NOT EXISTS idx_digitized_artworks_created_at ON digitized_artworks(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_digitized_artworks_curator_id ON digitized_artworks(curator_id);
CREATE INDEX IF NOT EXISTS idx_digitized_artworks_owner_id ON digitized_artworks(owner_id);

-- GIN index for JSONB search
CREATE INDEX IF NOT EXISTS idx_digitized_artworks_ai_analysis ON digitized_artworks USING GIN (ai_analysis);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_digitized_artworks_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_digitized_artworks_updated_at ON digitized_artworks;
CREATE TRIGGER trigger_digitized_artworks_updated_at
    BEFORE UPDATE ON digitized_artworks
    FOR EACH ROW
    EXECUTE FUNCTION update_digitized_artworks_updated_at();

-- Add comments
COMMENT ON TABLE digitized_artworks IS 'Stores digitized artwork records with AI analysis and curator workflow';
COMMENT ON COLUMN digitized_artworks.task_id IS 'Unique task identifier from digitization process';
COMMENT ON COLUMN digitized_artworks.ai_analysis IS 'JSON containing front/back AI analysis results';
COMMENT ON COLUMN digitized_artworks.nft_metadata IS 'ERC-721 compatible NFT metadata JSON';
COMMENT ON COLUMN digitized_artworks.verification_hash IS 'Hash embedded in invisible watermark for verification';
