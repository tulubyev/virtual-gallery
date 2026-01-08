// Routes for AI/ML services
const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// Get AI-generated recommendations
router.get('/recommendations', aiController.getRecommendations);

// Get AI-generated collection
router.get('/collections/generate', aiController.generateCollection);

// Analyze artwork image
router.post('/analyze-image', aiController.analyzeImage);

// Get similar artworks
router.get('/similar/:artworkId', aiController.getSimilarArtworks);

// Train recommendation model
router.post('/train-model', aiController.trainModel);

module.exports = router;