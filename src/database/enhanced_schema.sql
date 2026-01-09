-- Enhanced database schema for Virtual Art Gallery

-- Users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user', -- 'admin', 'curator', 'staff', 'tour_guide', 'auction_participant'
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    bio TEXT,
    avatar_url TEXT,
    preferences JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Galleries table
CREATE TABLE galleries (
    gallery_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    three_d_model_path TEXT,
    layout_algorithm VARCHAR(100),
    theme VARCHAR(100), -- e.g., 'contemporary', 'classical', 'impressionist'
    region VARCHAR(100), -- e.g., 'european', 'asian', 'american'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rooms table (spaces within galleries)
CREATE TABLE rooms (
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

-- Artworks table
CREATE TABLE artworks (
    artwork_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    artist_name VARCHAR(255) NOT NULL,
    year_created INTEGER,
    medium VARCHAR(100),
    dimensions VARCHAR(100),
    style VARCHAR(100),
    description TEXT,
    image_url TEXT,
    thumbnail_url TEXT,
    location_in_gallery JSONB, -- 3D coordinates {x, y, z, rotation}
    tags TEXT[],
    status VARCHAR(20) DEFAULT 'published', -- 'draft', 'published', 'archived'
    featured BOOLEAN DEFAULT FALSE,
    curator_id INTEGER REFERENCES users(user_id), -- Who curated this artwork
    gallery_id INTEGER REFERENCES galleries(gallery_id), -- Which gallery the artwork belongs to
    room_id INTEGER REFERENCES rooms(room_id), -- Which room the artwork is placed in
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tags table
CREATE TABLE tags (
    tag_id SERIAL PRIMARY KEY,
    tag_name VARCHAR(50) UNIQUE NOT NULL,
    tag_category VARCHAR(50), -- theme, style, color, subject, etc.
    description TEXT,
    parent_tag_id INTEGER REFERENCES tags(tag_id) -- For hierarchical tags
);

-- Junction table for artworks and tags
CREATE TABLE artwork_tags (
    artwork_id INTEGER REFERENCES artworks(artwork_id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(tag_id) ON DELETE CASCADE,
    assigned_by INTEGER REFERENCES users(user_id), -- Who assigned this tag
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (artwork_id, tag_id)
);

-- Collections table
CREATE TABLE collections (
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

-- Junction table for collections and artworks
CREATE TABLE collection_artworks (
    collection_id INTEGER REFERENCES collections(collection_id) ON DELETE CASCADE,
    artwork_id INTEGER REFERENCES artworks(artwork_id) ON DELETE CASCADE,
    display_order INTEGER,
    added_by INTEGER REFERENCES users(user_id), -- Who added this artwork to the collection
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (collection_id, artwork_id)
);

-- User interactions table
CREATE TABLE user_interactions (
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

-- Gallery routes table (for public displays and tours)
CREATE TABLE gallery_routes (
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

-- Junction table for routes and artworks
CREATE TABLE route_artworks (
    route_id INTEGER REFERENCES gallery_routes(route_id) ON DELETE CASCADE,
    artwork_id INTEGER REFERENCES artworks(artwork_id) ON DELETE CASCADE,
    sequence_number INTEGER, -- Order of artwork in the route
    PRIMARY KEY (route_id, artwork_id)
);

-- Exhibitions table
CREATE TABLE exhibitions (
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

-- Junction table for exhibitions and artworks
CREATE TABLE exhibition_artworks (
    exhibition_id INTEGER REFERENCES exhibitions(exhibition_id) ON DELETE CASCADE,
    artwork_id INTEGER REFERENCES artworks(artwork_id) ON DELETE CASCADE,
    display_position JSONB, -- Position information for this artwork in the exhibition
    PRIMARY KEY (exhibition_id, artwork_id)
);

-- Auctions table
CREATE TABLE auctions (
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

-- Auction lots table
CREATE TABLE auction_lots (
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

-- Bids table
CREATE TABLE bids (
    bid_id SERIAL PRIMARY KEY,
    lot_id INTEGER REFERENCES auction_lots(lot_id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(user_id),
    amount DECIMAL(10, 2) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_winning BOOLEAN DEFAULT FALSE
);

-- AI models table
CREATE TABLE ai_models (
    model_id SERIAL PRIMARY KEY,
    model_name VARCHAR(255) NOT NULL,
    version VARCHAR(20),
    training_data_date DATE,
    accuracy_metrics JSONB,
    model_path TEXT, -- Path to the saved model file
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Recommendations table (to store AI-generated recommendations)
CREATE TABLE recommendations (
    recommendation_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    artwork_id INTEGER REFERENCES artworks(artwork_id),
    model_id INTEGER REFERENCES ai_models(model_id), -- Which model generated this
    score DECIMAL(5, 4), -- Confidence score between 0 and 1
    reason TEXT, -- Why this recommendation was made
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- IoT sensor data table
CREATE TABLE iot_sensor_data (
    sensor_data_id SERIAL PRIMARY KEY,
    sensor_id VARCHAR(100) NOT NULL, -- ID of the specific sensor
    sensor_type VARCHAR(50) NOT NULL, -- e.g., 'audio', 'motion', 'proximity', 'environment'
    gallery_id INTEGER REFERENCES galleries(gallery_id),
    room_id INTEGER REFERENCES rooms(room_id), -- ID of the room where sensor is located
    artwork_id INTEGER REFERENCES artworks(artwork_id), -- If sensor is associated with specific artwork
    data_payload JSONB, -- Sensor-specific data in JSON format
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Artwork submissions table (for user-submitted artworks)
CREATE TABLE artwork_submissions (
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

-- Virtual tour sessions table
CREATE TABLE virtual_tour_sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    route_id INTEGER REFERENCES gallery_routes(route_id),
    host_user_id INTEGER REFERENCES users(user_id), -- Who is leading the tour
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    participant_count INTEGER DEFAULT 0,
    settings JSONB -- Session-specific settings
);

-- User session participation table
CREATE TABLE user_tour_participations (
    participation_id SERIAL PRIMARY KEY,
    session_id UUID REFERENCES virtual_tour_sessions(session_id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(user_id),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    left_at TIMESTAMP,
    is_host BOOLEAN DEFAULT FALSE
);

-- Indexes for performance
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_artworks_tags ON artworks USING GIN(tags);
CREATE INDEX idx_artworks_style ON artworks(style);
CREATE INDEX idx_artworks_year ON artworks(year_created);
CREATE INDEX idx_artworks_status ON artworks(status);
CREATE INDEX idx_artworks_gallery ON artworks(gallery_id);
CREATE INDEX idx_artworks_room ON artworks(room_id);
CREATE INDEX idx_artworks_curator ON artworks(curator_id);
CREATE INDEX idx_rooms_gallery ON rooms(gallery_id);
CREATE INDEX idx_rooms_theme ON rooms(theme);
CREATE INDEX idx_user_interactions_user ON user_interactions(user_id);
CREATE INDEX idx_user_interactions_artwork ON user_interactions(artwork_id);
CREATE INDEX idx_user_interactions_type ON user_interactions(interaction_type);
CREATE INDEX idx_user_interactions_timestamp ON user_interactions(timestamp);
CREATE INDEX idx_artwork_tags_artwork ON artwork_tags(artwork_id);
CREATE INDEX idx_artwork_tags_tag ON artwork_tags(tag_id);
CREATE INDEX idx_collections_curator ON collections(curator_id);
CREATE INDEX idx_collections_theme ON collections(theme);
CREATE INDEX idx_exhibitions_gallery ON exhibitions(gallery_id);
CREATE INDEX idx_exhibitions_dates ON exhibitions(start_date, end_date);
CREATE INDEX idx_auctions_gallery ON auctions(gallery_id);
CREATE INDEX idx_auctions_dates ON auctions(start_datetime, end_datetime);
CREATE INDEX idx_auction_lots_auction ON auction_lots(auction_id);
CREATE INDEX idx_auction_lots_artwork ON auction_lots(artwork_id);
CREATE INDEX idx_bids_lot ON bids(lot_id);
CREATE INDEX idx_bids_user ON bids(user_id);
CREATE INDEX idx_recommendations_user ON recommendations(user_id);
CREATE INDEX idx_recommendations_artwork ON recommendations(artwork_id);
CREATE INDEX idx_recommendations_model ON recommendations(model_id);
CREATE INDEX idx_iot_sensor_data_gallery ON iot_sensor_data(gallery_id);
CREATE INDEX idx_iot_sensor_data_room ON iot_sensor_data(room_id);
CREATE INDEX idx_iot_sensor_data_artwork ON iot_sensor_data(artwork_id);
CREATE INDEX idx_iot_sensor_data_type ON iot_sensor_data(sensor_type);
CREATE INDEX idx_iot_sensor_data_recorded_at ON iot_sensor_data(recorded_at);
CREATE INDEX idx_submissions_status ON artwork_submissions(status);
CREATE INDEX idx_submissions_submitter ON artwork_submissions(submitter_id);
CREATE INDEX idx_submissions_reviewer ON artwork_submissions(reviewer_id);