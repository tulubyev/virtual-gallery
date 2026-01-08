// Controller for gallery operations
const db = require('../models/db');

const galleryController = {
    // Get all galleries
    getAllGalleries: async (req, res) => {
        try {
            const galleries = await db.getAllGalleries();
            res.json(galleries);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get gallery by ID
    getGalleryById: async (req, res) => {
        try {
            const { id } = req.params;
            const gallery = await db.getGalleryById(id);
            
            if (!gallery) {
                return res.status(404).json({ error: 'Gallery not found' });
            }
            
            res.json(gallery);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get gallery rooms
    getGalleryRooms: async (req, res) => {
        try {
            const { id } = req.params;
            const rooms = await db.getGalleryRooms(id);
            res.json(rooms);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Create new gallery
    createGallery: async (req, res) => {
        try {
            const galleryData = req.body;
            const newGallery = await db.createGallery(galleryData);
            res.status(201).json(newGallery);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update gallery
    updateGallery: async (req, res) => {
        try {
            const { id } = req.params;
            const galleryData = req.body;
            const updatedGallery = await db.updateGallery(id, galleryData);
            
            if (!updatedGallery) {
                return res.status(404).json({ error: 'Gallery not found' });
            }
            
            res.json(updatedGallery);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete gallery
    deleteGallery: async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await db.deleteGallery(id);
            
            if (!deleted) {
                return res.status(404).json({ error: 'Gallery not found' });
            }
            
            res.json({ message: 'Gallery deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get recommended artworks for gallery
    getRecommendedArtworks: async (req, res) => {
        try {
            const { id } = req.params;
            const recommendations = await db.getRecommendedArtworks(id);
            res.json(recommendations);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = galleryController;