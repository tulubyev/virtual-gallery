export interface IArtwork {
  id: string;
  artwork_id?: string;
  title: string;
  artist: string;
  description?: string;
  imageUrl?: string;
  style?: string;
  medium?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type Artwork = IArtwork;

export interface IArtworkService {
  getArtwork(id: string): Promise<IArtwork | null>;
  getById(id: string): Promise<IArtwork | null>;
  getAllArtworks(): Promise<IArtwork[]>;
  getAll(): Promise<IArtwork[]>;
  createArtwork(artwork: Partial<IArtwork>): Promise<IArtwork>;
  create(artwork: Partial<IArtwork>): Promise<IArtwork>;
  updateArtwork(id: string, artwork: Partial<IArtwork>): Promise<IArtwork | null>;
  update(id: string, artwork: Partial<IArtwork>): Promise<IArtwork | null>;
  deleteArtwork(id: string): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  searchArtworks(query: string, options?: any): Promise<IArtwork[]>;
  search(query: string, options?: any): Promise<IArtwork[]>;
}
