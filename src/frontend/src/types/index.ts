// src/types/index.ts

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin' | 'curator' | 'staff' | 'tour_guide' | 'auction_participant';
  preferences?: UserPreferences;
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