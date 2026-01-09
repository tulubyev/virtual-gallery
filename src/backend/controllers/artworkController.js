// Controller for artwork operations
const db = require('../models/db');

const artworkController = {
    // Get all artworks
    getAllArtworks: async (req, res) => {
        try {
            const artworks = await db.getAllArtworks();
            res.json(artworks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get artwork by ID
    getArtworkById: async (req, res) => {
        try {
            const { id } = req.params;
            const artwork = await db.getArtworkById(id);

            if (!artwork) {
                return res.status(404).json({ error: 'Artwork not found' });
            }

            res.json(artwork);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Search artworks
    searchArtworks: async (req, res) => {
        try {
            const { query } = req.params;
            const artworks = await db.searchArtworks(query);
            res.json(artworks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Filter artworks by tags
    filterArtworksByTags: async (req, res) => {
        try {
            const { tags } = req.params;
            const tagArray = tags.split(',');
            const artworks = await db.filterArtworksByTags(tagArray);
            res.json(artworks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Create new artwork
    createArtwork: async (req, res) => {
        try {
            const artworkData = req.body;
            const newArtwork = await db.createArtwork(artworkData);
            res.status(201).json(newArtwork);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update artwork
    updateArtwork: async (req, res) => {
        try {
            const { id } = req.params;
            const artworkData = req.body;
            const updatedArtwork = await db.updateArtwork(id, artworkData);

            if (!updatedArtwork) {
                return res.status(404).json({ error: 'Artwork not found' });
            }

            res.json(updatedArtwork);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete artwork
    deleteArtwork: async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await db.deleteArtwork(id);

            if (!deleted) {
                return res.status(404).json({ error: 'Artwork not found' });
            }

            res.json({ message: 'Artwork deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get recommended artworks for a user
    getRecommendedArtworks: async (req, res) => {
        try {
            // In a real implementation, this would use AI to recommend artworks
            // based on user preferences and interaction history
            const userId = req.userId; // From JWT token
            const count = parseInt(req.query.count) || 5;

            // For now, return a few random artworks
            const artworks = await db.getAllArtworks();
            const shuffled = [...artworks].sort(() => 0.5 - Math.random());
            const recommendations = shuffled.slice(0, count);

            res.json(recommendations);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get similar artworks to a given artwork
    getSimilarArtworks: async (req, res) => {
        try {
            const { id } = req.params;
            const count = parseInt(req.query.count) || 5;

            // In a real implementation, this would use image similarity algorithms
            // For now, return some random artworks
            const artworks = await db.getAllArtworks();
            const shuffled = [...artworks].sort(() => 0.5 - Math.random());
            const similarArtworks = shuffled.slice(0, count);

            res.json(similarArtworks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Add artwork to a collection
    addToCollection: async (req, res) => {
        try {
            const { artworkId, collectionId } = req.params;
            // In a real implementation, this would add the artwork to the specified collection
            // For now, returning success
            res.json({ message: 'Artwork added to collection successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get artwork analytics
    getArtworkAnalytics: async (req, res) => {
        try {
            const { id } = req.params;
            // In a real implementation, this would fetch analytics data for the artwork
            // such as views, engagement metrics, etc.
            const analytics = {
                artwork_id: id,
                total_views: 1250,
                avg_view_duration: 45, // in seconds
                likes: 120,
                shares: 45,
                related_interactions: 320
            };

            res.json(analytics);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = artworkController;