// controllers/GalleryController.ts
import { Request, Response } from 'express';
import { GalleryService } from '../services';

class GalleryController {
  async getAllGalleries(req: Request, res: Response): Promise<void> {
    try {
      res.json(await GalleryService.getAllGalleries());
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getGalleryById(req: Request, res: Response): Promise<void> {
    try {
      const gallery = await GalleryService.getGalleryById(Number(req.params.id));
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
      res.json(await GalleryService.getGalleryRooms(Number(req.params.id)));
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async createGallery(req: Request, res: Response): Promise<void> {
    try {
      res.status(201).json(await GalleryService.createGallery(req.body));
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateGallery(req: Request, res: Response): Promise<void> {
    try {
      const gallery = await GalleryService.updateGallery(Number(req.params.id), req.body);
      if (!gallery) {
        res.status(404).json({ error: 'Gallery not found' });
        return;
      }
      res.json(gallery);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteGallery(req: Request, res: Response): Promise<void> {
    try {
      const deleted = await GalleryService.deleteGallery(Number(req.params.id));
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
      res.json(await GalleryService.getRecommendedArtworks(Number(req.params.id)));
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new GalleryController();
