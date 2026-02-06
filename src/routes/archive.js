const express = require('express');
const router = express.Router();
const archiveService = require('../services/archive');

router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    const items = await archiveService.getArchive(type || null);
    res.json({ success: true, items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const stats = await archiveService.getArchiveStats();
    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:id/restore', async (req, res) => {
  try {
    const result = await archiveService.restoreEntity(parseInt(req.params.id));
    if (!result) return res.status(404).json({ error: 'Archive item not found' });
    if (result.restored === false) return res.status(409).json({ error: result.error || 'Cannot restore' });
    res.json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await archiveService.deleteFromArchive(parseInt(req.params.id));
    if (!deleted) return res.status(404).json({ error: 'Archive item not found' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/room', async (req, res) => {
  try {
    const { room, archived_by, reason } = req.body;
    if (!room) return res.status(400).json({ error: 'Room data required' });
    const result = await archiveService.archiveEntity('room', 0, room, archived_by || 'curator', reason || null);
    res.json({ success: true, archived: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/', async (req, res) => {
  try {
    const { type } = req.query;
    const count = await archiveService.clearArchive(type || null);
    res.json({ success: true, deleted: count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
