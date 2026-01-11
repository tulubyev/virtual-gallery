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

export interface RoomLayoutSettings {
  background_color: string;
  lighting_settings: LightingSettings;
  wall_configurations: WallConfiguration[];
  navigation_points: NavigationPoint[];
}

export interface LightingSettings {
  ambient_intensity: number;
  directional_intensity: number;
  color_temperature: number; // in Kelvin
}

export interface WallConfiguration {
  wall_id: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  artworks: PositionedArtwork[];
}

export interface PositionedArtwork {
  artwork_id: number;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: { x: number; y: number; z: number };
}

export interface NavigationPoint {
  point_id: string;
  position: { x: number; y: number; z: number };
  connected_rooms: string[]; // IDs of connected rooms
  description: string;
}

export interface Room {
  room_id: number;
  name: string;
  description?: string;
  theme: string; // 'impressionism', 'sculpture', 'renaissance', etc.
  region?: string; // 'european', 'asian', 'american', etc.
  author?: string; // Specific author if room is dedicated to one
  tags: string[]; // Additional tags for categorization
  layout_settings: RoomLayoutSettings;
  created_at: Date;
  updated_at: Date;
}

export interface Exhibition {
  exhibition_id: number;
  name: string;
  description?: string;
  curator_id: number;
  start_date: Date;
  end_date: Date;
  rooms: Room[];
  is_virtual_tour_available: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface VirtualTourRoute {
  route_id: number;
  name: string;
  description?: string;
  room_sequence: number[]; // Sequence of room IDs
  estimated_duration: number; // in minutes
  created_by: number; // curator/admin user ID
  created_at: Date;
}

export interface Gallery {
  gallery_id: number;
  name: string;
  description?: string;
  rooms: Room[];
  exhibitions: Exhibition[];
  virtual_tour_routes: VirtualTourRoute[];
  created_at: Date;
  updated_at: Date;
}

export interface Collection {
  collection_id: number;
  name: string;
  description?: string;
  curator_id?: number;
  is_ai_generated: boolean;
  created_at: Date;
  artworks: Artwork[]; // Array of artworks in the collection
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

export interface ImageAnalysisResult {
  tags: string[];
  style: string;
  dominant_colors: string[];
  composition_elements: string[];
  estimated_period: string;
  confidence: number;
  detected_objects: DetectedObject[];
  image_quality: ImageQualityMetrics;
}

export interface DetectedObject {
  name: string;
  confidence: number;
  bounding_box: { x: number; y: number; width: number; height: number };
}

export interface ImageQualityMetrics {
  brightness: number;
  contrast: number;
  sharpness: number;
  resolution: { width: number; height: number };
  compression_artifacts: number;
}

export interface ArtworkUpload {
  file: File;
  filename: string;
  original_name: string;
  size: number;
  mime_type: string;
  upload_date: Date;
  uploaded_by: number;
  status: 'uploaded' | 'analyzing' | 'analyzed' | 'review_pending' | 'published' | 'rejected';
  analysis_result?: ImageAnalysisResult;
  artwork_data?: Partial<Artwork>;
}

export interface ArtworkSubmission {
  submission_id: number;
  artwork_upload: ArtworkUpload;
  submitted_by: number;
  submitted_at: Date;
  reviewed_by?: number;
  reviewed_at?: Date;
  status: 'pending' | 'approved' | 'rejected' | 'needs_revision';
  reviewer_notes?: string;
}

// Interfaces for authentication
export interface CreateUserInput {
  username: string;
  email: string;
  password: string;
  role?: string;
}

export interface UpdateUserInput {
  username?: string;
  email?: string;
  preferences?: Record<string, any>;
  role?: string;
}