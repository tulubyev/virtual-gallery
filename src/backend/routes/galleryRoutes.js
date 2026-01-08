// Routes for gallery management
const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');

// Get all galleries
router.get('/', galleryController.getAllGalleries);

// Get gallery by ID
router.get('/:id', galleryController.getGalleryById);

// Get gallery rooms
router.get('/:id/rooms', galleryController.getGalleryRooms);

// Create new gallery
router.post('/', galleryController.createGallery);

// Update gallery
router.put('/:id', galleryController.updateGallery);

// Delete gallery
router.delete('/:id', galleryController.deleteGallery);

// Get recommended artworks for gallery
router.get('/:id/recommended', galleryController.getRecommendedArtworks);

module.exports = router;