export interface Gallery {
    gallery_id: number;
    name: string;
    description?: string;
    three_d_model_path?: string;
    layout_algorithm?: string;
    created_at: Date;
}
export interface CreateGalleryInput {
    name: string;
    description?: string;
    three_d_model_path?: string;
    layout_algorithm?: string;
}
export interface UpdateGalleryInput {
    name?: string;
    description?: string;
    three_d_model_path?: string;
    layout_algorithm?: string;
}
//# sourceMappingURL=Gallery.d.ts.map