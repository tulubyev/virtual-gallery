const pool = require('../config/database');

class ArchiveService {
  async archiveEntity(entityType, entityId, entityData, archivedBy = 'curator', reason = null) {
    const result = await pool.query(
      `INSERT INTO archive (entity_type, entity_id, entity_data, archived_by, reason)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [entityType, entityId, JSON.stringify(entityData), archivedBy, reason]
    );
    return result.rows[0];
  }

  async getArchive(entityType = null) {
    let query = 'SELECT * FROM archive';
    const params = [];
    if (entityType) {
      query += ' WHERE entity_type = $1';
      params.push(entityType);
    }
    query += ' ORDER BY archived_at DESC';
    const result = await pool.query(query, params);
    return result.rows;
  }

  async getArchiveStats() {
    const result = await pool.query(`
      SELECT 
        entity_type,
        COUNT(*) as count,
        MAX(archived_at) as last_archived
      FROM archive
      GROUP BY entity_type
      ORDER BY entity_type
    `);
    const total = await pool.query('SELECT COUNT(*) as total FROM archive');
    return {
      total: parseInt(total.rows[0].total),
      by_type: result.rows
    };
  }

  async restoreEntity(archiveId) {
    const archived = await pool.query('SELECT * FROM archive WHERE archive_id = $1', [archiveId]);
    if (archived.rows.length === 0) return null;

    const item = archived.rows[0];
    const data = item.entity_data;

    if (item.entity_type === 'artwork') {
      const artworkId = data.artwork_id || data.id;
      const existing = await pool.query('SELECT artwork_id FROM artworks WHERE artwork_id = $1', [artworkId]);
      if (existing.rows.length > 0) {
        return { restored: false, error: 'Экспонат с таким ID уже существует в базе' };
      }
      await pool.query(
        `INSERT INTO artworks (artwork_id, title, artist_name, year_created, medium, dimensions, style, country, epoch, description, image_url, thumbnail_url, tags, status, technique, curator_notes, rejection_reason, collection)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`,
        [artworkId, data.title, data.artist_name, data.year_created, data.medium, data.dimensions, data.style, data.country, data.epoch, data.description, data.image_url, data.thumbnail_url, data.tags, data.status || 'pending', data.technique, data.curator_notes, data.rejection_reason, data.collection]
      );
    } else if (item.entity_type === 'collection') {
      const colId = data.collection_id || data.id;
      const existing = await pool.query('SELECT collection_id FROM collections WHERE collection_id = $1', [colId]);
      if (existing.rows.length > 0) {
        return { restored: false, error: 'Коллекция с таким ID уже существует в базе' };
      }
      await pool.query(
        `INSERT INTO collections (collection_id, name, slug, description, epoch, country, cover_gradient, is_active)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [colId, data.name, data.slug, data.description, data.epoch, data.country, data.cover_gradient, true]
      );
    } else if (item.entity_type === 'room') {
      await pool.query('DELETE FROM archive WHERE archive_id = $1', [archiveId]);
      return { restored: true, entity_type: 'room', data: data };
    }

    await pool.query('DELETE FROM archive WHERE archive_id = $1', [archiveId]);
    return { restored: true, entity_type: item.entity_type, data };
  }

  async deleteFromArchive(archiveId) {
    const result = await pool.query(
      'DELETE FROM archive WHERE archive_id = $1 RETURNING *',
      [archiveId]
    );
    return result.rows.length > 0;
  }

  async clearArchive(entityType = null) {
    if (entityType) {
      const result = await pool.query('DELETE FROM archive WHERE entity_type = $1', [entityType]);
      return result.rowCount;
    }
    const result = await pool.query('DELETE FROM archive');
    return result.rowCount;
  }
}

module.exports = new ArchiveService();
