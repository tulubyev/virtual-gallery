// routes/galleryRoutes.ts
import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { GalleryController } from '../controllers/GalleryController';

export function createGalleryRoutes(controller: GalleryController) {
  const router = Router();

  // Get all galleries
  router.get('/', (req, res) => controller.getAllGalleries(req, res));

  // Get gallery by ID
  router.get('/:id', (req, res) => controller.getGalleryById(req, res));

  // Get gallery rooms
  router.get('/:id/rooms', (req, res) => controller.getGalleryRooms(req, res));

  // Create new gallery
  router.post('/', authenticateToken, (req, res) => controller.createGallery(req, res));

  // Update gallery
  router.put('/:id', authenticateToken, (req, res) => controller.updateGallery(req, res));

  // Delete gallery
  router.delete('/:id', authenticateToken, (req, res) => controller.deleteGallery(req, res));

  // Get recommended artworks for gallery
  router.get('/:id/recommended', authenticateToken, (req, res) => controller.getRecommendedArtworks(req, res));

  return router;
}