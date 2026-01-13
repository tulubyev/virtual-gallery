// src/services/BaseService.ts
import { ILogger, ICacheable } from '../types/interfaces';
import { IService } from '../types/interfaces';

export abstract class BaseService implements IService {
  protected logger: ILogger;
  protected cache?: ICacheable;

  constructor(logger: ILogger, cache?: ICacheable) {
    this.logger = logger;
    this.cache = cache;
  }

  async initialize(): Promise<void> {
    this.logger.info(`${this.constructor.name} initialized`);
  }

  async dispose(): Promise<void> {
    this.logger.info(`${this.constructor.name} disposed`);
  }

  protected async withCache<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl?: number
  ): Promise<T> {
    if (!this.cache) {
      return fetcher();
    }

    const cached = await this.cache.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    const result = await fetcher();
    await this.cache.set(key, result, ttl);
    return result;
  }
}