# Database Setup for Virtual Art Gallery

## Overview
The Virtual Art Gallery uses PostgreSQL as its primary database with JSON support for flexible metadata storage. The database schema includes tables for users, artworks, galleries, collections, user interactions, AI models, and IoT sensor data.

## Database Schema

The schema includes the following tables:

1. **users** - Stores user profiles and preferences
2. **artworks** - Contains artwork metadata, images, and gallery locations
3. **tags** - Classification of artworks by various criteria
4. **artwork_tags** - Junction table linking artworks to tags
5. **galleries** - 3D models and descriptions of gallery spaces
6. **collections** - Curated sets of artworks (human and AI-generated)
7. **collection_artworks** - Junction table linking collections to artworks
8. **user_interactions** - History of user interactions with artworks
9. **gallery_routes** - Predefined paths for public displays
10. **ai_models** - Information about AI models used in the system
11. **iot_sensor_data** - Data collected from IoT sensors in physical galleries

## Prerequisites

Before initializing the database, ensure you have:

1. PostgreSQL server running (version 10 or higher)
2. Database credentials configured in your `.env` file
3. Node.js and npm installed

## Environment Variables

Set up your `.env` file in the project root with the following variables:

```
DB_HOST=your_host
DB_PORT=5432
DB_NAME=virtual_gallery_db
DB_USER=your_username
DB_PASSWORD=your_password
DB_STRING=postgres://your_username:your_password@your_host:5432/virtual_gallery_db
```

## Initialization

To initialize the database with the required tables, run:

```bash
npm run init-db
```

This command will execute the SQL schema and create all necessary tables with appropriate indexes.

## Additional Notes

- The schema uses PostgreSQL-specific features like JSONB for flexible data storage
- Proper indexes are created for performance optimization
- Foreign key constraints ensure data integrity
- The IoT sensor data table is designed to handle various types of sensor inputs