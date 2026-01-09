export interface Collection {
    collection_id: number;
    name: string;
    description?: string;
    curator_id?: number;
    is_ai_generated: boolean;
    created_at: Date;
    artworks: any[];
    artworks_count?: number;
    theme?: string;
    isPublic?: boolean;
}
export interface CreateCollectionInput {
    name: string;
    description?: string;
    curator_id?: number;
    artworks: number[];
    theme?: string;
    isPublic?: boolean;
    is_ai_generated?: boolean;
}
//# sourceMappingURL=Collection.d.ts.map