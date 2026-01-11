// routes/galleryRoutes.ts
import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import galleryController from '../controllers/GalleryController';

const router = Router();

// Get all galleries
router.get('/', galleryController.getAllGalleries);

// Get gallery by ID
router.get('/:id', galleryController.getGalleryById);

// Get gallery rooms
router.get('/:id/rooms', galleryController.getGalleryRooms);

// Create new gallery
router.post('/', authenticateToken, galleryController.createGallery);

// Update gallery
router.put('/:id', authenticateToken, galleryController.updateGallery);

// Delete gallery
router.delete('/:id', authenticateToken, galleryController.deleteGallery);

// Get recommended artworks for gallery
router.get('/:id/recommended', authenticateToken, galleryController.getRecommendedArtworks);

export { router as galleryRoutes };