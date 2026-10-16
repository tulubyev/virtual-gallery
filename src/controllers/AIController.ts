// controllers/AIController.ts
import { Request, Response } from 'express';
import { ArtworkService } from '../services';

// Рекомендательный сервис остаётся на JS (ai-ml/), типы не описаны
// eslint-disable-next-line @typescript-eslint/no-var-requires
const recommendationService = require('../ai-ml/services/recommendationService');

recommendationService.initialize().catch(console.error);

const intQuery = (value: unknown, fallback: number): number => parseInt(String(value), 10) || fallback;

class AIController {
  // Рекомендации для пользователя
  async getRecommendations(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId;
      const count = intQuery(req.query.count, 5);
      const filters = req.query.filters ? JSON.parse(String(req.query.filters)) : {};

      const recommendations = await recommendationService.getRecommendations(userId, count, filters);

      res.json(recommendations.map((artwork: any) => ({
        artwork_id: artwork.artwork_id,
        title: artwork.title,
        artist_name: artwork.artist_name,
        reason: artwork.reason || 'Selected based on your preferences and similar users',
        score: artwork.score || artwork.combinedScore || artwork.similarity,
        tags: artwork.tags,
        style: artwork.style,
        image_url: artwork.image_url
      })));
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Подборка по критериям (случайная выборка из подходящих работ)
  async generateCollection(req: Request, res: Response): Promise<void> {
    try {
      const theme = String(req.query.theme || 'mixed');
      const style = req.query.style ? String(req.query.style) : undefined;
      const artist = req.query.artist ? String(req.query.artist) : undefined;
      const count = intQuery(req.query.count, 5);
      const isPublic = req.query.public === 'true';

      let artworks = await ArtworkService.getAllArtworks();
      if (style) {
        artworks = artworks.filter(a => a.style && a.style.toLowerCase().includes(style.toLowerCase()));
      }
      if (artist) {
        artworks = artworks.filter(a => a.artist_name && a.artist_name.toLowerCase().includes(artist.toLowerCase()));
      }

      const selected = [...artworks].sort(() => 0.5 - Math.random()).slice(0, count);

      res.json({
        name: `AI Curated: ${theme}${style ? ` - ${style}` : ''}`,
        description: `An AI-curated collection${style ? ` of ${style} artworks` : ''} around the theme "${theme}"`,
        curator: 'AI Curator',
        artworks: selected.map(a => ({
          artwork_id: a.artwork_id,
          title: a.title,
          artist_name: a.artist_name
        })),
        is_ai_generated: true,
        created_for_public_display: isPublic
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Анализ изображения — пока заглушка (реальный анализ при загрузке: artworkUploadController)
  async analyzeImage(req: Request, res: Response): Promise<void> {
    try {
      res.json({
        tags: ['landscape', 'nature', 'trees', 'scenic'],
        style: 'impressionism',
        dominant_colors: ['#4A752C', '#8B4513', '#5F9EA0'],
        composition_elements: ['rule_of_thirds', 'leading_lines'],
        estimated_period: '1880-1920',
        confidence: 0.85,
        similar_artworks: [
          { artwork_id: 1, title: 'Similar Landscape', similarity: 0.92 },
          { artwork_id: 5, title: 'Nature Scene', similarity: 0.87 }
        ]
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getSimilarArtworks(req: Request, res: Response): Promise<void> {
    try {
      const count = intQuery(req.query.count, 5);
      const similar = await recommendationService.getSimilarArtworks(
        Number(req.params.artworkId),
        count,
        (req as any).userId
      );

      res.json(similar.map((artwork: any) => ({
        artwork_id: artwork.artwork_id,
        title: artwork.title,
        artist_name: artwork.artist_name,
        similarity_score: artwork.similarity || artwork.score,
        tags: artwork.tags,
        style: artwork.style,
        image_url: artwork.image_url
      })));
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Переобучение модели — заглушка
  async trainModel(req: Request, res: Response): Promise<void> {
    try {
      const startTime = Date.now();
      await new Promise(resolve => setTimeout(resolve, 2000));

      res.json({
        model_version: '1.2.3',
        training_completed: true,
        processing_time_ms: Date.now() - startTime,
        samples_processed: 1542,
        accuracy_improvement: 0.03,
        next_training_scheduled: new Date(Date.now() + 24 * 60 * 60 * 1000)
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Персональный маршрут по галерее
  async personalizeGalleryRoute(req: Request, res: Response): Promise<void> {
    try {
      const duration = intQuery(req.query.duration, 30);
      const themes = req.query.themes ? String(req.query.themes).split(',') : [];
      const exclude = req.query.exclude ? String(req.query.exclude).split(',').map(id => parseInt(id, 10)) : [];

      const matchesTheme = (a: { tags?: string[]; style?: string }): boolean =>
        themes.some(theme => (a.tags || []).includes(theme) || (a.style && a.style.toLowerCase().includes(theme)));

      const available = (await ArtworkService.getAllArtworks()).filter(a => !exclude.includes(a.artwork_id));
      if (themes.length > 0) {
        available.sort((a, b) => Number(matchesTheme(b)) - Number(matchesTheme(a)));
      }

      // Примерно 2 минуты на работу
      const route = available.slice(0, Math.floor(duration / 2));

      res.json({
        name: `Personalized Route for ${duration} minutes`,
        description: 'A route tailored to your interests',
        estimated_duration: duration,
        artworks: route.map(a => ({
          artwork_id: a.artwork_id,
          title: a.title,
          artist_name: a.artist_name,
          location_in_gallery: a.location_in_gallery
        }))
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Прогноз вовлечённости — демо со случайными значениями
  async predictEngagement(req: Request, res: Response): Promise<void> {
    try {
      const { artworkIds } = req.body;
      if (!Array.isArray(artworkIds)) {
        res.status(400).json({ error: 'artworkIds must be an array' });
        return;
      }

      const predictions = artworkIds.map((artworkId: number) => ({
        artwork_id: artworkId,
        predicted_engagement_score: Math.random(),
        predicted_view_duration: Math.floor(Math.random() * 120) + 30,
        likelihood_to_like: Math.random(),
        likelihood_to_share: Math.random() * 0.3
      }));
      predictions.sort((a, b) => b.predicted_engagement_score - a.predicted_engagement_score);

      res.json(predictions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new AIController();
