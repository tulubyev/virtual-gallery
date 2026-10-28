import express, { Request, Response } from 'express';
import { getJwtSecret } from '../config/jwt';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import pool from '../config/database';
import { validateEmail, validateUsername } from '../services/userAdmin';
import { issuedBeforePasswordChange, queryWithFallback } from '../services/userSession';

const { uploadWithKey, StorageUnavailableError } = require('../services/s3-upload');

const router = express.Router();
const SALT_ROUNDS = 10;

interface UserRow {
  user_id: number;
  username: string;
  email: string;
  role: string;
  password_hash?: string;
  avatar_url?: string;
  must_change_password?: boolean;
  temp_password_expires_at?: Date | null;
  password_changed_at?: Date | null;
}

const MIN_PASSWORD = 6;
const MIN_PASSWORD_AFTER_RESET = 8;              // новый пароль после временного — не короче, чем может выдать администратор


// How far past expiry we still allow a refresh (7 days)
const REFRESH_GRACE_SECONDS = 7 * 24 * 60 * 60;

function makeToken(user: UserRow, rememberDays: 0 | 7 | 30 = 0): string {
  const expiresIn = rememberDays === 30 ? '30d' : rememberDays === 7 ? '7d' : '24h';
  return jwt.sign(
    { userId: user.user_id, email: user.email, role: user.role, username: user.username },
    getJwtSecret(),
    { expiresIn }
  );
}

// Multer setup for avatar uploads (disk storage, cleaned up after S3 upload)
const avatarStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, 'public/uploads'),
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'avatar-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const ALLOWED_AVATAR_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_AVATAR_SIZE = 5 * 1024 * 1024; // 5 MB

const avatarUpload = multer({
  storage: avatarStorage,
  limits: { fileSize: MAX_AVATAR_SIZE },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_AVATAR_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG and WebP images are allowed'));
    }
  },
});

// Ensure avatar_url column exists (safe migration)
pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url TEXT`).catch(() => {});

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email and password are required' });
    }

    // Роль при регистрации всегда «user»: гид и участник торгов назначаются администратором
    // (PUT /api/users/:id/role) — иначе любой стал бы участником аукциона без проверки.
    const userRole = 'user';

    const invalid = validateUsername(username, 1) ?? validateEmail(email);
    if (invalid) return res.status(400).json({ error: invalid });

    const exists = await pool.query('SELECT user_id FROM users WHERE lower(email) = lower($1) OR lower(username) = lower($2)', [email.trim(), username.trim()]);
    if (exists.rows.length > 0) {
      return res.status(409).json({ error: 'User with this email or username already exists' });
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING user_id, username, email, role',
      [username.trim(), email.trim(), hash, userRole]
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
    const { email, password, rememberMe } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const result = await queryWithFallback(
      'SELECT user_id, username, email, role, password_hash, avatar_url, must_change_password, temp_password_expires_at FROM users WHERE email = $1',
      'SELECT user_id, username, email, role, password_hash, avatar_url FROM users WHERE email = $1',
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
    // Пароль верный, но выданный администратором временный пароль уже просрочен: нужен новый
    if (user.must_change_password && user.temp_password_expires_at && user.temp_password_expires_at.getTime() < Date.now()) {
      return res.status(401).json({ error: 'Срок временного пароля истёк. Попросите администратора выдать новый.', code: 'temp_password_expired' });
    }

    const days = Number(rememberMe);
    const rememberDays: 0 | 7 | 30 = days === 30 ? 30 : days === 7 ? 7 : 0;
    const token = makeToken(user, rememberDays);
    res.json({ user_id: user.user_id, username: user.username, email: user.email, role: user.role, avatar_url: user.avatar_url || null, must_change_password: !!user.must_change_password, token });
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
    return jwt.verify(token, getJwtSecret()) as { userId: number };
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

    const result = await queryWithFallback(
      'SELECT user_id, username, email, role, created_at, avatar_url, must_change_password FROM users WHERE user_id = $1',
      'SELECT user_id, username, email, role, created_at, avatar_url FROM users WHERE user_id = $1',
      [decoded.userId]
    );
    const user = result.rows[0];
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user_id: user.user_id, username: user.username, email: user.email, role: user.role, created_at: user.created_at, avatar_url: user.avatar_url || null, must_change_password: !!user.must_change_password });
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
    const invalid = (username ? validateUsername(username, 1) : null) ?? (email ? validateEmail(email) : null);
    if (invalid) return res.status(400).json({ error: invalid });

    if (email) {
      const conflict = await pool.query('SELECT user_id FROM users WHERE email = $1 AND user_id != $2', [email, decoded.userId]);
      if (conflict.rows.length > 0) return res.status(409).json({ error: 'Email already in use' });
    }

    const result = await pool.query(
      `UPDATE users SET
        username = COALESCE($1, username),
        email    = COALESCE($2, email)
       WHERE user_id = $3
       RETURNING user_id, username, email, role, avatar_url`,
      [username || null, email || null, decoded.userId]
    );
    const user: UserRow = result.rows[0];
    const newToken = makeToken(user);
    res.json({ user_id: user.user_id, username: user.username, email: user.email, role: user.role, avatar_url: user.avatar_url || null, token: newToken });
  } catch (err: any) {
    console.error('[auth/me PUT]', err.message);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

router.post('/me/avatar', avatarUpload.single('avatar'), async (req: Request, res: Response) => {
  const filePath = req.file?.path;
  try {
    const token = getToken(req);
    if (!token) return res.status(401).json({ error: 'No token provided' });
    const decoded = await decodeUser(token);
    if (!decoded) return res.status(401).json({ error: 'Invalid token' });

    if (!req.file) return res.status(400).json({ error: 'No image file provided' });

    const avatarUrl = await uploadWithKey(req.file.path, `avatars/${req.file.filename}`, req.file.mimetype);

    await pool.query('UPDATE users SET avatar_url = $1 WHERE user_id = $2', [avatarUrl, decoded.userId]);

    res.json({ avatar_url: avatarUrl });
  } catch (err: any) {
    if (err instanceof StorageUnavailableError) {
      return res.status(503).json({ success: false, code: err.code, error: err.message });
    }
    console.error('[auth/me/avatar]', err.message);
    res.status(500).json({ error: 'Failed to update avatar' });
  } finally {
    if (filePath) {
      fs.unlink(filePath, () => {});
    }
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
    if (typeof newPassword !== 'string' || typeof currentPassword !== 'string') return res.status(400).json({ error: 'Passwords must be strings' });
    if (Buffer.byteLength(newPassword, 'utf8') > 72) return res.status(400).json({ error: 'Пароль — не длиннее 72 байт' });

    const result = await queryWithFallback(
      'SELECT user_id, username, email, role, avatar_url, password_hash, must_change_password FROM users WHERE user_id = $1',
      'SELECT user_id, username, email, role, avatar_url, password_hash FROM users WHERE user_id = $1',
      [decoded.userId]
    );
    const user: UserRow = result.rows[0];
    if (!user) return res.status(404).json({ error: 'User not found' });

    // После временного пароля требования строже и новый пароль должен отличаться от выданного
    const min = user.must_change_password ? MIN_PASSWORD_AFTER_RESET : MIN_PASSWORD;
    if (newPassword.length < min) return res.status(400).json({ error: user.must_change_password ? `Новый пароль — не короче ${min} знаков` : `New password must be at least ${min} characters` });

    const match = await bcrypt.compare(currentPassword, user.password_hash!);
    if (!match) return res.status(401).json({ error: 'Current password is incorrect' });
    if (user.must_change_password && newPassword === currentPassword) return res.status(400).json({ error: 'Новый пароль должен отличаться от временного' });

    const newHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    try {
      await pool.query(
        'UPDATE users SET password_hash = $1, must_change_password = false, temp_password_expires_at = NULL, password_changed_at = now() WHERE user_id = $2', [newHash, decoded.userId]);
    } catch (e: any) {
      if (e?.code !== '42703') throw e;                       // миграция 007 ещё не применена
      await pool.query('UPDATE users SET password_hash = $1 WHERE user_id = $2', [newHash, decoded.userId]);
    }
    // Токены, выданные до смены, перестают действовать: возвращаем новый, чтобы эта сессия продолжилась
    res.json({ success: true, must_change_password: false, token: makeToken(user) });
  } catch (err: any) {
    console.error('[auth/me/password]', err.message);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

router.post('/refresh', async (req: Request, res: Response) => {
  try {
    const token = getToken(req);
    if (!token) return res.status(401).json({ error: 'No token provided' });

    let decoded: any;
    try {
      decoded = jwt.verify(token, getJwtSecret(), { ignoreExpiration: true }) as any;
    } catch {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const nowSec = Math.floor(Date.now() / 1000);
    if (decoded.exp && (nowSec - decoded.exp) > REFRESH_GRACE_SECONDS) {
      return res.status(401).json({ error: 'Token too old to refresh' });
    }

    const result = await queryWithFallback(
      'SELECT user_id, username, email, role, avatar_url, must_change_password, password_changed_at FROM users WHERE user_id = $1',
      'SELECT user_id, username, email, role, avatar_url FROM users WHERE user_id = $1',
      [decoded.userId]
    );
    const user: UserRow = result.rows[0];
    if (!user) return res.status(401).json({ error: 'User not found' });
    if (issuedBeforePasswordChange(decoded.iat, user.password_changed_at)) return res.status(401).json({ error: 'Password was changed, sign in again' });

    const originalTTLSeconds = decoded.exp && decoded.iat ? decoded.exp - decoded.iat : 24 * 60 * 60;
    const rememberDays: 0 | 7 | 30 =
      originalTTLSeconds >= 30 * 24 * 60 * 60 ? 30 :
      originalTTLSeconds >= 7 * 24 * 60 * 60 ? 7 : 0;

    const newToken = makeToken(user, rememberDays);
    res.json({ token: newToken, user: { user_id: user.user_id, username: user.username, email: user.email, role: user.role, avatar_url: user.avatar_url || null, must_change_password: !!user.must_change_password } });
  } catch (err: any) {
    console.error('[auth/refresh]', err.message);
    res.status(500).json({ error: 'Token refresh failed' });
  }
});

router.get('/verify', async (req: Request, res: Response) => {
  try {
    const token = (req.headers['authorization'] || '').replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, getJwtSecret()) as { userId: number; iat?: number };
    const result = await queryWithFallback(
      'SELECT user_id, username, email, role, avatar_url, must_change_password, password_changed_at FROM users WHERE user_id = $1',
      'SELECT user_id, username, email, role, avatar_url FROM users WHERE user_id = $1',
      [decoded.userId]
    );
    const user: UserRow = result.rows[0];
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (issuedBeforePasswordChange(decoded.iat, user.password_changed_at)) return res.status(401).json({ valid: false, error: 'Password was changed, sign in again' });

    res.json({ valid: true, user: { user_id: user.user_id, username: user.username, email: user.email, role: user.role, avatar_url: user.avatar_url || null, must_change_password: !!user.must_change_password } });
  } catch {
    res.status(401).json({ valid: false, error: 'Invalid or expired token' });
  }
});

export = router;
