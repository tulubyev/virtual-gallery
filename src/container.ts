// src/container.ts
import { Pool } from 'pg';
import { IArtworkService } from './types/artwork';
import { IGalleryService } from './types/gallery';
import { IUserService } from './types/user';
import { IRecommendationEngine, IArtworkAnalyzer, IImageProcessor } from './types/ai';
import { ILogger, ICacheable } from './types/interfaces';
import { ArtworkService } from './services/ArtworkService';
import { GalleryService } from './services/GalleryService';
import { UserService } from './services/UserService';
import { RecommendationService } from './services/RecommendationService';
import { ArtworkAnalyzer } from './ai-ml/models/artworkAnalyzer';
import { DatabaseService } from './services/DatabaseService';
import { AiController } from './controllers/AiController';

export class Container {
  private services = new Map<string, any>();

  get<T>(serviceName: string): T {
    if (!this.services.has(serviceName)) {
      this.services.set(serviceName, this.createService(serviceName));
    }
    return this.services.get(serviceName);
  }

  private createService(serviceName: string): any {
    switch (serviceName) {
      case 'artworkService':
        return new ArtworkService(
          this.get<Pool>('database'),
          this.get<ILogger>('logger'),
          this.get<ICacheable>('cache')
        );

      case 'galleryService':
        return new GalleryService(
          this.get<Pool>('database'),
          this.get<ILogger>('logger'),
          this.get<ICacheable>('cache')
        );

      case 'userService':
        return new UserService(
          this.get<Pool>('database'),
          this.get<ILogger>('logger'),
          this.get<ICacheable>('cache')
        );

      case 'recommendationService':
        return new RecommendationService(
          this.get<Pool>('database'),
          this.get<ILogger>('logger'),
          this.get<ICacheable>('cache')
        );

      case 'artworkAnalyzer':
        return new ArtworkAnalyzer();

      case 'database':
        return new DatabaseService().getPool(); // Access the pool property

      case 'logger':
        return this.createLogger();

      case 'cache':
        return this.createCache();

      case 'aiController':
        // Create AiController instance with its dependencies
        const artworkAnalyzer = this.get<IArtworkAnalyzer>('artworkAnalyzer');
        const logger = this.get<ILogger>('logger');
        const recommendationService = this.get<IRecommendationEngine>('recommendationService');

        // Import AiController class
        const { AiController } = require('./controllers/AiController');

        return new AiController(artworkAnalyzer, logger, recommendationService);

      default:
        throw new Error(`Unknown service: ${serviceName}`);
    }
  }

  private createLogger(): ILogger {
    // Simple implementation of ILogger
    return {
      info: (message: string, meta?: any) => console.log(`[INFO] ${message}`, meta),
      error: (message: string, error?: Error, meta?: any) => console.error(`[ERROR] ${message}`, error, meta),
      warn: (message: string, meta?: any) => console.warn(`[WARN] ${message}`, meta),
      debug: (message: string, meta?: any) => console.debug(`[DEBUG] ${message}`, meta)
    };
  }

  private createCache(): ICacheable {
    // Simple in-memory cache implementation
    const cache = new Map<string, { value: any; expiry: number }>();
    
    return {
      get: async <T>(key: string): Promise<T | null> => {
        const item = cache.get(key);
        if (!item) return null;
        
        if (item.expiry < Date.now()) {
          cache.delete(key);
          return null;
        }
        
        return item.value as T;
      },
      
      set: async <T>(key: string, value: T, ttl: number = 3600): Promise<void> => {
        const expiry = Date.now() + (ttl * 1000); // Convert seconds to milliseconds
        cache.set(key, { value, expiry });
      },
      
      delete: async (key: string): Promise<void> => {
        cache.delete(key);
      },
      
      clear: async (): Promise<void> => {
        cache.clear();
      }
    };
  }
}

export const container = new Container();