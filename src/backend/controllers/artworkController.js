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
    }
};

module.exports = artworkController;