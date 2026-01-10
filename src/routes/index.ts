// routes/index.ts
export { authRoutes } from './authRoutes';
export { userRoutes } from './userRoutes';
export { artworkRoutes } from './artworkRoutes';
export { galleryRoutes } from './galleryRoutes';
export { aiRoutes } from './aiRoutes';
export { userManagementRoutes } from './userManagementRoutes';
export { iotRoutes } from './iotRoutes';
// artworkUploadRoutes экспортируется по умолчанию
import artworkUploadRoutes from './artworkUploadRoutes';
export { artworkUploadRoutes };