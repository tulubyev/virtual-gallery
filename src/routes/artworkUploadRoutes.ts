// src/routes/artworkUploadRoutes.ts
import { Router } from 'express';
import multer from 'multer';
import { ArtworkController } from '../controllers/ArtworkController';

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

export function createArtworkUploadRoutes(controller: ArtworkController) {
  const router = Router();

  // Upload artwork image
  router.post('/image', upload.single('image'), (req, res) => controller.uploadArtworkImage(req, res));

  // Upload multiple artwork images
  router.post('/images', upload.array('images'), (req, res) => controller.uploadMultipleArtworkImages(req, res));

  // Submit artwork for review
  router.post('/submit-for-review', (req, res) => controller.submitArtworkForReview(req, res));

  return router;
}