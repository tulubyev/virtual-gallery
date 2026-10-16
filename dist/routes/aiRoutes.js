"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiRoutes = void 0;
// routes/aiRoutes.ts
const express_1 = require("express");
const controllers_1 = require("../controllers");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
exports.aiRoutes = router;
router.get('/recommendations', auth_1.authenticateToken, controllers_1.AIController.getRecommendations);
router.get('/collections/generate', auth_1.authenticateToken, controllers_1.AIController.generateCollection);
router.post('/analyze-image', auth_1.authenticateToken, controllers_1.AIController.analyzeImage);
router.get('/similar/:artworkId', controllers_1.AIController.getSimilarArtworks);
router.post('/train-model', auth_1.authenticateToken, controllers_1.AIController.trainModel);
router.get('/personalize-route', auth_1.authenticateToken, controllers_1.AIController.personalizeGalleryRoute);
router.post('/predict-engagement', auth_1.authenticateToken, controllers_1.AIController.predictEngagement);
//# sourceMappingURL=aiRoutes.js.map