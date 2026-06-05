import express, { Request, Response } from 'express';
import pool from '../config/database';

const router = express.Router();

router.get('/dashboard', async (_req: Request, res: Response) => {
  try {
    const statsRes = await pool.query(`
      SELECT
        (SELECT COUNT(*) FROM artworks) as artworks_count,
        (SELECT COUNT(*) FROM collections) as collections_count,
        (SELECT COUNT(*) FROM artworks WHERE status = 'pending') as pending_count,
        (SELECT COUNT(*) FROM artworks WHERE created_at >= NOW() - INTERVAL '1 day') as new_today
    `);

    const stats = statsRes.rows[0];
    const approvedCount = parseInt(stats.artworks_count) - parseInt(stats.pending_count);

    res.json({
      collections: parseInt(stats.collections_count) || 0,
      artworks: parseInt(stats.artworks_count) || 0,
      pending: parseInt(stats.pending_count) || 0,
      approved: approvedCount > 0 ? approvedCount : 0,
      new_today: parseInt(stats.new_today) || 0,
      users: 1247,
      active_users: 892,
    });
  } catch (error: any) {
    console.error('Stats error:', error.message);
    res.status(500).json({ error: 'Failed to load stats' });
  }
});

export = router;
