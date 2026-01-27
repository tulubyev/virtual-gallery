-- Reset script for Virtual Gallery database
-- Drop all tables in the correct order to respect foreign key constraints

-- Drop tables with foreign key references first
DROP TABLE IF EXISTS user_interactions CASCADE;
DROP TABLE IF EXISTS collection_artworks CASCADE;
DROP TABLE IF EXISTS artwork_tags CASCADE;
DROP TABLE IF EXISTS iot_sensor_data CASCADE;
DROP TABLE IF EXISTS artworks CASCADE; -- Has references to galleries and rooms
DROP TABLE IF EXISTS rooms CASCADE; -- Has reference to galleries
DROP TABLE IF EXISTS collections CASCADE; -- Has reference to users
DROP TABLE IF EXISTS tags CASCADE; -- This is referenced by junction table
DROP TABLE IF EXISTS gallery_routes CASCADE;
DROP TABLE IF EXISTS ai_models CASCADE;

-- Then drop main tables that are referenced by others
DROP TABLE IF EXISTS galleries CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- The schema.sql will recreate everything