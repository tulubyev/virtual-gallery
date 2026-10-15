import express from 'express';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { GalleryController } from '../../controllers/GalleryController';
import { createGalleryRoutes } from '../../routes/galleryRoutes';
import { Gallery, IGalleryService } from '../../types/gallery';

const TEST_SECRET = 'gallery_route_test_jwt_secret';
const sampleGallery: Gallery = {
  gallery_id: '10',
  name: 'Modern Art Wing',
  description: 'Modern artworks',
  opening_hours: '09:00–18:00',
  image_url: 'https://example.com/gallery.jpg',
};
const validPayload = {
  name: sampleGallery.name,
  description: sampleGallery.description,
};
let originalSecret: string | undefined;

beforeEach(() => {
  originalSecret = process.env.JWT_SECRET;
  process.env.JWT_SECRET = TEST_SECRET;
});

afterEach(() => {
  if (originalSecret === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = originalSecret;
  jest.restoreAllMocks();
});

function buildApp() {
  const service: jest.Mocked<IGalleryService> = {
    initialize: jest.fn(),
    dispose: jest.fn(),
    getAll: jest.fn().mockResolvedValue([sampleGallery]),
    getById: jest.fn().mockResolvedValue(sampleGallery),
    create: jest.fn().mockResolvedValue(sampleGallery),
    update: jest.fn().mockResolvedValue(sampleGallery),
    delete: jest.fn().mockResolvedValue(true),
    getRooms: jest.fn().mockResolvedValue([]),
    getRecommendedArtworks: jest.fn().mockResolvedValue([]),
  };
  const logger = { info: jest.fn(), error: jest.fn(), warn: jest.fn(), debug: jest.fn() };
  const app = express();
  app.use(express.json());
  app.use('/api/galleries', createGalleryRoutes(new GalleryController(service, logger)));
  return { app, service, logger };
}

function token(expiresIn: '1h' | '-1s' = '1h') {
  return jwt.sign({ userId: 1, role: 'curator' }, TEST_SECRET, { expiresIn });
}

describe('GET /api/galleries', () => {
  it('returns the galleries without authentication', async () => {
    const { app, service } = buildApp();
    const res = await request(app).get('/api/galleries');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([sampleGallery]);
    expect(service.getAll).toHaveBeenCalledTimes(1);
    expect(service.getAll).toHaveBeenCalledWith();
  });

  it('returns an empty array when there are no galleries', async () => {
    const { app, service } = buildApp();
    service.getAll.mockResolvedValue([]);
    const res = await request(app).get('/api/galleries');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});

describe('GET /api/galleries/:id', () => {
  it('returns the gallery without authentication and forwards the string ID', async () => {
    const { app, service } = buildApp();
    const res = await request(app).get('/api/galleries/10');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(sampleGallery);
    expect(service.getById).toHaveBeenCalledWith('10');
  });

  it('returns 404 when the gallery does not exist', async () => {
    const { app, service } = buildApp();
    service.getById.mockResolvedValue(null);
    const res = await request(app).get('/api/galleries/999');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Gallery not found' });
    expect(service.getById).toHaveBeenCalledWith('999');
  });
});

describe('POST /api/galleries', () => {
  it('creates a gallery and forwards optional fields unchanged', async () => {
    const { app, service } = buildApp();
    const payload = {
      ...validPayload,
      location: 'East Wing',
      opening_hours: sampleGallery.opening_hours,
      image_url: sampleGallery.image_url,
    };
    const res = await request(app)
      .post('/api/galleries')
      .set('Authorization', `Bearer ${token()}`)
      .send(payload);
    expect(res.status).toBe(201);
    expect(res.body).toEqual(sampleGallery);
    expect(service.create).toHaveBeenCalledTimes(1);
    expect(service.create).toHaveBeenCalledWith(payload);
  });

  it('accepts a name without optional descriptive fields', async () => {
    const { app, service } = buildApp();
    const res = await request(app)
      .post('/api/galleries')
      .set('Authorization', `Bearer ${token()}`)
      .send({ name: 'New Gallery' });
    expect(res.status).toBe(201);
    expect(service.create).toHaveBeenCalledWith({ name: 'New Gallery' });
  });

  it.each([{}, { description: 'No name' }])(
    'rejects missing required name: %j',
    async (payload) => {
      const { app, service } = buildApp();
      const res = await request(app)
        .post('/api/galleries')
        .set('Authorization', `Bearer ${token()}`)
        .send(payload);
      expect(res.status).toBe(400);
      expect(res.body.error).toEqual(expect.any(String));
      expect(service.create).not.toHaveBeenCalled();
    }
  );
});

describe('PUT /api/galleries/:id', () => {
  it.each([{ name: 'Renamed' }, { description: 'Updated description' }, { opening_hours: '' }])(
    'accepts a partial update: %j',
    async (payload) => {
      const { app, service } = buildApp();
      const updated = { ...sampleGallery, ...payload };
      service.update.mockResolvedValue(updated);
      const res = await request(app)
        .put('/api/galleries/10')
        .set('Authorization', `Bearer ${token()}`)
        .send(payload);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(updated);
      expect(service.update).toHaveBeenCalledTimes(1);
      expect(service.update).toHaveBeenCalledWith('10', payload);
    }
  );

  it.each([{}, { unknown: 'not an editable field' }])(
    'rejects a body without any editable fields: %j',
    async (payload) => {
      const { app, service } = buildApp();
      const res = await request(app)
        .put('/api/galleries/10')
        .set('Authorization', `Bearer ${token()}`)
        .send(payload);
      expect(res.status).toBe(400);
      expect(res.body.error).toEqual(expect.any(String));
      expect(service.update).not.toHaveBeenCalled();
    }
  );
});

describe('DELETE /api/galleries/:id', () => {
  it('deletes the gallery and returns a success message', async () => {
    const { app, service } = buildApp();
    const res = await request(app)
      .delete('/api/galleries/10')
      .set('Authorization', `Bearer ${token()}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Gallery deleted successfully' });
    expect(service.delete).toHaveBeenCalledTimes(1);
    expect(service.delete).toHaveBeenCalledWith('10');
  });
});

describe.each(['post', 'put', 'delete'] as const)('%s authentication', (method) => {
  const path = method === 'post' ? '/api/galleries' : '/api/galleries/10';
  const serviceMethod = method === 'post' ? 'create' : method === 'put' ? 'update' : 'delete';

  it('rejects an unauthenticated request before calling the service', async () => {
    const { app, service } = buildApp();
    const res = await request(app)[method](path).send(validPayload);
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: 'Access token required' });
    expect(service[serviceMethod]).not.toHaveBeenCalled();
  });

  it.each(['invalid', 'expired'])('rejects an %s token', async (kind) => {
    const { app, service } = buildApp();
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const authorization = kind === 'expired' ? token('-1s') : 'bad.token.here';
    const res = await request(app)[method](path)
      .set('Authorization', `Bearer ${authorization}`)
      .send(validPayload);
    expect(res.status).toBe(403);
    expect(res.body).toEqual({ error: 'Invalid or expired token' });
    expect(service[serviceMethod]).not.toHaveBeenCalled();
  });
});

describe.each(['get', 'put', 'delete'] as const)('%s ID validation', (method) => {
  const serviceMethod = method === 'get' ? 'getById' : method === 'put' ? 'update' : 'delete';

  it.each(['not-a-number', '10abc', '1.5', '-1'])(
    'rejects invalid ID %s without calling the service',
    async (id) => {
      const { app, service } = buildApp();
      const req = request(app)[method](`/api/galleries/${id}`);
      if (method !== 'get') req.set('Authorization', `Bearer ${token()}`);
      const res = await req.send(validPayload);
      expect(res.status).toBe(400);
      expect(res.body.error).toEqual(expect.any(String));
      expect(service[serviceMethod]).not.toHaveBeenCalled();
    }
  );
});

const invalidFields = [
  { name: '' }, { name: '   ' }, { name: 42 }, { name: null },
  { name: [] }, { name: {} }, { name: false },
  { description: 42 }, { description: null }, { location: [] },
  { opening_hours: {} }, { image_url: false },
];

describe.each(['post', 'put'] as const)('%s body validation', (method) => {
  const path = method === 'post' ? '/api/galleries' : '/api/galleries/10';
  const serviceMethod = method === 'post' ? 'create' : 'update';

  it.each(invalidFields)('rejects invalid field types or blank names: %j', async (fields) => {
    const { app, service } = buildApp();
    const res = await request(app)[method](path)
      .set('Authorization', `Bearer ${token()}`)
      .send({ ...validPayload, ...fields });
    expect(res.status).toBe(400);
    expect(res.body.error).toEqual(expect.any(String));
    expect(service[serviceMethod]).not.toHaveBeenCalled();
  });

  it('rejects an array body', async () => {
    const { app, service } = buildApp();
    const res = await request(app)[method](path)
      .set('Authorization', `Bearer ${token()}`)
      .send([validPayload]);
    expect(res.status).toBe(400);
    expect(res.body.error).toEqual(expect.any(String));
    expect(service[serviceMethod]).not.toHaveBeenCalled();
  });
});

const errorCases = [
  { method: 'get', path: '/api/galleries', serviceMethod: 'getAll' },
  { method: 'get', path: '/api/galleries/10', serviceMethod: 'getById' },
  { method: 'post', path: '/api/galleries', serviceMethod: 'create' },
  { method: 'put', path: '/api/galleries/10', serviceMethod: 'update' },
  { method: 'delete', path: '/api/galleries/10', serviceMethod: 'delete' },
] as const;

describe.each(errorCases)('$method $path service failures', ({ method, path, serviceMethod }) => {
  it('returns a JSON 500 response and logs the error', async () => {
    const { app, service, logger } = buildApp();
    const error = new Error('Database unavailable');
    service[serviceMethod].mockRejectedValue(error);
    const res = await request(app)[method](path)
      .set('Authorization', `Bearer ${token()}`)
      .send(validPayload);
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: error.message });
    expect(service[serviceMethod]).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledWith(expect.any(String), error);
  });
});
