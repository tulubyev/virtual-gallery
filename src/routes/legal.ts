// src/routes/legal.ts — юридические документы торгов (/api/legal): список и текст. Читать может кто угодно.
import express, { Request, Response } from 'express';
import { getLegalDoc, listLegalDocs } from '../services/legalDocs';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  try { res.json({ documents: listLegalDocs() }); } catch (error: any) {
    console.error('[legal] list failed:', error.message);
    res.status(500).json({ error: 'Документы недоступны' });
  }
});

router.get('/:slug', (req: Request, res: Response) => {
  try {
    const doc = getLegalDoc(req.params.slug);
    if (!doc) return res.status(404).json({ error: 'Документ не найден' });
    res.json(doc);
  } catch (error: any) {
    console.error('[legal] read failed:', error.message);
    res.status(500).json({ error: 'Документ недоступен' });
  }
});

export = router;
