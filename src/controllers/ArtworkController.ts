// controllers/ArtworkController.ts
import { Request, Response } from 'express';
import { IArtworkService } from '../types/artwork';
import { ILogger } from '../types/interfaces';

class ArtworkController {
  constructor(
    private artworkService: IArtworkService,
    private logger: ILogger
  ) {}

  async getAllArtworks(req: Request, res: Response): Promise<void> {
    try {
      const artworks = await this.artworkService.getAll();
      res.json(artworks);
    } catch (error: any) {
      this.logger.error('Failed to get all artworks', error);
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
      this.logger.error(`Failed to get artwork with id ${id}`, error);
      res.status(500).json({ error: error.message });
    }
  }

  async searchArtworks(req: Request, res: Response): Promise<void> {
    try {
      const { query } = req.params;
      const limit = parseInt(req.query.limit as string) || 20;
      const offset = parseInt(req.query.offset as string) || 0;
      const artworks = await this.artworkService.search(query, { limit, offset });
      res.json(artworks);
    } catch (error: any) {
      this.logger.error(`Failed to search artworks with query ${query}`, error);
      res.status(500).json({ error: error.message });
    }
  }

  async filterArtworksByTags(req: Request, res: Response): Promise<void> {
    try {
      const { tags } = req.params;
      const tagArray = tags.split(',');
      const limit = parseInt(req.query.limit as string) || 20;
      const offset = parseInt(req.query.offset as string) || 0;
      const artworks = await this.artworkService.search('', { tags: tagArray, limit, offset });
      res.json(artworks);
    } catch (error: any) {
      this.logger.error(`Failed to filter artworks by tags ${tags}`, error);
      res.status(500).json({ error: error.message });
    }
  }

  async createArtwork(req: Request, res: Response): Promise<void> {
    try {
      const artworkData = req.body;
      const newArtwork = await this.artworkService.create(artworkData);
      this.logger.info('Artwork created', { artworkId: newArtwork.artwork_id });
      res.status(201).json(newArtwork);
    } catch (error: any) {
      this.logger.error('Failed to create artwork', error);
      res.status(500).json({ error: error.message });
    }
  }

  async updateArtwork(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const artworkData = req.body;
      const updatedArtwork = await this.artworkService.update(id, artworkData);

      this.logger.info('Artwork updated', { artworkId: updatedArtwork.artwork_id });
      res.json(updatedArtwork);
    } catch (error: any) {
      this.logger.error(`Failed to update artwork with id ${id}`, error);
      res.status(500).json({ error: error.message });
    }
  }

  async deleteArtwork(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.artworkService.delete(id);

      this.logger.info('Artwork deleted', { artworkId: id });
      res.json({ message: 'Artwork deleted successfully' });
    } catch (error: any) {
      this.logger.error(`Failed to delete artwork with id ${id}`, error);
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
      this.logger.error('Failed to get recommended artworks', error);
      res.status(500).json({ error: error.message });
    }
  }

  async getSimilarArtworks(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const count = parseInt(req.query.count as string) || 5;

      // В реальной реализации это будет использовать алгоритмы визуального сходства
      // For now, return some random artworks
      const similarArtworks = await this.artworkService.search('', { limit: count });
      res.json(similarArtworks.slice(0, count));
    } catch (error: any) {
      this.logger.error(`Failed to get similar artworks for id ${id}`, error);
      res.status(500).json({ error: error.message });
    }
  }

  async addToCollection(req: Request, res: Response): Promise<void> {
    try {
      const { artworkId, collectionId } = req.params;

      // В реальной реализации это будет добавлять произведение в указанную коллекцию
      // For now, returning success
      const result = await this.artworkService.search('', { limit: 1 }); // Placeholder
      res.json(result[0] || { message: 'Added to collection' });
    } catch (error: any) {
      this.logger.error(`Failed to add artwork ${artworkId} to collection ${collectionId}`, error);
      res.status(500).json({ error: error.message });
    }
  }

  async getArtworkAnalytics(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // В реальной реализации это будет извлекать аналитические данные для произведения
      // such as views, engagement metrics, etc.
      // Placeholder implementation
      res.json({ artwork_id: parseInt(id), total_views: 100, avg_view_duration: 45, likes: 10, shares: 5, related_interactions: 20 });
    } catch (error: any) {
      this.logger.error(`Failed to get analytics for artwork with id ${id}`, error);
      res.status(500).json({ error: error.message });
    }
  }
}

export default ArtworkController;