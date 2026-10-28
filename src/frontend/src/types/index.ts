// src/types/index.ts

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin' | 'curator' | 'staff' | 'tour_guide' | 'auction_participant';
  preferences?: UserPreferences;
  avatar_url?: string;
  /** Выдан временный пароль: до его смены доступны только профиль и смена пароля */
  must_change_password?: boolean;
}

export interface UserPreferences {
  language: string;
  theme: 'light' | 'dark';
  notifications: boolean;
  accessibility: boolean;
}

export interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: number;
  description: string;
  imageUrl: string;
  tags: string[];
  likes: number;
  views: number;
  rating: number;
  galleryId: string;
  roomId: string;
  coordinates: {
    x: number;
    y: number;
    z: number;
  };
  // Snake-case fields from DB / API responses
  artwork_id?: number;
  artist_name?: string;
  year_created?: number;
  medium?: string;
  style?: string;
  dimensions?: string;
  image_url?: string;
  status?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Gallery {
  id: string;
  name: string;
  description: string;
  location: string;
  openingHours: string;
  visitorCount: number;
  tags: string[];
  featured: boolean;
  imageUrl: string;
  rooms: Room[];
}

export interface Room {
  id: string;
  name: string;
  description: string;
  galleryId: string;
  capacity: number;
  artworks: Artwork[];
  // Extended fields used by pages/services
  room_id?: number;
  theme?: string;
  region?: string;
  tags?: string[];
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  curatorId: string;
  artworks: Artwork[];
  createdAt: string;
  updatedAt: string;
}

export interface Tour {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  language: string;
  difficulty: 'easy' | 'medium' | 'hard';
  route: string[]; // IDs of artworks in the tour
  guideId: string;
  participants: string[]; // user IDs
  scheduledAt: string;
  maxParticipants: number;
}

export interface Auction {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  lots: Lot[];
  organizerId: string;
  status: 'upcoming' | 'active' | 'completed';
}

export interface Lot {
  id: string;
  artworkId: string;
  startingPrice: number;
  currentBid: number;
  highestBidderId?: string;
  bids: Bid[];
  status: 'available' | 'sold' | 'withdrawn';
}

export interface Bid {
  id: string;
  userId: string;
  lotId: string;
  amount: number;
  timestamp: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
}

export interface Review {
  id: string;
  userId: string;
  artworkId: string;
  rating: number; // 1-5
  comment: string;
  timestamp: string;
}

export interface Exhibition {
  id: string;
  title: string;
  description: string;
  galleryId: string;
  startDate: string;
  endDate: string;
  artworkIds: string[];
  status: 'upcoming' | 'active' | 'completed';
  curatorId?: string;
  imageUrl?: string;
}

export interface VirtualTourRoute {
  id: string;
  title: string;
  description: string;
  galleryId: string;
  artworkIds: string[];
  duration: number;
  language: string;
  stops: Array<{
    artworkId: string;
    order: number;
    notes?: string;
  }>;
}

export interface ImageAnalysisResult {
  id?: string;
  uploadId?: number;
  analysis?: string;
  model?: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  processing_stats?: {
    duration: number;
    [key: string]: unknown;
  };
  // AI analysis fields
  style?: string;
  confidence?: number;
  estimated_period?: string;
  suggested_title?: string;
  artist_name?: string;
  suggested_artist?: string;
  suggested_year?: number;
  suggested_medium?: string;
  color_palette?: string[];
  tags?: string[];
  dominant_colors?: string[];
  detected_objects?: Array<{
    name: string;
    confidence: number;
    bounding_box: { x: number; y: number; width: number; height: number };
  }>;
  image_quality?: {
    brightness: number;
    contrast: number;
    sharpness: number;
    resolution: { width: number; height: number };
  };
}

export interface ArtworkUpload {
  id?: number;
  artwork_id?: number;
  upload_id?: number;
  user_id?: number;
  file_url?: string;
  image_url?: string;
  original_name?: string;
  upload_date?: string;
  status?: string;
  title?: string;
  artist_name?: string;
  description?: string;
  analysis_result?: ImageAnalysisResult;
  artwork_data?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
}

export interface ArtworkSubmission {
  id?: number;
  submission_id?: number;
  upload_id?: number;
  artwork_data?: Partial<Artwork>;
  artwork_upload?: ArtworkUpload;
  status?: 'pending' | 'approved' | 'rejected' | 'needs_revision';
  submitted_by?: number;
  reviewed_by?: number;
  reviewer_notes?: string;
  submitted_at?: string;
  created_at?: string;
  updated_at?: string;
}
