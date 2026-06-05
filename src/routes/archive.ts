import express, { Request, Response } from 'express';
const archiveService = require('../services/archive');

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { type } = req.query;
    const items = await archiveService.getArchive((type as string) || null);
    res.json({ success: true, items });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/stats', async (_req: Request, res: Response) => {
  try {
    const stats = await archiveService.getArchiveStats();
    res.json({ success: true, stats });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:id/restore', async (req: Request, res: Response) => {
  try {
    const result = await archiveService.restoreEntity(parseInt(req.params.id));
    if (!result) return res.status(404).json({ error: 'Archive item not found' });
    if (result.restored === false) return res.status(409).json({ error: result.error || 'Cannot restore' });
    res.json({ success: true, ...result });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deleted = await archiveService.deleteFromArchive(parseInt(req.params.id));
    if (!deleted) return res.status(404).json({ error: 'Archive item not found' });
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/room', async (req: Request, res: Response) => {
  try {
    const { room, archived_by, reason, source_location } = req.body;
    if (!room) return res.status(400).json({ error: 'Room data required' });
    const srcLoc = source_location || {
      section: 'gallery_builder',
      label: 'Конструктор галереи',
      detail: room.name || null,
    };
    const result = await archiveService.archiveEntity(
      'room', 0, room, archived_by || 'curator', reason || null, srcLoc
    );
    res.json({ success: true, archived: result });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/', async (req: Request, res: Response) => {
  try {
    const { type } = req.query;
    const count = await archiveService.clearArchive((type as string) || null);
    res.json({ success: true, deleted: count });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export = router;
