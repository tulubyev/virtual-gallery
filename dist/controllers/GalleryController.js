"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
class GalleryController {
    async getAllGalleries(req, res) {
        try {
            res.json(await services_1.GalleryService.getAllGalleries());
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getGalleryById(req, res) {
        try {
            const gallery = await services_1.GalleryService.getGalleryById(Number(req.params.id));
            if (!gallery) {
                res.status(404).json({ error: 'Gallery not found' });
                return;
            }
            res.json(gallery);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getGalleryRooms(req, res) {
        try {
            res.json(await services_1.GalleryService.getGalleryRooms(Number(req.params.id)));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async createGallery(req, res) {
        try {
            res.status(201).json(await services_1.GalleryService.createGallery(req.body));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async updateGallery(req, res) {
        try {
            const gallery = await services_1.GalleryService.updateGallery(Number(req.params.id), req.body);
            if (!gallery) {
                res.status(404).json({ error: 'Gallery not found' });
                return;
            }
            res.json(gallery);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async deleteGallery(req, res) {
        try {
            const deleted = await services_1.GalleryService.deleteGallery(Number(req.params.id));
            if (!deleted) {
                res.status(404).json({ error: 'Gallery not found' });
                return;
            }
            res.json({ message: 'Gallery deleted successfully' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getRecommendedArtworks(req, res) {
        try {
            res.json(await services_1.GalleryService.getRecommendedArtworks(Number(req.params.id)));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.default = new GalleryController();
//# sourceMappingURL=GalleryController.js.map