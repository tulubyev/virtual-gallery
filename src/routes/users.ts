import express, { Request, Response } from 'express';
import pool from '../config/database';
import * as admin from '../services/userAdmin';
import { parseId } from '../services/biddingInput';

const router = express.Router();

const VALID_SORT_COLUMNS = ['user_id', 'username', 'email', 'role', 'created_at'];

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
    const tail = `FROM users ${whereClause} ORDER BY ${sortColumn} ${sortOrder} LIMIT $${idx} OFFSET $${idx + 1}`;
    const result = await admin.queryWithFallback(
      `SELECT user_id, username, email, role, created_at, must_change_password, temp_password_expires_at ${tail}`,
      `SELECT user_id, username, email, role, created_at ${tail}`,
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

const respond = (res: Response, r: admin.Result<any>, okStatus = 200) => {
  if (r.ok) { const { ok, ...rest } = r; return res.status(okStatus).json({ success: true, ...rest }); }
  const { ok, status, ...rest } = r;
  return res.status(status).json(rest);
};
const actorOf = (req: Request) => (req as any).user as admin.Actor;
const fault = (res: Response, scope: string, error: any) => {
  console.error(`[admin/users] ${scope}:`, error?.message);
  return res.status(500).json({ error: 'Не удалось выполнить запрос' });
};

/** Создать пользователя: { username, email, role, password? }. Без пароля выдаётся временный; в ответе он показывается один раз. */
router.post('/', async (req: Request, res: Response) => {
  try { respond(res, await admin.createUser(actorOf(req), req.body ?? {}), 201); } catch (e) { fault(res, 'create', e); }
});

/** Новый временный пароль: { password? }. Закрывает прежние сессии пользователя и требует смены пароля при входе. */
router.post('/:id/reset-password', async (req: Request, res: Response) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(404).json({ error: 'Пользователь не найден' });
  try { respond(res, await admin.resetPassword(actorOf(req), id, req.body?.password)); } catch (e) { fault(res, 'reset-password', e); }
});

/** Журнал действий администраторов по пользователю (без паролей). */
router.get('/:id/log', async (req: Request, res: Response) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(404).json({ error: 'Пользователь не найден' });
  try {
    const { rows } = await pool.query(
      'SELECT log_id, actor_id, action, details, created_at FROM user_admin_log WHERE target_id = $1 ORDER BY created_at DESC, log_id DESC LIMIT 50', [id]);
    res.json({ log: rows });
  } catch (e) { fault(res, 'log', e); }
});

router.get('/:id', async (req: Request, res: Response) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(404).json({ error: 'Пользователь не найден' });
  try {
    const result = await admin.queryWithFallback(
      'SELECT user_id, username, email, role, created_at, must_change_password, temp_password_expires_at FROM users WHERE user_id = $1',
      'SELECT user_id, username, email, role, created_at FROM users WHERE user_id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Пользователь не найден' });
    res.json(result.rows[0]);
  } catch (e) { fault(res, 'get', e); }
});

router.put('/:id', async (req: Request, res: Response) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(404).json({ error: 'Пользователь не найден' });
  const { username, email, role } = req.body ?? {};
  try { respond(res, await admin.updateUser(actorOf(req), id, { username, email, role })); } catch (e) { fault(res, 'update', e); }
});

router.put('/:id/role', async (req: Request, res: Response) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(404).json({ error: 'Пользователь не найден' });
  if (!admin.isRole(req.body?.role)) return res.status(400).json({ error: `Недопустимая роль. Допустимые: ${admin.ROLES.join(', ')}` });
  try { respond(res, await admin.updateUser(actorOf(req), id, { role: req.body.role })); } catch (e) { fault(res, 'role', e); }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(404).json({ error: 'Пользователь не найден' });
  try { respond(res, await admin.deleteUser(actorOf(req), id)); } catch (e) { fault(res, 'delete', e); }
});

export = router;
