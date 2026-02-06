const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/dashboard', async (req, res) => {
  try {
    const [collectionsRes, artworksRes, pendingRes] = await Promise.all([
      pool.query("SELECT COUNT(*) as count FROM collections"),
      pool.query("SELECT COUNT(*) as count FROM artworks WHERE status != 'archived'"),
      pool.query("SELECT COUNT(*) as count FROM artworks WHERE status = 'pending' OR status = 'approved'"),
    ]);

    const rooms = 5;

    res.json({
      collections: parseInt(collectionsRes.rows[0].count) || 0,
      rooms: rooms,
      artworks: parseInt(artworksRes.rows[0].count) || 0,
      pending: parseInt(pendingRes.rows[0].count) || 0,
    });
  } catch (error) {
    console.error('Stats error:', error.message);
    res.status(500).json({ error: 'Failed to load stats' });
  }
});

module.exports = router;
