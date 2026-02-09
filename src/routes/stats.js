const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/dashboard', async (req, res) => {
  try {
    const [statsRes] = await Promise.all([
      pool.query(`
        SELECT 
          (SELECT COUNT(*) FROM artworks) as artworks_count,
          (SELECT COUNT(*) FROM collections) as collections_count,
          (SELECT COUNT(*) FROM artworks WHERE status = 'pending') as pending_count,
          (SELECT COUNT(*) FROM artworks WHERE created_at >= NOW() - INTERVAL '1 day') as new_today
      `)
    ]);

    const stats = statsRes.rows[0];
    const approvedCount = parseInt(stats.artworks_count) - parseInt(stats.pending_count);

    res.json({
      collections: parseInt(stats.collections_count) || 0,
      artworks: parseInt(stats.artworks_count) || 0,
      pending: parseInt(stats.pending_count) || 0,
      approved: approvedCount > 0 ? approvedCount : 0,
      new_today: parseInt(stats.new_today) || 0,
      users: 1247, // Mock for now as users table is missing
      active_users: 892 // Mock for now
    });
  } catch (error) {
    console.error('Stats error:', error.message);
    res.status(500).json({ error: 'Failed to load stats' });
  }
});

module.exports = router;
