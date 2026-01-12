// controllers/ArtworkController.ts
import { Request, Response } from 'express';
import { ArtworkService } from '../services/ArtworkService';
import { CreateArtworkInput, UpdateArtworkInput } from '../models';

class ArtworkController {
  private artworkService = new ArtworkService();

  async getAllArtworks(req: Request, res: Response): Promise<void> {
    try {
      const artworks = await this.artworkService.getAll();
      res.json(artworks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getArtworkById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const artwork = await this.artworkService.getById(id);

      if (!artwork) {
        res.status(404).json({ error: 'Artwork not found' });
        return;
      }

      res.json(artwork);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async searchArtworks(req: Request, res: Response): Promise<void> {
    try {
      const { query } = req.params;
      const limit = parseInt(req.query.limit as string) || 20;
      const offset = parseInt(req.query.offset as string) || 0;
      const artworks = await this.artworkService.search(query, limit, offset);
      res.json(artworks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async filterArtworksByTags(req: Request, res: Response): Promise<void> {
    try {
      const { tags } = req.params;
      const tagArray = tags.split(',');
      const limit = parseInt(req.query.limit as string) || 20;
      const offset = parseInt(req.query.offset as string) || 0;
      const artworks = await this.artworkService.filterByTags(tagArray, limit, offset);
      res.json(artworks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async createArtwork(req: Request, res: Response): Promise<void> {
    try {
      const artworkData = req.body as CreateArtworkInput;
      const newArtwork = await this.artworkService.create(artworkData);
      res.status(201).json(newArtwork);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateArtwork(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const artworkData = req.body as UpdateArtworkInput;
      const updatedArtwork = await this.artworkService.update(id, artworkData);

      if (!updatedArtwork) {
        res.status(404).json({ error: 'Artwork not found' });
        return;
      }

      res.json(updatedArtwork);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteArtwork(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await this.artworkService.delete(id);

      if (!deleted) {
        res.status(404).json({ error: 'Artwork not found' });
        return;
      }

      res.json({ message: 'Artwork deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getRecommendedArtworks(req: Request, res: Response): Promise<void> {
    try {
      // В реальной реализации это будет использовать ИИ для рекомендаций
      // based on user preferences and interaction history
      const userId = (req as any).userId; // From JWT token
      const count = parseInt(req.query.count as string) || 5;

      // For now, return a few random artworks
      const artworks = await this.artworkService.getAll();
      const shuffled = [...artworks].sort(() => 0.5 - Math.random());
      const recommendations = shuffled.slice(0, count);

      res.json(recommendations);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getSimilarArtworks(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const count = parseInt(req.query.count as string) || 5;

      // В реальной реализации это будет использовать алгоритмы визуального сходства
      // For now, return some random artworks
      const similarArtworks = await this.artworkService.getSimilar(id);
      res.json(similarArtworks.slice(0, count));
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async addToCollection(req: Request, res: Response): Promise<void> {
    try {
      const { artworkId, collectionId } = req.params;

      // В реальной реализации это будет добавлять произведение в указанную коллекцию
      // For now, returning success
      const result = await this.artworkService.addToCollection(Number(artworkId), Number(collectionId));
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getArtworkAnalytics(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // В реальной реализации это будет извлекать аналитические данные для произведения
      // such as views, engagement metrics, etc.
      const analytics = await this.artworkService.getAnalytics(Number(id));

      res.json(analytics);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new ArtworkController();