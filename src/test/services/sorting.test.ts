import { Pool } from 'pg';
import { GalleryService } from '../../services/GalleryService';
import { ArtworkService } from '../../services/ArtworkService';
import { GalleryFilters } from '../../types/gallery';
import { ArtworkFilters } from '../../types/artwork';

const logger = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
};

// These values intentionally bypass TypeScript's unions, as HTTP input can.
type RuntimeFilters = { sortBy?: unknown; sortOrder?: unknown };

const queryCases = [
  {
    name: 'GalleryService.getAll',
    columns: ['created_at', 'name'],
    customDefault: 'DESC',
    run: (pool: Pool, filters?: RuntimeFilters) =>
      new GalleryService(pool, logger).getAll(filters as GalleryFilters),
  },
  {
    name: 'ArtworkService.getByGallery',
    columns: ['created_at', 'title', 'artist_name'],
    customDefault: 'DESC',
    run: (pool: Pool, filters?: RuntimeFilters) =>
      new ArtworkService(pool, logger).getByGallery('10', filters as ArtworkFilters),
  },
  {
    name: 'ArtworkService.getAll',
    columns: ['created_at', 'title', 'artist_name'],
    customDefault: 'ASC',
    run: (pool: Pool, filters?: RuntimeFilters) =>
      new ArtworkService(pool, logger).getAll(filters as ArtworkFilters),
  },
];

describe.each(queryCases)('$name sorting', ({ columns, customDefault, run }) => {
  let client: { query: jest.Mock; release: jest.Mock };
  let pool: Pool;

  beforeEach(() => {
    client = {
      query: jest.fn().mockResolvedValue({ rows: [] }),
      release: jest.fn(),
    };
    pool = { connect: jest.fn().mockResolvedValue(client) } as unknown as Pool;
  });

  it.each(columns.flatMap(column => ['ASC', 'DESC'].map(order => [column, order])))(
    'accepts allowed column %s with direction %s',
    async (sortBy, sortOrder) => {
      await expect(run(pool, { sortBy, sortOrder })).resolves.toEqual([]);
      expect(client.query.mock.calls[0][0]).toContain(` ORDER BY ${sortBy} ${sortOrder}`);
      expect(client.release).toHaveBeenCalledTimes(1);
    }
  );

  it.each(columns)('preserves the default direction for %s', async sortBy => {
    await run(pool, { sortBy });
    expect(client.query.mock.calls[0][0]).toContain(` ORDER BY ${sortBy} ${customDefault}`);
  });

  it('uses created_at DESC for empty filters', async () => {
    await run(pool, {});
    expect(client.query.mock.calls[0][0]).toContain(' ORDER BY created_at DESC');
  });

  it.each([
    'created_at; DROP TABLE galleries; --',
    'title DESC, (SELECT pg_sleep(10))',
    'unknown_column',
    'gallery_id',
    'name; --',
    'toString',
    '__proto__',
    'constructor',
    'CREATED_AT',
    'created_at ',
    '',
    null,
    123,
    ['created_at'],
    { toString: () => 'created_at; SELECT pg_sleep(10)' },
  ])('falls back for invalid sortBy %p', async sortBy => {
    await run(pool, { sortBy, sortOrder: 'ASC' });
    const [sql] = client.query.mock.calls[0];
    expect(sql.slice(sql.indexOf(' ORDER BY'))).toBe(' ORDER BY created_at DESC');
    expect(client.release).toHaveBeenCalledTimes(1);
  });

  it.each([
    'DESC; DROP TABLE artworks; --',
    'ASC NULLS FIRST',
    'asc',
    'desc',
    ' ASC',
    '',
    null,
    123,
    ['ASC'],
    { toString: () => 'ASC' },
  ])('falls back for invalid sortOrder %p', async sortOrder => {
    await run(pool, { sortBy: columns[1], sortOrder });
    const [sql] = client.query.mock.calls[0];
    expect(sql.slice(sql.indexOf(' ORDER BY'))).toBe(' ORDER BY created_at DESC');
  });
});

it('keeps gallery search, tags and pagination parameterized with invalid sorting', async () => {
  const client = {
    query: jest.fn().mockResolvedValue({ rows: [] }),
    release: jest.fn(),
  };
  const pool = { connect: jest.fn().mockResolvedValue(client) } as unknown as Pool;
  await new ArtworkService(pool, logger).getByGallery('10', {
    sortBy: 'title; DROP TABLE artworks' as ArtworkFilters['sortBy'],
    sortOrder: 'ASC',
    searchQuery: 'star',
    tags: ['blue', 'night'],
    limit: 5,
    offset: 10,
  });

  expect(client.query).toHaveBeenCalledWith(
    expect.stringContaining('ORDER BY created_at DESC LIMIT $5 OFFSET $6'),
    ['10', '%star%', 'blue', 'night', 5, 10]
  );
});
