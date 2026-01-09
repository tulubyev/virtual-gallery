// src/types/index.ts
export interface User {
  user_id: number;
  username: string;
  email: string;
  role: string;
  created_at: Date;
  updated_at: Date;
  preferences?: Record<string, any>;
}

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

export interface Gallery {
  gallery_id: number;
  name: string;
  description?: string;
  three_d_model_path?: string;
  layout_algorithm?: string;
  created_at: Date;
}

export interface Collection {
  collection_id: number;
  name: string;
  description?: string;
  curator_id?: number;
  is_ai_generated: boolean;
  created_at: Date;
  artworks: Artwork[]; // Массив произведений искусства в коллекции
  artworks_count?: number;
  theme?: string;
  isPublic?: boolean;
}

export interface AuctionLot {
  lot_id: number;
  artwork: Artwork;
  starting_price: number;
  current_bid: number;
  buy_now_price?: number;
  auction_end_time: Date;
  status: 'active' | 'ended' | 'upcoming';
}

export interface Bid {
  bid_id: number;
  user_id: number;
  lot_id: number;
  amount: number;
  timestamp: Date;
  is_winning: boolean;
}