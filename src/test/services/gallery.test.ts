// src/test/services/gallery.test.ts
import { Pool } from 'pg';
import { GalleryService } from '../../services/GalleryService';
import { Gallery, CreateGalleryDto, UpdateGalleryDto, GalleryFilters } from '../../types/gallery';
import { Artwork } from '../../types/artwork';

// ─── Shared fixtures ──────────────────────────────────────────────────────────

const sampleGallery: Gallery = {
  gallery_id: '10',
  name: 'Modern Art Wing',
  description: 'A collection of modern artworks',
  opening_hours: '9:00–18:00',
  image_url: 'https://example.com/gallery.jpg',
};

const sampleArtwork: Artwork = {
  artwork_id: '1',
  title: 'Starry Night',
  artist_name: 'Van Gogh',
  tags: ['impressionism'],
  gallery_id: '10',
};

const sampleRoom = {
  room_id: '5',
  gallery_id: '10',
  name: 'East Hall',
  description: 'East-facing hall',
  capacity: 30,
};

const mockLogger = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
};

function makeClient(rows: any[] = []) {
  return {
    query: jest.fn().mockResolvedValue({ rows, rowCount: rows.length }),
    release: jest.fn(),
  };
}

function makePool(client: ReturnType<typeof makeClient>) {
  return { connect: jest.fn().mockResolvedValue(client) } as unknown as Pool;
}

function makeService(pool: Pool, cache?: any) {
  return new GalleryService(pool, mockLogger as any, cache);
}

beforeEach(() => {
  jest.clearAllMocks();
});

// ─── getById ──────────────────────────────────────────────────────────────────

describe('GalleryService.getById', () => {
  it('returns the gallery when found', async () => {
    const client = makeClient([sampleGallery]);
    const service = makeService(makePool(client));

    const result = await service.getById('10');

    expect(result).toEqual(sampleGallery);
    expect(client.query).toHaveBeenCalledWith(
      expect.stringContaining('WHERE gallery_id = $1'),
      ['10']
    );
    expect(client.release).toHaveBeenCalled();
  });

  it('returns null when the gallery does not exist', async () => {
    const client = makeClient([]);
    const service = makeService(makePool(client));

    const result = await service.getById('999');

    expect(result).toBeNull();
    expect(client.release).toHaveBeenCalled();
  });

  it('releases the client even if the query throws', async () => {
    const client = makeClient([]);
    client.query.mockRejectedValueOnce(new Error('DB error'));
    const service = makeService(makePool(client));

    await expect(service.getById('10')).rejects.toThrow('DB error');
    expect(client.release).toHaveBeenCalled();
  });

  it('returns cached value on second call when cache is provided', async () => {
    const client = makeClient([sampleGallery]);
    const cache = {
      get: jest.fn().mockResolvedValueOnce(null).mockResolvedValueOnce(sampleGallery),
      set: jest.fn().mockResolvedValue(undefined),
      delete: jest.fn(),
    };
    const service = makeService(makePool(client), cache);

    const first = await service.getById('10');
    const second = await service.getById('10');

    expect(first).toEqual(sampleGallery);
    expect(second).toEqual(sampleGallery);
    expect(cache.set).toHaveBeenCalledTimes(1);
    expect(client.query).toHaveBeenCalledTimes(1);
  });
});

// ─── getAll ───────────────────────────────────────────────────────────────────

describe('GalleryService.getAll', () => {
  it('returns all galleries with default ordering when no filters given', async () => {
    const client = makeClient([sampleGallery]);
    const service = makeService(makePool(client));

    const result = await service.getAll();

    expect(result).toEqual([sampleGallery]);
    const [sql] = client.query.mock.calls[0];
    expect(sql).toContain('ORDER BY created_at DESC');
  });

  it('applies ORDER BY when sort filters are provided', async () => {
    const client = makeClient([sampleGallery]);
    const service = makeService(makePool(client));

    await service.getAll({ sortBy: 'name', sortOrder: 'ASC' });

    const [sql] = client.query.mock.calls[0];
    expect(sql).toContain('ORDER BY name ASC');
  });

  it('applies LIMIT when limit filter is provided', async () => {
    const client = makeClient([sampleGallery]);
    const service = makeService(makePool(client));

    await service.getAll({ limit: 5 });

    const [sql, params] = client.query.mock.calls[0];
    expect(sql).toContain('LIMIT');
    expect(params).toContain(5);
  });

  it('applies LIMIT and OFFSET when both pagination filters are provided', async () => {
    const client = makeClient([]);
    const service = makeService(makePool(client));

    await service.getAll({ limit: 10, offset: 20 });

    const [sql, params] = client.query.mock.calls[0];
    expect(sql).toContain('LIMIT');
    expect(sql).toContain('OFFSET');
    expect(params).toContain(10);
    expect(params).toContain(20);
  });

  it('returns an empty array when there are no galleries', async () => {
    const client = makeClient([]);
    const service = makeService(makePool(client));

    const result = await service.getAll();

    expect(result).toEqual([]);
  });

  it('releases the client after the query', async () => {
    const client = makeClient([]);
    const service = makeService(makePool(client));

    await service.getAll();
    expect(client.release).toHaveBeenCalled();
  });

  it('releases the client when the query throws', async () => {
    const client = makeClient([]);
    client.query.mockRejectedValueOnce(new Error('timeout'));
    const service = makeService(makePool(client));

    await expect(service.getAll()).rejects.toThrow('timeout');
    expect(client.release).toHaveBeenCalled();
  });
});

// ─── create ───────────────────────────────────────────────────────────────────

describe('GalleryService.create', () => {
  const dto: CreateGalleryDto = {
    name: 'Sculpture Garden',
    description: 'Outdoor sculpture collection',
    opening_hours: '10:00–17:00',
  };

  it('inserts and returns the new gallery', async () => {
    const created = { ...sampleGallery, gallery_id: '11', name: 'Sculpture Garden' };
    const client = makeClient([created]);
    const service = makeService(makePool(client));

    const result = await service.create(dto);

    expect(result).toEqual(created);
    expect(client.query).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO galleries'),
      expect.arrayContaining(['Sculpture Garden'])
    );
  });

  it('invalidates the galleries:all cache after creation', async () => {
    const client = makeClient([sampleGallery]);
    const cache = {
      get: jest.fn().mockResolvedValue(null),
      set: jest.fn().mockResolvedValue(undefined),
      delete: jest.fn().mockResolvedValue(undefined),
    };
    const service = makeService(makePool(client), cache);

    await service.create(dto);

    expect(cache.delete).toHaveBeenCalledWith('galleries:all');
  });

  it('releases the client after creation', async () => {
    const client = makeClient([sampleGallery]);
    const service = makeService(makePool(client));

    await service.create(dto);
    expect(client.release).toHaveBeenCalled();
  });

  it('releases the client when the insert throws', async () => {
    const client = makeClient([]);
    client.query.mockRejectedValueOnce(new Error('constraint violation'));
    const service = makeService(makePool(client));

    await expect(service.create(dto)).rejects.toThrow('constraint violation');
    expect(client.release).toHaveBeenCalled();
  });
});

// ─── update ───────────────────────────────────────────────────────────────────

describe('GalleryService.update', () => {
  it('returns the updated gallery on success', async () => {
    const updated = { ...sampleGallery, name: 'Renamed Wing' };
    const client = makeClient([updated]);
    const service = makeService(makePool(client));

    const result = await service.update('10', { name: 'Renamed Wing' });

    expect(result.name).toBe('Renamed Wing');
  });

  it('throws when the gallery does not exist', async () => {
    const client = makeClient([]);
    const service = makeService(makePool(client));

    await expect(service.update('999', { name: 'Ghost' })).rejects.toThrow('not found');
  });

  it('invalidates the gallery and galleries:all cache on update', async () => {
    const updated = { ...sampleGallery };
    const client = makeClient([updated]);
    const cache = {
      get: jest.fn().mockResolvedValue(null),
      set: jest.fn().mockResolvedValue(undefined),
      delete: jest.fn().mockResolvedValue(undefined),
    };
    const service = makeService(makePool(client), cache);

    await service.update('10', { name: 'Updated Name' });

    expect(cache.delete).toHaveBeenCalledWith('gallery:10');
    expect(cache.delete).toHaveBeenCalledWith('galleries:all');
  });

  it('updates description, opening_hours, and image_url fields', async () => {
    const updated = {
      ...sampleGallery,
      description: 'Updated description',
      opening_hours: '10:00–20:00',
      image_url: 'https://example.com/new.jpg',
    };
    const client = makeClient([updated]);
    const service = makeService(makePool(client));

    const result = await service.update('10', {
      description: 'Updated description',
      opening_hours: '10:00–20:00',
      image_url: 'https://example.com/new.jpg',
    });

    expect(result.description).toBe('Updated description');
    expect(result.opening_hours).toBe('10:00–20:00');
    expect(result.image_url).toBe('https://example.com/new.jpg');
  });

  it('releases the client after update', async () => {
    const client = makeClient([sampleGallery]);
    const service = makeService(makePool(client));

    await service.update('10', { name: 'Changed' });
    expect(client.release).toHaveBeenCalled();
  });
});

// ─── delete ───────────────────────────────────────────────────────────────────

describe('GalleryService.delete', () => {
  it('returns true when the gallery is successfully deleted', async () => {
    const client = makeClient([{ gallery_id: '10' }]);
    const service = makeService(makePool(client));

    const result = await service.delete('10');

    expect(result).toBe(true);
    expect(client.query).toHaveBeenCalledWith(
      expect.stringContaining('DELETE FROM galleries'),
      ['10']
    );
  });

  it('throws when the gallery does not exist', async () => {
    const client = makeClient([]);
    const service = makeService(makePool(client));

    await expect(service.delete('999')).rejects.toThrow('not found');
  });

  it('invalidates gallery and galleries:all caches on delete', async () => {
    const client = makeClient([{ gallery_id: '10' }]);
    const cache = {
      get: jest.fn().mockResolvedValue(null),
      set: jest.fn().mockResolvedValue(undefined),
      delete: jest.fn().mockResolvedValue(undefined),
    };
    const service = makeService(makePool(client), cache);

    await service.delete('10');

    expect(cache.delete).toHaveBeenCalledWith('gallery:10');
    expect(cache.delete).toHaveBeenCalledWith('galleries:all');
  });

  it('releases the client after delete', async () => {
    const client = makeClient([{ gallery_id: '10' }]);
    const service = makeService(makePool(client));

    await service.delete('10');
    expect(client.release).toHaveBeenCalled();
  });
});

// ─── getRooms ─────────────────────────────────────────────────────────────────

describe('GalleryService.getRooms', () => {
  it('returns the rooms for a gallery', async () => {
    const client = makeClient([sampleRoom]);
    const service = makeService(makePool(client));

    const result = await service.getRooms('10');

    expect(result).toEqual([sampleRoom]);
    expect(client.query).toHaveBeenCalledWith(
      expect.stringContaining('WHERE gallery_id = $1'),
      ['10']
    );
    expect(client.release).toHaveBeenCalled();
  });

  it('returns an empty array when no rooms exist for the gallery', async () => {
    const client = makeClient([]);
    const service = makeService(makePool(client));

    const result = await service.getRooms('99');

    expect(result).toEqual([]);
  });

  it('releases the client when the query throws', async () => {
    const client = makeClient([]);
    client.query.mockRejectedValueOnce(new Error('connection lost'));
    const service = makeService(makePool(client));

    await expect(service.getRooms('10')).rejects.toThrow('connection lost');
    expect(client.release).toHaveBeenCalled();
  });
});

// ─── getRecommendedArtworks ───────────────────────────────────────────────────

describe('GalleryService.getRecommendedArtworks', () => {
  it('returns artworks for the given gallery', async () => {
    const client = makeClient([sampleArtwork]);
    const service = makeService(makePool(client));

    const result = await service.getRecommendedArtworks('10');

    expect(result).toEqual([sampleArtwork]);
    const [sql, params] = client.query.mock.calls[0];
    expect(sql).toContain('WHERE gallery_id = $1');
    expect(params[0]).toBe('10');
  });

  it('passes the count as the LIMIT parameter', async () => {
    const client = makeClient([sampleArtwork]);
    const service = makeService(makePool(client));

    await service.getRecommendedArtworks('10', 3);

    const [, params] = client.query.mock.calls[0];
    expect(params[1]).toBe(3);
  });

  it('defaults to 5 artworks when no count is specified', async () => {
    const client = makeClient(Array(5).fill(sampleArtwork));
    const service = makeService(makePool(client));

    await service.getRecommendedArtworks('10');

    const [, params] = client.query.mock.calls[0];
    expect(params[1]).toBe(5);
  });

  it('releases the client after the query', async () => {
    const client = makeClient([sampleArtwork]);
    const service = makeService(makePool(client));

    await service.getRecommendedArtworks('10');
    expect(client.release).toHaveBeenCalled();
  });

  it('returns cached value on second call when cache is provided', async () => {
    const client = makeClient([sampleArtwork]);
    const cache = {
      get: jest.fn().mockResolvedValueOnce(null).mockResolvedValueOnce([sampleArtwork]),
      set: jest.fn().mockResolvedValue(undefined),
      delete: jest.fn(),
    };
    const service = makeService(makePool(client), cache);

    const first = await service.getRecommendedArtworks('10', 1);
    const second = await service.getRecommendedArtworks('10', 1);

    expect(first).toEqual([sampleArtwork]);
    expect(second).toEqual([sampleArtwork]);
    expect(cache.set).toHaveBeenCalledTimes(1);
    expect(client.query).toHaveBeenCalledTimes(1);
  });
});
