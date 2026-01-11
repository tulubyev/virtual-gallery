// src/controllers/GalleryController.ts
import { Request, Response } from 'express';
import GalleryBackendService from '../backend/services/GalleryBackendService';

class GalleryController {
  async getAllGalleries(req: Request, res: Response): Promise<void> {
    try {
      const galleries = await GalleryBackendService.getAllGalleries();
      res.json(galleries);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getGalleryById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const gallery = await GalleryBackendService.getGalleryById(id);

      if (!gallery) {
        res.status(404).json({ error: 'Gallery not found' });
        return;
      }

      res.json(gallery);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getGalleryRooms(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const rooms = await GalleryBackendService.getGalleryRooms(id);
      res.json(rooms);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async createGallery(req: Request, res: Response): Promise<void> {
    try {
      const galleryData = req.body;
      const newGallery = await GalleryBackendService.createGallery(galleryData);
      res.status(201).json(newGallery);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateGallery(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const galleryData = req.body;
      const updatedGallery = await GalleryBackendService.updateGallery(id, galleryData);

      if (!updatedGallery) {
        res.status(404).json({ error: 'Gallery not found' });
        return;
      }

      res.json(updatedGallery);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteGallery(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await GalleryBackendService.deleteGallery(id);

      if (!deleted) {
        res.status(404).json({ error: 'Gallery not found' });
        return;
      }

      res.json({ message: 'Gallery deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getRecommendedArtworks(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const recommendations = await GalleryBackendService.getRecommendedArtworks(id);
      res.json(recommendations);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new GalleryController();