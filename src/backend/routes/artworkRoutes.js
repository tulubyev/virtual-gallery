// Routes for artwork management
const express = require('express');
const router = express.Router();
const artworkController = require('../controllers/artworkController');
const { authenticateToken } = require('../middleware/auth');

// Get all artworks
router.get('/', artworkController.getAllArtworks);

// Get artwork by ID
router.get('/:id', artworkController.getArtworkById);

// Search artworks
router.get('/search/:query', artworkController.searchArtworks);

// Filter artworks by tags
router.get('/filter/:tags', artworkController.filterArtworksByTags);

// Create new artwork (requires authentication)
router.post('/', authenticateToken, artworkController.createArtwork);

// Update artwork (requires authentication)
router.put('/:id', authenticateToken, artworkController.updateArtwork);

// Delete artwork (requires authentication)
router.delete('/:id', authenticateToken, artworkController.deleteArtwork);

// Get recommended artworks for a user (requires authentication)
router.get('/recommendations', authenticateToken, artworkController.getRecommendedArtworks);

// Get similar artworks to a given artwork
router.get('/:id/similar', artworkController.getSimilarArtworks);

// Add artwork to a collection (requires authentication)
router.post('/:artworkId/collections/:collectionId', authenticateToken, artworkController.addToCollection);

// Get artwork analytics
router.get('/:id/analytics', artworkController.getArtworkAnalytics);

module.exports = router;