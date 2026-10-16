jest.mock('../../config/database', () => ({ __esModule: true, default: { query: jest.fn() } }));
jest.mock('../../services/gallery-config', () => ({
  getActiveConfig: jest.fn(async () => ({ config: { rooms: [{ id: 'a', name: 'A', width: 20, depth: 20, height: 5 }, { id: 'b', name: 'B', width: 3, depth: 3, height: 3 }] } })),
}));
import { getOverview } from '../../services/dashboardStats';

type Row = Record<string, unknown>;
/** Подставной SQL: отвечает по характерному куску запроса. */
function fakeQuery(overrides: Record<string, Row[] | Error> = {}) {
  const calls: string[] = [];
  const table: Array<[RegExp, Row[]]> = [
    [/UNION ALL/, [{ type: 'artwork', text: 'x', at: '2026-01-02T00:00:00Z' }]],
    [/JOIN user_interactions/, [{ id: 1, title: 'T', artist: 'A', views: 5, likes: 2 }]],
    [/FROM users WHERE TRUE/, [{ total: 10, last30: 4, prev30: 2 }]],
    [/FROM users GROUP BY role/, [{ role: 'admin', n: 1 }, { role: 'user', n: 9 }]],
    [/FROM artworks WHERE TRUE/, [{ total: 50, last30: 5, prev30: 10 }]],
    [/created_at >= NOW\(\) - INTERVAL '1 day'/, [{ n: 3 }]],
    [/information_schema/, [{ '?column?': 1 }]],
    [/GROUP BY status/, [{ status: 'published', n: 40 }, { status: 'pending', n: 10 }]],
    [/interaction_type = 'view'/, [{ total: 100, last30: 30, prev30: 20 }]],
    [/interaction_type = 'like'/, [{ total: 7, last30: 1, prev30: 0 }]],
    [/FROM collections/, [{ n: 6 }]],
    [/FROM auctions/, [{ active: 2, scheduled: 1 }]],
    [/FROM auction_lots/, [{ n: 9 }]],
    [/FROM bids/, [{ n: 4, volume: '1500.50' }]],
  ];
  const q = async (sql: string) => {
    calls.push(sql);
    for (const [key, val] of Object.entries(overrides)) {
      if (sql.includes(key)) { if (val instanceof Error) throw val; return val; }
    }
    const hit = table.find(([re]) => re.test(sql));
    return hit ? hit[1] : [];
  };
  return { q, calls };
}

describe('getOverview', () => {
  const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
  afterAll(() => warn.mockRestore());

  it('собирает реальные числа из ответов БД', async () => {
    const { q } = fakeQuery();
    const o = await getOverview({ includeUsers: true, query: q });
    expect(o.users).toEqual({ total: 10, last30: 4, prev30: 2, byRole: { admin: 1, user: 9 } });
    expect(o.artworks).toEqual({ total: 50, last30: 5, prev30: 10, today: 3, byStatus: { published: 40, pending: 10 } });
    expect(o.engagement?.views).toEqual({ total: 100, last30: 30, prev30: 20 });
    expect(o.collections).toEqual({ total: 6 });
    expect(o.auctions).toEqual({ active: 2, scheduled: 1, lots: 9, bids: 4, volume: 1500.5 });
    expect(o.topArtworks).toEqual([{ id: 1, title: 'T', artist: 'A', views: 5, likes: 2 }]);
    expect(o.recentActivity?.[0].at).toBe('2026-01-02T00:00:00.000Z');
    expect(o.rooms?.total).toBe(2);
    expect(o.rooms!.capacity).toBeGreaterThan(5);
  });

  it('данные о пользователях не запрашиваются, если они не положены', async () => {
    const { q, calls } = fakeQuery();
    const o = await getOverview({ includeUsers: false, query: q });
    expect(o.users).toBeNull();
    expect(calls.some(s => /\busers\b/.test(s))).toBe(false);
  });

  it('если блока нет в схеме — null, остальное считается', async () => {
    const { q } = fakeQuery({ 'FROM auctions': new Error('relation "auctions" does not exist') });
    const o = await getOverview({ includeUsers: true, query: q });
    expect(o.auctions).toBeNull();
    expect(o.artworks?.total).toBe(50);
  });

  it('нет колонки status → byStatus = null, а не выдуманные нули', async () => {
    const { q } = fakeQuery({ information_schema: [] });
    const o = await getOverview({ includeUsers: true, query: q });
    expect(o.artworks?.byStatus).toBeNull();
  });
});
