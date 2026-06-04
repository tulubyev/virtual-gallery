// src/routes/aiRoutes.ts
import { Router } from 'express';
import multer from 'multer';
import { AiController } from '../controllers/AiController';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Только PDF файлы разрешены'));
    }
  },
});

export function createAiRoutes(controller: AiController) {
  const router = Router();

  // Generate personalized tour
  router.post('/generate-tour', (req, res) => controller.generatePersonalizedTour(req, res));

  // Get artwork recommendations for user
  router.get('/recommendations/:userId', (req, res) => controller.getRecommendations(req, res));

  // Analyze artwork image
  router.post('/analyze-image', (req, res) => controller.analyzeImage(req, res));

  // Generate artwork description
  router.post('/generate-description', (req, res) => controller.generateArtworkDescription(req, res));

  // Get similar artworks
  router.get('/similar/:artworkId', (req, res) => controller.getSimilarArtworks(req, res));

  // Predict engagement
  router.post('/predict-engagement', (req, res) => controller.predictEngagement(req, res));

  // ArtWiki AI chat
  router.post('/chat', (req, res) => controller.chat(req, res));

  // RAG PDF processing (multipart/form-data)
  router.post('/process-pdf', upload.single('pdf'), (req, res) => controller.processPdf(req, res));

  return router;
}