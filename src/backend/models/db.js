// Mock database operations for development
// In a real application, this would connect to PostgreSQL

class Database {
    constructor() {
        // Initialize with mock data
        this.users = [
            { user_id: 1, username: 'art_lover', email: 'art@example.com', preferences: { favorite_styles: ['impressionism', 'abstract'] } }
        ];
        
        this.artworks = [
            { 
                artwork_id: 1, 
                title: 'Starry Night', 
                artist_name: 'Vincent van Gogh', 
                year_created: 1889, 
                medium: 'Oil on canvas',
                dimensions: '73.7 cm × 92.1 cm',
                style: 'Post-Impressionism',
                description: 'A swirling night sky over a small town.',
                image_url: '/assets/artworks/starry-night.jpg',
                thumbnail_url: '/assets/artworks/starry-night-thumb.jpg',
                location_in_gallery: { x: 5, y: 3, z: 0, rotation: 0 },
                tags: ['night', 'sky', 'stars', 'landscape', 'post-impressionism']
            },
            { 
                artwork_id: 2, 
                title: 'Mona Lisa', 
                artist_name: 'Leonardo da Vinci', 
                year_created: 1503, 
                medium: 'Oil on poplar panel',
                dimensions: '77 cm × 53 cm',
                style: 'Renaissance',
                description: 'A half-length portrait of a woman with an enigmatic smile.',
                image_url: '/assets/artworks/mona-lisa.jpg',
                thumbnail_url: '/assets/artworks/mona-lisa-thumb.jpg',
                location_in_gallery: { x: -5, y: 3, z: 0, rotation: Math.PI },
                tags: ['portrait', 'renaissance', 'smile', 'classic']
            }
        ];
        
        this.galleries = [
            { 
                gallery_id: 1, 
                name: 'Main Hall', 
                description: 'The central gallery space featuring masterpieces',
                three_d_model_path: '/assets/models/main-hall.gltf',
                layout_algorithm: 'thematic_grouping'
            }
        ];
        
        this.collections = [
            { 
                collection_id: 1, 
                name: 'Impressionist Favorites', 
                description: 'Popular impressionist works',
                curator_id: 1,
                is_ai_generated: false
            }
        ];
        
        this.userInteractions = [];
        this.tags = [
            { tag_id: 1, tag_name: 'landscape', tag_category: 'subject' },
            { tag_id: 2, tag_name: 'portrait', tag_category: 'subject' },
            { tag_id: 3, tag_name: 'abstract', tag_category: 'style' },
            { tag_id: 4, tag_name: 'impressionism', tag_category: 'style' },
            { tag_id: 5, tag_name: 'post-impressionism', tag_category: 'style' }
        ];
    }

    // Artwork operations
    async getAllArtworks() {
        return this.artworks;
    }

    async getArtworkById(id) {
        return this.artworks.find(artwork => artwork.artwork_id === parseInt(id));
    }

    async searchArtworks(query) {
        const lowerQuery = query.toLowerCase();
        return this.artworks.filter(artwork => 
            artwork.title.toLowerCase().includes(lowerQuery) || 
            artwork.artist_name.toLowerCase().includes(lowerQuery) ||
            artwork.description.toLowerCase().includes(lowerQuery)
        );
    }

    async filterArtworksByTags(tags) {
        return this.artworks.filter(artwork => 
            tags.every(tag => artwork.tags.includes(tag))
        );
    }

    async createArtwork(artworkData) {
        const newArtwork = {
            artwork_id: this.artworks.length + 1,
            ...artworkData
        };
        this.artworks.push(newArtwork);
        return newArtwork;
    }

    async updateArtwork(id, artworkData) {
        const index = this.artworks.findIndex(artwork => artwork.artwork_id === parseInt(id));
        if (index !== -1) {
            this.artworks[index] = { ...this.artworks[index], ...artworkData };
            return this.artworks[index];
        }
        return null;
    }

    async deleteArtwork(id) {
        const index = this.artworks.findIndex(artwork => artwork.artwork_id === parseInt(id));
        if (index !== -1) {
            this.artworks.splice(index, 1);
            return true;
        }
        return false;
    }

    // Gallery operations
    async getAllGalleries() {
        return this.galleries;
    }

    async getGalleryById(id) {
        return this.galleries.find(gallery => gallery.gallery_id === parseInt(id));
    }

    async getGalleryRooms(id) {
        // In a real implementation, this would return rooms in a specific gallery
        return [
            { room_id: 1, name: 'Room A', description: 'North wing' },
            { room_id: 2, name: 'Room B', description: 'South wing' }
        ];
    }

    async createGallery(galleryData) {
        const newGallery = {
            gallery_id: this.galleries.length + 1,
            ...galleryData
        };
        this.galleries.push(newGallery);
        return newGallery;
    }

    async updateGallery(id, galleryData) {
        const index = this.galleries.findIndex(gallery => gallery.gallery_id === parseInt(id));
        if (index !== -1) {
            this.galleries[index] = { ...this.galleries[index], ...galleryData };
            return this.galleries[index];
        }
        return null;
    }

    async deleteGallery(id) {
        const index = this.galleries.findIndex(gallery => gallery.gallery_id === parseInt(id));
        if (index !== -1) {
            this.galleries.splice(index, 1);
            return true;
        }
        return false;
    }

    async getRecommendedArtworks(galleryId) {
        // In a real implementation, this would use AI to recommend artworks
        return this.artworks.slice(0, 3); // Return first 3 artworks as example
    }

    // User operations
    async getUserById(id) {
        return this.users.find(user => user.user_id === parseInt(id));
    }

    // Interaction operations
    async addUserInteraction(interactionData) {
        const newInteraction = {
            interaction_id: this.userInteractions.length + 1,
            timestamp: new Date(),
            ...interactionData
        };
        this.userInteractions.push(newInteraction);
        return newInteraction;
    }
}

module.exports = new Database();