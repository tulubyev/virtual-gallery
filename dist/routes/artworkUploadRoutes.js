"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.artworkUploadRoutes = void 0;
// routes/artworkUploadRoutes.ts
const express_1 = require("express");
// Контроллер загрузки остаётся на JS (backend/controllers); аутентификация подключена внутри него
// eslint-disable-next-line @typescript-eslint/no-var-requires
const artworkUploadController = require('../backend/controllers/artworkUploadController');
const router = (0, express_1.Router)();
exports.artworkUploadRoutes = router;
router.post('/upload', artworkUploadController.uploadArtwork);
router.post('/:uploadId/analyze', artworkUploadController.analyzeUploadedArtwork);
router.get('/:uploadId/analysis', artworkUploadController.getAnalysisResults);
router.post('/submit-for-review', artworkUploadController.submitForReview);
router.get('/users/:userId/uploads', artworkUploadController.getUserUploads);
router.get('/submissions-for-review', artworkUploadController.getSubmissionsForReview);
router.post('/submissions/:submissionId/approve', artworkUploadController.approveSubmission);
router.post('/submissions/:submissionId/reject', artworkUploadController.rejectSubmission);
router.post('/:uploadId/reanalyze', artworkUploadController.reanalyzeImage);
router.post('/generate-nft', artworkUploadController.generateNFT);
//# sourceMappingURL=artworkUploadRoutes.js.map