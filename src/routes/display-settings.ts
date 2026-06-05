import express, { Request, Response } from 'express';
import pool from '../config/database';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM display_settings ORDER BY id');
    res.json({ success: true, settings: result.rows });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:key', async (req: Request, res: Response) => {
  try {
    const { key } = req.params;
    const { aspect_ratio, object_fit, max_height } = req.body;
    const result = await pool.query(
      `UPDATE display_settings SET aspect_ratio = COALESCE($1, aspect_ratio), object_fit = COALESCE($2, object_fit), max_height = COALESCE($3, max_height), updated_at = NOW() WHERE section_key = $4 RETURNING *`,
      [aspect_ratio, object_fit, max_height ? parseInt(max_height) : null, key]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Setting not found' });
    res.json({ success: true, setting: result.rows[0] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export = router;
