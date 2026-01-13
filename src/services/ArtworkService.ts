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
        const sortBy = filters.sortBy || 'created_at';
        const sortOrder = filters.sortOrder || 'DESC';
        query += ` ORDER BY ${sortBy} ${sortOrder}`;

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
    const client = await this.pool.connect();
    try {
      // Build dynamic SQL query based on fields to update
      const updateFields: string[] = [];
      const values: any[] = [];
      let paramIndex = 2; // Start with 2 because 1 is the id

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

      if (updateFields.length === 0) {
        // If no fields to update, just return the artwork
        const existing = await this.getById(id);
        if (!existing) {
          throw new Error(`Artwork with ID ${id} not found`);
        }
        return existing;
      }

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

  async delete(id: string): Promise<void> {
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

  async initialize(): Promise<void> {
    await super.initialize();
    this.logger.info('ArtworkService initialized');
  }

  async dispose(): Promise<void> {
    this.logger.info('ArtworkService disposed');
    await super.dispose();
  }
}