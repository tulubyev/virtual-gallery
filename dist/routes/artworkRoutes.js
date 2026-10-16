"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.artworkRoutes = void 0;
// routes/artworkRoutes.ts
const express_1 = require("express");
const controllers_1 = require("../controllers");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
exports.artworkRoutes = router;
// Get all artworks
router.get('/', controllers_1.ArtworkController.getAllArtworks);
// Get recommended artworks for a user (requires authentication)
router.get('/recommendations', auth_1.authenticateToken, controllers_1.ArtworkController.getRecommendedArtworks);
// Get artwork by ID
router.get('/:id', controllers_1.ArtworkController.getArtworkById);
// Search artworks
router.get('/search/:query', controllers_1.ArtworkController.searchArtworks);
// Filter artworks by tags
router.get('/filter/:tags', controllers_1.ArtworkController.filterArtworksByTags);
// Create new artwork (requires authentication)
router.post('/', auth_1.authenticateToken, controllers_1.ArtworkController.createArtwork);
// Update artwork (requires authentication)
router.put('/:id', auth_1.authenticateToken, controllers_1.ArtworkController.updateArtwork);
// Delete artwork (requires authentication)
router.delete('/:id', auth_1.authenticateToken, controllers_1.ArtworkController.deleteArtwork);
// Get similar artworks to a given artwork
router.get('/:id/similar', controllers_1.ArtworkController.getSimilarArtworks);
// Add artwork to a collection (requires authentication)
router.post('/:artworkId/collections/:collectionId', auth_1.authenticateToken, controllers_1.ArtworkController.addToCollection);
// Get artwork analytics
router.get('/:id/analytics', controllers_1.ArtworkController.getArtworkAnalytics);
//# sourceMappingURL=artworkRoutes.js.map