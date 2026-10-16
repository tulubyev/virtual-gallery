"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// services/GalleryService.ts
const DatabaseService_1 = __importDefault(require("./DatabaseService"));
const columns_1 = require("./columns");
const GALLERY_COLUMNS = ['name', 'description', 'three_d_model_path', 'layout_algorithm'];
class GalleryService {
    async getAllGalleries() {
        const result = await DatabaseService_1.default.query('SELECT * FROM galleries ORDER BY gallery_id');
        return result.rows;
    }
    async getGalleryById(id) {
        const result = await DatabaseService_1.default.query('SELECT * FROM galleries WHERE gallery_id = $1', [id]);
        return result.rows[0];
    }
    // Заглушка, как и в исходной реализации: модель залов в БД пока не используется
    async getGalleryRooms(_id) {
        return [
            { room_id: 1, name: 'Room A', description: 'North wing' },
            { room_id: 2, name: 'Room B', description: 'South wing' }
        ];
    }
    async createGallery(data) {
        const { name, description, three_d_model_path, layout_algorithm } = data;
        const result = await DatabaseService_1.default.query(`INSERT INTO galleries (name, description, three_d_model_path, layout_algorithm)
       VALUES ($1, $2, $3, $4) RETURNING *`, [name, description, three_d_model_path, layout_algorithm]);
        return result.rows[0];
    }
    async updateGallery(id, data) {
        const entries = (0, columns_1.pickColumns)(data, GALLERY_COLUMNS);
        if (entries.length === 0) {
            return (await this.getGalleryById(id)) ?? null;
        }
        const setClause = entries.map(([key], i) => `${key} = $${i + 1}`).join(', ');
        const values = [...entries.map(([, value]) => value), id];
        const result = await DatabaseService_1.default.query(`UPDATE galleries SET ${setClause} WHERE gallery_id = $${values.length} RETURNING *`, values);
        return result.rows[0] ?? null;
    }
    async deleteGallery(id) {
        const result = await DatabaseService_1.default.query('DELETE FROM galleries WHERE gallery_id = $1 RETURNING gallery_id', [id]);
        return (result.rowCount ?? 0) > 0;
    }
    // Заглушка, как и в исходной реализации: первые три работы
    async getRecommendedArtworks(_galleryId) {
        const result = await DatabaseService_1.default.query('SELECT * FROM artworks LIMIT 3');
        return result.rows;
    }
}
exports.default = new GalleryService();
//# sourceMappingURL=GalleryService.js.map