// routes/artworkRoutes.ts
import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { ArtworkController } from '../controllers/ArtworkController';

export function createArtworkRoutes(controller: ArtworkController) {
  const router = Router();

  // Get all artworks
  router.get('/', (req, res) => controller.getAllArtworks(req, res));

  // Get artwork by ID
  router.get('/:id', (req, res) => controller.getArtworkById(req, res));

  // Search artworks
  router.get('/search/:query', (req, res) => controller.searchArtworks(req, res));

  // Filter artworks by tags
  router.get('/filter/:tags', (req, res) => controller.filterArtworksByTags(req, res));

  // Create new artwork (requires authentication)
  router.post('/', authenticateToken, (req, res) => controller.createArtwork(req, res));

  // Update artwork (requires authentication)
  router.put('/:id', authenticateToken, (req, res) => controller.updateArtwork(req, res));

  // Delete artwork (requires authentication)
  router.delete('/:id', authenticateToken, (req, res) => controller.deleteArtwork(req, res));

  // Get recommended artworks for a user (requires authentication)
  router.get('/recommendations', authenticateToken, (req, res) => controller.getRecommendedArtworks(req, res));

  // Get similar artworks to a given artwork
  router.get('/:id/similar', (req, res) => controller.getSimilarArtworks(req, res));

  // Add artwork to a collection (requires authentication)
  router.post('/:artworkId/collections/:collectionId', authenticateToken, (req, res) => controller.addToCollection(req, res));

  // Get artwork analytics
  router.get('/:id/analytics', (req, res) => controller.getArtworkAnalytics(req, res));

  return router;
}