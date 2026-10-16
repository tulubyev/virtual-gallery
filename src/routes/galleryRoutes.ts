// routes/galleryRoutes.ts
import { Router } from 'express';
import { GalleryController } from '../controllers';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = Router();
const canManage = [authenticateToken, requireRole(['admin', 'curator'])];

router.get('/', GalleryController.getAllGalleries);
router.get('/:id', GalleryController.getGalleryById);
router.get('/:id/rooms', GalleryController.getGalleryRooms);
router.get('/:id/recommended', GalleryController.getRecommendedArtworks);

// Изменение галерей — только администраторы и кураторы
router.post('/', ...canManage, GalleryController.createGallery);
router.put('/:id', ...canManage, GalleryController.updateGallery);
router.delete('/:id', ...canManage, GalleryController.deleteGallery);

export { router as galleryRoutes };
