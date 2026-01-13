// src/types/ai.ts
import { Artwork } from './artwork';
import { IService } from './interfaces';

export interface IRecommendationEngine extends IService {
  getRecommendations(userId: string, count?: number): Promise<Artwork[]>;
  getSimilarArtworks(artworkId: string, count?: number): Promise<Artwork[]>;
  updateModel(userId: string, artworkId: string, interaction: InteractionType): Promise<void>;
  retrainModel(): Promise<void>;
}

export interface IArtworkAnalyzer extends IService {
  analyzeImage(imageBuffer: Buffer): Promise<ArtworkAnalysis>;
  extractFeatures(imageBuffer: Buffer): Promise<ImageFeatures>;
  classifyStyle(imageBuffer: Buffer): Promise<string[]>;
}

export interface IImageProcessor extends IService {
  resize(imageBuffer: Buffer, width: number, height: number): Promise<Buffer>;
  compress(imageBuffer: Buffer, quality?: number): Promise<Buffer>;
  getMetadata(imageBuffer: Buffer): Promise<ImageMetadata>;
}

export interface ArtworkAnalysis {
  tags: string[];
  style: string;
  dominant_colors: string[];
  composition_elements: string[];
  estimated_period: string;
  confidence: number;
  detected_objects: Array<{
    name: string;
    confidence: number;
    bounding_box: { x: number; y: number; width: number; height: number };
  }>;
  image_quality: {
    brightness: number;
    contrast: number;
    sharpness: number;
    resolution: { width: number; height: number };
    compression_artifacts: number;
  };
}

export interface ImageFeatures {
  colorHistogram: number[];
  textureFeatures: number[];
  shapeDescriptors: number[];
  styleEmbeddings: number[];
}

export interface ImageMetadata {
  width: number;
  height: number;
  format: string;
  fileSize: number;
  dpi: { x: number; y: number };
  colorSpace: string;
}

export type InteractionType = 'view' | 'like' | 'dislike' | 'share' | 'comment' | 'zoom' | 'time_spent';