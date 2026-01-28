export interface IRecommendationEngine {
  getRecommendations(userId: string, limit?: number): Promise<any[]>;
  getSimilarArtworks(artworkId: string, limit?: number): Promise<any[]>;
}

export interface IArtworkAnalyzer {
  analyze(imageUrl: string): Promise<any>;
  extractFeatures(imageUrl: string): Promise<any>;
  classifyStyle(imageUrl: string): Promise<string>;
}

export interface IImageProcessor {
  resize(imageUrl: string, width: number, height: number): Promise<string>;
  optimize(imageUrl: string): Promise<string>;
  generateThumbnail(imageUrl: string): Promise<string>;
}
