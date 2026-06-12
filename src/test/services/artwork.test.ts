// src/test/services/artwork.test.ts
import { Pool } from 'pg';
import { ArtworkService } from '../../services/ArtworkService';
import { Artwork, CreateArtworkDto, UpdateArtworkDto, ArtworkFilters } from '../../types/artwork';

// ─── Shared fixtures ──────────────────────────────────────────────────────────

const sampleArtwork: Artwork = {
  artwork_id: '1',
  title: 'Starry Night',
  artist_name: 'Van Gogh',
  year_created: 1889,
  medium: 'Oil on canvas',
  dimensions: '73.7 cm × 92.1 cm',
  style: 'Post-Impressionism',
  description: 'A swirling night sky',
  image_url: 'https://example.com/starry-night.jpg',
  tags: ['impressionism', 'night'],
  gallery_id: '10',
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
  return new ArtworkService(pool, mockLogger as any, cache);
}

beforeEach(() => {
  jest.clearAllMocks();
});

// ─── getById ──────────────────────────────────────────────────────────────────

describe('ArtworkService.getById', () => {
  it('returns the artwork when found', async () => {
    const client = makeClient([sampleArtwork]);
    const service = makeService(makePool(client));

    const result = await service.getById('1');

    expect(result).toEqual(sampleArtwork);
    expect(client.query).toHaveBeenCalledWith(
      expect.stringContaining('WHERE artwork_id = $1'),
      ['1']
    );
    expect(client.release).toHaveBeenCalled();
  });

  it('returns null when the artwork does not exist', async () => {
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

    await expect(service.getById('1')).rejects.toThrow('DB error');
    expect(client.release).toHaveBeenCalled();
  });

  it('returns cached value on second call when cache is provided', async () => {
    const client = makeClient([sampleArtwork]);
    const cache = {
      get: jest.fn().mockResolvedValueOnce(null).mockResolvedValueOnce(sampleArtwork),
      set: jest.fn().mockResolvedValue(undefined),
      delete: jest.fn(),
    };
    const service = makeService(makePool(client), cache);

    const first = await service.getById('1');
    const second = await service.getById('1');

    expect(first).toEqual(sampleArtwork);
    expect(second).toEqual(sampleArtwork);
    expect(cache.set).toHaveBeenCalledTimes(1);
    expect(client.query).toHaveBeenCalledTimes(1);
  });
});

// ─── getByGallery ─────────────────────────────────────────────────────────────

describe('ArtworkService.getByGallery', () => {
  it('returns all artworks for a gallery with no filters', async () => {
    const client = makeClient([sampleArtwork]);
    const service = makeService(makePool(client));

    const result = await service.getByGallery('10');

    expect(result).toEqual([sampleArtwork]);
    const [sql, params] = client.query.mock.calls[0];
    expect(sql).toContain('WHERE gallery_id = $1');
    expect(params).toEqual(['10']);
    expect(client.release).toHaveBeenCalled();
  });

  it('appends an ILIKE clause when searchQuery is provided', async () => {
    const client = makeClient([sampleArtwork]);
    const service = makeService(makePool(client));

    await service.getByGallery('10', { searchQuery: 'star' });

    const [sql, params] = client.query.mock.calls[0];
    expect(sql).toMatch(/ILIKE/i);
    expect(params).toContain('%star%');
  });

  it('appends an array overlap clause when tags are provided', async () => {
    const client = makeClient([sampleArtwork]);
    const service = makeService(makePool(client));

    await service.getByGallery('10', { tags: ['impressionism'] });

    const [sql, params] = client.query.mock.calls[0];
    expect(sql).toContain('&&');
    expect(params).toContain('impressionism');
  });

  it('applies LIMIT and OFFSET when pagination filters are provided', async () => {
    const client = makeClient([sampleArtwork]);
    const service = makeService(makePool(client));

    await service.getByGallery('10', { limit: 5, offset: 10 });

    const [sql, params] = client.query.mock.calls[0];
    expect(sql).toContain('LIMIT');
    expect(sql).toContain('OFFSET');
    expect(params).toContain(5);
    expect(params).toContain(10);
  });

  it('applies ORDER BY when sort filters are provided', async () => {
    const client = makeClient([sampleArtwork]);
    const service = makeService(makePool(client));

    await service.getByGallery('10', { sortBy: 'title', sortOrder: 'ASC' });

    const [sql] = client.query.mock.calls[0];
    expect(sql).toContain('ORDER BY title ASC');
  });

  it('combines searchQuery and tags filters together', async () => {
    const client = makeClient([sampleArtwork]);
    const service = makeService(makePool(client));

    await service.getByGallery('10', { searchQuery: 'van', tags: ['night'] });

    const [sql, params] = client.query.mock.calls[0];
    expect(sql).toMatch(/ILIKE/i);
    expect(sql).toContain('&&');
    expect(params).toContain('%van%');
    expect(params).toContain('night');
  });

  it('releases the client when the query succeeds', async () => {
    const client = makeClient([]);
    const service = makeService(makePool(client));

    await service.getByGallery('10');
    expect(client.release).toHaveBeenCalled();
  });

  it('releases the client when the query throws', async () => {
    const client = makeClient([]);
    client.query.mockRejectedValueOnce(new Error('timeout'));
    const service = makeService(makePool(client));

    await expect(service.getByGallery('10')).rejects.toThrow('timeout');
    expect(client.release).toHaveBeenCalled();
  });
});

// ─── create ───────────────────────────────────────────────────────────────────

describe('ArtworkService.create', () => {
  const dto: CreateArtworkDto = {
    title: 'Mona Lisa',
    artist_name: 'Leonardo da Vinci',
    tags: ['portrait', 'renaissance'],
    gallery_id: '10',
  };

  it('inserts and returns the new artwork', async () => {
    const created = { ...sampleArtwork, artwork_id: '2', title: 'Mona Lisa' };
    const client = makeClient([created]);
    const service = makeService(makePool(client));

    const result = await service.create(dto);

    expect(result).toEqual(created);
    expect(client.query).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO artworks'),
      expect.any(Array)
    );
  });

  it('passes tags as a PostgreSQL array literal', async () => {
    const client = makeClient([sampleArtwork]);
    const service = makeService(makePool(client));

    await service.create(dto);

    const callArgs = client.query.mock.calls[0][1] as any[];
    const tagsArg = callArgs.find((v: any) => typeof v === 'string' && v.startsWith('{'));
    expect(tagsArg).toMatch(/^\{/);
    expect(tagsArg).toMatch(/\}$/);
  });

  it('invalidates the gallery cache after creation', async () => {
    const created = { ...sampleArtwork, gallery_id: '10' };
    const client = makeClient([created]);
    const cache = {
      get: jest.fn().mockResolvedValue(null),
      set: jest.fn().mockResolvedValue(undefined),
      delete: jest.fn().mockResolvedValue(undefined),
    };
    const service = makeService(makePool(client), cache);

    await service.create(dto);

    expect(cache.delete).toHaveBeenCalledWith('artworks:all');
    expect(cache.delete).toHaveBeenCalledWith('artworks:gallery:10');
  });

  it('releases the client after creation', async () => {
    const client = makeClient([sampleArtwork]);
    const service = makeService(makePool(client));

    await service.create(dto);
    expect(client.release).toHaveBeenCalled();
  });
});

// ─── update ───────────────────────────────────────────────────────────────────

describe('ArtworkService.update', () => {
  it('returns the updated artwork on success', async () => {
    const updated = { ...sampleArtwork, title: 'Starry Night (Revised)' };
    const client = makeClient([updated]);
    const service = makeService(makePool(client));

    const result = await service.update('1', { title: 'Starry Night (Revised)' });

    expect(result.title).toBe('Starry Night (Revised)');
  });

  it('throws when the artwork does not exist', async () => {
    const client = makeClient([]);
    const service = makeService(makePool(client));

    await expect(service.update('999', { title: 'Ghost' })).rejects.toThrow('not found');
  });

  it('invalidates the artwork and gallery cache on update', async () => {
    const updated = { ...sampleArtwork, gallery_id: '10' };
    const client = makeClient([updated]);
    const cache = {
      get: jest.fn().mockResolvedValue(null),
      set: jest.fn().mockResolvedValue(undefined),
      delete: jest.fn().mockResolvedValue(undefined),
    };
    const service = makeService(makePool(client), cache);

    await service.update('1', { title: 'New Title' });

    expect(cache.delete).toHaveBeenCalledWith('artwork:1');
    expect(cache.delete).toHaveBeenCalledWith('artworks:gallery:10');
  });

  it('releases the client after update', async () => {
    const client = makeClient([sampleArtwork]);
    const service = makeService(makePool(client));

    await service.update('1', { title: 'Changed' });
    expect(client.release).toHaveBeenCalled();
  });
});

// ─── delete ───────────────────────────────────────────────────────────────────

describe('ArtworkService.delete', () => {
  it('returns true when the artwork is successfully deleted', async () => {
    const client = makeClient([{ artwork_id: '1' }]);
    const service = makeService(makePool(client));

    const result = await service.delete('1');

    expect(result).toBe(true);
    expect(client.query).toHaveBeenCalledWith(
      expect.stringContaining('DELETE FROM artworks'),
      ['1']
    );
  });

  it('throws when the artwork does not exist', async () => {
    const client = makeClient([]);
    const service = makeService(makePool(client));

    await expect(service.delete('999')).rejects.toThrow('not found');
  });

  it('invalidates the artwork cache on delete', async () => {
    const client = makeClient([{ artwork_id: '1' }]);
    const cache = {
      get: jest.fn().mockResolvedValue(null),
      set: jest.fn().mockResolvedValue(undefined),
      delete: jest.fn().mockResolvedValue(undefined),
    };
    const service = makeService(makePool(client), cache);

    await service.delete('1');

    expect(cache.delete).toHaveBeenCalledWith('artwork:1');
    expect(cache.delete).toHaveBeenCalledWith('artworks:all');
  });

  it('releases the client after delete', async () => {
    const client = makeClient([{ artwork_id: '1' }]);
    const service = makeService(makePool(client));

    await service.delete('1');
    expect(client.release).toHaveBeenCalled();
  });
});

// ─── search ───────────────────────────────────────────────────────────────────

describe('ArtworkService.search', () => {
  it('returns artworks matching the search query', async () => {
    const client = makeClient([sampleArtwork]);
    const service = makeService(makePool(client));

    const result = await service.search('starry');

    expect(result).toEqual([sampleArtwork]);
    const [sql, params] = client.query.mock.calls[0];
    expect(sql).toMatch(/ILIKE/i);
    expect(params).toContain('%starry%');
  });

  it('applies tag filter when provided', async () => {
    const client = makeClient([sampleArtwork]);
    const service = makeService(makePool(client));

    await service.search('night', { tags: ['impressionism'] });

    const [sql, params] = client.query.mock.calls[0];
    expect(sql).toContain('&&');
    expect(params).toContain('impressionism');
  });

  it('applies LIMIT and OFFSET when pagination is provided', async () => {
    const client = makeClient([]);
    const service = makeService(makePool(client));

    await service.search('art', { limit: 3, offset: 6 });

    const [sql, params] = client.query.mock.calls[0];
    expect(sql).toContain('LIMIT');
    expect(sql).toContain('OFFSET');
    expect(params).toContain(3);
    expect(params).toContain(6);
  });

  it('returns an empty array when nothing matches', async () => {
    const client = makeClient([]);
    const service = makeService(makePool(client));

    const result = await service.search('xyzzy');

    expect(result).toEqual([]);
  });

  it('releases the client after the search', async () => {
    const client = makeClient([]);
    const service = makeService(makePool(client));

    await service.search('test');
    expect(client.release).toHaveBeenCalled();
  });
});
