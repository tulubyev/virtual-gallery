declare class AIService {
    getRecommendations(userId: number, count?: number): Promise<any[]>;
    generateCollection(criteria: {
        theme: string;
        style?: string;
        artist?: string;
        count?: number;
    }): Promise<any>;
    analyzeImage(imageBuffer: Buffer): Promise<any>;
    getSimilarArtworks(artworkId: number, count?: number): Promise<any[]>;
    trainModel(): Promise<any>;
    personalizeGalleryRoute(userId: number, options: {
        duration?: number;
        themes?: string[];
        exclude?: number[];
    }): Promise<any>;
    predictEngagement(userId: number, artworkIds: number[]): Promise<any[]>;
}
declare const _default: AIService;
export default _default;
//# sourceMappingURL=AIService.d.ts.map