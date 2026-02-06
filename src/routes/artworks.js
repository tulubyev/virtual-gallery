const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Artworks API - Direct upload without AI service (uploads to S3)
const multer = require('multer');
const path = require('path');
const { uploadToS3 } = require('../services/s3-upload');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'artwork-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 }
});

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No image file provided' });
    const { title, artist, year, medium, dimensions, style, country, epoch, description, tags } = req.body;
    let imageUrl;
    try {
      imageUrl = await uploadToS3(req.file.path, req.file.filename, req.file.mimetype);
    } catch (s3Error) {
      imageUrl = '/uploads/' + req.file.filename;
    }
    const result = await pool.query(
      `INSERT INTO artworks (title, artist_name, year_created, medium, dimensions, style, country, epoch, description, image_url, tags, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'active')
       RETURNING artwork_id as id, title, artist_name as artist, image_url, status`,
      [title || 'Untitled', artist || 'Unknown', year ? parseInt(year) : null, medium, dimensions, style, country, epoch, description, imageUrl, tags ? tags.split(',') : null]
    );
    res.json({ success: true, artwork: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/random', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 7;
    const result = await pool.query(`SELECT artwork_id as id, title, artist_name as artist, image_url, country, epoch FROM artworks WHERE image_url IS NOT NULL AND status = 'published' ORDER BY RANDOM() LIMIT $1`, [limit]);
    res.json({ artworks: result.rows });
  } catch (error) {
    res.json({ artworks: [] });
  }
});

router.get('/', async (req, res) => {
  try {
    const { status, style, country, epoch, search, limit = 50, offset = 0 } = req.query;
    let query = 'SELECT *, artwork_id as id, artist_name as artist FROM artworks WHERE 1=1';
    const params = [];
    let idx = 1;
    if (status) { query += ` AND status = $${idx++}`; params.push(status); }
    if (search) { query += ` AND (LOWER(title) LIKE $${idx} OR LOWER(artist_name) LIKE $${idx})`; params.push(`%${search.toLowerCase()}%`); idx++; }
    query += ` ORDER BY created_at DESC LIMIT $${idx++} OFFSET $${idx}`;
    params.push(parseInt(limit), parseInt(offset));
    const result = await pool.query(query, params);
    res.json({ success: true, artworks: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT *, artwork_id as id, artist_name as artist FROM artworks WHERE artwork_id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true, artwork: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id/status', async (req, res) => {
  try {
    const { status, curator_notes, rejection_reason } = req.body;
    const validStatuses = ['pending', 'active', 'approved', 'rejected', 'published'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    const setClauses = ['status = $1', 'updated_at = NOW()'];
    const params = [status];
    let idx = 2;

    if (curator_notes !== undefined) {
      setClauses.push(`curator_notes = $${idx++}`);
      params.push(curator_notes);
    }
    if (rejection_reason !== undefined) {
      setClauses.push(`rejection_reason = $${idx++}`);
      params.push(rejection_reason);
    }

    params.push(req.params.id);
    const result = await pool.query(
      `UPDATE artworks SET ${setClauses.join(', ')} WHERE artwork_id = $${idx} RETURNING *, artwork_id as id, artist_name as artist`,
      params
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Artwork not found' });
    }

    res.json({ success: true, artwork: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { title, artist, style, period, technique, curator_notes, year, country, description, collection } = req.body;

    const setClauses = ['updated_at = NOW()'];
    const params = [];
    let idx = 1;

    if (title !== undefined) { setClauses.push(`title = $${idx++}`); params.push(title); }
    if (artist !== undefined) { setClauses.push(`artist_name = $${idx++}`); params.push(artist); }
    if (style !== undefined) { setClauses.push(`style = $${idx++}`); params.push(style); }
    if (period !== undefined) { setClauses.push(`epoch = $${idx++}`); params.push(period); }
    if (technique !== undefined) { setClauses.push(`technique = $${idx++}`); params.push(technique); }
    if (curator_notes !== undefined) { setClauses.push(`curator_notes = $${idx++}`); params.push(curator_notes); }
    if (year !== undefined) {
      const parsedYear = year ? parseInt(year) : null;
      if (parsedYear !== null && (isNaN(parsedYear) || parsedYear < 0 || parsedYear > new Date().getFullYear() + 1)) {
        return res.status(400).json({ error: 'Invalid year value' });
      }
      setClauses.push(`year_created = $${idx++}`); params.push(parsedYear);
    }
    if (country !== undefined) { setClauses.push(`country = $${idx++}`); params.push(country); }
    if (description !== undefined) { setClauses.push(`description = $${idx++}`); params.push(description); }
    if (collection !== undefined) { setClauses.push(`collection = $${idx++}`); params.push(collection); }

    if (setClauses.length === 1) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    params.push(req.params.id);
    const result = await pool.query(
      `UPDATE artworks SET ${setClauses.join(', ')} WHERE artwork_id = $${idx} RETURNING *, artwork_id as id, artist_name as artist`,
      params
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Artwork not found' });
    }

    res.json({ success: true, artwork: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM artworks WHERE artwork_id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
