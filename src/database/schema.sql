-- Database schema for Virtual Art Gallery

-- Users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    preferences JSONB
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tags table
CREATE TABLE tags (
    tag_id SERIAL PRIMARY KEY,
    tag_name VARCHAR(50) UNIQUE NOT NULL,
    tag_category VARCHAR(50) -- theme, style, color, subject, etc.
);

-- Junction table for artworks and tags
CREATE TABLE artwork_tags (
    artwork_id INTEGER REFERENCES artworks(artwork_id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(tag_id) ON DELETE CASCADE,
    PRIMARY KEY (artwork_id, tag_id)
);

-- Galleries table
CREATE TABLE galleries (
    gallery_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    three_d_model_path TEXT,
    layout_algorithm VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Collections table
CREATE TABLE collections (
    collection_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    curator_id INTEGER REFERENCES users(user_id),
    is_ai_generated BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Junction table for collections and artworks
CREATE TABLE collection_artworks (
    collection_id INTEGER REFERENCES collections(collection_id) ON DELETE CASCADE,
    artwork_id INTEGER REFERENCES artworks(artwork_id) ON DELETE CASCADE,
    display_order INTEGER,
    PRIMARY KEY (collection_id, artwork_id)
);

-- User interactions table
CREATE TABLE user_interactions (
    interaction_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    artwork_id INTEGER REFERENCES artworks(artwork_id),
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
    gallery_id INTEGER REFERENCES galleries(gallery_id),
    room_id INTEGER, -- ID of the room where sensor is located
    data_payload JSONB, -- Sensor-specific data in JSON format
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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