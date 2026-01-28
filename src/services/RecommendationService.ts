import { Pool } from 'pg';
import { IRecommendationEngine } from '../types/ai';
import { ILogger, ICacheable } from '../types/interfaces';

export class RecommendationService implements IRecommendationEngine {
  private pool: Pool;
  private logger: ILogger;
  private cache: ICacheable;

  constructor(pool: Pool, logger: ILogger, cache: ICacheable) {
    this.pool = pool;
    this.logger = logger;
    this.cache = cache;
  }

  async getRecommendations(userId: string, limit: number = 10): Promise<any[]> {
    const cacheKey = `recommendations:${userId}:${limit}`;
    const cached = await this.cache.get<any[]>(cacheKey);
    if (cached) return cached;

    try {
      const result = await this.pool.query(
        `SELECT a.* FROM artworks a
         LEFT JOIN user_interactions ui ON a.id = ui.artwork_id AND ui.user_id = $1
         WHERE ui.id IS NULL
         ORDER BY RANDOM()
         LIMIT $2`,
        [userId, limit]
      );
      
      const recommendations = result.rows;
      await this.cache.set(cacheKey, recommendations, 1800);
      return recommendations;
    } catch (error) {
      this.logger.error('Error getting recommendations', error as Error);
      throw error;
    }
  }

  async getSimilarArtworks(artworkId: string, limit: number = 5): Promise<any[]> {
    const cacheKey = `similar:${artworkId}:${limit}`;
    const cached = await this.cache.get<any[]>(cacheKey);
    if (cached) return cached;

    try {
      const artworkResult = await this.pool.query(
        'SELECT artist, style, medium FROM artworks WHERE id = $1',
        [artworkId]
      );
      
      if (artworkResult.rows.length === 0) {
        return [];
      }

      const artwork = artworkResult.rows[0];
      
      const result = await this.pool.query(
        `SELECT * FROM artworks 
         WHERE id != $1 
         AND (artist = $2 OR style = $3 OR medium = $4)
         ORDER BY RANDOM()
         LIMIT $5`,
        [artworkId, artwork.artist, artwork.style, artwork.medium, limit]
      );
      
      const similar = result.rows;
      await this.cache.set(cacheKey, similar, 3600);
      return similar;
    } catch (error) {
      this.logger.error('Error getting similar artworks', error as Error);
      throw error;
    }
  }
}
