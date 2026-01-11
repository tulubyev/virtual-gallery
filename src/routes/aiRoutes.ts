// routes/aiRoutes.ts
import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import aiController from '../controllers/AiController';

const router = Router();

// Получить ИИ-рекомендации (требует аутентификации)
router.get('/recommendations', authenticateToken, aiController.getRecommendations);

// Сгенерировать ИИ-коллекцию (требует аутентификации)
router.get('/collections/generate', authenticateToken, aiController.generateCollection);

// Анализировать изображение экспоната (требует аутентификации)
router.post('/analyze-image', authenticateToken, aiController.analyzeImage);

// Получить похожие экспонаты
router.get('/similar/:artworkId', aiController.getSimilarArtworks);

// Обучить модель рекомендаций (требует аутентификации)
router.post('/train-model', authenticateToken, aiController.trainModel);

// Персонализировать маршрут галереи на основе предпочтений пользователя (требует аутентификации)
router.get('/personalize-route', authenticateToken, aiController.personalizeGalleryRoute);

// Прогнозировать вовлеченность пользователя с экспонатами (требует аутентификации)
router.post('/predict-engagement', authenticateToken, aiController.predictEngagement);

export { router as aiRoutes };