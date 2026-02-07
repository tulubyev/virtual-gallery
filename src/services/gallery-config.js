const pool = require('../config/database');

let tableEnsured = false;

async function ensureTable() {
  if (tableEnsured) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS gallery_configs (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL DEFAULT 'default',
      config JSONB NOT NULL,
      texture_urls JSONB DEFAULT '{}',
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  tableEnsured = true;
}

async function getActiveConfig() {
  await ensureTable();
  const result = await pool.query(
    'SELECT * FROM gallery_configs WHERE name = $1 AND is_active = true LIMIT 1',
    ['default']
  );
  return result.rows.length > 0 ? result.rows[0] : null;
}

async function saveConfig(config, textureUrls) {
  const existing = await getActiveConfig();
  if (existing) {
    const result = await pool.query(
      `UPDATE gallery_configs 
       SET config = $1, texture_urls = COALESCE($2, texture_urls), updated_at = NOW() 
       WHERE name = $3 AND is_active = true 
       RETURNING *`,
      [JSON.stringify(config), textureUrls ? JSON.stringify(textureUrls) : null, 'default']
    );
    return result.rows[0];
  } else {
    const result = await pool.query(
      `INSERT INTO gallery_configs (name, config, texture_urls, is_active, created_at, updated_at) 
       VALUES ($1, $2, $3, true, NOW(), NOW()) 
       RETURNING *`,
      ['default', JSON.stringify(config), JSON.stringify(textureUrls || {})]
    );
    return result.rows[0];
  }
}

async function updateTextureUrls(textureUrls) {
  const existing = await getActiveConfig();
  if (existing) {
    const result = await pool.query(
      `UPDATE gallery_configs 
       SET texture_urls = $1, updated_at = NOW() 
       WHERE name = $2 AND is_active = true 
       RETURNING *`,
      [JSON.stringify(textureUrls), 'default']
    );
    return result.rows[0];
  } else {
    const result = await pool.query(
      `INSERT INTO gallery_configs (name, config, texture_urls, is_active, created_at, updated_at) 
       VALUES ($1, $2, $3, true, NOW(), NOW()) 
       RETURNING *`,
      ['default', '{}', JSON.stringify(textureUrls)]
    );
    return result.rows[0];
  }
}

module.exports = { getActiveConfig, saveConfig, updateTextureUrls };
