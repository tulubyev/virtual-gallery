// src/services/ArtworkService.ts
import { Pool } from 'pg';
import { BaseService } from './BaseService';
import {
  IArtworkService,
  Artwork,
  ArtworkFilters,
  CreateArtworkDto,
  UpdateArtworkDto,
  SearchFilters
} from '../types/artwork';
import { ILogger, ICacheable } from '../types/interfaces';
import { buildOrderBy } from './sortOrder';

const ARTWORK_SORT_COLUMNS = ['created_at', 'title', 'artist_name'] as const;

export interface ArtworkAnalytics {
  artwork_id: number;
  total_views: number;
  avg_view_duration: number;
  likes: number;
  shares: number;
  related_interactions: number;
}

export class ArtworkService extends BaseService implements IArtworkService {
  private pool: Pool;

  constructor(
    pool: Pool,
    logger: ILogger,
    cache?: ICacheable
  ) {
    super(logger, cache);
    this.pool = pool;
  }
  async getById(id: string): Promise<Artwork | null> {
    return this.withCache(
      `artwork:${id}`,
      async () => {
        const client = await this.pool.connect();
        try {
          const result = await client.query(
            'SELECT artwork_id, title, artist_name, year_created, medium, dimensions, style, description, image_url, tags, created_at, gallery_id FROM artworks WHERE artwork_id = $1',
            [id]
          );
          return result.rows.length > 0 ? result.rows[0] : null;
        } finally {
          client.release();
        }
      },
      3600 // 1 hour
    );
  }

  async getByGallery(galleryId: string, filters?: ArtworkFilters): Promise<Artwork[]> {
    const client = await this.pool.connect();
    try {
      let query = 'SELECT artwork_id, title, artist_name, year_created, medium, dimensions, style, description, image_url, tags, created_at, gallery_id FROM artworks WHERE gallery_id = $1';
      const params: any[] = [galleryId];
      let paramIndex = 2;

      if (filters) {
        if (filters.searchQuery) {
          const searchPattern = `%${filters.searchQuery}%`;
          query += ` AND (title ILIKE $${paramIndex} OR artist_name ILIKE $${paramIndex})`;
          params.push(searchPattern);
          paramIndex++;
        }

        if (filters.tags && filters.tags.length > 0) {
          const tagsCondition = ` AND tags && ARRAY[${filters.tags.map(() => `$${paramIndex++}`).join(',')}]`;
          query += tagsCondition;
          params.push(...filters.tags);
        }

        // Add sorting
        query += buildOrderBy(ARTWORK_SORT_COLUMNS, filters.sortBy, filters.sortOrder);

        // Add pagination
        if (filters.limit) {
          query += ` LIMIT $${paramIndex}`;
          params.push(filters.limit);
          paramIndex++;

          if (filters.offset) {
            query += ` OFFSET $${paramIndex}`;
            params.push(filters.offset);
          }
        }
      }

      const result = await client.query(query, params);
      return result.rows;
    } finally {
      client.release();
    }
  }

  async create(artwork: CreateArtworkDto): Promise<Artwork> {
    this.validateArtwork(artwork, true);
    const client = await this.pool.connect();
    try {
      // Convert tags array to PostgreSQL format
      const tagsArray = `{${artwork.tags.map(tag => `"${tag}"`).join(',')}}`;

      const result = await client.query(
        `INSERT INTO artworks
         (title, artist_name, year_created, medium, dimensions, style, description, image_url, tags, gallery_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         RETURNING artwork_id, title, artist_name, year_created, medium, dimensions, style, description, image_url, tags, created_at, gallery_id`,
        [
          artwork.title,
          artwork.artist_name,
          artwork.year_created,
          artwork.medium,
          artwork.dimensions,
          artwork.style,
          artwork.description,
          artwork.image_url,
          tagsArray,
          artwork.gallery_id
        ]
      );

      const newArtwork = result.rows[0];

      // Invalidate cache lists
      if (this.cache) {
        await this.cache.delete('artworks:all');
        if (newArtwork.gallery_id) {
          await this.cache.delete(`artworks:gallery:${newArtwork.gallery_id}`);
        }
      }

      this.logger.info('Artwork created', { artworkId: newArtwork.artwork_id });
      return newArtwork;
    } finally {
      client.release();
    }
  }

  async update(id: string, updates: UpdateArtworkDto): Promise<Artwork> {
    this.validateArtwork(updates, false);
    const fields = [
      'title', 'artist_name', 'year_created', 'medium', 'dimensions',
      'style', 'description', 'image_url', 'tags', 'gallery_id',
    ] as const;
    if (!fields.some(field => updates[field] !== undefined)) {
      const existing = await this.getById(id);
      if (!existing) {
        throw new Error(`Artwork with ID ${id} not found`);
      }
      return existing;
    }

    const client = await this.pool.connect();
    try {
      // Build dynamic SQL query based on fields to update
      const updateFields: string[] = [];
      const values: any[] = [];
      let paramIndex = 1; // The id follows all field values

      if (updates.title !== undefined) {
        updateFields.push(`title = $${paramIndex}`);
        values.push(updates.title);
        paramIndex++;
      }

      if (updates.artist_name !== undefined) {
        updateFields.push(`artist_name = $${paramIndex}`);
        values.push(updates.artist_name);
        paramIndex++;
      }

      if (updates.year_created !== undefined) {
        updateFields.push(`year_created = $${paramIndex}`);
        values.push(updates.year_created);
        paramIndex++;
      }

      if (updates.medium !== undefined) {
        updateFields.push(`medium = $${paramIndex}`);
        values.push(updates.medium);
        paramIndex++;
      }

      if (updates.dimensions !== undefined) {
        updateFields.push(`dimensions = $${paramIndex}`);
        values.push(updates.dimensions);
        paramIndex++;
      }

      if (updates.style !== undefined) {
        updateFields.push(`style = $${paramIndex}`);
        values.push(updates.style);
        paramIndex++;
      }

      if (updates.description !== undefined) {
        updateFields.push(`description = $${paramIndex}`);
        values.push(updates.description);
        paramIndex++;
      }

      if (updates.image_url !== undefined) {
        updateFields.push(`image_url = $${paramIndex}`);
        values.push(updates.image_url);
        paramIndex++;
      }

      if (updates.tags !== undefined) {
        const tagsArray = `{${updates.tags.map(tag => `"${tag}"`).join(',')}}`;
        updateFields.push(`tags = $${paramIndex}`);
        values.push(tagsArray);
        paramIndex++;
      }

      if (updates.gallery_id !== undefined) {
        updateFields.push(`gallery_id = $${paramIndex}`);
        values.push(updates.gallery_id);
        paramIndex++;
      }

      // Add id to the end of values
      values.push(id);

      const query = `UPDATE artworks SET ${updateFields.join(', ')} WHERE artwork_id = $${paramIndex} RETURNING artwork_id, title, artist_name, year_created, medium, dimensions, style, description, image_url, tags, created_at, gallery_id`;
      const result = await client.query(query, values);

      if (result.rows.length === 0) {
        throw new Error(`Artwork with ID ${id} not found`);
      }

      const updatedArtwork = result.rows[0];

      // Invalidate cache
      if (this.cache) {
        await this.cache.delete(`artwork:${id}`);
        if (updatedArtwork.gallery_id) {
          await this.cache.delete(`artworks:gallery:${updatedArtwork.gallery_id}`);
        }
      }

      this.logger.info('Artwork updated', { artworkId: updatedArtwork.artwork_id });
      return updatedArtwork;
    } finally {
      client.release();
    }
  }

  private validateArtwork(data: CreateArtworkDto | UpdateArtworkDto, creating: boolean): void {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      throw new Error('Artwork data must be an object');
    }

    for (const field of ['title', 'artist_name'] as const) {
      const value = data[field];
      if ((creating || value !== undefined) &&
          (typeof value !== 'string' || value.trim().length === 0)) {
        throw new Error(`${field} must be a non-empty string`);
      }
    }

    if ((creating || data.tags !== undefined) &&
        (!Array.isArray(data.tags) || !Array.from(data.tags).every(tag => typeof tag === 'string'))) {
      throw new Error('tags must be an array of strings');
    }

    if (data.year_created !== undefined && !Number.isInteger(data.year_created)) {
      throw new Error('year_created must be an integer');
    }

    for (const field of ['medium', 'dimensions', 'style', 'description', 'image_url', 'gallery_id'] as const) {
      if (data[field] !== undefined && typeof data[field] !== 'string') {
        throw new Error(`${field} must be a string`);
      }
    }
  }

  async delete(id: string): Promise<boolean> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        'DELETE FROM artworks WHERE artwork_id = $1 RETURNING artwork_id',
        [id]
      );

      if (result.rows.length === 0) {
        throw new Error(`Artwork with ID ${id} not found`);
      }

      // Invalidate cache
      if (this.cache) {
        await this.cache.delete(`artwork:${id}`);
        await this.cache.delete('artworks:all');
      }

      this.logger.info('Artwork deleted', { artworkId: id });
      return true;
    } finally {
      client.release();
    }
  }

  async search(query: string, filters?: SearchFilters): Promise<Artwork[]> {
    const cacheKey = `search:${query}:${JSON.stringify(filters)}`;

    return this.withCache(cacheKey, async () => {
      const client = await this.pool.connect();
      try {
        // Full-text search on title and description
        const searchPattern = `%${query}%`;
        let sqlQuery = `SELECT artwork_id, title, artist_name, year_created, medium, dimensions, style, description, image_url, tags, created_at, gallery_id
                       FROM artworks
                       WHERE title ILIKE $1 OR description ILIKE $1`;
        const params: any[] = [searchPattern];
        let paramIndex = 2;

        // Apply additional filters
        if (filters) {
          if (filters.tags && filters.tags.length > 0) {
            const tagsCondition = ` AND tags && ARRAY[${filters.tags.map(() => `$${paramIndex++}`).join(',')}]`;
            sqlQuery += tagsCondition;
            params.push(...filters.tags);
          }

          // Add pagination
          if (filters.limit) {
            sqlQuery += ` LIMIT $${paramIndex}`;
            params.push(filters.limit);
            paramIndex++;

            if (filters.offset) {
              sqlQuery += ` OFFSET $${paramIndex}`;
              params.push(filters.offset);
            }
          }
        }

        const result = await client.query(sqlQuery, params);
        return result.rows;
      } finally {
        client.release();
      }
    }, 900); // 15 minutes
  }

  async getAll(filters?: ArtworkFilters): Promise<Artwork[]> {
    const cacheKey = `artworks:all:${JSON.stringify(filters)}`;

    return this.withCache(cacheKey, async () => {
      const client = await this.pool.connect();
      try {
        let query = 'SELECT * FROM artworks';
        const params: any[] = [];
        let paramIndex = 1;

        // Apply filters if provided
        if (filters) {
          const conditions: string[] = [];

          if (filters.tags && filters.tags.length > 0) {
            // Filter by tags (assuming tags are stored as JSONB)
            conditions.push(`tags @> $${paramIndex}::jsonb`);
            params.push(JSON.stringify(filters.tags));
            paramIndex++;
          }

          if (filters.searchQuery) {
            // Full-text search on title, description, and artist name
            conditions.push(`to_tsvector('english', title || ' ' || COALESCE(description, '') || ' ' || COALESCE(artist_name, '')) @@ plainto_tsquery('english', $${paramIndex})`);
            params.push(filters.searchQuery);
            paramIndex++;
          }

          if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(' AND ')}`;
          }
        }

        // Apply sorting
        query += buildOrderBy(
          ARTWORK_SORT_COLUMNS,
          filters?.sortBy,
          filters?.sortOrder,
          filters?.sortBy ? 'ASC' : 'DESC'
        );

        // Apply pagination
        if (filters?.limit) {
          query += ` LIMIT $${paramIndex}`;
          params.push(filters.limit);
          paramIndex++;

          if (filters.offset) {
            query += ` OFFSET $${paramIndex}`;
            params.push(filters.offset);
          }
        }

        const result = await client.query(query, params);
        return result.rows;
      } finally {
        client.release();
      }
    }, 300); // Cache for 5 minutes
  }

  async getRecommended(userId: string, count: number = 5): Promise<Artwork[]> {
    const cacheKey = `recommended:artworks:user:${userId}:count:${count}`;

    return this.withCache(cacheKey, async () => {
      // In a real implementation, this would use AI/ML models to generate recommendations
      // based on user preferences, history, and artwork characteristics

      // For demonstration purposes, we'll return random artworks
      const client = await this.pool.connect();
      try {
        const result = await client.query(
          `SELECT * FROM artworks
           ORDER BY RANDOM()
           LIMIT $1`,
          [count]
        );
        return result.rows;
      } finally {
        client.release();
      }
    }, 1800); // 30 minutes
  }

  async getSimilar(artworkId: string, count: number = 5): Promise<Artwork[]> {
    const cacheKey = `similar:artworks:${artworkId}:count:${count}`;

    return this.withCache(cacheKey, async () => {
      // In a real implementation, this would use AI/ML models to find similar artworks
      // based on visual features, style, tags, etc.

      // For demonstration, we'll return random artworks
      const client = await this.pool.connect();
      try {
        const result = await client.query(
          `SELECT * FROM artworks
           WHERE artwork_id != $1
           ORDER BY RANDOM()
           LIMIT $2`,
          [artworkId, count]
        );
        return result.rows;
      } finally {
        client.release();
      }
    }, 1800); // 30 minutes
  }

  async filterByTags(tags: string[]): Promise<Artwork[]> {
    const cacheKey = `artworks:by-tags:${tags.join(',')}`;

    return this.withCache(cacheKey, async () => {
      const client = await this.pool.connect();
      try {
        // Assuming tags are stored as JSONB in the database
        const result = await client.query(
          `SELECT * FROM artworks
           WHERE tags @> $1::jsonb`,
          [JSON.stringify(tags)]
        );
        return result.rows;
      } finally {
        client.release();
      }
    }, 300); // Cache for 5 minutes
  }

  async getAnalytics(artworkId: string): Promise<any> {
    const cacheKey = `analytics:artwork:${artworkId}`;

    return this.withCache(cacheKey, async () => {
      // In a real implementation, this would aggregate analytics data
      // from user interactions, views, likes, etc.

      // For demonstration, we'll return mock analytics
      const client = await this.pool.connect();
      try {
        // Get basic artwork info
        const artworkResult = await client.query(
          'SELECT * FROM artworks WHERE artwork_id = $1',
          [artworkId]
        );

        if (artworkResult.rows.length === 0) {
          throw new Error(`Artwork with ID ${artworkId} not found`);
        }

        // Mock analytics data
        const analytics = {
          artwork: artworkResult.rows[0],
          views: Math.floor(Math.random() * 1000),
          likes: Math.floor(Math.random() * 100),
          shares: Math.floor(Math.random() * 50),
          average_view_time: Math.floor(Math.random() * 120) + 30, // 30-150 seconds
          engagement_rate: (Math.random() * 0.5).toFixed(2), // 0-50%
          popular_times: [
            { day: 'Monday', hour: 14, views: Math.floor(Math.random() * 100) },
            { day: 'Wednesday', hour: 16, views: Math.floor(Math.random() * 100) },
            { day: 'Saturday', hour: 11, views: Math.floor(Math.random() * 100) }
          ]
        };

        return analytics;
      } finally {
        client.release();
      }
    }, 600); // Cache for 10 minutes
  }

  async initialize(): Promise<void> {
    await super.initialize();
    this.logger.info('ArtworkService initialized');
  }

  async dispose(): Promise<void> {
    this.logger.info('ArtworkService disposed');
    await super.dispose();
  }
}