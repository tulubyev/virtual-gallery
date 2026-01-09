import { Request, Response } from 'express';
declare class ArtworkController {
    getAllArtworks(req: Request, res: Response): Promise<void>;
    getArtworkById(req: Request, res: Response): Promise<void>;
    searchArtworks(req: Request, res: Response): Promise<void>;
    filterArtworksByTags(req: Request, res: Response): Promise<void>;
    createArtwork(req: Request, res: Response): Promise<void>;
    updateArtwork(req: Request, res: Response): Promise<void>;
    deleteArtwork(req: Request, res: Response): Promise<void>;
    getRecommendedArtworks(req: Request, res: Response): Promise<void>;
    getSimilarArtworks(req: Request, res: Response): Promise<void>;
    addToCollection(req: Request, res: Response): Promise<void>;
    getArtworkAnalytics(req: Request, res: Response): Promise<void>;
}
declare const _default: ArtworkController;
export default _default;
//# sourceMappingURL=ArtworkController.d.ts.map