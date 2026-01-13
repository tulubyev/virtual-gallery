// src/controllers/GalleryController.ts
import { Request, Response } from 'express';
import { IGalleryService } from '../types/artwork';
import { ILogger } from '../types/interfaces';

class GalleryController {
  constructor(
    private galleryService: IGalleryService,
    private logger: ILogger
  ) {}

  async getAllGalleries(req: Request, res: Response): Promise<void> {
    try {
      const galleries = await this.galleryService.getAll();
      res.json(galleries);
    } catch (error: any) {
      this.logger.error('Failed to get all galleries', error);
      res.status(500).json({ error: error.message });
    }
  }

  async getGalleryById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const gallery = await this.galleryService.getById(id);

      if (!gallery) {
        res.status(404).json({ error: 'Gallery not found' });
        return;
      }

      res.json(gallery);
    } catch (error: any) {
      this.logger.error(`Failed to get gallery with id ${id}`, error);
      res.status(500).json({ error: error.message });
    }
  }

  async getGalleryRooms(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const rooms = await this.galleryService.getRooms(id);
      res.json(rooms);
    } catch (error: any) {
      this.logger.error(`Failed to get rooms for gallery with id ${id}`, error);
      res.status(500).json({ error: error.message });
    }
  }

  async createGallery(req: Request, res: Response): Promise<void> {
    try {
      const galleryData = req.body;
      const newGallery = await this.galleryService.create(galleryData);
      this.logger.info('Gallery created', { galleryId: newGallery.gallery_id });
      res.status(201).json(newGallery);
    } catch (error: any) {
      this.logger.error('Failed to create gallery', error);
      res.status(500).json({ error: error.message });
    }
  }

  async updateGallery(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const galleryData = req.body;
      const updatedGallery = await this.galleryService.update(id, galleryData);

      this.logger.info('Gallery updated', { galleryId: updatedGallery.gallery_id });
      res.json(updatedGallery);
    } catch (error: any) {
      this.logger.error(`Failed to update gallery with id ${id}`, error);
      res.status(500).json({ error: error.message });
    }
  }

  async deleteGallery(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.galleryService.delete(id);

      this.logger.info('Gallery deleted', { galleryId: id });
      res.json({ message: 'Gallery deleted successfully' });
    } catch (error: any) {
      this.logger.error(`Failed to delete gallery with id ${id}`, error);
      res.status(500).json({ error: error.message });
    }
  }

  async getRecommendedArtworks(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      // Note: IGalleryService doesn't have getRecommendedArtworks method, so we'll need to use a different approach
      // For now, returning empty array as placeholder
      res.json([]);
    } catch (error: any) {
      this.logger.error(`Failed to get recommended artworks for gallery with id ${id}`, error);
      res.status(500).json({ error: error.message });
    }
  }
}

export default GalleryController;