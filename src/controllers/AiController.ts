// src/controllers/AiController.ts
import { Request, Response } from 'express';
import { IArtworkAnalyzer } from '../types/ai';
import { ILogger } from '../types/interfaces';
import { generatePersonalizedTour } from '../ai-ml/services/tourService';
import { generateArtworkDescription } from '../ai-ml/services/descriptionService';
import { generateEducationalContent } from '../ai-ml/services/educationalService';
import { RecommendationService } from '../services/RecommendationService';

class AiController {
  private recommendationService: RecommendationService;

  constructor(
    private artworkAnalyzer: IArtworkAnalyzer,
    private logger: ILogger,
    recommendationService: RecommendationService
  ) {
    this.recommendationService = recommendationService;
  }

  // Инициализация сервиса рекомендаций
  async initializeRecommendationService(): Promise<void> {
    try {
      // We'll use the recommendation service from the container instead of importing directly
      // For now, we'll just log the initialization
      this.logger.info('Recommendation service initialization called');
    } catch (error: any) {
      this.logger.error('Error initializing recommendation service', error);
    }
  }

  // Получить рекомендации для пользователя
  async getRecommendations(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId; // Предполагается, что ID пользователя добавлен в middleware аутентификации
      const count = parseInt(req.query.count as string) || 5;

      // Используем сервис рекомендаций для генерации персонализированных рекомендаций
      const recommendations = await this.recommendationService.getRecommendations(userId, count);

      res.json(recommendations);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Сгенерировать ИИ-коллекцию
  async generateCollection(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId; // Предполагается, что ID пользователя добавлен в middleware аутентификации
      const theme = req.query.theme as string || 'mixed';
      const style = req.query.style as string;
      const artist = req.query.artist as string;
      const count = parseInt(req.query.count as string) || 5;

      // В реальной реализации это будет использовать ИИ для создания коллекции
      // на основе предпочтений пользователя и схожести экспонатов

      // Возвращаем заглушку
      const collection = {
        collection_id: 1,
        name: `AI-сгенерированная коллекция: ${theme}`,
        description: `Коллекция, сгенерированная ИИ на основе темы "${theme}"`,
        curator_id: userId,
        is_ai_generated: true,
        artworks: []
      };

      res.json(collection);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Анализировать изображение экспоната через AI/ML сервис
  async analyzeImage(req: Request, res: Response): Promise<void> {
    try {
      const { imageUrl, artworkId } = req.body;

      if (!imageUrl) {
        res.status(400).json({ error: 'URL изображения обязателен' });
        return;
      }

      // Вызов внешнего AI/ML сервиса
      const aiServiceUrl = process.env.AI_CORE_URL || 'http://localhost:8001';

      const response = await fetch(`${aiServiceUrl}/api/v1/images/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_url: imageUrl,
          artwork_id: artworkId,
          user_id: (req as any).userId
        })
      });

      if (!response.ok) {
        throw new Error(`AI service error: ${response.status}`);
      }

      const result = await response.json();
      res.json(result);

    } catch (error: any) {
      this.logger.error('Image analysis failed', error);
      res.status(500).json({ error: error.message });
    }
  }

  // Обработать PDF документ
  async processPdf(req: Request, res: Response): Promise<void> {
    try {
      const { pdfUrl, documentId } = req.body;

      if (!pdfUrl || !documentId) {
        res.status(400).json({ error: 'URL PDF и documentId обязательны' });
        return;
      }

      const aiServiceUrl = process.env.AI_CORE_URL || 'http://localhost:8001';

      const response = await fetch(`${aiServiceUrl}/api/v1/pdfs/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pdf_url: pdfUrl,
          document_id: documentId,
          user_id: (req as any).userId
        })
      });

      if (!response.ok) {
        throw new Error(`AI service error: ${response.status}`);
      }

      const result = await response.json();
      res.json(result);

    } catch (error: any) {
      this.logger.error('PDF processing failed', error);
      res.status(500).json({ error: error.message });
    }
  }

  // Обработать RAG запрос
  async ragQuery(req: Request, res: Response): Promise<void> {
    try {
      const { query, contextLimit, filters } = req.body;

      if (!query) {
        res.status(400).json({ error: 'Query обязателен' });
        return;
      }

      const aiServiceUrl = process.env.AI_CORE_URL || 'http://localhost:8001';

      const response = await fetch(`${aiServiceUrl}/api/v1/rag/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          context_limit: contextLimit || 5,
          context: {
            user_id: (req as any).userId,
            filters: filters || {}
          }
        })
      });

      if (!response.ok) {
        throw new Error(`AI service error: ${response.status}`);
      }

      const result = await response.json();
      res.json(result);

    } catch (error: any) {
      this.logger.error('RAG query failed', error);
      res.status(500).json({ error: error.message });
    }
  }

  // Получить статус анализа
  async getAnalysisStatus(req: Request, res: Response): Promise<void> {
    try {
      const { taskId } = req.params;
      const { type } = req.query; // 'image' or 'pdf'

      if (!taskId) {
        res.status(400).json({ error: 'taskId обязателен' });
        return;
      }

      const aiServiceUrl = process.env.AI_CORE_URL || 'http://localhost:8001';
      const endpoint = type === 'pdf' ? 'pdfs' : 'images';

      const response = await fetch(`${aiServiceUrl}/api/v1/${endpoint}/analysis/${taskId}`);

      if (!response.ok) {
        if (response.status === 404) {
          res.status(404).json({ error: 'Task not found' });
          return;
        }
        throw new Error(`AI service error: ${response.status}`);
      }

      const result = await response.json();
      res.json(result);

    } catch (error: any) {
      this.logger.error('Get analysis status failed', error);
      res.status(500).json({ error: error.message });
    }
  }

  // Получить похожие экспонаты
  async getSimilarArtworks(req: Request, res: Response): Promise<void> {
    try {
      const { artworkId } = req.params;
      const count = parseInt(req.query.count as string) || 5;

      // Используем сервис рекомендаций для поиска похожих экспонатов
      const similarArtworks = await this.recommendationService.getSimilarArtworks(artworkId, count);

      res.json(similarArtworks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Обучить модель рекомендаций
  async trainModel(req: Request, res: Response): Promise<void> {
    try {
      // В реальной реализации это будет использовать новые данные взаимодействия
      // для переобучения модели рекомендаций

      // Возвращаем заглушку
      const result = {
        model_version: '1.0.0',
        training_completed: true,
        samples_processed: 100,
        improvement_metric: 0.05
      };

      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Персонализировать маршрут галереи
  async personalizeGalleryRoute(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId; // Предполагается, что ID пользователя добавлен в middleware аутентификации
      const duration = parseInt(req.query.duration as string) || 60; // в минутах
      const preferredThemes = req.query.themes as string || '';

      // В реальной реализации это будет использовать ИИ для создания персонализированного
      // маршрута по галерее на основе предпочтений пользователя

      // Возвращаем заглушку
      const route = {
        route_id: 1,
        name: 'Персонализированный маршрут',
        description: 'Маршрут, созданный специально для вас',
        estimated_duration: duration,
        theme: preferredThemes,
        artwork_sequence: [1, 5, 12, 8, 15] // IDs экспонатов в маршруте
      };

      res.json(route);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Прогнозировать вовлеченность пользователя
  async predictEngagement(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId; // Предполагается, что ID пользователя добавлен в middleware аутентификации
      const { artworkIds } = req.body; // Массив ID экспонатов для прогноза вовлеченности

      // В реальной реализации это будет использовать ИИ для прогноза
      // того, насколько пользователь будет заинтересован в каждом экспонате

      // Возвращаем заглушку
      const predictions = artworkIds.map((id: number) => ({
        artwork_id: id,
        predicted_engagement: Math.random(), // случайное значение для демонстрации
        predicted_view_time: Math.floor(Math.random() * 120) + 30 // 30-150 секунд
      }));

      res.json(predictions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Generate personalized tour
  async generatePersonalizedTour(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId; // Предполагается, что ID пользователя добавлен в middleware аутентификации
      const duration = parseInt(req.body.duration) || 60; // в минутах
      const preferredThemes = req.body.themes || [];

      // В реальной реализации это будет использовать ИИ для создания персонализированного
      // маршрута по галерее на основе предпочтений пользователя

      // Возвращаем заглушку
      const tour = {
        tour_id: 1,
        name: 'Персонализированный тур',
        description: 'Тур, созданный специально для вас',
        estimated_duration: duration,
        themes: preferredThemes,
        artwork_sequence: [1, 5, 12, 8, 15], // IDs экспонатов в маршруте
        created_at: new Date()
      };

      res.json(tour);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Generate artwork description
  async generateArtworkDescription(req: Request, res: Response): Promise<void> {
    try {
      const { artworkId } = req.params;
      const { language } = req.body;

      // В реальной реализации это будет использовать ИИ для генерации
      // описания экспоната на основе его визуальных характеристик и метаданных

      // Возвращаем заглушку
      const description = {
        artwork_id: artworkId,
        description: 'Это описание было сгенерировано с использованием ИИ',
        language: language || 'ru',
        generated_at: new Date()
      };

      res.json(description);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export { AiController };