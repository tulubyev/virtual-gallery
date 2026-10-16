// routes/aiRoutes.ts
import { Router } from 'express';
import { AIController } from '../controllers';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/recommendations', authenticateToken, AIController.getRecommendations);
router.get('/collections/generate', authenticateToken, AIController.generateCollection);
router.post('/analyze-image', authenticateToken, AIController.analyzeImage);
router.get('/similar/:artworkId', AIController.getSimilarArtworks);
router.post('/train-model', authenticateToken, AIController.trainModel);
router.get('/personalize-route', authenticateToken, AIController.personalizeGalleryRoute);
router.post('/predict-engagement', authenticateToken, AIController.predictEngagement);

export { router as aiRoutes };
