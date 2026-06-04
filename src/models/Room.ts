export interface RoomGeometry {
  width: number;
  height: number;
  depth: number;
  ceilingHeight: number;
  wallThickness: number;
}

export interface MaterialPreset {
  name: string;
  type: 'wall' | 'floor' | 'ceiling';
  color: string;
  texture?: string;
  roughness: number;
  metalness: number;
}

export interface Decoration {
  type: 'pillar' | 'molding' | 'lighting' | 'furniture';
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  material: string;
}

export interface InteractionPoint {
  id: string;
  type: 'artwork' | 'info' | 'audio' | 'video';
  position: [number, number, number];
  data: any;
}

export interface LightingPreset {
  ambient: {
    color: string;
    intensity: number;
  };
  directional: {
    color: string;
    intensity: number;
    position: [number, number, number];
  };
  pointLights?: Array<{
    color: string;
    intensity: number;
    position: [number, number, number];
    distance: number;
  }>;
}

export interface AudioPreset {
  backgroundMusic?: string;
  ambientSounds?: string[];
  spatialAudio?: boolean;
}

export interface CustomizationOption {
  id: string;
  name: string;
  type: 'color' | 'material' | 'lighting' | 'decoration';
  values: any[];
  defaultValue: any;
}

export interface RoomTemplate {
  geometry: RoomGeometry;
  materials: MaterialPreset[];
  decorations: Decoration[];
  interactionPoints: InteractionPoint[];
}

export interface RoomType {
  id: string;
  name: string;
  description: string;
  category: 'classical' | 'modern' | 'themed' | 'special';
  baseTemplate: RoomTemplate;
  customizationOptions: CustomizationOption[];
  lightingPreset: LightingPreset;
  audioPreset?: AudioPreset;
  supportedArtworkTypes: string[];
  visitorCapacity: number;
  accessibilityFeatures: string[];
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoomCustomization {
  optionId: string;
  value: any;
}

export interface ArtworkPlacement {
  artworkId: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  interactionType: 'static' | 'interactive' | 'immersive';
}

export interface RoomInstance {
  id: string;
  typeId: string;
  galleryId: string;
  name: string;
  description: string;
  customizations: RoomCustomization[];
  artworks: ArtworkPlacement[];
  currentVisitors: number;
  maxVisitors: number;
  status: 'active' | 'maintenance' | 'closed';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoomAnalytics {
  analyticsId?: string;
  roomId: string;
  visitorCount: number;
  averageSessionTime: number;
  popularArtworks: string[];
  interactionHeatmap: any;
  dateRange: {
    start: Date;
    end: Date;
  };
  recordedAt?: Date;
}
