// src/routes/aiRoutes.ts
import { Router } from 'express';
import { AiController } from '../controllers/AiController';

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

  // RAG PDF processing
  router.post('/process-pdf', (req, res) => controller.processPdf(req, res));

  return router;
}