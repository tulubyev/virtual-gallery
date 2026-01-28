import { Pool } from 'pg';
import { IArtwork, IArtworkService } from '../types/artwork';
import { ILogger, ICacheable } from '../types/interfaces';

export class ArtworkService implements IArtworkService {
  private pool: Pool;
  private logger: ILogger;
  private cache: ICacheable;

  constructor(pool: Pool, logger: ILogger, cache: ICacheable) {
    this.pool = pool;
    this.logger = logger;
    this.cache = cache;
  }

  async getArtwork(id: string): Promise<IArtwork | null> {
    return this.getById(id);
  }

  async getById(id: string): Promise<IArtwork | null> {
    const cached = await this.cache.get<IArtwork>(`artwork:${id}`);
    if (cached) return cached;

    try {
      const result = await this.pool.query('SELECT * FROM artworks WHERE id = $1', [id]);
      if (result.rows.length === 0) return null;
      
      const artwork = result.rows[0];
      await this.cache.set(`artwork:${id}`, artwork, 3600);
      return artwork;
    } catch (error) {
      this.logger.error('Error fetching artwork', error as Error);
      throw error;
    }
  }

  async getAllArtworks(): Promise<IArtwork[]> {
    return this.getAll();
  }

  async getAll(): Promise<IArtwork[]> {
    try {
      const result = await this.pool.query('SELECT * FROM artworks ORDER BY created_at DESC');
      return result.rows;
    } catch (error) {
      this.logger.error('Error fetching all artworks', error as Error);
      throw error;
    }
  }

  async createArtwork(artwork: Partial<IArtwork>): Promise<IArtwork> {
    return this.create(artwork);
  }

  async create(artwork: Partial<IArtwork>): Promise<IArtwork> {
    try {
      const result = await this.pool.query(
        'INSERT INTO artworks (title, artist, description, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
        [artwork.title, artwork.artist, artwork.description, artwork.imageUrl]
      );
      return result.rows[0];
    } catch (error) {
      this.logger.error('Error creating artwork', error as Error);
      throw error;
    }
  }

  async updateArtwork(id: string, artwork: Partial<IArtwork>): Promise<IArtwork | null> {
    return this.update(id, artwork);
  }

  async update(id: string, artwork: Partial<IArtwork>): Promise<IArtwork | null> {
    try {
      const result = await this.pool.query(
        'UPDATE artworks SET title = COALESCE($1, title), artist = COALESCE($2, artist), description = COALESCE($3, description) WHERE id = $4 RETURNING *',
        [artwork.title, artwork.artist, artwork.description, id]
      );
      if (result.rows.length === 0) return null;
      
      await this.cache.delete(`artwork:${id}`);
      return result.rows[0];
    } catch (error) {
      this.logger.error('Error updating artwork', error as Error);
      throw error;
    }
  }

  async deleteArtwork(id: string): Promise<boolean> {
    return this.delete(id);
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.pool.query('DELETE FROM artworks WHERE id = $1', [id]);
      await this.cache.delete(`artwork:${id}`);
      return (result.rowCount ?? 0) > 0;
    } catch (error) {
      this.logger.error('Error deleting artwork', error as Error);
      throw error;
    }
  }

  async searchArtworks(query: string, options?: any): Promise<IArtwork[]> {
    return this.search(query, options);
  }

  async search(query: string, options?: any): Promise<IArtwork[]> {
    try {
      const result = await this.pool.query(
        'SELECT * FROM artworks WHERE title ILIKE $1 OR artist ILIKE $1 OR description ILIKE $1',
        [`%${query}%`]
      );
      return result.rows;
    } catch (error) {
      this.logger.error('Error searching artworks', error as Error);
      throw error;
    }
  }
}
