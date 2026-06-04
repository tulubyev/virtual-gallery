// models/Artwork.ts
export interface Artwork {
  artwork_id: number;
  title: string;
  artist_name: string;
  year_created?: number;
  medium?: string;
  dimensions?: string;
  style?: string;
  description?: string;
  image_url?: string;
  thumbnail_url?: string;
  location_in_gallery?: { x: number; y: number; z: number; rotation: number };
  tags: string[];
  created_at: Date;
  updated_at: Date;
  status?: string;
  in_collection?: boolean;
}

export interface CreateArtworkInput {
  title: string;
  artist_name: string;
  year_created?: number;
  medium?: string;
  dimensions?: string;
  style?: string;
  description?: string;
  image_url?: string;
  thumbnail_url?: string;
  location_in_gallery?: { x: number; y: number; z: number; rotation: number };
  tags: string[];
  status?: string;
}

export interface UpdateArtworkInput {
  title?: string;
  artist_name?: string;
  year_created?: number;
  medium?: string;
  dimensions?: string;
  style?: string;
  description?: string;
  image_url?: string;
  thumbnail_url?: string;
  location_in_gallery?: { x: number; y: number; z: number; rotation: number };
  tags?: string[];
  status?: string;
}