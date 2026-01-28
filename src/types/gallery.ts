export interface IGallery {
  id: string;
  gallery_id?: string;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type Gallery = IGallery;

export interface IRoom {
  id: string;
  name: string;
  galleryId: string;
  description?: string;
  capacity?: number;
}

export interface IGalleryService {
  getGallery(id: string): Promise<IGallery | null>;
  getById(id: string): Promise<IGallery | null>;
  getAllGalleries(): Promise<IGallery[]>;
  getAll(): Promise<IGallery[]>;
  createGallery(gallery: Partial<IGallery>): Promise<IGallery>;
  create(gallery: Partial<IGallery>): Promise<IGallery>;
  updateGallery(id: string, gallery: Partial<IGallery>): Promise<IGallery | null>;
  update(id: string, gallery: Partial<IGallery>): Promise<IGallery | null>;
  deleteGallery(id: string): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  getRooms(galleryId: string): Promise<IRoom[]>;
}
