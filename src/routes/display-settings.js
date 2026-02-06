const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM display_settings ORDER BY id');
    res.json({ success: true, settings: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const { aspect_ratio, object_fit, max_height } = req.body;
    const result = await pool.query(
      `UPDATE display_settings SET aspect_ratio = COALESCE($1, aspect_ratio), object_fit = COALESCE($2, object_fit), max_height = COALESCE($3, max_height), updated_at = NOW() WHERE section_key = $4 RETURNING *`,
      [aspect_ratio, object_fit, max_height ? parseInt(max_height) : null, key]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Setting not found' });
    res.json({ success: true, setting: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
