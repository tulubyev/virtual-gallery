// src/routes/artworkUploadRoutes.ts
import { Router } from 'express';
import artworkController from '../controllers/ArtworkController';

const router = Router();

// Загрузить изображение экспоната
router.post('/upload', artworkController.createArtwork);

// Запустить ИИ-анализ загруженного изображения
router.post('/:uploadId/analyze', (req, res) => {
  // В реальной реализации это будет вызывать метод анализа изображения
  res.json({ message: 'Image analysis started', uploadId: req.params.uploadId });
});

// Получить результаты ИИ-анализа
router.get('/:uploadId/analysis', (req, res) => {
  // В реальной реализации это будет возвращать результаты анализа
  res.json({ uploadId: req.params.uploadId, analysis: 'Sample analysis results' });
});

// Отправить экспонат на проверку куратору
router.post('/submit-for-review', artworkController.createArtwork);

// Получить все загрузки пользователя
router.get('/users/:userId/uploads', (req, res) => {
  // В реальной реализации это будет возвращать загрузки пользователя
  res.json({ userId: req.params.userId, uploads: [] });
});

// Получить все материалы на проверке (только для кураторов и администраторов)
router.get('/submissions-for-review', (req, res) => {
  // В реальной реализации это будет возвращать материалы на проверке
  res.json({ submissions: [] });
});

// Одобрить экспонат (только для кураторов и администраторов)
router.post('/submissions/:submissionId/approve', (req, res) => {
  // В реальной реализации это будет одобрять экспонат
  res.json({ submissionId: req.params.submissionId, status: 'approved' });
});

// Отклонить экспонат (только для кураторов и администраторов)
router.post('/submissions/:submissionId/reject', (req, res) => {
  // В реальной реализации это будет отклонять экспонат
  res.json({ submissionId: req.params.submissionId, status: 'rejected' });
});

// Запросить повторный анализ изображения
router.post('/:uploadId/reanalyze', (req, res) => {
  // В реальной реализации это будет запрашивать повторный анализ
  res.json({ uploadId: req.params.uploadId, status: 'reanalysis requested' });
});

// Сгенерировать NFT для произведения искусства
router.post('/generate-nft', (req, res) => {
  // В реальной реализации это будет генерировать NFT
  res.json({ message: 'NFT generation initiated' });
});

export default router;