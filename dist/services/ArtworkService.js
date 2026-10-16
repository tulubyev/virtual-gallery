"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// services/ArtworkService.ts
const DatabaseService_1 = __importDefault(require("./DatabaseService"));
const columns_1 = require("./columns");
const ARTWORK_COLUMNS = [
    'title', 'artist_name', 'year_created', 'medium', 'dimensions', 'style', 'description',
    'image_url', 'thumbnail_url', 'location_in_gallery', 'tags', 'status'
];
class ArtworkService {
    async getAllArtworks() {
        const result = await DatabaseService_1.default.query('SELECT * FROM artworks ORDER BY artwork_id');
        return result.rows;
    }
    async getArtworkById(id) {
        const result = await DatabaseService_1.default.query('SELECT * FROM artworks WHERE artwork_id = $1', [id]);
        return result.rows[0];
    }
    async searchArtworks(query) {
        const result = await DatabaseService_1.default.query('SELECT * FROM artworks WHERE title ILIKE $1 OR artist_name ILIKE $1 OR description ILIKE $1', [`%${query}%`]);
        return result.rows;
    }
    async filterArtworksByTags(tags) {
        const tagsArray = `{${tags.map(t => `"${t}"`).join(',')}}`;
        const result = await DatabaseService_1.default.query('SELECT * FROM artworks WHERE tags && $1', [tagsArray]);
        return result.rows;
    }
    async createArtwork(artworkData) {
        const { title, artist_name, year_created, medium, dimensions, style, description, image_url, thumbnail_url, location_in_gallery, tags, status = 'draft' } = artworkData;
        const result = await DatabaseService_1.default.query(`INSERT INTO artworks
      (title, artist_name, year_created, medium, dimensions, style,
       description, image_url, thumbnail_url, location_in_gallery, tags, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *`, [
            title, artist_name, year_created, medium, dimensions,
            style, description, image_url, thumbnail_url,
            location_in_gallery ? JSON.stringify(location_in_gallery) : null,
            tags, status
        ]);
        return result.rows[0];
    }
    async updateArtwork(id, artworkData) {
        const entries = (0, columns_1.pickColumns)(artworkData, ARTWORK_COLUMNS);
        if (entries.length === 0) {
            return (await this.getArtworkById(id)) ?? null;
        }
        const setClause = entries.map(([key], i) => `${key} = $${i + 1}`).join(', ');
        const values = [...entries.map(([key, value]) => (key === 'location_in_gallery' ? JSON.stringify(value) : value)), id];
        const query = `UPDATE artworks SET ${setClause} WHERE artwork_id = $${values.length} RETURNING *`;
        const result = await DatabaseService_1.default.query(query, values);
        return result.rows[0] || null;
    }
    async deleteArtwork(id) {
        const result = await DatabaseService_1.default.query('DELETE FROM artworks WHERE artwork_id = $1 RETURNING artwork_id', [id]);
        return (result.rowCount ?? 0) > 0;
    }
}
exports.default = new ArtworkService();
//# sourceMappingURL=ArtworkService.js.map