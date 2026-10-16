"use strict";
// Database module for Virtual Art Gallery
// Uses PostgreSQL with connection pooling
const { Pool } = require('pg');
require('dotenv').config();
// Create a connection pool
const pool = new Pool({
    connectionString: process.env.DB_STRING,
    ssl: {
        rejectUnauthorized: false // Required for many hosted PostgreSQL services
    }
});
// Test the connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection error:', err.stack);
    }
    else {
        console.log('Connected to PostgreSQL database successfully');
    }
});
// Artwork operations
async function getAllArtworks() {
    const result = await pool.query(`
        SELECT * FROM artworks ORDER BY artwork_id
    `);
    return result.rows;
}
async function getArtworkById(id) {
    const result = await pool.query(`
        SELECT * FROM artworks WHERE artwork_id = $1
    `, [id]);
    return result.rows[0];
}
async function searchArtworks(query) {
    const result = await pool.query(`
        SELECT * FROM artworks 
        WHERE title ILIKE $1 OR artist_name ILIKE $1 OR description ILIKE $1
    `, [`%${query}%`]);
    return result.rows;
}
async function filterArtworksByTags(tags) {
    // Convert tags array to a format suitable for SQL query
    const tagsArray = `{${tags.map(t => `"${t}"`).join(',')}}`;
    const result = await pool.query(`
        SELECT * FROM artworks 
        WHERE tags && $1  -- Using PostgreSQL's array overlap operator
    `, [tagsArray]);
    return result.rows;
}
async function createArtwork(artworkData) {
    const { title, artist_name, year_created, medium, dimensions, style, description, image_url, thumbnail_url, location_in_gallery, tags } = artworkData;
    const result = await pool.query(`
        INSERT INTO artworks 
        (title, artist_name, year_created, medium, dimensions, style, 
         description, image_url, thumbnail_url, location_in_gallery, tags)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *
    `, [
        title, artist_name, year_created, medium, dimensions,
        style, description, image_url, thumbnail_url,
        JSON.stringify(location_in_gallery), tags
    ]);
    return result.rows[0];
}
async function updateArtwork(id, artworkData) {
    const fields = [];
    const values = [];
    let query = 'UPDATE artworks SET ';
    let paramCount = 1;
    for (const [key, value] of Object.entries(artworkData)) {
        if (key !== 'artwork_id') { // Don't allow updating the ID
            fields.push(`${key} = $${paramCount}`);
            values.push(key === 'location_in_gallery' ? JSON.stringify(value) : value);
            paramCount++;
        }
    }
    query += fields.join(', ') + ` WHERE artwork_id = $${paramCount} RETURNING *`;
    values.push(id);
    const result = await pool.query(query, values);
    return result.rows[0];
}
async function deleteArtwork(id) {
    const result = await pool.query(`
        DELETE FROM artworks WHERE artwork_id = $1 RETURNING artwork_id
    `, [id]);
    return result.rowCount > 0;
}
// Gallery operations
async function getAllGalleries() {
    const result = await pool.query(`
        SELECT * FROM galleries ORDER BY gallery_id
    `);
    return result.rows;
}
async function getGalleryById(id) {
    const result = await pool.query(`
        SELECT * FROM galleries WHERE gallery_id = $1
    `, [id]);
    return result.rows[0];
}
async function getGalleryRooms(id) {
    // In a real implementation, this would return rooms in a specific gallery
    // For now, returning mock data
    return [
        { room_id: 1, name: 'Room A', description: 'North wing' },
        { room_id: 2, name: 'Room B', description: 'South wing' }
    ];
}
async function createGallery(galleryData) {
    const { name, description, three_d_model_path, layout_algorithm } = galleryData;
    const result = await pool.query(`
        INSERT INTO galleries 
        (name, description, three_d_model_path, layout_algorithm)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `, [name, description, three_d_model_path, layout_algorithm]);
    return result.rows[0];
}
async function updateGallery(id, galleryData) {
    const fields = [];
    const values = [];
    let query = 'UPDATE galleries SET ';
    let paramCount = 1;
    for (const [key, value] of Object.entries(galleryData)) {
        if (key !== 'gallery_id') { // Don't allow updating the ID
            fields.push(`${key} = $${paramCount}`);
            values.push(value);
            paramCount++;
        }
    }
    query += fields.join(', ') + ` WHERE gallery_id = $${paramCount} RETURNING *`;
    values.push(id);
    const result = await pool.query(query, values);
    return result.rows[0];
}
async function deleteGallery(id) {
    const result = await pool.query(`
        DELETE FROM galleries WHERE gallery_id = $1 RETURNING gallery_id
    `, [id]);
    return result.rowCount > 0;
}
async function getRecommendedArtworks(galleryId) {
    // In a real implementation, this would use AI to recommend artworks
    // For now, returning some sample artworks
    const result = await pool.query(`
        SELECT * FROM artworks LIMIT 3
    `);
    return result.rows;
}
// User operations
async function getUserById(id) {
    const result = await pool.query(`
        SELECT user_id, username, email, role, preferences FROM users WHERE user_id = $1
    `, [id]);
    return result.rows[0];
}
async function getAllUsers() {
    const result = await pool.query(`
        SELECT user_id, username, email, role, created_at FROM users ORDER BY user_id
    `);
    return result.rows;
}
async function getUserByEmail(email) {
    const result = await pool.query(`
        SELECT * FROM users WHERE email = $1
    `, [email]);
    return result.rows[0];
}
async function createUser(userData) {
    const { username, email, password_hash, role = 'user' } = userData;
    const result = await pool.query(`
        INSERT INTO users
        (username, email, password_hash, role)
        VALUES ($1, $2, $3, $4)
        RETURNING user_id, username, email, role
    `, [username, email, password_hash, role]);
    return result.rows[0];
}
async function updateUser(id, updateData) {
    const fields = [];
    const values = [];
    let query = 'UPDATE users SET ';
    let paramCount = 1;
    for (const [key, value] of Object.entries(updateData)) {
        fields.push(`${key} = $${paramCount}`);
        values.push(key === 'preferences' ? JSON.stringify(value) : value);
        paramCount++;
    }
    query += fields.join(', ') + ` WHERE user_id = $${paramCount} RETURNING user_id, username, email, role, preferences`;
    values.push(id);
    const result = await pool.query(query, values);
    return result.rows[0];
}
// Get user by role
async function getUsersByRole(role) {
    const result = await pool.query(`
        SELECT user_id, username, email, role, created_at FROM users WHERE role = $1
    `, [role]);
    return result.rows;
}
// Interaction operations
async function addUserInteraction(interactionData) {
    const { user_id, artwork_id, interaction_type, duration } = interactionData;
    const result = await pool.query(`
        INSERT INTO user_interactions
        (user_id, artwork_id, interaction_type, duration)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `, [user_id, artwork_id, interaction_type, duration]);
    return result.rows[0];
}
module.exports = {
    getAllArtworks,
    getArtworkById,
    searchArtworks,
    filterArtworksByTags,
    createArtwork,
    updateArtwork,
    deleteArtwork,
    getAllGalleries,
    getGalleryById,
    getGalleryRooms,
    createGallery,
    updateGallery,
    deleteGallery,
    getRecommendedArtworks,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    addUserInteraction
};
//# sourceMappingURL=db.js.map