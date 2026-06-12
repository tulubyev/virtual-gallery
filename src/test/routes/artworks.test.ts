// src/test/routes/artworks.test.ts
import express, { Application } from 'express';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { ArtworkController } from '../../controllers/ArtworkController';
import { createArtworkRoutes } from '../../routes/artworkRoutes';

const TEST_SECRET = 'artwork_route_test_jwt_secret';

beforeEach(() => {
  process.env.JWT_SECRET = TEST_SECRET;
});

afterEach(() => {
  delete process.env.JWT_SECRET;
  jest.clearAllMocks();
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

function makeArtworkService(overrides: Record<string, jest.Mock> = {}) {
  return {
    getAll: jest.fn().mockResolvedValue([]),
    getById: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue(sampleArtwork),
    update: jest.fn().mockResolvedValue(sampleArtwork),
    delete: jest.fn().mockResolvedValue(true),
    search: jest.fn().mockResolvedValue([]),
    getRecommended: jest.fn().mockResolvedValue([]),
    getSimilar: jest.fn().mockResolvedValue([]),
    filterByTags: jest.fn().mockResolvedValue([]),
    getAnalytics: jest.fn().mockResolvedValue({}),
    ...overrides,
  };
}

function buildApp(serviceOverrides: Record<string, jest.Mock> = {}): Application {
  const artworkService = makeArtworkService(serviceOverrides);
  const logger = { info: jest.fn(), error: jest.fn(), warn: jest.fn(), debug: jest.fn() };
  const controller = new ArtworkController(artworkService as any, logger as any);

  const app = express();
  app.use(express.json());
  app.use('/api/artworks', createArtworkRoutes(controller));
  return app;
}

function validToken(role = 'curator') {
  return jwt.sign({ userId: 1, email: 'test@example.com', role }, TEST_SECRET, {
    expiresIn: '1h',
  });
}

const sampleArtwork = {
  artwork_id: '1',
  title: 'Starry Night',
  artist_name: 'Van Gogh',
  year_created: 1889,
  medium: 'Oil on canvas',
  tags: ['impressionism'],
};

// ─── GET /api/artworks ────────────────────────────────────────────────────────

describe('GET /api/artworks', () => {
  it('returns 200 and an array', async () => {
    const app = buildApp({ getAll: jest.fn().mockResolvedValue([sampleArtwork]) });
    const res = await request(app).get('/api/artworks');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('returns an empty array when no artworks exist', async () => {
    const app = buildApp({ getAll: jest.fn().mockResolvedValue([]) });
    const res = await request(app).get('/api/artworks');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('returns 500 when the service throws', async () => {
    const app = buildApp({ getAll: jest.fn().mockRejectedValue(new Error('DB error')) });
    const res = await request(app).get('/api/artworks');
    expect(res.status).toBe(500);
    expect(res.body.error).toBeDefined();
  });

  it('does not require authentication', async () => {
    const app = buildApp();
    const res = await request(app).get('/api/artworks');
    expect(res.status).not.toBe(401);
  });
});

// ─── GET /api/artworks/:id ────────────────────────────────────────────────────

describe('GET /api/artworks/:id', () => {
  it('returns 200 and the artwork when found', async () => {
    const app = buildApp({ getById: jest.fn().mockResolvedValue(sampleArtwork) });
    const res = await request(app).get('/api/artworks/1');
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Starry Night');
  });

  it('returns 404 when the artwork is not found', async () => {
    const app = buildApp({ getById: jest.fn().mockResolvedValue(null) });
    const res = await request(app).get('/api/artworks/9999');
    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/not found/i);
  });

  it('passes the id string to the service', async () => {
    const getById = jest.fn().mockResolvedValue(sampleArtwork);
    const app = buildApp({ getById });
    await request(app).get('/api/artworks/42');
    expect(getById).toHaveBeenCalledWith('42');
  });

  it('returns 400 for a non-numeric id and does not call the service', async () => {
    const getById = jest.fn();
    const app = buildApp({ getById });
    const res = await request(app).get('/api/artworks/not-a-number');
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
    expect(getById).not.toHaveBeenCalled();
  });

  it('returns 500 when the service throws', async () => {
    const app = buildApp({ getById: jest.fn().mockRejectedValue(new Error('DB error')) });
    const res = await request(app).get('/api/artworks/1');
    expect(res.status).toBe(500);
  });

  it('does not require authentication', async () => {
    const app = buildApp({ getById: jest.fn().mockResolvedValue(sampleArtwork) });
    const res = await request(app).get('/api/artworks/1');
    expect(res.status).not.toBe(401);
  });
});

// ─── POST /api/artworks ───────────────────────────────────────────────────────

describe('POST /api/artworks', () => {
  const validPayload = {
    title: 'Starry Night',
    artist_name: 'Van Gogh',
    tags: ['impressionism'],
  };

  it('returns 401 without an Authorization header', async () => {
    const app = buildApp();
    const res = await request(app).post('/api/artworks').send(validPayload);
    expect(res.status).toBe(401);
  });

  it('returns 403 with an invalid token', async () => {
    const app = buildApp();
    const res = await request(app)
      .post('/api/artworks')
      .set('Authorization', 'Bearer bad.token.here')
      .send(validPayload);
    expect(res.status).toBe(403);
  });

  it('returns 403 with an expired token', async () => {
    const app = buildApp();
    const expired = jwt.sign({ userId: 1, role: 'curator' }, TEST_SECRET, { expiresIn: '-1s' });
    const res = await request(app)
      .post('/api/artworks')
      .set('Authorization', `Bearer ${expired}`)
      .send(validPayload);
    expect(res.status).toBe(403);
  });

  it('returns 400 when title is missing and does not call the service', async () => {
    const create = jest.fn();
    const app = buildApp({ create });
    const res = await request(app)
      .post('/api/artworks')
      .set('Authorization', `Bearer ${validToken()}`)
      .send({ artist_name: 'Van Gogh', tags: [] });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
    expect(create).not.toHaveBeenCalled();
  });

  it('returns 400 when artist_name is missing and does not call the service', async () => {
    const create = jest.fn();
    const app = buildApp({ create });
    const res = await request(app)
      .post('/api/artworks')
      .set('Authorization', `Bearer ${validToken()}`)
      .send({ title: 'Starry Night', tags: [] });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
    expect(create).not.toHaveBeenCalled();
  });

  it('returns 400 for an empty body and does not call the service', async () => {
    const create = jest.fn();
    const app = buildApp({ create });
    const res = await request(app)
      .post('/api/artworks')
      .set('Authorization', `Bearer ${validToken()}`)
      .send({});
    expect(res.status).toBe(400);
    expect(create).not.toHaveBeenCalled();
  });

  it('creates an artwork and returns 201 with a valid token and all required fields', async () => {
    const create = jest.fn().mockResolvedValue(sampleArtwork);
    const app = buildApp({ create });
    const res = await request(app)
      .post('/api/artworks')
      .set('Authorization', `Bearer ${validToken()}`)
      .send(validPayload);
    expect(res.status).toBe(201);
    expect(create).toHaveBeenCalledWith(validPayload);
  });

  it('forwards the full request body to the service', async () => {
    const create = jest.fn().mockResolvedValue(sampleArtwork);
    const app = buildApp({ create });
    const payload = { title: 'Mona Lisa', artist_name: 'Da Vinci', tags: [], medium: 'Oil' };
    await request(app)
      .post('/api/artworks')
      .set('Authorization', `Bearer ${validToken()}`)
      .send(payload);
    expect(create).toHaveBeenCalledWith(expect.objectContaining({ title: 'Mona Lisa', medium: 'Oil' }));
  });

  it('returns 500 when the service throws', async () => {
    const app = buildApp({ create: jest.fn().mockRejectedValue(new Error('insert failed')) });
    const res = await request(app)
      .post('/api/artworks')
      .set('Authorization', `Bearer ${validToken()}`)
      .send(validPayload);
    expect(res.status).toBe(500);
  });
});

// ─── PUT /api/artworks/:id ────────────────────────────────────────────────────

describe('PUT /api/artworks/:id', () => {
  const updatePayload = { title: 'Updated Title' };

  it('returns 401 without a token', async () => {
    const app = buildApp();
    const res = await request(app).put('/api/artworks/1').send(updatePayload);
    expect(res.status).toBe(401);
  });

  it('returns 403 with an invalid token', async () => {
    const app = buildApp();
    const res = await request(app)
      .put('/api/artworks/1')
      .set('Authorization', 'Bearer invalid.token')
      .send(updatePayload);
    expect(res.status).toBe(403);
  });

  it('returns 400 for a non-numeric id and does not call the service', async () => {
    const update = jest.fn();
    const app = buildApp({ update });
    const res = await request(app)
      .put('/api/artworks/not-a-number')
      .set('Authorization', `Bearer ${validToken()}`)
      .send(updatePayload);
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
    expect(update).not.toHaveBeenCalled();
  });

  it('updates the artwork and returns 200 with a valid token and numeric id', async () => {
    const updated = { ...sampleArtwork, title: 'Updated Title' };
    const update = jest.fn().mockResolvedValue(updated);
    const app = buildApp({ update });
    const res = await request(app)
      .put('/api/artworks/1')
      .set('Authorization', `Bearer ${validToken()}`)
      .send(updatePayload);
    expect(res.status).toBe(200);
    expect(update).toHaveBeenCalledWith('1', updatePayload);
  });

  it('returns 500 when the service throws', async () => {
    const app = buildApp({ update: jest.fn().mockRejectedValue(new Error('update failed')) });
    const res = await request(app)
      .put('/api/artworks/1')
      .set('Authorization', `Bearer ${validToken()}`)
      .send(updatePayload);
    expect(res.status).toBe(500);
  });
});

// ─── DELETE /api/artworks/:id ─────────────────────────────────────────────────

describe('DELETE /api/artworks/:id', () => {
  it('returns 401 without a token', async () => {
    const app = buildApp();
    const res = await request(app).delete('/api/artworks/1');
    expect(res.status).toBe(401);
  });

  it('returns 403 with an invalid token', async () => {
    const app = buildApp();
    const res = await request(app)
      .delete('/api/artworks/1')
      .set('Authorization', 'Bearer invalid.token');
    expect(res.status).toBe(403);
  });

  it('returns 400 for a non-numeric id and does not call the service', async () => {
    const del = jest.fn();
    const app = buildApp({ delete: del });
    const res = await request(app)
      .delete('/api/artworks/not-a-number')
      .set('Authorization', `Bearer ${validToken()}`);
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
    expect(del).not.toHaveBeenCalled();
  });

  it('deletes the artwork and returns a success message with a valid token', async () => {
    const del = jest.fn().mockResolvedValue(true);
    const app = buildApp({ delete: del });
    const res = await request(app)
      .delete('/api/artworks/1')
      .set('Authorization', `Bearer ${validToken()}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
    expect(del).toHaveBeenCalledWith('1');
  });

  it('returns 500 when the service throws', async () => {
    const app = buildApp({ delete: jest.fn().mockRejectedValue(new Error('delete failed')) });
    const res = await request(app)
      .delete('/api/artworks/1')
      .set('Authorization', `Bearer ${validToken()}`);
    expect(res.status).toBe(500);
  });
});
