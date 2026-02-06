const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`SELECT c.collection_id as id, c.* FROM collections c WHERE c.is_active = true ORDER BY c.name`);
    res.json({ collections: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const col = await pool.query('SELECT * FROM collections WHERE slug = $1', [req.params.slug]);
    if (col.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    const arts = await pool.query(`SELECT * FROM artworks WHERE collection LIKE '%' || $1 || '%' ORDER BY created_at DESC`, [req.params.slug]);
    res.json({ collection: col.rows[0], artworks: arts.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, description, epoch, country } = req.body;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const result = await pool.query(
      `INSERT INTO collections (name, slug, description, epoch, country) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, slug, description, epoch, country]
    );
    res.json({ success: true, collection: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
