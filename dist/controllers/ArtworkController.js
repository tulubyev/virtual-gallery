"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
class ArtworkController {
    async getAllArtworks(req, res) {
        try {
            const artworks = await services_1.ArtworkService.getAllArtworks();
            res.json(artworks);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getArtworkById(req, res) {
        try {
            const { id } = req.params;
            const artwork = await services_1.ArtworkService.getArtworkById(Number(id));
            if (!artwork) {
                res.status(404).json({ error: 'Artwork not found' });
                return;
            }
            res.json(artwork);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async searchArtworks(req, res) {
        try {
            const { query } = req.params;
            const artworks = await services_1.ArtworkService.searchArtworks(query);
            res.json(artworks);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async filterArtworksByTags(req, res) {
        try {
            const { tags } = req.params;
            const tagArray = tags.split(',');
            const artworks = await services_1.ArtworkService.filterArtworksByTags(tagArray);
            res.json(artworks);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async createArtwork(req, res) {
        try {
            const artworkData = req.body;
            const newArtwork = await services_1.ArtworkService.createArtwork(artworkData);
            res.status(201).json(newArtwork);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async updateArtwork(req, res) {
        try {
            const { id } = req.params;
            const artworkData = req.body;
            const updatedArtwork = await services_1.ArtworkService.updateArtwork(Number(id), artworkData);
            if (!updatedArtwork) {
                res.status(404).json({ error: 'Artwork not found' });
                return;
            }
            res.json(updatedArtwork);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async deleteArtwork(req, res) {
        try {
            const { id } = req.params;
            const deleted = await services_1.ArtworkService.deleteArtwork(Number(id));
            if (!deleted) {
                res.status(404).json({ error: 'Artwork not found' });
                return;
            }
            res.json({ message: 'Artwork deleted successfully' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getRecommendedArtworks(req, res) {
        try {
            // В реальной реализации это будет использовать ИИ для рекомендаций
            // based on user preferences and interaction history
            const userId = req.userId; // From JWT token
            const count = parseInt(req.query.count) || 5;
            // For now, return a few random artworks
            const artworks = await services_1.ArtworkService.getAllArtworks();
            const shuffled = [...artworks].sort(() => 0.5 - Math.random());
            const recommendations = shuffled.slice(0, count);
            res.json(recommendations);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getSimilarArtworks(req, res) {
        try {
            const { id } = req.params;
            const count = parseInt(req.query.count) || 5;
            // В реальной реализации это будет использовать алгоритмы визуального сходства
            // For now, return some random artworks
            const artworks = await services_1.ArtworkService.getAllArtworks();
            const shuffled = [...artworks].sort(() => 0.5 - Math.random());
            const similarArtworks = shuffled.slice(0, count);
            res.json(similarArtworks);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async addToCollection(req, res) {
        try {
            const { artworkId, collectionId } = req.params;
            // В реальной реализации это будет добавлять произведение в указанную коллекцию
            // For now, returning success
            res.json({ message: 'Artwork added to collection successfully' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getArtworkAnalytics(req, res) {
        try {
            const { id } = req.params;
            // В реальной реализации это будет извлекать аналитические данные для произведения
            // such as views, engagement metrics, etc.
            const analytics = {
                artwork_id: Number(id),
                total_views: 1250,
                avg_view_duration: 45, // in seconds
                likes: 120,
                shares: 45,
                related_interactions: 320
            };
            res.json(analytics);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.default = new ArtworkController();
//# sourceMappingURL=ArtworkController.js.map