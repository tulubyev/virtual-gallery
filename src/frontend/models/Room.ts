export interface RoomType {
  id: number;
  name: string;
  category: string;
  description?: string;
  defaultCapacity?: number;
  [key: string]: unknown;
}

export interface RoomInstance {
  id: number;
  typeId: number;
  galleryId: number;
  name: string;
  status: string;
  [key: string]: unknown;
}

export interface RoomAnalytics {
  roomId: number;
  visitCount: number;
  avgDuration: number;
  [key: string]: unknown;
}

export interface MaterialPreset {
  id?: string;
  name: string;
  type: 'wall' | 'floor' | 'ceiling' | string;
  color?: string;
  roughness?: number;
  metalness?: number;
  texture?: string;
  textureUrl?: string;
  [key: string]: unknown;
}

export interface Decoration {
  id?: string;
  name?: string;
  type: 'pillar' | 'molding' | 'lighting' | 'furniture' | string;
  material?: string;
  position?: { x: number; y: number; z: number };
  rotation?: { x: number; y: number; z: number };
  scale?: { x: number; y: number; z: number } | number;
  [key: string]: unknown;
}

export interface LightingPreset {
  id?: string;
  name?: string;
  ambient: {
    color: string;
    intensity: number;
  };
  directional: {
    color: string;
    intensity: number;
    position: { x: number; y: number; z: number };
  };
  pointLights?: Array<{
    color: string;
    intensity: number;
    position: { x: number; y: number; z: number };
    distance?: number;
  }>;
  [key: string]: unknown;
}

export interface RoomTemplate {
  id: string;
  name: string;
  geometry: {
    width: number;
    height: number;
    depth: number;
    ceilingHeight: number;
    wallThickness: number;
  };
  materials: MaterialPreset[];
  decorations: Decoration[];
  lightingPreset?: LightingPreset;
  [key: string]: unknown;
}

export interface CustomizationOption {
  id: string;
  name: string;
  type: 'color' | 'lighting' | 'material' | 'decoration' | 'texture' | 'layout' | string;
  values: string[];
  defaultValue?: string;
  default?: string;
  [key: string]: unknown;
}

export interface RoomCustomization {
  optionId: string;
  value: any;
  [key: string]: unknown;
}
