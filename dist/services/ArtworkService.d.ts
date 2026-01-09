import { Artwork, CreateArtworkInput, UpdateArtworkInput } from '../models';
declare class ArtworkService {
    getAllArtworks(): Promise<Artwork[]>;
    getArtworkById(id: number): Promise<Artwork | undefined>;
    searchArtworks(query: string): Promise<Artwork[]>;
    filterArtworksByTags(tags: string[]): Promise<Artwork[]>;
    createArtwork(artworkData: CreateArtworkInput): Promise<Artwork>;
    updateArtwork(id: number, artworkData: UpdateArtworkInput): Promise<Artwork | null>;
    deleteArtwork(id: number): Promise<boolean>;
}
declare const _default: ArtworkService;
export default _default;
//# sourceMappingURL=ArtworkService.d.ts.map