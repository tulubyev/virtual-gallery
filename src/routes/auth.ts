import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/database';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';
const SALT_ROUNDS = 10;

interface UserRow {
  user_id: number;
  username: string;
  email: string;
  role: string;
  password_hash?: string;
}

function makeToken(user: UserRow): string {
  return jwt.sign(
    { userId: user.user_id, email: user.email, role: user.role, username: user.username },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email and password are required' });
    }

    const allowed = ['user', 'tour_guide', 'auction_participant'];
    const userRole = allowed.includes(role) ? role : 'user';

    const exists = await pool.query('SELECT user_id FROM users WHERE email = $1', [email]);
    if (exists.rows.length > 0) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING user_id, username, email, role',
      [username, email, hash, userRole]
    );
    const user: UserRow = result.rows[0];
    const token = makeToken(user);

    res.status(201).json({ user_id: user.user_id, username: user.username, email: user.email, role: user.role, token });
  } catch (err: any) {
    console.error('[auth/register]', err.message);
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const result = await pool.query(
      'SELECT user_id, username, email, role, password_hash FROM users WHERE email = $1',
      [email]
    );
    const user: UserRow = result.rows[0];
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(password, user.password_hash!);
    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = makeToken(user);
    res.json({ user_id: user.user_id, username: user.username, email: user.email, role: user.role, token });
  } catch (err: any) {
    console.error('[auth/login]', err.message);
    res.status(500).json({ error: 'Login failed' });
  }
});

function getToken(req: Request): string | null {
  return (req.headers['authorization'] || '').replace('Bearer ', '') || null;
}

async function decodeUser(token: string): Promise<{ userId: number } | null> {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: number };
  } catch {
    return null;
  }
}

router.get('/me', async (req: Request, res: Response) => {
  try {
    const token = getToken(req);
    if (!token) return res.status(401).json({ error: 'No token provided' });
    const decoded = await decodeUser(token);
    if (!decoded) return res.status(401).json({ error: 'Invalid token' });

    const result = await pool.query(
      'SELECT user_id, username, email, role, created_at FROM users WHERE user_id = $1',
      [decoded.userId]
    );
    const user = result.rows[0];
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user_id: user.user_id, username: user.username, email: user.email, role: user.role, created_at: user.created_at });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

router.put('/me', async (req: Request, res: Response) => {
  try {
    const token = getToken(req);
    if (!token) return res.status(401).json({ error: 'No token provided' });
    const decoded = await decodeUser(token);
    if (!decoded) return res.status(401).json({ error: 'Invalid token' });

    const { username, email } = req.body;
    if (!username && !email) return res.status(400).json({ error: 'Nothing to update' });

    if (email) {
      const conflict = await pool.query('SELECT user_id FROM users WHERE email = $1 AND user_id != $2', [email, decoded.userId]);
      if (conflict.rows.length > 0) return res.status(409).json({ error: 'Email already in use' });
    }

    const result = await pool.query(
      `UPDATE users SET
        username = COALESCE($1, username),
        email    = COALESCE($2, email)
       WHERE user_id = $3
       RETURNING user_id, username, email, role`,
      [username || null, email || null, decoded.userId]
    );
    const user: UserRow = result.rows[0];
    const newToken = makeToken(user);
    res.json({ user_id: user.user_id, username: user.username, email: user.email, role: user.role, token: newToken });
  } catch (err: any) {
    console.error('[auth/me PUT]', err.message);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

router.put('/me/password', async (req: Request, res: Response) => {
  try {
    const token = getToken(req);
    if (!token) return res.status(401).json({ error: 'No token provided' });
    const decoded = await decodeUser(token);
    if (!decoded) return res.status(401).json({ error: 'Invalid token' });

    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) return res.status(400).json({ error: 'currentPassword and newPassword are required' });
    if (newPassword.length < 6) return res.status(400).json({ error: 'New password must be at least 6 characters' });

    const result = await pool.query('SELECT password_hash FROM users WHERE user_id = $1', [decoded.userId]);
    const user = result.rows[0];
    if (!user) return res.status(404).json({ error: 'User not found' });

    const match = await bcrypt.compare(currentPassword, user.password_hash);
    if (!match) return res.status(401).json({ error: 'Current password is incorrect' });

    const newHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await pool.query('UPDATE users SET password_hash = $1 WHERE user_id = $2', [newHash, decoded.userId]);
    res.json({ success: true });
  } catch (err: any) {
    console.error('[auth/me/password]', err.message);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

router.get('/verify', async (req: Request, res: Response) => {
  try {
    const token = (req.headers['authorization'] || '').replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    const result = await pool.query(
      'SELECT user_id, username, email, role FROM users WHERE user_id = $1',
      [decoded.userId]
    );
    const user = result.rows[0];
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ valid: true, user });
  } catch {
    res.status(401).json({ valid: false, error: 'Invalid or expired token' });
  }
});

export = router;
