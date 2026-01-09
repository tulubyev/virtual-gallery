// routes/artworkRoutes.ts
import { Router } from 'express';
import { ArtworkController } from '../controllers';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Get all artworks
router.get('/', ArtworkController.getAllArtworks);

// Get artwork by ID
router.get('/:id', ArtworkController.getArtworkById);

// Search artworks
router.get('/search/:query', ArtworkController.searchArtworks);

// Filter artworks by tags
router.get('/filter/:tags', ArtworkController.filterArtworksByTags);

// Create new artwork (requires authentication)
router.post('/', authenticateToken, ArtworkController.createArtwork);

// Update artwork (requires authentication)
router.put('/:id', authenticateToken, ArtworkController.updateArtwork);

// Delete artwork (requires authentication)
router.delete('/:id', authenticateToken, ArtworkController.deleteArtwork);

// Get recommended artworks for a user (requires authentication)
router.get('/recommendations', authenticateToken, ArtworkController.getRecommendedArtworks);

// Get similar artworks to a given artwork
router.get('/:id/similar', ArtworkController.getSimilarArtworks);

// Add artwork to a collection (requires authentication)
router.post('/:artworkId/collections/:collectionId', authenticateToken, ArtworkController.addToCollection);

// Get artwork analytics
router.get('/:id/analytics', ArtworkController.getArtworkAnalytics);

export { router as artworkRoutes };