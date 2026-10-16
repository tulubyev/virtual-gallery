"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.galleryRoutes = void 0;
// routes/galleryRoutes.ts
const express_1 = require("express");
const controllers_1 = require("../controllers");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
exports.galleryRoutes = router;
const canManage = [auth_1.authenticateToken, (0, auth_1.requireRole)(['admin', 'curator'])];
router.get('/', controllers_1.GalleryController.getAllGalleries);
router.get('/:id', controllers_1.GalleryController.getGalleryById);
router.get('/:id/rooms', controllers_1.GalleryController.getGalleryRooms);
router.get('/:id/recommended', controllers_1.GalleryController.getRecommendedArtworks);
// Изменение галерей — только администраторы и кураторы
router.post('/', ...canManage, controllers_1.GalleryController.createGallery);
router.put('/:id', ...canManage, controllers_1.GalleryController.updateGallery);
router.delete('/:id', ...canManage, controllers_1.GalleryController.deleteGallery);
//# sourceMappingURL=galleryRoutes.js.map