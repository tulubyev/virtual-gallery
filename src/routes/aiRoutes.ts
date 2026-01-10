// routes/aiRoutes.ts
import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Import AI controller
const aiController = require('../backend/controllers/aiController');

// Get AI-generated recommendations (requires authentication)
router.get('/recommendations', authenticateToken, aiController.getRecommendations);

// Get AI-generated collection (requires authentication)
router.get('/collections/generate', authenticateToken, aiController.generateCollection);

// Analyze artwork image (requires authentication)
router.post('/analyze-image', authenticateToken, aiController.analyzeImage);

// Get similar artworks
router.get('/similar/:artworkId', aiController.getSimilarArtworks);

// Train recommendation model (requires authentication)
router.post('/train-model', authenticateToken, aiController.trainModel);

// Personalize gallery route based on user preferences (requires authentication)
router.get('/personalize-route', authenticateToken, aiController.personalizeGalleryRoute);

// Predict user engagement with artworks (requires authentication)
router.post('/predict-engagement', authenticateToken, aiController.predictEngagement);

export { router as aiRoutes };