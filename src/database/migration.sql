-- Migration script to update database schema from old to enhanced version
-- This script adds new tables and columns, and establishes relationships

-- Add new columns to existing tables
ALTER TABLE users ADD COLUMN IF NOT EXISTS first_name VARCHAR(50);
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_name VARCHAR(50);
ALTER TABLE users ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url TEXT;

ALTER TABLE galleries ADD COLUMN IF NOT EXISTS theme VARCHAR(100);
ALTER TABLE galleries ADD COLUMN IF NOT EXISTS region VARCHAR(100);
ALTER TABLE galleries ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE artworks ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'published';
ALTER TABLE artworks ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT FALSE;
ALTER TABLE artworks ADD COLUMN IF NOT EXISTS curator_id INTEGER REFERENCES users(user_id);
ALTER TABLE artworks ADD COLUMN IF NOT EXISTS gallery_id INTEGER REFERENCES galleries(gallery_id);
ALTER TABLE artworks ADD COLUMN IF NOT EXISTS room_id INTEGER REFERENCES rooms(room_id);
ALTER TABLE artworks ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Create new tables
CREATE TABLE IF NOT EXISTS rooms (
    room_id SERIAL PRIMARY KEY,
    gallery_id INTEGER REFERENCES galleries(gallery_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    theme VARCHAR(100), -- 'impressionism', 'sculpture', 'renaissance', etc.
    region VARCHAR(100), -- 'european', 'asian', 'american', etc.
    author VARCHAR(255), -- Specific author if room is dedicated to one
    capacity INTEGER DEFAULT 50, -- Max number of visitors
    tags TEXT[],
    layout_settings JSONB, -- Room-specific layout settings
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tags (
    tag_id SERIAL PRIMARY KEY,
    tag_name VARCHAR(50) UNIQUE NOT NULL,
    tag_category VARCHAR(50), -- theme, style, color, subject, etc.
    description TEXT,
    parent_tag_id INTEGER REFERENCES tags(tag_id) -- For hierarchical tags
);

CREATE TABLE IF NOT EXISTS artwork_tags (
    artwork_id INTEGER REFERENCES artworks(artwork_id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(tag_id) ON DELETE CASCADE,
    assigned_by INTEGER REFERENCES users(user_id), -- Who assigned this tag
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (artwork_id, tag_id)
);

CREATE TABLE IF NOT EXISTS collections (
    collection_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    curator_id INTEGER REFERENCES users(user_id),
    is_ai_generated BOOLEAN DEFAULT FALSE,
    theme VARCHAR(100), -- e.g., 'impressionist landscapes', 'modern sculptures'
    is_public BOOLEAN DEFAULT FALSE, -- Whether the collection is publicly visible
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS collection_artworks (
    collection_id INTEGER REFERENCES collections(collection_id) ON DELETE CASCADE,
    artwork_id INTEGER REFERENCES artworks(artwork_id) ON DELETE CASCADE,
    display_order INTEGER,
    added_by INTEGER REFERENCES users(user_id), -- Who added this artwork to the collection
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (collection_id, artwork_id)
);

CREATE TABLE IF NOT EXISTS user_interactions (
    interaction_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    artwork_id INTEGER REFERENCES artworks(artwork_id),
    interaction_type VARCHAR(50), -- view, zoom, like, share, comment, rate
    duration INTEGER, -- in seconds
    rating INTEGER CHECK (rating >= 1 AND rating <= 5), -- Rating if applicable
    comment TEXT, -- Comment if applicable
    metadata JSONB, -- Additional interaction-specific data
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS gallery_routes (
    route_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    creator_id INTEGER REFERENCES users(user_id), -- Who created this route
    gallery_id INTEGER REFERENCES galleries(gallery_id), -- Which gallery this route is for
    path_coordinates JSONB, -- Array of {x, y, z} coordinates
    duration_minutes INTEGER,
    difficulty_level VARCHAR(20) DEFAULT 'easy', -- 'easy', 'moderate', 'challenging'
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS route_artworks (
    route_id INTEGER REFERENCES gallery_routes(route_id) ON DELETE CASCADE,
    artwork_id INTEGER REFERENCES artworks(artwork_id) ON DELETE CASCADE,
    sequence_number INTEGER, -- Order of artwork in the route
    PRIMARY KEY (route_id, artwork_id)
);

CREATE TABLE IF NOT EXISTS exhibitions (
    exhibition_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    curator_id INTEGER REFERENCES users(user_id),
    gallery_id INTEGER REFERENCES galleries(gallery_id),
    start_date DATE,
    end_date DATE,
    status VARCHAR(20) DEFAULT 'upcoming', -- 'upcoming', 'active', 'ended'
    is_virtual_tour_available BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS exhibition_artworks (
    exhibition_id INTEGER REFERENCES exhibitions(exhibition_id) ON DELETE CASCADE,
    artwork_id INTEGER REFERENCES artworks(artwork_id) ON DELETE CASCADE,
    display_position JSONB, -- Position information for this artwork in the exhibition
    PRIMARY KEY (exhibition_id, artwork_id)
);

CREATE TABLE IF NOT EXISTS auctions (
    auction_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    organizer_id INTEGER REFERENCES users(user_id), -- Who organized the auction
    gallery_id INTEGER REFERENCES galleries(gallery_id),
    start_datetime TIMESTAMP,
    end_datetime TIMESTAMP,
    status VARCHAR(20) DEFAULT 'scheduled', -- 'scheduled', 'active', 'ended'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS auction_lots (
    lot_id SERIAL PRIMARY KEY,
    auction_id INTEGER REFERENCES auctions(auction_id) ON DELETE CASCADE,
    artwork_id INTEGER REFERENCES artworks(artwork_id) ON DELETE CASCADE,
    starting_price DECIMAL(10, 2),
    reserve_price DECIMAL(10, 2),
    buy_now_price DECIMAL(10, 2),
    current_bid DECIMAL(10, 2) DEFAULT 0,
    highest_bidder_id INTEGER REFERENCES users(user_id), -- Current highest bidder
    status VARCHAR(20) DEFAULT 'available', -- 'available', 'sold', 'withdrawn'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bids (
    bid_id SERIAL PRIMARY KEY,
    lot_id INTEGER REFERENCES auction_lots(lot_id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(user_id),
    amount DECIMAL(10, 2) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_winning BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS ai_models (
    model_id SERIAL PRIMARY KEY,
    model_name VARCHAR(255) NOT NULL,
    version VARCHAR(20),
    training_data_date DATE,
    accuracy_metrics JSONB,
    model_path TEXT, -- Path to the saved model file
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS recommendations (
    recommendation_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    artwork_id INTEGER REFERENCES artworks(artwork_id),
    model_id INTEGER REFERENCES ai_models(model_id), -- Which model generated this
    score DECIMAL(5, 4), -- Confidence score between 0 and 1
    reason TEXT, -- Why this recommendation was made
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS iot_sensor_data (
    sensor_data_id SERIAL PRIMARY KEY,
    sensor_id VARCHAR(100) NOT NULL, -- ID of the specific sensor
    sensor_type VARCHAR(50) NOT NULL, -- e.g., 'audio', 'motion', 'proximity', 'environment'
    gallery_id INTEGER REFERENCES galleries(gallery_id),
    room_id INTEGER REFERENCES rooms(room_id), -- ID of the room where sensor is located
    artwork_id INTEGER REFERENCES artworks(artwork_id), -- If sensor is associated with specific artwork
    data_payload JSONB, -- Sensor-specific data in JSON format
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS artwork_submissions (
    submission_id SERIAL PRIMARY KEY,
    artwork_id INTEGER REFERENCES artworks(artwork_id) ON DELETE SET NULL, -- Assigned after approval
    submitter_id INTEGER REFERENCES users(user_id), -- Who submitted this artwork
    title VARCHAR(255) NOT NULL,
    artist_name VARCHAR(255) NOT NULL,
    year_created INTEGER,
    medium VARCHAR(100),
    dimensions VARCHAR(100),
    style VARCHAR(100),
    description TEXT,
    image_url TEXT,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'needs_revision'
    reviewer_id INTEGER REFERENCES users(user_id), -- Who reviewed this submission
    reviewer_notes TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS virtual_tour_sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    route_id INTEGER REFERENCES gallery_routes(route_id),
    host_user_id INTEGER REFERENCES users(user_id), -- Who is leading the tour
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    participant_count INTEGER DEFAULT 0,
    settings JSONB -- Session-specific settings
);

CREATE TABLE IF NOT EXISTS user_tour_participations (
    participation_id SERIAL PRIMARY KEY,
    session_id UUID REFERENCES virtual_tour_sessions(session_id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(user_id),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    left_at TIMESTAMP,
    is_host BOOLEAN DEFAULT FALSE
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_artworks_status ON artworks(status);
CREATE INDEX IF NOT EXISTS idx_artworks_gallery ON artworks(gallery_id);
CREATE INDEX IF NOT EXISTS idx_artworks_room ON artworks(room_id);
CREATE INDEX IF NOT EXISTS idx_artworks_curator ON artworks(curator_id);
CREATE INDEX IF NOT EXISTS idx_rooms_gallery ON rooms(gallery_id);
CREATE INDEX IF NOT EXISTS idx_rooms_theme ON rooms(theme);
CREATE INDEX IF NOT EXISTS idx_user_interactions_type ON user_interactions(interaction_type);
CREATE INDEX IF NOT EXISTS idx_user_interactions_timestamp ON user_interactions(timestamp);
CREATE INDEX IF NOT EXISTS idx_artwork_tags_artwork ON artwork_tags(artwork_id);
CREATE INDEX IF NOT EXISTS idx_artwork_tags_tag ON artwork_tags(tag_id);
CREATE INDEX IF NOT EXISTS idx_collections_curator ON collections(curator_id);
CREATE INDEX IF NOT EXISTS idx_collections_theme ON collections(theme);
CREATE INDEX IF NOT EXISTS idx_exhibitions_gallery ON exhibitions(gallery_id);
CREATE INDEX IF NOT EXISTS idx_exhibitions_dates ON exhibitions(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_auctions_gallery ON auctions(gallery_id);
CREATE INDEX IF NOT EXISTS idx_auctions_dates ON auctions(start_datetime, end_datetime);
CREATE INDEX IF NOT EXISTS idx_auction_lots_auction ON auction_lots(auction_id);
CREATE INDEX IF NOT EXISTS idx_auction_lots_artwork ON auction_lots(artwork_id);
CREATE INDEX IF NOT EXISTS idx_bids_lot ON bids(lot_id);
CREATE INDEX IF NOT EXISTS idx_bids_user ON bids(user_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_user ON recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_artwork ON recommendations(artwork_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_model ON recommendations(model_id);
CREATE INDEX IF NOT EXISTS idx_iot_sensor_data_room ON iot_sensor_data(room_id);
CREATE INDEX IF NOT EXISTS idx_iot_sensor_data_artwork ON iot_sensor_data(artwork_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON artwork_submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_submitter ON artwork_submissions(submitter_id);
CREATE INDEX IF NOT EXISTS idx_submissions_reviewer ON artwork_submissions(reviewer_id);

-- Insert default tags if they don't exist
INSERT INTO tags (tag_name, tag_category, description) 
SELECT 'landscape', 'subject', 'Artwork depicting natural scenery'
WHERE NOT EXISTS (SELECT 1 FROM tags WHERE tag_name = 'landscape');

INSERT INTO tags (tag_name, tag_category, description) 
SELECT 'portrait', 'subject', 'Artwork depicting a person or people'
WHERE NOT EXISTS (SELECT 1 FROM tags WHERE tag_name = 'portrait');

INSERT INTO tags (tag_name, tag_category, description) 
SELECT 'abstract', 'style', 'Artwork that does not attempt to represent external reality'
WHERE NOT EXISTS (SELECT 1 FROM tags WHERE tag_name = 'abstract');

INSERT INTO tags (tag_name, tag_category, description) 
SELECT 'impressionism', 'style', '19th-century art movement characterized by relatively small, thin, yet visible brush strokes'
WHERE NOT EXISTS (SELECT 1 FROM tags WHERE tag_name = 'impressionism');

INSERT INTO tags (tag_name, tag_category, description) 
SELECT 'cubism', 'style', 'Early-20th-century art movement pioneered by Picasso and Braque'
WHERE NOT EXISTS (SELECT 1 FROM tags WHERE tag_name = 'cubism');

-- Update any existing artworks to assign them to a default gallery if they don't have one
-- This assumes there's at least one gallery in the system
UPDATE artworks 
SET gallery_id = (SELECT gallery_id FROM galleries LIMIT 1)
WHERE gallery_id IS NULL AND (SELECT COUNT(*) FROM galleries) > 0;