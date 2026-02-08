const express = require('express');
const router = express.Router();
const pool = require('../config/database');

let tablesEnsured = false;

async function ensureTables() {
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

router.get('/stats', async (req, res) => {
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/history', async (req, res) => {
  try {
    await ensureTables();
    const result = await pool.query(`
      SELECT
        a.auction_id, a.name, a.description, a.start_datetime, a.end_datetime, a.status,
        al.lot_id, al.artwork_id, al.starting_price, al.current_bid AS final_price,
        aw.title AS artwork_title, aw.artist_name AS artwork_artist, aw.image_url AS artwork_image_url, aw.thumbnail_url AS artwork_thumbnail_url,
        b.amount AS winning_bid_amount, b.user_id AS winner_id,
        u.username AS winner_username
      FROM auctions a
      LEFT JOIN auction_lots al ON a.auction_id = al.auction_id
      LEFT JOIN artworks aw ON al.artwork_id = aw.artwork_id
      LEFT JOIN bids b ON al.lot_id = b.lot_id AND b.is_winning = TRUE
      LEFT JOIN users u ON b.user_id = u.user_id
      WHERE a.status = 'ended' OR a.end_datetime < NOW()
      ORDER BY a.end_datetime DESC, al.lot_id
    `);

    const auctionsMap = {};
    result.rows.forEach(row => {
      if (!auctionsMap[row.auction_id]) {
        auctionsMap[row.auction_id] = {
          auction_id: row.auction_id,
          name: row.name,
          description: row.description,
          start_datetime: row.start_datetime,
          end_datetime: row.end_datetime,
          status: row.status,
          lots: []
        };
      }
      if (row.lot_id) {
        auctionsMap[row.auction_id].lots.push({
          lot_id: row.lot_id,
          artwork_id: row.artwork_id,
          artwork_title: row.artwork_title,
          artwork_artist: row.artwork_artist,
          artwork_image_url: row.artwork_image_url,
          artwork_thumbnail_url: row.artwork_thumbnail_url,
          starting_price: row.starting_price,
          final_price: row.final_price,
          winning_bid_amount: row.winning_bid_amount,
          winner_id: row.winner_id,
          winner_username: row.winner_username
        });
      }
    });

    res.json({ auctions: Object.values(auctionsMap) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/participant/:userId', async (req, res) => {
  try {
    await ensureTables();
    const userId = parseInt(req.params.userId);
    if (isNaN(userId) || userId < 1) return res.status(400).json({ error: 'Invalid user ID' });

    const activeBids = await pool.query(`
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
    `, [userId]);

    const wonLots = await pool.query(`
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
    `, [userId]);

    const bidHistory = await pool.query(`
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
    `, [userId]);

    res.json({
      active_bids: activeBids.rows,
      won_lots: wonLots.rows,
      bid_history: bidHistory.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    await ensureTables();
    const { status } = req.query;
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
    const params = [];
    if (status && validStatuses.includes(status)) {
      query += ` WHERE a.status = $1`;
      params.push(status);
    }
    query += `
      GROUP BY a.auction_id
      ORDER BY
        CASE a.status
          WHEN 'active' THEN 1
          WHEN 'scheduled' THEN 2
          WHEN 'ended' THEN 3
          ELSE 4
        END,
        a.start_datetime DESC
    `;
    const result = await pool.query(query, params);
    res.json({ success: true, auctions: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    await ensureTables();
    const auctionResult = await pool.query('SELECT * FROM auctions WHERE auction_id = $1', [req.params.id]);
    if (auctionResult.rows.length === 0) return res.status(404).json({ error: 'Auction not found' });

    const auction = auctionResult.rows[0];

    const lotsResult = await pool.query(`
      SELECT al.*,
        aw.title AS artwork_title, aw.artist_name AS artwork_artist, aw.image_url AS artwork_image_url, aw.thumbnail_url AS artwork_thumbnail_url,
        COUNT(b.bid_id)::int AS bid_count,
        u.username AS highest_bidder_username,
        CASE
          WHEN $2::timestamp > al.created_at THEN
            GREATEST(EXTRACT(EPOCH FROM ($2::timestamp - NOW()))::int, 0)
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

    res.json({
      success: true,
      auction: {
        ...auction,
        lots: lotsResult.rows
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id/lots', async (req, res) => {
  try {
    await ensureTables();
    const result = await pool.query(`
      SELECT al.*,
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id/bids', async (req, res) => {
  try {
    await ensureTables();
    const result = await pool.query(`
      SELECT b.*,
        al.lot_id, al.auction_id, al.artwork_id, al.starting_price, al.current_bid,
        u.username AS bidder_username
      FROM bids b
      JOIN auction_lots al ON b.lot_id = al.lot_id
      LEFT JOIN users u ON b.user_id = u.user_id
      WHERE al.auction_id = $1
      ORDER BY b.timestamp DESC
    `, [req.params.id]);
    res.json({ success: true, bids: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    await ensureTables();
    const { name, description, start_datetime, end_datetime, organizer_id, gallery_id } = req.body;
    if (!name) return res.status(400).json({ error: 'Auction name is required' });

    const result = await pool.query(`
      INSERT INTO auctions (name, description, start_datetime, end_datetime, organizer_id, gallery_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [name, description, start_datetime, end_datetime, organizer_id, gallery_id]);

    res.json({ success: true, auction: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:id/lots', async (req, res) => {
  try {
    await ensureTables();
    const { artwork_id, starting_price, reserve_price, buy_now_price } = req.body;
    const auction_id = req.params.id;

    const auctionCheck = await pool.query('SELECT auction_id FROM auctions WHERE auction_id = $1', [auction_id]);
    if (auctionCheck.rows.length === 0) return res.status(404).json({ error: 'Auction not found' });

    const result = await pool.query(`
      INSERT INTO auction_lots (auction_id, artwork_id, starting_price, reserve_price, buy_now_price)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [auction_id, artwork_id, starting_price, reserve_price, buy_now_price]);

    res.json({ success: true, lot: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/bids', async (req, res) => {
  try {
    await ensureTables();
    const { lot_id, user_id, amount } = req.body;

    if (!lot_id || !user_id || !amount) {
      return res.status(400).json({ error: 'lot_id, user_id, and amount are required' });
    }

    const lotResult = await pool.query(`
      SELECT al.*, a.start_datetime, a.end_datetime, a.status AS auction_status
      FROM auction_lots al
      JOIN auctions a ON al.auction_id = a.auction_id
      WHERE al.lot_id = $1
    `, [lot_id]);

    if (lotResult.rows.length === 0) return res.status(404).json({ error: 'Lot not found' });

    const lot = lotResult.rows[0];

    const now = new Date();
    const isActive = lot.auction_status === 'active' ||
      (lot.start_datetime && lot.end_datetime && new Date(lot.start_datetime) <= now && new Date(lot.end_datetime) >= now);

    if (!isActive) {
      return res.status(400).json({ error: 'Auction is not currently active' });
    }

    if (lot.status !== 'available') {
      return res.status(400).json({ error: 'Lot is not available for bidding' });
    }

    if (parseFloat(amount) <= parseFloat(lot.current_bid)) {
      return res.status(400).json({ error: `Bid amount must be greater than current bid of ${lot.current_bid}` });
    }

    await pool.query('UPDATE bids SET is_winning = FALSE WHERE lot_id = $1 AND is_winning = TRUE', [lot_id]);

    const bidResult = await pool.query(`
      INSERT INTO bids (lot_id, user_id, amount, is_winning)
      VALUES ($1, $2, $3, TRUE)
      RETURNING *
    `, [lot_id, user_id, amount]);

    await pool.query(`
      UPDATE auction_lots SET current_bid = $1, highest_bidder_id = $2, updated_at = NOW()
      WHERE lot_id = $3
    `, [amount, user_id, lot_id]);

    res.json({ success: true, bid: bidResult.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
