import express, { Request, Response } from 'express';
import pool from '../config/database';

const router = express.Router();

let tablesEnsured = false;

async function ensureTables(): Promise<void> {
  if (tablesEnsured) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS auctions (
      auction_id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      organizer_id INTEGER,
      gallery_id INTEGER,
      start_datetime TIMESTAMP,
      end_datetime TIMESTAMP,
      status VARCHAR(20) DEFAULT 'scheduled',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS auction_lots (
      lot_id SERIAL PRIMARY KEY,
      auction_id INTEGER REFERENCES auctions(auction_id) ON DELETE CASCADE,
      artwork_id INTEGER,
      starting_price DECIMAL(10, 2),
      reserve_price DECIMAL(10, 2),
      buy_now_price DECIMAL(10, 2),
      current_bid DECIMAL(10, 2) DEFAULT 0,
      highest_bidder_id INTEGER,
      status VARCHAR(20) DEFAULT 'available',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS bids (
      bid_id SERIAL PRIMARY KEY,
      lot_id INTEGER REFERENCES auction_lots(lot_id) ON DELETE CASCADE,
      user_id INTEGER,
      amount DECIMAL(10, 2) NOT NULL,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      is_winning BOOLEAN DEFAULT FALSE
    )
  `);
  tablesEnsured = true;
}

ensureTables().catch(err => console.error('Failed to ensure auction tables:', err.message));

// Публичные поля лота. Резервной цены здесь нет: её видят только создающие лот (ответ POST /:id/lots).
const LOT_PUBLIC_COLUMNS = `al.lot_id, al.auction_id, al.artwork_id, al.starting_price, al.buy_now_price,
  al.current_bid, al.status, al.created_at, al.updated_at`;
// Имя участника в публичных ответах — только первая буква
const MASKED = (col: string) => `CASE WHEN ${col} IS NULL THEN NULL ELSE LEFT(${col}, 1) || '***' END`;

const MAX_AMOUNT = 99999999.99; // DECIMAL(10, 2)

/** Сумма в рублях: конечное положительное число не больше предела, округляется до копеек. */
function parseAmount(v: unknown): number | null {
  const n = typeof v === 'number' ? v : typeof v === 'string' && v.trim() !== '' ? Number(v) : NaN;
  if (!Number.isFinite(n) || n <= 0 || n > MAX_AMOUNT) return null;
  return Math.round(n * 100) / 100;
}

/**
 * Ставка: одна транзакция, лот заблокирован до конца (FOR UPDATE), поэтому параллельные ставки
 * выстраиваются в очередь и current_bid не может уменьшиться. Ставившего определяет сессия, а не тело запроса.
 */
async function placeBid(req: Request, res: Response, lotIdRaw: unknown, amountRaw: unknown) {
  const userId = (req as any).user?.user_id;
  const lotId = Number(lotIdRaw);
  const amount = parseAmount(amountRaw);
  if (!userId) return res.status(401).json({ error: 'Требуется вход' });
  if (!Number.isInteger(lotId) || lotId < 1 || amount === null) {
    return res.status(400).json({ error: 'Укажите лот и сумму ставки (положительное число)', code: 'invalid_bid' });
  }

  let client: any;
  try {
    await ensureTables();
    client = await pool.connect();
    await client.query('BEGIN');

    const lotResult = await client.query(`
      SELECT al.lot_id, al.starting_price, al.current_bid, al.status,
        (a.status NOT IN ('ended', 'cancelled')
          AND (a.end_datetime IS NULL OR a.end_datetime >= NOW())
          AND (a.status = 'active' OR (a.start_datetime IS NOT NULL AND a.start_datetime <= NOW()))) AS is_open
      FROM auction_lots al JOIN auctions a ON al.auction_id = a.auction_id
      WHERE al.lot_id = $1
      FOR UPDATE OF al
    `, [lotId]);

    const fail = async (status: number, error: string, code: string, extra: object = {}) => {
      await client.query('ROLLBACK');
      return res.status(status).json({ error, code, ...extra });
    };

    if (lotResult.rows.length === 0) return await fail(404, 'Лот не найден', 'lot_not_found');
    const lot = lotResult.rows[0];
    if (!lot.is_open) return await fail(400, 'Торги по этому лоту сейчас не идут', 'auction_closed');
    if (lot.status !== 'available') return await fail(400, 'Лот недоступен для ставок', 'lot_unavailable');

    const current = Number(lot.current_bid) || 0;
    const start = Number(lot.starting_price) || 0;
    if (current > 0 ? amount <= current : amount < start) {
      const min = current > 0 ? current : start;
      return await fail(400,
        current > 0 ? `Ставка должна быть больше текущей: ${min}` : `Ставка не может быть ниже стартовой цены: ${min}`,
        'bid_too_low', { min_bid: min, current_bid: current });
    }

    await client.query('UPDATE bids SET is_winning = FALSE WHERE lot_id = $1 AND is_winning = TRUE', [lotId]);
    const bidResult = await client.query(
      `INSERT INTO bids (lot_id, user_id, amount, is_winning) VALUES ($1, $2, $3, TRUE)
       RETURNING bid_id, lot_id, amount, timestamp, is_winning`,
      [lotId, userId, amount]
    );
    await client.query(
      `UPDATE auction_lots SET current_bid = $1, highest_bidder_id = $2, updated_at = NOW() WHERE lot_id = $3`,
      [amount, userId, lotId]
    );
    await client.query('COMMIT');
    return res.json({ success: true, bid: bidResult.rows[0], current_bid: amount });
  } catch (error: any) {
    try { await client?.query('ROLLBACK'); } catch { /* соединение уже закрыто */ }
    console.error('[auctions] bid failed:', error.message);
    return res.status(500).json({ error: 'Не удалось принять ставку', code: 'bid_failed' });
  } finally {
    client?.release();
  }
}

router.get('/stats', async (_req: Request, res: Response) => {
  try {
    await ensureTables();
    const result = await pool.query(`
      SELECT
        (SELECT COUNT(*)::int FROM auctions) AS total_auctions,
        (SELECT COUNT(*)::int FROM auctions WHERE status = 'active' OR (start_datetime <= NOW() AND end_datetime >= NOW())) AS active_auctions,
        (SELECT COUNT(*)::int FROM auction_lots) AS total_lots,
        (SELECT COUNT(*)::int FROM bids) AS total_bids,
        (SELECT COUNT(DISTINCT user_id)::int FROM bids) AS total_participants
    `);
    res.json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/history', async (_req: Request, res: Response) => {
  try {
    await ensureTables();
    const result = await pool.query(`
      SELECT
        a.auction_id, a.name, a.description, a.start_datetime, a.end_datetime, a.status,
        al.lot_id, al.artwork_id, al.starting_price, al.current_bid AS final_price,
        aw.title AS artwork_title, aw.artist_name AS artwork_artist, aw.image_url AS artwork_image_url, aw.thumbnail_url AS artwork_thumbnail_url,
        b.amount AS winning_bid_amount,
        ${MASKED('u.username')} AS winner_username
      FROM auctions a
      LEFT JOIN auction_lots al ON a.auction_id = al.auction_id
      LEFT JOIN artworks aw ON al.artwork_id = aw.artwork_id
      LEFT JOIN bids b ON al.lot_id = b.lot_id AND b.is_winning = TRUE
      LEFT JOIN users u ON b.user_id = u.user_id
      WHERE a.status = 'ended' OR a.end_datetime < NOW()
      ORDER BY a.end_datetime DESC, al.lot_id
    `);

    const auctionsMap: Record<number, any> = {};
    result.rows.forEach((row: any) => {
      if (!auctionsMap[row.auction_id]) {
        auctionsMap[row.auction_id] = {
          auction_id: row.auction_id, name: row.name, description: row.description,
          start_datetime: row.start_datetime, end_datetime: row.end_datetime, status: row.status, lots: [],
        };
      }
      if (row.lot_id) {
        auctionsMap[row.auction_id].lots.push({
          lot_id: row.lot_id, artwork_id: row.artwork_id,
          artwork_title: row.artwork_title, artwork_artist: row.artwork_artist,
          artwork_image_url: row.artwork_image_url, artwork_thumbnail_url: row.artwork_thumbnail_url,
          starting_price: row.starting_price, final_price: row.final_price,
          winning_bid_amount: row.winning_bid_amount, winner_username: row.winner_username,
        });
      }
    });

    res.json({ auctions: Object.values(auctionsMap) });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/participant/:userId', async (req: Request, res: Response) => {
  try {
    await ensureTables();
    const userId = parseInt(req.params.userId);
    if (isNaN(userId) || userId < 1) return res.status(400).json({ error: 'Invalid user ID' });

    const [activeBids, wonLots, bidHistory] = await Promise.all([
      pool.query(`
        SELECT b.bid_id, b.lot_id, b.amount, b.timestamp, b.is_winning,
          al.auction_id, al.current_bid, al.starting_price, al.status AS lot_status,
          a.name AS auction_name, a.status AS auction_status, a.end_datetime,
          aw.title AS artwork_title, aw.artist_name AS artwork_artist, aw.image_url AS artwork_image_url, aw.thumbnail_url AS artwork_thumbnail_url
        FROM bids b
        JOIN auction_lots al ON b.lot_id = al.lot_id
        JOIN auctions a ON al.auction_id = a.auction_id
        LEFT JOIN artworks aw ON al.artwork_id = aw.artwork_id
        WHERE b.user_id = $1 AND (a.status = 'active' OR (a.start_datetime <= NOW() AND a.end_datetime >= NOW()))
        ORDER BY b.timestamp DESC
      `, [userId]),
      pool.query(`
        SELECT b.bid_id, b.lot_id, b.amount AS winning_amount, b.timestamp,
          al.auction_id, al.starting_price,
          a.name AS auction_name, a.end_datetime,
          aw.title AS artwork_title, aw.artist_name AS artwork_artist, aw.image_url AS artwork_image_url, aw.thumbnail_url AS artwork_thumbnail_url
        FROM bids b
        JOIN auction_lots al ON b.lot_id = al.lot_id
        JOIN auctions a ON al.auction_id = a.auction_id
        LEFT JOIN artworks aw ON al.artwork_id = aw.artwork_id
        WHERE b.user_id = $1 AND b.is_winning = TRUE AND (a.status = 'ended' OR a.end_datetime < NOW())
        ORDER BY a.end_datetime DESC
      `, [userId]),
      pool.query(`
        SELECT b.bid_id, b.lot_id, b.amount, b.timestamp, b.is_winning,
          al.auction_id, al.current_bid,
          a.name AS auction_name, a.status AS auction_status,
          aw.title AS artwork_title, aw.artist_name AS artwork_artist
        FROM bids b
        JOIN auction_lots al ON b.lot_id = al.lot_id
        JOIN auctions a ON al.auction_id = a.auction_id
        LEFT JOIN artworks aw ON al.artwork_id = aw.artwork_id
        WHERE b.user_id = $1
        ORDER BY b.timestamp DESC
      `, [userId]),
    ]);

    res.json({ active_bids: activeBids.rows, won_lots: wonLots.rows, bid_history: bidHistory.rows });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    await ensureTables();
    const { status } = req.query as { status?: string };
    const validStatuses = ['active', 'scheduled', 'ended'];
    let query = `
      SELECT a.*,
        COUNT(DISTINCT al.lot_id)::int AS lot_count,
        COUNT(DISTINCT b.bid_id)::int AS total_bids,
        COUNT(DISTINCT b.user_id)::int AS unique_participants
      FROM auctions a
      LEFT JOIN auction_lots al ON a.auction_id = al.auction_id
      LEFT JOIN bids b ON al.lot_id = b.lot_id
    `;
    const params: any[] = [];
    if (status && validStatuses.includes(status)) { query += ` WHERE a.status = $1`; params.push(status); }
    query += `
      GROUP BY a.auction_id
      ORDER BY CASE a.status WHEN 'active' THEN 1 WHEN 'scheduled' THEN 2 WHEN 'ended' THEN 3 ELSE 4 END,
        a.start_datetime DESC
    `;
    const result = await pool.query(query, params);
    res.json({ success: true, auctions: result.rows });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    await ensureTables();
    const auctionResult = await pool.query('SELECT * FROM auctions WHERE auction_id = $1', [req.params.id]);
    if (auctionResult.rows.length === 0) return res.status(404).json({ error: 'Auction not found' });

    const auction = auctionResult.rows[0];
    const lotsResult = await pool.query(`
      SELECT ${LOT_PUBLIC_COLUMNS},
        aw.title AS artwork_title, aw.artist_name AS artwork_artist, aw.image_url AS artwork_image_url, aw.thumbnail_url AS artwork_thumbnail_url,
        COUNT(b.bid_id)::int AS bid_count,
        ${MASKED('u.username')} AS highest_bidder_username,
        CASE
          WHEN $2::timestamp > al.created_at THEN GREATEST(EXTRACT(EPOCH FROM ($2::timestamp - NOW()))::int, 0)
          ELSE NULL
        END AS time_remaining_seconds
      FROM auction_lots al
      LEFT JOIN artworks aw ON al.artwork_id = aw.artwork_id
      LEFT JOIN bids b ON al.lot_id = b.lot_id
      LEFT JOIN users u ON al.highest_bidder_id = u.user_id
      WHERE al.auction_id = $1
      GROUP BY al.lot_id, aw.title, aw.artist_name, aw.image_url, aw.thumbnail_url, u.username
      ORDER BY al.lot_id
    `, [req.params.id, auction.end_datetime]);

    res.json({ success: true, auction: { ...auction, lots: lotsResult.rows } });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id/lots', async (req: Request, res: Response) => {
  try {
    await ensureTables();
    const result = await pool.query(`
      SELECT ${LOT_PUBLIC_COLUMNS},
        aw.title AS artwork_title, aw.artist_name AS artwork_artist, aw.image_url AS artwork_image_url, aw.thumbnail_url AS artwork_thumbnail_url,
        COUNT(b.bid_id)::int AS bid_count
      FROM auction_lots al
      LEFT JOIN artworks aw ON al.artwork_id = aw.artwork_id
      LEFT JOIN bids b ON al.lot_id = b.lot_id
      WHERE al.auction_id = $1
      GROUP BY al.lot_id, aw.title, aw.artist_name, aw.image_url, aw.thumbnail_url
      ORDER BY al.lot_id
    `, [req.params.id]);
    res.json({ success: true, lots: result.rows });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id/bids', async (req: Request, res: Response) => {
  try {
    await ensureTables();
    const result = await pool.query(`
      SELECT b.bid_id, b.lot_id, b.amount, b.timestamp, b.is_winning,
        al.auction_id, al.artwork_id, al.starting_price, al.current_bid,
        ${MASKED('u.username')} AS bidder_username
      FROM bids b
      JOIN auction_lots al ON b.lot_id = al.lot_id
      LEFT JOIN users u ON b.user_id = u.user_id
      WHERE al.auction_id = $1
      ORDER BY b.timestamp DESC
    `, [req.params.id]);
    res.json({ success: true, bids: result.rows });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    await ensureTables();
    const { name, description, start_datetime, end_datetime, organizer_id, gallery_id } = req.body;
    if (!name) return res.status(400).json({ error: 'Auction name is required' });

    const result = await pool.query(`
      INSERT INTO auctions (name, description, start_datetime, end_datetime, organizer_id, gallery_id)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `, [name, description, start_datetime, end_datetime, organizer_id, gallery_id]);
    res.json({ success: true, auction: result.rows[0] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:id/lots', async (req: Request, res: Response) => {
  try {
    await ensureTables();
    const { artwork_id, reserve_price, buy_now_price } = req.body;
    const starting_price = parseAmount(req.body.starting_price);
    const reserve = reserve_price === undefined || reserve_price === null || reserve_price === '' ? null : parseAmount(reserve_price);
    const buyNow = buy_now_price === undefined || buy_now_price === null || buy_now_price === '' ? null : parseAmount(buy_now_price);
    const auction_id = req.params.id;
    if (starting_price === null) return res.status(400).json({ error: 'Стартовая цена: положительное число' });
    if (reserve_price != null && reserve_price !== '' && reserve === null) return res.status(400).json({ error: 'Резервная цена: положительное число' });
    if (buy_now_price != null && buy_now_price !== '' && buyNow === null) return res.status(400).json({ error: 'Цена «купить сейчас»: положительное число' });
    if (reserve !== null && reserve < starting_price) return res.status(400).json({ error: 'Резервная цена не может быть ниже стартовой' });
    if (buyNow !== null && buyNow <= starting_price) return res.status(400).json({ error: 'Цена «купить сейчас» должна быть выше стартовой' });

    const auctionCheck = await pool.query('SELECT auction_id FROM auctions WHERE auction_id = $1', [auction_id]);
    if (auctionCheck.rows.length === 0) return res.status(404).json({ error: 'Auction not found' });

    const result = await pool.query(`
      INSERT INTO auction_lots (auction_id, artwork_id, starting_price, reserve_price, buy_now_price)
      VALUES ($1, $2, $3, $4, $5) RETURNING *
    `, [auction_id, artwork_id, starting_price, reserve, buyNow]);
    res.json({ success: true, lot: result.rows[0] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Старый адрес (лот в теле запроса) и тот, что использует страница /auction
router.post('/bids', (req: Request, res: Response) => placeBid(req, res, req.body?.lot_id, req.body?.amount));
router.post('/lots/:lotId/bid', (req: Request, res: Response) => placeBid(req, res, req.params.lotId, req.body?.amount));

export = router;
