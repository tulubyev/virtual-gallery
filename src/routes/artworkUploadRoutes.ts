// src/routes/artworkUploadRoutes.ts
import { Router } from 'express';

const router = Router();

// Import artwork upload controller
const artworkUploadController = require('../backend/controllers/artworkUploadController');

// Загрузить изображение экспоната
router.post('/upload', artworkUploadController.uploadArtwork);

// Запустить ИИ-анализ загруженного изображения
router.post('/:uploadId/analyze', artworkUploadController.analyzeUploadedArtWork);

// Получить результаты ИИ-анализа
router.get('/:uploadId/analysis', artworkUploadController.getAnalysisResults);

// Отправить экспонат на проверку куратору
router.post('/submit-for-review', artworkUploadController.submitForReview);

// Получить все загрузки пользователя
router.get('/users/:userId/uploads', artworkUploadController.getUserUploads);

// Получить все материалы на проверке (только для кураторов и администраторов)
router.get('/submissions-for-review', artworkUploadController.getSubmissionsForReview);

// Одобрить экспонат (только для кураторов и администраторов)
router.post('/submissions/:submissionId/approve', artworkUploadController.approveSubmission);

// Отклонить экспонат (только для кураторов и администраторов)
router.post('/submissions/:submissionId/reject', artworkUploadController.rejectSubmission);

// Запросить повторный анализ изображения
router.post('/:uploadId/reanalyze', artworkUploadController.reanalyzeImage);

// Сгенерировать NFT для произведения искусства
router.post('/generate-nft', artworkUploadController.generateNFT);

export default router;