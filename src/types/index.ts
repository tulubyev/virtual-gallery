// src/types/index.ts
export * from './artwork';
export * from './gallery';
export * from './user';
export * from './interfaces';
export * from './ai';

// Explicitly export types that are commonly used elsewhere
export { Artwork, ArtworkFilters, CreateArtworkDto, UpdateArtworkDto, SearchFilters, IArtworkService } from './artwork';
export { Gallery, Room, GalleryFilters, CreateGalleryDto, UpdateGalleryDto, IGalleryService } from './gallery';
export { User, CreateUserDto, UpdateUserDto, UserFilters, IUserService } from './user';
export { IService, ILogger, ICacheable } from './interfaces';
export { IRecommendationEngine, IArtworkAnalyzer, IImageProcessor } from './ai';