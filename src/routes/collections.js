const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const showAll = req.query.all === 'true';

    let query = `
      SELECT c.collection_id as id, c.*,
        (SELECT COUNT(*) FROM artworks a 
         WHERE ',' || a.collection || ',' LIKE '%,' || c.slug || ',%') as artwork_count
      FROM collections c
    `;
    const params = [];
    let idx = 1;

    const conditions = [];
    if (!showAll) {
      conditions.push('c.is_active = true');
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY c.name';

    const result = await pool.query(query, params);
    res.json({ collections: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const col = await pool.query('SELECT *, collection_id as id FROM collections WHERE slug = $1', [req.params.slug]);
    if (col.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    const arts = await pool.query(
      `SELECT *, artwork_id as id, artist_name as artist FROM artworks 
       WHERE ',' || collection || ',' LIKE '%,' || $1 || ',%' 
       ORDER BY created_at DESC`,
      [req.params.slug]
    );
    res.json({ collection: col.rows[0], artworks: arts.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, description, epoch, country, cover_gradient } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Collection name is required' });
    }
    const slug = name.toLowerCase()
      .replace(/[а-яё]/gi, c => {
        const map = {'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'zh','з':'z','и':'i','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya','А':'a','Б':'b','В':'v','Г':'g','Д':'d','Е':'e','Ё':'yo','Ж':'zh','З':'z','И':'i','Й':'y','К':'k','Л':'l','М':'m','Н':'n','О':'o','П':'p','Р':'r','С':'s','Т':'t','У':'u','Ф':'f','Х':'kh','Ц':'ts','Ч':'ch','Ш':'sh','Щ':'shch','Ъ':'','Ы':'y','Ь':'','Э':'e','Ю':'yu','Я':'ya'};
        return map[c] || c;
      })
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    const result = await pool.query(
      `INSERT INTO collections (name, slug, description, epoch, country, cover_gradient) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *, collection_id as id`,
      [name.trim(), slug, description || null, epoch || null, country || null, cover_gradient || null]
    );
    res.json({ success: true, collection: result.rows[0] });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Collection with this name already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { is_active, name, description, epoch, country, cover_gradient } = req.body;
    const setClauses = ['updated_at = NOW()'];
    const params = [];
    let idx = 1;

    if (is_active !== undefined) { setClauses.push(`is_active = $${idx++}`); params.push(is_active); }
    if (name !== undefined) { setClauses.push(`name = $${idx++}`); params.push(name); }
    if (description !== undefined) { setClauses.push(`description = $${idx++}`); params.push(description); }
    if (epoch !== undefined) { setClauses.push(`epoch = $${idx++}`); params.push(epoch); }
    if (country !== undefined) { setClauses.push(`country = $${idx++}`); params.push(country); }
    if (cover_gradient !== undefined) { setClauses.push(`cover_gradient = $${idx++}`); params.push(cover_gradient); }

    if (setClauses.length === 1) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    params.push(req.params.id);
    const result = await pool.query(
      `UPDATE collections SET ${setClauses.join(', ')} WHERE collection_id = $${idx} RETURNING *, collection_id as id`,
      params
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Collection not found' });
    }

    res.json({ success: true, collection: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const archiveService = require('../services/archive');
    const collection = await pool.query('SELECT * FROM collections WHERE collection_id = $1', [req.params.id]);
    if (collection.rows.length === 0) return res.status(404).json({ error: 'Collection not found' });

    const collectionData = collection.rows[0];
    const sourceLocation = {
      section: 'collections',
      label: `Коллекции`,
      detail: collectionData.name || null
    };
    await archiveService.archiveEntity('collection', req.params.id, collectionData, req.body.archived_by || 'curator', req.body.reason || null, sourceLocation);
    await pool.query('DELETE FROM collections WHERE collection_id = $1', [req.params.id]);
    res.json({ success: true, archived: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
