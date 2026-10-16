import express, { Request, Response } from 'express';
import pool from '../config/database';
import { getOverview } from '../services/dashboardStats';

const router = express.Router();

router.get('/dashboard', async (_req: Request, res: Response) => {
  try {
    const statsRes = await pool.query(`
      SELECT
        (SELECT COUNT(*) FROM artworks) as artworks_count,
        (SELECT COUNT(*) FROM collections) as collections_count,
        (SELECT COUNT(*) FROM artworks WHERE status = 'pending') as pending_count,
        (SELECT COUNT(*) FROM artworks WHERE created_at >= NOW() - INTERVAL '1 day') as new_today,
        (SELECT COUNT(*) FROM users) as users_count
    `);

    const stats = statsRes.rows[0];
    const approvedCount = parseInt(stats.artworks_count) - parseInt(stats.pending_count);

    res.json({
      collections: parseInt(stats.collections_count) || 0,
      artworks: parseInt(stats.artworks_count) || 0,
      pending: parseInt(stats.pending_count) || 0,
      approved: approvedCount > 0 ? approvedCount : 0,
      new_today: parseInt(stats.new_today) || 0,
      users: parseInt(stats.users_count) || 0,
    });
  } catch (error: any) {
    console.error('Stats error:', error.message);
    res.status(500).json({ error: 'Failed to load stats' });
  }
});

// Сводка для дашбордов. Данные о пользователях — только администратору.
router.get('/overview', async (req: Request, res: Response) => {
  try {
    const role = (req as any).user?.role;
    res.json(await getOverview({ includeUsers: role === 'admin' }));
  } catch (error: any) {
    console.error('Stats overview error:', error.message);
    res.status(500).json({ error: 'Failed to load stats' });
  }
});

export = router;
