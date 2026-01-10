// controllers/ArtworkController.ts
import { Request, Response } from 'express';
import { ArtworkService } from '../services';
import { CreateArtworkInput, UpdateArtworkInput } from '../models';

class ArtworkController {
  async getAllArtworks(req: Request, res: Response): Promise<void> {
    try {
      const artworks = await ArtworkService.getAllArtworks();
      res.json(artworks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getArtworkById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const artwork = await ArtworkService.getArtworkById(Number(id));

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
      const artworks = await ArtworkService.searchArtworks(query);
      res.json(artworks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async filterArtworksByTags(req: Request, res: Response): Promise<void> {
    try {
      const { tags } = req.params;
      const tagArray = tags.split(',');
      const artworks = await ArtworkService.filterArtworksByTags(tagArray);
      res.json(artworks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async createArtwork(req: Request, res: Response): Promise<void> {
    try {
      const artworkData = req.body as CreateArtworkInput;
      const newArtwork = await ArtworkService.createArtwork(artworkData);
      res.status(201).json(newArtwork);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateArtwork(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const artworkData = req.body as UpdateArtworkInput;
      const updatedArtwork = await ArtworkService.updateArtwork(Number(id), artworkData);

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
      const deleted = await ArtworkService.deleteArtwork(Number(id));

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
      const artworks = await ArtworkService.getAllArtworks();
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
      const artworks = await ArtworkService.getAllArtworks();
      const shuffled = [...artworks].sort(() => 0.5 - Math.random());
      const similarArtworks = shuffled.slice(0, count);

      res.json(similarArtworks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async addToCollection(req: Request, res: Response): Promise<void> {
    try {
      const { artworkId, collectionId } = req.params;

      // В реальной реализации это будет добавлять произведение в указанную коллекцию
      // For now, returning success
      res.json({ message: 'Artwork added to collection successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getArtworkAnalytics(req: Request, res: Response): Promise<void> {
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
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new ArtworkController();