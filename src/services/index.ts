// src/services/index.ts
export { BaseService } from './BaseService';
export { ArtworkService } from './ArtworkService';
export { GalleryService } from './GalleryService';
export { UserService } from './UserService';
export { AIService } from './AIService';
export { RecommendationService } from './RecommendationService';
export { DatabaseService } from './DatabaseService';

// Core services
export { RoomService } from './core/RoomService';

// Infrastructure services
// TODO: Re-enable when AWS SDK issues are resolved
// export { S3Service, type UploadResult, type S3File } from './infrastructure/S3Service';
// export { default as s3Service } from './infrastructure/S3Service';