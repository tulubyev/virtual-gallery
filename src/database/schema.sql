-- Database schema for Virtual Art Gallery

-- Users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user', -- 'admin', 'curator', 'staff', 'tour_guide', 'auction_participant'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    preferences JSONB
);

-- Galleries table
CREATE TABLE galleries (
    gallery_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255), -- Physical location of the gallery
    opening_hours TEXT, -- Opening hours in JSON format
    image_url TEXT, -- URL to the gallery's main image
    three_d_model_path TEXT,
    layout_algorithm VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rooms table (spaces within galleries)
CREATE TABLE rooms (
    room_id SERIAL PRIMARY KEY,
    gallery_id INTEGER, -- Will add foreign key constraint after galleries table is created
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
    gallery_id INTEGER, -- Will add foreign key constraint after galleries table is created
    room_id INTEGER, -- Will add foreign key constraint after rooms table is created
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tags table
CREATE TABLE tags (
    tag_id SERIAL PRIMARY KEY,
    tag_name VARCHAR(50) UNIQUE NOT NULL,
    tag_category VARCHAR(50) -- theme, style, color, subject, etc.
);

-- Collections table
CREATE TABLE collections (
    collection_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    curator_id INTEGER, -- Will add foreign key constraint after users table is created
    is_ai_generated BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Junction table for artworks and tags
CREATE TABLE artwork_tags (
    artwork_id INTEGER, -- Will add foreign key constraint after artworks table is created
    tag_id INTEGER, -- Will add foreign key constraint after tags table is created
    PRIMARY KEY (artwork_id, tag_id)
);

-- Junction table for collections and artworks
CREATE TABLE collection_artworks (
    collection_id INTEGER, -- Will add foreign key constraint after collections table is created
    artwork_id INTEGER, -- Will add foreign key constraint after artworks table is created
    display_order INTEGER,
    PRIMARY KEY (collection_id, artwork_id)
);

-- User interactions table
CREATE TABLE user_interactions (
    interaction_id SERIAL PRIMARY KEY,
    user_id INTEGER, -- Will add foreign key constraint after users table is created
    artwork_id INTEGER, -- Will add foreign key constraint after artworks table is created
    interaction_type VARCHAR(50), -- view, zoom, like, share
    duration INTEGER, -- in seconds
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Gallery routes table (for public displays)
CREATE TABLE gallery_routes (
    route_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    path_coordinates JSONB, -- Array of {x, y, z} coordinates
    duration_minutes INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI models table
CREATE TABLE ai_models (
    model_id SERIAL PRIMARY KEY,
    model_name VARCHAR(255) NOT NULL,
    version VARCHAR(20),
    training_data_date DATE,
    accuracy_metrics JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- IoT sensor data table
CREATE TABLE iot_sensor_data (
    sensor_data_id SERIAL PRIMARY KEY,
    sensor_id VARCHAR(100) NOT NULL, -- ID of the specific sensor
    sensor_type VARCHAR(50) NOT NULL, -- e.g., 'audio', 'motion', 'proximity', 'environment'
    gallery_id INTEGER, -- Will add foreign key constraint after galleries table is created
    room_id INTEGER, -- ID of the room where sensor is located
    data_payload JSONB, -- Sensor-specific data in JSON format
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Now add the foreign key constraints
ALTER TABLE rooms ADD CONSTRAINT fk_rooms_gallery FOREIGN KEY (gallery_id) REFERENCES galleries(gallery_id) ON DELETE CASCADE;
ALTER TABLE artworks ADD CONSTRAINT fk_artworks_gallery FOREIGN KEY (gallery_id) REFERENCES galleries(gallery_id);
ALTER TABLE artworks ADD CONSTRAINT fk_artworks_room FOREIGN KEY (room_id) REFERENCES rooms(room_id);
ALTER TABLE collections ADD CONSTRAINT fk_collections_user FOREIGN KEY (curator_id) REFERENCES users(user_id);
ALTER TABLE artwork_tags ADD CONSTRAINT fk_artwork_tags_artwork FOREIGN KEY (artwork_id) REFERENCES artworks(artwork_id) ON DELETE CASCADE;
ALTER TABLE artwork_tags ADD CONSTRAINT fk_artwork_tags_tag FOREIGN KEY (tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE;
ALTER TABLE collection_artworks ADD CONSTRAINT fk_collection_artworks_collection FOREIGN KEY (collection_id) REFERENCES collections(collection_id) ON DELETE CASCADE;
ALTER TABLE collection_artworks ADD CONSTRAINT fk_collection_artworks_artwork FOREIGN KEY (artwork_id) REFERENCES artworks(artwork_id) ON DELETE CASCADE;
ALTER TABLE user_interactions ADD CONSTRAINT fk_user_interactions_user FOREIGN KEY (user_id) REFERENCES users(user_id);
ALTER TABLE user_interactions ADD CONSTRAINT fk_user_interactions_artwork FOREIGN KEY (artwork_id) REFERENCES artworks(artwork_id);
ALTER TABLE iot_sensor_data ADD CONSTRAINT fk_iot_sensor_gallery FOREIGN KEY (gallery_id) REFERENCES galleries(gallery_id);

-- Indexes for performance
CREATE INDEX idx_artworks_tags ON artworks USING GIN(tags);
CREATE INDEX idx_artworks_style ON artworks(style);
CREATE INDEX idx_artworks_year ON artworks(year_created);
CREATE INDEX idx_user_interactions_user ON user_interactions(user_id);
CREATE INDEX idx_user_interactions_artwork ON user_interactions(artwork_id);
CREATE INDEX idx_artwork_tags_artwork ON artwork_tags(artwork_id);
CREATE INDEX idx_artwork_tags_tag ON artwork_tags(tag_id);
CREATE INDEX idx_iot_sensor_data_gallery ON iot_sensor_data(gallery_id);
CREATE INDEX idx_iot_sensor_data_recorded_at ON iot_sensor_data(recorded_at);
CREATE INDEX idx_iot_sensor_data_type ON iot_sensor_data(sensor_type);
CREATE INDEX idx_rooms_gallery ON rooms(gallery_id);