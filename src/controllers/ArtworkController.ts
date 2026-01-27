// controllers/ArtworkController.ts
import { Request, Response } from 'express';
import { IArtworkService } from '../types/artwork';
import { ILogger } from '../types/interfaces';

// Import multer types
interface MulterFile {
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

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
    const { id } = req.params;
    try {
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
    const { query } = req.params;
    try {
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
    const { tags } = req.params;
    try {
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
    const { id } = req.params;
    try {
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
    const { id } = req.params;
    try {
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
    const { id } = req.params;
    try {
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
    const { artworkId, collectionId } = req.params;
    try {
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
    const { id } = req.params;
    try {
      // В реальной реализации это будет извлекать аналитические данные для произведения
      // such as views, engagement metrics, etc.
      // Placeholder implementation
      res.json({ artwork_id: parseInt(id), total_views: 100, avg_view_duration: 45, likes: 10, shares: 5, related_interactions: 20 });
    } catch (error: any) {
      this.logger.error(`Failed to get analytics for artwork with id ${id}`, error);
      res.status(500).json({ error: error.message });
    }
  }

  async uploadArtworkImage(req: Request, res: Response): Promise<void> {
    try {
      // In a real implementation, this would process the uploaded image
      // and store it in the appropriate location
      if (!req.file) {
        res.status(400).json({ error: 'No image file provided' });
        return;
      }

      // Process the uploaded file
      const imageUrl = `/uploads/${req.file.filename}`;

      res.json({
        message: 'Image uploaded successfully',
        imageUrl,
        filename: req.file.filename,
        originalName: req.file.originalname
      });
    } catch (error: any) {
      this.logger.error('Failed to upload artwork image', error);
      res.status(500).json({ error: error.message });
    }
  }

  async uploadMultipleArtworkImages(req: Request, res: Response): Promise<void> {
    try {
      // In a real implementation, this would process multiple uploaded images
      if (!req.files || (req.files as MulterFile[]).length === 0) {
        res.status(400).json({ error: 'No image files provided' });
        return;
      }

      const files = req.files as MulterFile[];
      const imageUrls = files.map(file => `/uploads/${file.filename}`);

      res.json({
        message: `${files.length} images uploaded successfully`,
        imageUrls,
        filenames: files.map(file => file.filename),
        originalNames: files.map(file => file.originalname)
      });
    } catch (error: any) {
      this.logger.error('Failed to upload multiple artwork images', error);
      res.status(500).json({ error: error.message });
    }
  }

  async submitArtworkForReview(req: Request, res: Response): Promise<void> {
    try {
      // In a real implementation, this would validate the artwork submission
      // and add it to a moderation queue
      const artworkData = req.body;

      // Validate required fields
      if (!artworkData.title || !artworkData.artist_name) {
        res.status(400).json({ error: 'Title and artist name are required' });
        return;
      }

      // In a real implementation, this would create a pending artwork record
      // and notify moderators
      const submission = {
        submission_id: Math.floor(Math.random() * 10000),
        artwork_data: artworkData,
        submitted_at: new Date(),
        status: 'pending_review',
        submitted_by: (req as any).userId // assuming user ID from JWT
      };

      res.json(submission);
    } catch (error: any) {
      this.logger.error('Failed to submit artwork for review', error);
      res.status(500).json({ error: error.message });
    }
  }
}

export { ArtworkController };