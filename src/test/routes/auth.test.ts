// src/test/routes/auth.test.ts
import express, { Application } from 'express';
import request from 'supertest';
import jwt from 'jsonwebtoken';

const TEST_SECRET = 'login_route_test_jwt_secret';

jest.mock('../../config/database', () => ({
  __esModule: true,
  default: { query: jest.fn(() => Promise.resolve({ rows: [] })) },
}));

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

import pool from '../../config/database';
import bcrypt from 'bcrypt';
import authRouter from '../../routes/auth';

function buildApp(): Application {
  const app = express();
  app.use(express.json());
  app.use('/api/auth', authRouter);
  return app;
}

const sampleUser = {
  user_id: 1,
  username: 'testuser',
  email: 'test@example.com',
  role: 'visitor',
  password_hash: '$2b$10$hashedpassword',
};

beforeEach(() => {
  process.env.JWT_SECRET = TEST_SECRET;
  jest.clearAllMocks();
});

afterEach(() => {
  delete process.env.JWT_SECRET;
});

// ─── Token expiry based on rememberMe ────────────────────────────────────────

describe('POST /api/auth/login — token expiry', () => {
  beforeEach(() => {
    (pool.query as jest.Mock).mockResolvedValue({ rows: [sampleUser] });
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
  });

  it('issues a 24h token when rememberMe is omitted', async () => {
    const res = await request(buildApp())
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(res.status).toBe(200);
    const decoded = jwt.decode(res.body.token) as any;
    expect(decoded.exp - decoded.iat).toBe(24 * 60 * 60);
  });

  it('issues a 24h token when rememberMe is 0', async () => {
    const res = await request(buildApp())
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123', rememberMe: 0 });

    expect(res.status).toBe(200);
    const decoded = jwt.decode(res.body.token) as any;
    expect(decoded.exp - decoded.iat).toBe(24 * 60 * 60);
  });

  it('issues a 7d token when rememberMe is 7', async () => {
    const res = await request(buildApp())
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123', rememberMe: 7 });

    expect(res.status).toBe(200);
    const decoded = jwt.decode(res.body.token) as any;
    expect(decoded.exp - decoded.iat).toBe(7 * 24 * 60 * 60);
  });

  it('issues a 30d token when rememberMe is 30', async () => {
    const res = await request(buildApp())
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123', rememberMe: 30 });

    expect(res.status).toBe(200);
    const decoded = jwt.decode(res.body.token) as any;
    expect(decoded.exp - decoded.iat).toBe(30 * 24 * 60 * 60);
  });
});

// ─── Error handling ──────────────────────────────────────────────────────────

describe('POST /api/auth/login — errors', () => {
  it('returns 400 when email is missing', async () => {
    const res = await request(buildApp())
      .post('/api/auth/login')
      .send({ password: 'password123' });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/required/i);
  });

  it('returns 400 when password is missing', async () => {
    const res = await request(buildApp())
      .post('/api/auth/login')
      .send({ email: 'test@example.com' });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/required/i);
  });

  it('returns 401 when no user exists for the given email', async () => {
    (pool.query as jest.Mock).mockResolvedValue({ rows: [] });

    const res = await request(buildApp())
      .post('/api/auth/login')
      .send({ email: 'nobody@example.com', password: 'password123' });

    expect(res.status).toBe(401);
    expect(res.body.error).toMatch(/invalid/i);
  });

  it('returns 401 when password does not match', async () => {
    (pool.query as jest.Mock).mockResolvedValue({ rows: [sampleUser] });
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const res = await request(buildApp())
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'wrongpassword' });

    expect(res.status).toBe(401);
    expect(res.body.error).toMatch(/invalid/i);
  });

  it('returns 500 when the database throws an unexpected error', async () => {
    (pool.query as jest.Mock).mockRejectedValue(new Error('DB connection lost'));

    const res = await request(buildApp())
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(res.status).toBe(500);
  });
});

// ─── Response shape ──────────────────────────────────────────────────────────

describe('POST /api/auth/login — response shape', () => {
  beforeEach(() => {
    (pool.query as jest.Mock).mockResolvedValue({ rows: [sampleUser] });
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
  });

  it('includes user_id, username, email, role and token on success', async () => {
    const res = await request(buildApp())
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      user_id: sampleUser.user_id,
      username: sampleUser.username,
      email: sampleUser.email,
      role: sampleUser.role,
    });
    expect(typeof res.body.token).toBe('string');
  });

  it('JWT payload contains userId, email, role and username', async () => {
    const res = await request(buildApp())
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });

    const decoded = jwt.decode(res.body.token) as any;
    expect(decoded.userId).toBe(sampleUser.user_id);
    expect(decoded.email).toBe(sampleUser.email);
    expect(decoded.role).toBe(sampleUser.role);
    expect(decoded.username).toBe(sampleUser.username);
  });
});
