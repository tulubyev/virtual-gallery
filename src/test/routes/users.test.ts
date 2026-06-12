// src/test/routes/users.test.ts
import express, { Application } from 'express';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { UserController } from '../../controllers/UserController';
import { createUserRoutes } from '../../routes/userRoutes';
import { createUserManagementRoutes } from '../../routes/userManagementRoutes';

const TEST_SECRET = 'user_route_test_jwt_secret';

beforeEach(() => {
  process.env.JWT_SECRET = TEST_SECRET;
});

afterEach(() => {
  delete process.env.JWT_SECRET;
  jest.clearAllMocks();
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

function makeUserService(overrides: Record<string, jest.Mock> = {}) {
  return {
    getUserByEmail: jest.fn().mockResolvedValue(null),
    createUser: jest.fn().mockResolvedValue(sampleUser),
    authenticate: jest.fn().mockResolvedValue(null),
    getUserById: jest.fn().mockResolvedValue(sampleUser),
    updateUser: jest.fn().mockResolvedValue(sampleUser),
    deleteUser: jest.fn().mockResolvedValue(true),
    getAll: jest.fn().mockResolvedValue([sampleUser]),
    getUsersByRole: jest.fn().mockResolvedValue([sampleUser]),
    updateRole: jest.fn().mockResolvedValue({ ...sampleUser, role: 'curator' }),
    getFavorites: jest.fn().mockResolvedValue([]),
    addFavorite: jest.fn().mockResolvedValue({ success: true }),
    removeFavorite: jest.fn().mockResolvedValue({ success: true }),
    getHistory: jest.fn().mockResolvedValue([]),
    ...overrides,
  };
}

function buildApp(serviceOverrides: Record<string, jest.Mock> = {}): Application {
  const userService = makeUserService(serviceOverrides);
  const logger = { info: jest.fn(), error: jest.fn(), warn: jest.fn(), debug: jest.fn() };
  const controller = new UserController(userService as any, logger as any);

  const app = express();
  app.use(express.json());
  app.use('/api/users', createUserRoutes(controller));
  app.use('/api/admin/users', createUserManagementRoutes(controller));
  return app;
}

// userId in validToken is 1 — this becomes req.user.user_id = 1 via authenticateToken
function validToken(role = 'visitor', userId = 1) {
  return jwt.sign({ userId, email: 'test@example.com', role }, TEST_SECRET, {
    expiresIn: '1h',
  });
}

const sampleUser = {
  user_id: '1',
  username: 'testuser',
  email: 'test@example.com',
  role: 'visitor',
  preferences: {},
};

// ─── GET /api/users/profile ───────────────────────────────────────────────────

describe('GET /api/users/profile', () => {
  it('returns 401 without a token', async () => {
    const app = buildApp();
    const res = await request(app).get('/api/users/profile');
    expect(res.status).toBe(401);
  });

  it('returns 403 with an invalid token', async () => {
    const app = buildApp();
    const res = await request(app)
      .get('/api/users/profile')
      .set('Authorization', 'Bearer bad.token.here');
    expect(res.status).toBe(403);
  });

  it('returns 403 with an expired token', async () => {
    const app = buildApp();
    const expired = jwt.sign({ userId: 1, role: 'visitor' }, TEST_SECRET, { expiresIn: '-1s' });
    const res = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${expired}`);
    expect(res.status).toBe(403);
  });

  it('returns 200 with the user profile for a valid token', async () => {
    const getUserById = jest.fn().mockResolvedValue(sampleUser);
    const app = buildApp({ getUserById });
    const res = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${validToken()}`);
    expect(res.status).toBe(200);
    expect(res.body.email).toBe('test@example.com');
    expect(getUserById).toHaveBeenCalledWith(1);
  });

  it('returns 404 when the user is not found', async () => {
    const app = buildApp({ getUserById: jest.fn().mockResolvedValue(null) });
    const res = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${validToken()}`);
    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/not found/i);
  });

  it('returns 500 when the service throws', async () => {
    const app = buildApp({ getUserById: jest.fn().mockRejectedValue(new Error('DB error')) });
    const res = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${validToken()}`);
    expect(res.status).toBe(500);
  });
});

// ─── PUT /api/users/profile ───────────────────────────────────────────────────

describe('PUT /api/users/profile', () => {
  const updatePayload = { username: 'newname' };

  it('returns 401 without a token', async () => {
    const app = buildApp();
    const res = await request(app).put('/api/users/profile').send(updatePayload);
    expect(res.status).toBe(401);
  });

  it('returns 403 with an invalid token', async () => {
    const app = buildApp();
    const res = await request(app)
      .put('/api/users/profile')
      .set('Authorization', 'Bearer bad.token.here')
      .send(updatePayload);
    expect(res.status).toBe(403);
  });

  it('returns 200 and calls updateUser with the authenticated user id', async () => {
    const updated = { ...sampleUser, username: 'newname' };
    const updateUser = jest.fn().mockResolvedValue(updated);
    const app = buildApp({ updateUser });
    const res = await request(app)
      .put('/api/users/profile')
      .set('Authorization', `Bearer ${validToken()}`)
      .send(updatePayload);
    expect(res.status).toBe(200);
    expect(updateUser).toHaveBeenCalledWith(1, expect.objectContaining({ username: 'newname' }));
  });

  it('strips the password field from the update payload', async () => {
    const updateUser = jest.fn().mockResolvedValue(sampleUser);
    const app = buildApp({ updateUser });
    await request(app)
      .put('/api/users/profile')
      .set('Authorization', `Bearer ${validToken()}`)
      .send({ username: 'newname', password: 'should-be-stripped' });
    const [, updateData] = updateUser.mock.calls[0];
    expect(updateData.password).toBeUndefined();
  });

  it('returns 500 when the service throws', async () => {
    const app = buildApp({ updateUser: jest.fn().mockRejectedValue(new Error('update failed')) });
    const res = await request(app)
      .put('/api/users/profile')
      .set('Authorization', `Bearer ${validToken()}`)
      .send(updatePayload);
    expect(res.status).toBe(500);
  });
});

// ─── GET /api/users/preferences ──────────────────────────────────────────────

describe('GET /api/users/preferences', () => {
  it('returns 401 without a token', async () => {
    const app = buildApp();
    const res = await request(app).get('/api/users/preferences');
    expect(res.status).toBe(401);
  });

  it('returns 200 with preferences and uses the authenticated user id', async () => {
    const userWithPrefs = { ...sampleUser, preferences: { theme: 'dark' } };
    const getUserById = jest.fn().mockResolvedValue(userWithPrefs);
    const app = buildApp({ getUserById });
    const res = await request(app)
      .get('/api/users/preferences')
      .set('Authorization', `Bearer ${validToken()}`);
    expect(res.status).toBe(200);
    expect(res.body.preferences).toBeDefined();
    expect(getUserById).toHaveBeenCalledWith(1);
  });

  it('returns an empty preferences object when user has none set', async () => {
    const userNoPrefs = { ...sampleUser, preferences: undefined };
    const app = buildApp({ getUserById: jest.fn().mockResolvedValue(userNoPrefs) });
    const res = await request(app)
      .get('/api/users/preferences')
      .set('Authorization', `Bearer ${validToken()}`);
    expect(res.status).toBe(200);
    expect(res.body.preferences).toEqual({});
  });

  it('returns 404 when the user is not found', async () => {
    const app = buildApp({ getUserById: jest.fn().mockResolvedValue(null) });
    const res = await request(app)
      .get('/api/users/preferences')
      .set('Authorization', `Bearer ${validToken()}`);
    expect(res.status).toBe(404);
  });

  it('returns 500 when the service throws', async () => {
    const app = buildApp({ getUserById: jest.fn().mockRejectedValue(new Error('DB error')) });
    const res = await request(app)
      .get('/api/users/preferences')
      .set('Authorization', `Bearer ${validToken()}`);
    expect(res.status).toBe(500);
  });
});

// ─── PUT /api/users/preferences ──────────────────────────────────────────────

describe('PUT /api/users/preferences', () => {
  const prefsPayload = { theme: 'dark', language: 'en' };

  it('returns 401 without a token', async () => {
    const app = buildApp();
    const res = await request(app).put('/api/users/preferences').send(prefsPayload);
    expect(res.status).toBe(401);
  });

  it('returns 200 and calls updateUser with the authenticated user id and preferences', async () => {
    const updated = { ...sampleUser, preferences: prefsPayload };
    const updateUser = jest.fn().mockResolvedValue(updated);
    const app = buildApp({ updateUser });
    const res = await request(app)
      .put('/api/users/preferences')
      .set('Authorization', `Bearer ${validToken()}`)
      .send(prefsPayload);
    expect(res.status).toBe(200);
    expect(res.body.preferences).toBeDefined();
    expect(updateUser).toHaveBeenCalledWith(1, { preferences: prefsPayload });
  });

  it('returns 500 when the service throws', async () => {
    const app = buildApp({ updateUser: jest.fn().mockRejectedValue(new Error('update failed')) });
    const res = await request(app)
      .put('/api/users/preferences')
      .set('Authorization', `Bearer ${validToken()}`)
      .send(prefsPayload);
    expect(res.status).toBe(500);
  });
});

// ─── GET /api/users/favorites ─────────────────────────────────────────────────

describe('GET /api/users/favorites', () => {
  it('returns 401 without a token', async () => {
    const app = buildApp();
    const res = await request(app).get('/api/users/favorites');
    expect(res.status).toBe(401);
  });

  it('returns 200 and calls getFavorites with the authenticated user id', async () => {
    const getFavorites = jest.fn().mockResolvedValue([{ artwork_id: '5' }]);
    const app = buildApp({ getFavorites });
    const res = await request(app)
      .get('/api/users/favorites')
      .set('Authorization', `Bearer ${validToken()}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(getFavorites).toHaveBeenCalledWith(1);
  });

  it('returns 500 when the service throws', async () => {
    const app = buildApp({ getFavorites: jest.fn().mockRejectedValue(new Error('DB error')) });
    const res = await request(app)
      .get('/api/users/favorites')
      .set('Authorization', `Bearer ${validToken()}`);
    expect(res.status).toBe(500);
  });
});

// ─── POST /api/users/favorites/:artworkId ─────────────────────────────────────

describe('POST /api/users/favorites/:artworkId', () => {
  it('returns 401 without a token', async () => {
    const app = buildApp();
    const res = await request(app).post('/api/users/favorites/42');
    expect(res.status).toBe(401);
  });

  it('returns 200 and calls addFavorite with the authenticated user id and artworkId', async () => {
    const addFavorite = jest.fn().mockResolvedValue({ success: true });
    const app = buildApp({ addFavorite });
    const res = await request(app)
      .post('/api/users/favorites/42')
      .set('Authorization', `Bearer ${validToken()}`);
    expect(res.status).toBe(200);
    expect(addFavorite).toHaveBeenCalledWith(1, '42');
  });

  it('returns 500 when the service throws', async () => {
    const app = buildApp({ addFavorite: jest.fn().mockRejectedValue(new Error('insert failed')) });
    const res = await request(app)
      .post('/api/users/favorites/42')
      .set('Authorization', `Bearer ${validToken()}`);
    expect(res.status).toBe(500);
  });
});

// ─── DELETE /api/users/favorites/:artworkId ───────────────────────────────────

describe('DELETE /api/users/favorites/:artworkId', () => {
  it('returns 401 without a token', async () => {
    const app = buildApp();
    const res = await request(app).delete('/api/users/favorites/42');
    expect(res.status).toBe(401);
  });

  it('returns 200 and calls removeFavorite with the authenticated user id and artworkId', async () => {
    const removeFavorite = jest.fn().mockResolvedValue({ success: true });
    const app = buildApp({ removeFavorite });
    const res = await request(app)
      .delete('/api/users/favorites/42')
      .set('Authorization', `Bearer ${validToken()}`);
    expect(res.status).toBe(200);
    expect(removeFavorite).toHaveBeenCalledWith(1, '42');
  });

  it('returns 500 when the service throws', async () => {
    const app = buildApp({ removeFavorite: jest.fn().mockRejectedValue(new Error('delete failed')) });
    const res = await request(app)
      .delete('/api/users/favorites/42')
      .set('Authorization', `Bearer ${validToken()}`);
    expect(res.status).toBe(500);
  });
});

// ─── GET /api/users/history ───────────────────────────────────────────────────

describe('GET /api/users/history', () => {
  it('returns 401 without a token', async () => {
    const app = buildApp();
    const res = await request(app).get('/api/users/history');
    expect(res.status).toBe(401);
  });

  it('returns 200 and calls getHistory with the authenticated user id', async () => {
    const getHistory = jest.fn().mockResolvedValue([{ viewed_at: new Date() }]);
    const app = buildApp({ getHistory });
    const res = await request(app)
      .get('/api/users/history')
      .set('Authorization', `Bearer ${validToken()}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(getHistory).toHaveBeenCalledWith(1);
  });

  it('returns 500 when the service throws', async () => {
    const app = buildApp({ getHistory: jest.fn().mockRejectedValue(new Error('DB error')) });
    const res = await request(app)
      .get('/api/users/history')
      .set('Authorization', `Bearer ${validToken()}`);
    expect(res.status).toBe(500);
  });
});

// ─── Role-change endpoint (admin only): PUT /api/admin/users/:userId/role ─────

describe('PUT /api/admin/users/:userId/role', () => {
  it('returns 401 without a token', async () => {
    const app = buildApp();
    const res = await request(app).put('/api/admin/users/1/role').send({ role: 'curator' });
    expect(res.status).toBe(401);
  });

  it('returns 403 for a non-admin user (visitor) and does not call the service', async () => {
    const updateRole = jest.fn();
    const app = buildApp({ updateRole });
    const res = await request(app)
      .put('/api/admin/users/1/role')
      .set('Authorization', `Bearer ${validToken('visitor')}`)
      .send({ role: 'curator' });
    expect(res.status).toBe(403);
    expect(updateRole).not.toHaveBeenCalled();
  });

  it('returns 403 for a curator (not admin) and does not call the service', async () => {
    const updateRole = jest.fn();
    const app = buildApp({ updateRole });
    const res = await request(app)
      .put('/api/admin/users/1/role')
      .set('Authorization', `Bearer ${validToken('curator')}`)
      .send({ role: 'admin' });
    expect(res.status).toBe(403);
    expect(updateRole).not.toHaveBeenCalled();
  });

  it('updates role and returns 200 for an admin user', async () => {
    const updateRole = jest.fn().mockResolvedValue({ ...sampleUser, role: 'curator' });
    const app = buildApp({ updateRole });
    const res = await request(app)
      .put('/api/admin/users/1/role')
      .set('Authorization', `Bearer ${validToken('admin')}`)
      .send({ role: 'curator' });
    expect(res.status).toBe(200);
    expect(updateRole).toHaveBeenCalledWith('1', 'curator');
  });

  it('returns 400 when role is missing from the body and does not call the service', async () => {
    const updateRole = jest.fn();
    const app = buildApp({ updateRole });
    const res = await request(app)
      .put('/api/admin/users/1/role')
      .set('Authorization', `Bearer ${validToken('admin')}`)
      .send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
    expect(updateRole).not.toHaveBeenCalled();
  });

  it('handles a non-numeric userId by passing it as a string to the service', async () => {
    const updateRole = jest.fn().mockResolvedValue(sampleUser);
    const app = buildApp({ updateRole });
    const res = await request(app)
      .put('/api/admin/users/not-a-number/role')
      .set('Authorization', `Bearer ${validToken('admin')}`)
      .send({ role: 'curator' });
    expect(res.status).toBe(200);
    expect(updateRole).toHaveBeenCalledWith('not-a-number', 'curator');
  });

  it('returns 500 when the service throws', async () => {
    const app = buildApp({ updateRole: jest.fn().mockRejectedValue(new Error('update failed')) });
    const res = await request(app)
      .put('/api/admin/users/1/role')
      .set('Authorization', `Bearer ${validToken('admin')}`)
      .send({ role: 'curator' });
    expect(res.status).toBe(500);
  });
});
