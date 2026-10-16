// services/ArtworkService.ts
import DatabaseService from './DatabaseService';
import { Artwork, CreateArtworkInput, UpdateArtworkInput } from '../models';
import { pickColumns } from './columns';

const ARTWORK_COLUMNS = [
  'title', 'artist_name', 'year_created', 'medium', 'dimensions', 'style', 'description',
  'image_url', 'thumbnail_url', 'location_in_gallery', 'tags', 'status'
] as const;

class ArtworkService {
  async getAllArtworks(): Promise<Artwork[]> {
    const result = await DatabaseService.query(
      'SELECT * FROM artworks ORDER BY artwork_id'
    );
    return result.rows;
  }

  async getArtworkById(id: number): Promise<Artwork | undefined> {
    const result = await DatabaseService.query(
      'SELECT * FROM artworks WHERE artwork_id = $1',
      [id]
    );
    return result.rows[0];
  }

  async searchArtworks(query: string): Promise<Artwork[]> {
    const result = await DatabaseService.query(
      'SELECT * FROM artworks WHERE title ILIKE $1 OR artist_name ILIKE $1 OR description ILIKE $1',
      [`%${query}%`]
    );
    return result.rows;
  }

  async filterArtworksByTags(tags: string[]): Promise<Artwork[]> {
    const tagsArray = `{${tags.map(t => `"${t}"`).join(',')}}`;
    const result = await DatabaseService.query(
      'SELECT * FROM artworks WHERE tags && $1',
      [tagsArray]
    );
    return result.rows;
  }

  async createArtwork(artworkData: CreateArtworkInput): Promise<Artwork> {
    const {
      title, artist_name, year_created, medium, dimensions,
      style, description, image_url, thumbnail_url, location_in_gallery, tags, status = 'draft'
    } = artworkData;

    const result = await DatabaseService.query(
      `INSERT INTO artworks
      (title, artist_name, year_created, medium, dimensions, style,
       description, image_url, thumbnail_url, location_in_gallery, tags, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *`,
      [
        title, artist_name, year_created, medium, dimensions,
        style, description, image_url, thumbnail_url,
        location_in_gallery ? JSON.stringify(location_in_gallery) : null, 
        tags, status
      ]
    );
    return result.rows[0];
  }

  async updateArtwork(id: number, artworkData: UpdateArtworkInput): Promise<Artwork | null> {
    const entries = pickColumns(artworkData, ARTWORK_COLUMNS);
    if (entries.length === 0) {
      return (await this.getArtworkById(id)) ?? null;
    }

    const setClause = entries.map(([key], i) => `${key} = $${i + 1}`).join(', ');
    const values = [...entries.map(([key, value]) => (key === 'location_in_gallery' ? JSON.stringify(value) : value)), id];
    const query = `UPDATE artworks SET ${setClause} WHERE artwork_id = $${values.length} RETURNING *`;

    const result = await DatabaseService.query(query, values);
    return result.rows[0] || null;
  }

  async deleteArtwork(id: number): Promise<boolean> {
    const result = await DatabaseService.query(
      'DELETE FROM artworks WHERE artwork_id = $1 RETURNING artwork_id',
      [id]
    );
    return (result.rowCount ?? 0) > 0;
  }
}

export default new ArtworkService();