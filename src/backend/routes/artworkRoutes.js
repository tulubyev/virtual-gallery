// Routes for artwork management
const express = require('express');
const router = express.Router();
const artworkController = require('../controllers/artworkController');

// Get all artworks
router.get('/', artworkController.getAllArtworks);

// Get artwork by ID
router.get('/:id', artworkController.getArtworkById);

// Search artworks
router.get('/search/:query', artworkController.searchArtworks);

// Filter artworks by tags
router.get('/filter/:tags', artworkController.filterArtworksByTags);

// Create new artwork
router.post('/', artworkController.createArtwork);

// Update artwork
router.put('/:id', artworkController.updateArtwork);

// Delete artwork
router.delete('/:id', artworkController.deleteArtwork);

module.exports = router;