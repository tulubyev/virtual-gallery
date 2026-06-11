// src/test/controllers/auth.test.ts
import express, { Application } from 'express';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { AuthController } from '../../controllers/AuthController';
import { createAuthRoutes } from '../../routes/authRoutes';

const TEST_SECRET = 'controller_test_jwt_secret';

beforeEach(() => {
  process.env.JWT_SECRET = TEST_SECRET;
});

afterEach(() => {
  delete process.env.JWT_SECRET;
  jest.clearAllMocks();
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildApp(userServiceOverrides: Partial<ReturnType<typeof makeUserService>> = {}): Application {
  const userService = { ...makeUserService(), ...userServiceOverrides };
  const logger = { info: jest.fn(), error: jest.fn(), warn: jest.fn(), debug: jest.fn() };
  const controller = new AuthController(userService as any, logger as any);

  const app = express();
  app.use(express.json());
  app.use('/api/auth', createAuthRoutes(controller));
  return app;
}

function makeUserService() {
  return {
    getUserByEmail: jest.fn().mockResolvedValue(null),
    createUser: jest.fn().mockResolvedValue({
      user_id: 1,
      username: 'testuser',
      email: 'test@example.com',
      role: 'visitor',
    }),
    authenticate: jest.fn().mockResolvedValue(null),
    getUserById: jest.fn().mockResolvedValue(null),
  };
}

const sampleUser = {
  user_id: 1,
  username: 'testuser',
  email: 'test@example.com',
  role: 'visitor',
};

// ─── POST /api/auth/register ──────────────────────────────────────────────────

describe('POST /api/auth/register', () => {
  it('returns 400 when required fields are missing', async () => {
    const app = buildApp();
    const res = await request(app).post('/api/auth/register').send({ email: 'a@b.com' });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/required/i);
  });

  it('returns 409 when a user with the same email already exists', async () => {
    const app = buildApp({
      getUserByEmail: jest.fn().mockResolvedValue(sampleUser),
    });
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'alice', email: 'taken@example.com', password: 'secret' });

    expect(res.status).toBe(409);
    expect(res.body.error).toMatch(/already exists/i);
  });

  it('returns 201 and a JWT token on successful registration', async () => {
    const app = buildApp({
      getUserByEmail: jest.fn().mockResolvedValue(null),
      createUser: jest.fn().mockResolvedValue(sampleUser),
    });

    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser', email: 'test@example.com', password: 'password123' });

    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(typeof res.body.token).toBe('string');
    expect(res.body.email).toBe('test@example.com');
  });

  it('includes user_id, username, email, and role in the response', async () => {
    const app = buildApp({
      getUserByEmail: jest.fn().mockResolvedValue(null),
      createUser: jest.fn().mockResolvedValue(sampleUser),
    });

    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser', email: 'test@example.com', password: 'password123' });

    expect(res.body).toMatchObject({
      user_id: 1,
      username: 'testuser',
      email: 'test@example.com',
      role: 'visitor',
    });
  });

  it('returns 500 when the service throws an unexpected error', async () => {
    const app = buildApp({
      getUserByEmail: jest.fn().mockRejectedValue(new Error('DB connection lost')),
    });

    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'x', email: 'x@x.com', password: 'pass' });

    expect(res.status).toBe(500);
  });
});

// ─── POST /api/auth/login ─────────────────────────────────────────────────────

describe('POST /api/auth/login', () => {
  it('returns 400 when email or password is missing', async () => {
    const app = buildApp();
    const res = await request(app).post('/api/auth/login').send({ email: 'a@b.com' });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/required/i);
  });

  it('returns 401 when credentials are invalid', async () => {
    const app = buildApp({
      authenticate: jest.fn().mockResolvedValue(null),
    });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'wrong@example.com', password: 'wrongpass' });

    expect(res.status).toBe(401);
    expect(res.body.error).toMatch(/invalid/i);
  });

  it('returns 200 and a JWT token on successful login', async () => {
    const app = buildApp({
      authenticate: jest.fn().mockResolvedValue(sampleUser),
    });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(typeof res.body.token).toBe('string');
  });

  it('token payload contains userId and username', async () => {
    const app = buildApp({
      authenticate: jest.fn().mockResolvedValue(sampleUser),
    });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });

    const decoded = jwt.decode(res.body.token) as any;
    expect(decoded.userId).toBe(sampleUser.user_id);
    expect(decoded.username).toBe(sampleUser.username);
  });

  it('returns user info alongside the token', async () => {
    const app = buildApp({
      authenticate: jest.fn().mockResolvedValue(sampleUser),
    });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(res.body).toMatchObject({
      user_id: sampleUser.user_id,
      username: sampleUser.username,
      email: sampleUser.email,
      role: sampleUser.role,
    });
  });

  it('returns 500 when the service throws an unexpected error', async () => {
    const app = buildApp({
      authenticate: jest.fn().mockRejectedValue(new Error('DB down')),
    });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'x@x.com', password: 'pass' });

    expect(res.status).toBe(500);
  });
});

// ─── Protected routes (require valid token) ───────────────────────────────────

describe('POST /api/auth/logout', () => {
  it('returns 401 without a token', async () => {
    const app = buildApp();
    const res = await request(app).post('/api/auth/logout');
    expect(res.status).toBe(401);
  });

  it('returns 403 with an invalid token', async () => {
    const app = buildApp();
    const res = await request(app)
      .post('/api/auth/logout')
      .set('Authorization', 'Bearer bad.token.here');
    expect(res.status).toBe(403);
  });

  it('returns 200 with a valid token', async () => {
    const app = buildApp();
    const token = jwt.sign({ userId: 1, email: 'x@x.com', role: 'visitor' }, TEST_SECRET, {
      expiresIn: '1h',
    });

    const res = await request(app)
      .post('/api/auth/logout')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/logged out/i);
  });
});

describe('GET /api/auth/verify', () => {
  it('returns 401 without a token', async () => {
    const app = buildApp();
    const res = await request(app).get('/api/auth/verify');
    expect(res.status).toBe(401);
  });

  it('returns 403 with an expired token', async () => {
    const app = buildApp();
    const expired = jwt.sign({ userId: 1, email: 'x@x.com', role: 'visitor' }, TEST_SECRET, {
      expiresIn: '-1s',
    });

    const res = await request(app)
      .get('/api/auth/verify')
      .set('Authorization', `Bearer ${expired}`);

    expect(res.status).toBe(403);
  });
});
