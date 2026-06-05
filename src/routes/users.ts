import express, { Request, Response } from 'express';
import pool from '../config/database';

const router = express.Router();

const VALID_SORT_COLUMNS = ['user_id', 'username', 'email', 'role', 'created_at'];
const VALID_ROLES = ['admin', 'curator', 'staff', 'guide', 'user'];

router.get('/', async (req: Request, res: Response) => {
  try {
    const { search, role, sort, order, limit, offset } = req.query as Record<string, string>;
    const pageLimit = Math.min(parseInt(limit) || 20, 100);
    const pageOffset = parseInt(offset) || 0;

    const where: string[] = [];
    const params: any[] = [];
    let idx = 1;

    if (search) {
      where.push(`(username ILIKE $${idx} OR email ILIKE $${idx})`);
      params.push(`%${search}%`);
      idx++;
    }
    if (role) {
      where.push(`role = $${idx}`);
      params.push(role);
      idx++;
    }

    const whereClause = where.length > 0 ? 'WHERE ' + where.join(' AND ') : '';
    const sortColumn = VALID_SORT_COLUMNS.includes(sort) ? sort : 'created_at';
    const sortOrder = order === 'ASC' ? 'ASC' : 'DESC';

    const countResult = await pool.query(`SELECT COUNT(*)::int as total FROM users ${whereClause}`, params);
    const total = countResult.rows[0].total;

    const dataParams = [...params, pageLimit, pageOffset];
    const result = await pool.query(
      `SELECT user_id, username, email, role, created_at FROM users ${whereClause} ORDER BY ${sortColumn} ${sortOrder} LIMIT $${idx} OFFSET $${idx + 1}`,
      dataParams
    );

    res.json({ success: true, users: result.rows, total, limit: pageLimit, offset: pageOffset });
  } catch (error: any) {
    console.error('Error loading users:', error.message);
    res.status(500).json({ error: error.message });
  }
});

router.get('/stats', async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT
        COUNT(*)::int AS total_users,
        COUNT(CASE WHEN created_at >= NOW() - INTERVAL '30 days' THEN 1 END)::int AS active_users,
        COUNT(CASE WHEN created_at >= CURRENT_DATE THEN 1 END)::int AS new_today
      FROM users`);
    const roleResult = await pool.query(
      `SELECT role, COUNT(*)::int AS count FROM users GROUP BY role ORDER BY count DESC`
    );
    res.json({ ...result.rows[0], roles: roleResult.rows });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT user_id, username, email, role, created_at FROM users WHERE user_id = $1',
      [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Пользователь не найден' });
    res.json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { username, email, role } = req.body;
    const userId = req.params.id;

    if (!username && !email && !role) {
      return res.status(400).json({ error: 'Нужно указать хотя бы одно поле для обновления' });
    }
    if (role && !VALID_ROLES.includes(role)) {
      return res.status(400).json({ error: `Недопустимая роль. Допустимые: ${VALID_ROLES.join(', ')}` });
    }
    if (email) {
      const existing = await pool.query(
        'SELECT user_id FROM users WHERE email = $1 AND user_id != $2',
        [email, userId]
      );
      if (existing.rows.length > 0) {
        return res.status(409).json({ error: 'Пользователь с таким email уже существует' });
      }
    }

    const result = await pool.query(
      `UPDATE users SET
        username = COALESCE($1, username),
        email = COALESCE($2, email),
        role = COALESCE($3, role)
       WHERE user_id = $4
       RETURNING user_id, username, email, role, created_at`,
      [username || null, email || null, role || null, userId]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Пользователь не найден' });
    res.json({ success: true, user: result.rows[0] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id/role', async (req: Request, res: Response) => {
  try {
    const { role } = req.body;
    if (!role || !VALID_ROLES.includes(role)) {
      return res.status(400).json({ error: `Недопустимая роль. Допустимые: ${VALID_ROLES.join(', ')}` });
    }
    const result = await pool.query(
      'UPDATE users SET role = $1 WHERE user_id = $2 RETURNING user_id, username, email, role, created_at',
      [role, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Пользователь не найден' });
    res.json({ success: true, user: result.rows[0] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'DELETE FROM users WHERE user_id = $1 RETURNING user_id',
      [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Пользователь не найден' });
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export = router;
