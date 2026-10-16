"use strict";
// src/ai-ml/services/recommendationService.js
// Advanced recommendation service for the virtual art gallery
const { UserService, ArtworkService } = require('../../services');
const db = {
    getAllUsers: () => UserService.getAllUsers(),
    getAllArtworks: () => ArtworkService.getAllArtworks(),
    getArtworkById: (id) => ArtworkService.getArtworkById(id)
};
class RecommendationService {
    constructor() {
        this.userProfiles = new Map(); // Cache user profiles
        this.artworkFeatures = new Map(); // Cache artwork features
        this.collaborativeMatrix = null; // Matrix for collaborative filtering
        this.contentWeights = {
            style: 0.25,
            tags: 0.25,
            artist: 0.20,
            period: 0.15,
            medium: 0.15
        };
    }
    // Initialize the recommendation service
    async initialize() {
        console.log('Initializing recommendation service...');
        // Preload user profiles and artwork features
        await this.preloadData();
        // Build initial collaborative filtering matrix
        await this.buildCollaborativeMatrix();
        console.log('Recommendation service initialized');
    }
    // Preload user profiles and artwork features
    async preloadData() {
        // Load all users
        const users = await db.getAllUsers();
        for (const user of users) {
            this.userProfiles.set(user.user_id, {
                ...user,
                preferences: user.preferences || {},
                interactionHistory: [] // Will be populated as needed
            });
        }
        // Load all artworks and compute features
        const artworks = await db.getAllArtworks();
        for (const artwork of artworks) {
            this.artworkFeatures.set(artwork.artwork_id, this.computeArtworkFeatures(artwork));
        }
    }
    // Compute features for an artwork
    computeArtworkFeatures(artwork) {
        return {
            artwork_id: artwork.artwork_id,
            style_vector: this.getStyleVector(artwork.style),
            tag_vector: this.getTagVector(artwork.tags),
            artist_vector: this.getArtistVector(artwork.artist_name),
            period_vector: this.getPeriodVector(artwork.year_created),
            medium_vector: this.getMediumVector(artwork.medium),
            embedding: this.generateEmbedding(artwork) // Simplified embedding
        };
    }
    // Generate a style vector
    getStyleVector(style) {
        if (!style)
            return new Array(10).fill(0);
        // Simple mapping of styles to vectors (in reality, this would be more sophisticated)
        const styleVectors = {
            'impressionism': [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            'realism': [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            'abstract': [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            'cubism': [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            'surrealism': [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            'baroque': [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            'renaissance': [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            'modern': [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
            'contemporary': [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
            'classic': [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
        };
        return styleVectors[style.toLowerCase()] || new Array(10).fill(0.1);
    }
    // Generate a tag vector
    getTagVector(tags) {
        if (!tags || !Array.isArray(tags))
            return new Array(20).fill(0);
        // Simple bag-of-words representation (in reality, this would use embeddings)
        const allTags = ['landscape', 'portrait', 'still_life', 'abstract', 'figurative',
            'religious', 'mythological', 'historical', 'genre', 'seascape',
            'cityscape', 'flower', 'animal', 'nude', 'war', 'peace',
            'love', 'death', 'nature', 'urban'];
        const vector = new Array(allTags.length).fill(0);
        for (let i = 0; i < allTags.length; i++) {
            if (tags.includes(allTags[i])) {
                vector[i] = 1;
            }
        }
        return vector;
    }
    // Generate an artist vector
    getArtistVector(artistName) {
        if (!artistName)
            return new Array(15).fill(0);
        // Simple hash-based vectorization (in reality, this would use artist embeddings)
        let hash = 0;
        for (let i = 0; i < artistName.length; i++) {
            hash = ((hash << 5) - hash) + artistName.charCodeAt(i);
            hash |= 0; // Convert to 32-bit integer
        }
        const vector = new Array(15).fill(0);
        for (let i = 0; i < 15; i++) {
            vector[i] = Math.abs(Math.sin(hash + i)) % 1;
        }
        return vector;
    }
    // Generate a period vector
    getPeriodVector(yearCreated) {
        if (!yearCreated)
            return new Array(10).fill(0);
        // Normalize to decades
        const decade = Math.floor(yearCreated / 10) * 10;
        const baseYear = 1800; // Starting reference
        const maxYears = 200; // 200 years range
        const vector = new Array(10).fill(0);
        if (decade >= baseYear && decade < baseYear + maxYears) {
            const index = Math.floor(((decade - baseYear) / maxYears) * 10);
            if (index < 10) {
                vector[index] = 1;
            }
        }
        return vector;
    }
    // Generate a medium vector
    getMediumVector(medium) {
        if (!medium)
            return new Array(8).fill(0);
        const mediums = ['oil', 'watercolor', 'acrylic', 'tempera', 'pastel', 'charcoal', 'pencil', 'mixed_media'];
        const vector = new Array(8).fill(0);
        const index = mediums.indexOf(medium.toLowerCase());
        if (index !== -1) {
            vector[index] = 1;
        }
        else {
            // If medium not recognized, spread activation across similar mediums
            vector.fill(0.125); // Equal probability
        }
        return vector;
    }
    // Generate a simplified embedding for an artwork
    generateEmbedding(artwork) {
        // Combine all feature vectors with weights
        const styleVec = this.getStyleVector(artwork.style);
        const tagVec = this.getTagVector(artwork.tags);
        const artistVec = this.getArtistVector(artwork.artist_name);
        const periodVec = this.getPeriodVector(artwork.year_created);
        const mediumVec = this.getMediumVector(artwork.medium);
        // Weighted combination
        const embedding = [];
        for (let i = 0; i < Math.max(styleVec.length, tagVec.length, artistVec.length, periodVec.length, mediumVec.length); i++) {
            const val = (i < styleVec.length ? styleVec[i] * this.contentWeights.style : 0) +
                (i < tagVec.length ? tagVec[i] * this.contentWeights.tags : 0) +
                (i < artistVec.length ? artistVec[i] * this.contentWeights.artist : 0) +
                (i < periodVec.length ? periodVec[i] * this.contentWeights.period : 0) +
                (i < mediumVec.length ? mediumVec[i] * this.contentWeights.medium : 0);
            embedding.push(val);
        }
        return embedding;
    }
    // Build collaborative filtering matrix
    async buildCollaborativeMatrix() {
        // In a real implementation, this would build a matrix of user-item interactions
        // For now, we'll simulate this with dummy data
        console.log('Building collaborative filtering matrix...');
        // This would typically involve:
        // 1. Loading user interaction data
        // 2. Creating a user-item matrix
        // 3. Applying matrix factorization techniques
        // 4. Storing the model for later use
        this.collaborativeMatrix = {
            builtAt: new Date(),
            users: Array.from(this.userProfiles.keys()),
            items: Array.from(this.artworkFeatures.keys()),
            model: 'matrix_factorization_placeholder'
        };
    }
    // Get recommendations for a user
    async getRecommendations(userId, count = 5, filters = {}) {
        // Get user profile
        const userProfile = this.userProfiles.get(userId);
        if (!userProfile) {
            throw new Error(`User not found: ${userId}`);
        }
        // Get user's interaction history
        const interactionHistory = await this.getUserInteractionHistory(userId);
        // Apply hybrid recommendation approach
        const contentBasedRecs = await this.getContentBasedRecommendations(userId, count * 2, filters);
        const collaborativeRecs = await this.getCollaborativeRecommendations(userId, count * 2, filters);
        // Combine and rank recommendations
        const combinedRecs = this.combineRecommendations(contentBasedRecs, collaborativeRecs, count);
        // Apply diversity filter to avoid repetitive recommendations
        const diverseRecs = this.applyDiversityFilter(combinedRecs, count);
        return diverseRecs;
    }
    // Get content-based recommendations
    async getContentBasedRecommendations(userId, count, filters) {
        const userProfile = this.userProfiles.get(userId);
        if (!userProfile)
            return [];
        // Get user's preferred features based on interaction history
        const userPreferences = await this.inferUserPreferences(userId);
        // Get all artworks
        const allArtworks = await db.getAllArtworks();
        // Score each artwork based on similarity to user preferences
        const scoredArtworks = allArtworks.map(artwork => {
            const artworkFeatures = this.artworkFeatures.get(artwork.artwork_id);
            if (!artworkFeatures)
                return { ...artwork, score: 0 };
            // Calculate similarity score
            const score = this.calculateContentSimilarity(userPreferences, artworkFeatures);
            return { ...artwork, score };
        });
        // Sort by score and return top recommendations
        const sortedArtworks = scoredArtworks
            .filter(item => item.score > 0) // Only include items with positive scores
            .sort((a, b) => b.score - a.score)
            .slice(0, count);
        return sortedArtworks;
    }
    // Infer user preferences from interaction history
    async inferUserPreferences(userId) {
        const interactions = await this.getUserInteractionHistory(userId);
        if (interactions.length === 0) {
            // If no interaction history, return neutral preferences
            return {
                preferredStyles: [],
                preferredTags: [],
                preferredArtists: [],
                preferredPeriods: [],
                preferredMediums: [],
                embedding: new Array(50).fill(0.1) // Placeholder
            };
        }
        // Aggregate preferences from interactions
        const styleCounts = {};
        const tagCounts = {};
        const artistCounts = {};
        const periodCounts = {};
        const mediumCounts = {};
        for (const interaction of interactions) {
            const artwork = await db.getArtworkById(interaction.artwork_id);
            if (!artwork)
                continue;
            // Count styles
            if (artwork.style) {
                styleCounts[artwork.style] = (styleCounts[artwork.style] || 0) + 1;
            }
            // Count tags
            if (artwork.tags && Array.isArray(artwork.tags)) {
                for (const tag of artwork.tags) {
                    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
                }
            }
            // Count artists
            artistCounts[artwork.artist_name] = (artistCounts[artwork.artist_name] || 0) + 1;
            // Count periods (by decade)
            if (artwork.year_created) {
                const decade = Math.floor(artwork.year_created / 10) * 10;
                periodCounts[decade] = (periodCounts[decade] || 0) + 1;
            }
            // Count mediums
            if (artwork.medium) {
                mediumCounts[artwork.medium] = (mediumCounts[artwork.medium] || 0) + 1;
            }
        }
        // Convert counts to sorted arrays
        const preferredStyles = Object.entries(styleCounts)
            .sort(([, a], [, b]) => b - a)
            .map(([style]) => style);
        const preferredTags = Object.entries(tagCounts)
            .sort(([, a], [, b]) => b - a)
            .map(([tag]) => tag);
        const preferredArtists = Object.entries(artistCounts)
            .sort(([, a], [, b]) => b - a)
            .map(([artist]) => artist);
        const preferredPeriods = Object.entries(periodCounts)
            .sort(([, a], [, b]) => b - a)
            .map(([period]) => parseInt(period));
        const preferredMediums = Object.entries(mediumCounts)
            .sort(([, a], [, b]) => b - a)
            .map(([medium]) => medium);
        // Create a preference embedding based on interaction history
        const embedding = this.createPreferenceEmbedding(preferredStyles, preferredTags, preferredArtists);
        return {
            preferredStyles,
            preferredTags,
            preferredArtists,
            preferredPeriods,
            preferredMediums,
            embedding
        };
    }
    // Create a preference embedding
    createPreferenceEmbedding(styles, tags, artists) {
        // This would create a weighted embedding based on user preferences
        // For simplicity, we'll return a placeholder
        return new Array(50).fill(0.1);
    }
    // Calculate content similarity between user preferences and artwork
    calculateContentSimilarity(userPreferences, artworkFeatures) {
        // Calculate similarity across different dimensions
        const styleSimilarity = this.calculateVectorSimilarity(userPreferences.embedding, artworkFeatures.embedding);
        // Additional factors could include:
        // - Tag overlap
        // - Artist familiarity
        // - Period alignment
        // - Medium preference
        // For now, return the style similarity as the overall score
        return styleSimilarity;
    }
    // Calculate cosine similarity between two vectors
    calculateVectorSimilarity(vec1, vec2) {
        if (vec1.length !== vec2.length) {
            throw new Error('Vectors must have the same length');
        }
        let dotProduct = 0;
        let magnitude1 = 0;
        let magnitude2 = 0;
        for (let i = 0; i < vec1.length; i++) {
            dotProduct += vec1[i] * vec2[i];
            magnitude1 += vec1[i] * vec1[i];
            magnitude2 += vec2[i] * vec2[i];
        }
        magnitude1 = Math.sqrt(magnitude1);
        magnitude2 = Math.sqrt(magnitude2);
        if (magnitude1 === 0 || magnitude2 === 0) {
            return 0;
        }
        return dotProduct / (magnitude1 * magnitude2);
    }
    // Get collaborative recommendations
    async getCollaborativeRecommendations(userId, count, filters) {
        // In a real implementation, this would use the collaborative filtering model
        // For now, we'll return a placeholder
        const allArtworks = await db.getAllArtworks();
        // Return random artworks as a placeholder
        const shuffled = [...allArtworks].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count).map(artwork => ({
            ...artwork,
            score: Math.random()
        }));
    }
    // Combine content-based and collaborative recommendations
    combineRecommendations(contentRecs, collaborativeRecs, count) {
        // Create a map to store combined scores
        const combinedScores = new Map();
        // Add content-based scores (weighted)
        for (const item of contentRecs) {
            combinedScores.set(item.artwork_id, {
                ...item,
                contentScore: item.score || 0,
                collaborativeScore: 0,
                combinedScore: (item.score || 0) * 0.6 // Weight for content-based
            });
        }
        // Add collaborative scores (weighted)
        for (const item of collaborativeRecs) {
            if (combinedScores.has(item.artwork_id)) {
                // Update existing item
                const existing = combinedScores.get(item.artwork_id);
                existing.collaborativeScore = item.score || 0;
                existing.combinedScore = (existing.contentScore * 0.6) + ((item.score || 0) * 0.4);
            }
            else {
                // Add new item
                combinedScores.set(item.artwork_id, {
                    ...item,
                    contentScore: 0,
                    collaborativeScore: item.score || 0,
                    combinedScore: (item.score || 0) * 0.4 // Weight for collaborative
                });
            }
        }
        // Convert to array and sort by combined score
        const allItems = Array.from(combinedScores.values());
        allItems.sort((a, b) => b.combinedScore - a.combinedScore);
        return allItems.slice(0, count);
    }
    // Apply diversity filter to recommendations
    applyDiversityFilter(recommendations, count) {
        // This function ensures diversity in recommendations
        // It prevents too many similar items from appearing together
        if (recommendations.length <= count) {
            return recommendations;
        }
        const selected = [];
        const remaining = [...recommendations];
        while (selected.length < count && remaining.length > 0) {
            // Take the highest scoring item
            const bestItem = remaining.shift();
            selected.push(bestItem);
            // Remove similar items to promote diversity
            const style = bestItem.style;
            if (style) {
                for (let i = remaining.length - 1; i >= 0; i--) {
                    if (remaining[i].style === style && Math.random() > 0.5) {
                        // Randomly remove some items with the same style to promote diversity
                        remaining.splice(i, 1);
                    }
                }
            }
        }
        return selected.slice(0, count);
    }
    // Get user interaction history
    async getUserInteractionHistory(userId) {
        // In a real implementation, this would query the database for user interactions
        // For now, we'll return a placeholder
        return [];
    }
    // Get similar artworks to a given artwork
    async getSimilarArtworks(artworkId, count = 5, userId = null) {
        const targetArtwork = await db.getArtworkById(artworkId);
        if (!targetArtwork) {
            throw new Error(`Artwork not found: ${artworkId}`);
        }
        const targetFeatures = this.artworkFeatures.get(artworkId);
        if (!targetFeatures) {
            throw new Error(`Features not computed for artwork: ${artworkId}`);
        }
        // Get all artworks except the target
        const allArtworks = (await db.getAllArtworks()).filter(a => a.artwork_id !== artworkId);
        // Calculate similarity to target artwork
        const scoredArtworks = allArtworks.map(artwork => {
            const artworkFeatures = this.artworkFeatures.get(artwork.artwork_id);
            if (!artworkFeatures)
                return { ...artwork, similarity: 0 };
            const similarity = this.calculateVectorSimilarity(targetFeatures.embedding, artworkFeatures.embedding);
            return { ...artwork, similarity };
        });
        // Sort by similarity and return top results
        const sortedArtworks = scoredArtworks
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, count);
        return sortedArtworks;
    }
    // Update model with new interaction data
    async updateModelWithInteraction(userId, artworkId, interactionType, rating = null) {
        // In a real implementation, this would update the recommendation model
        // with new user interaction data to improve future recommendations
        console.log(`Updating model with interaction: user ${userId}, artwork ${artworkId}, type ${interactionType}`);
        // Update user profile with new interaction
        const userProfile = this.userProfiles.get(userId);
        if (userProfile) {
            // Add to interaction history (in a real implementation)
            // userProfile.interactionHistory.push({
            //     artwork_id: artworkId,
            //     interaction_type: interactionType,
            //     timestamp: new Date(),
            //     rating
            // });
        }
        // Potentially trigger model retraining if enough new data has accumulated
        // await this.checkRetrainCondition();
    }
    // Check if model retraining is needed
    async checkRetrainCondition() {
        // In a real implementation, this would check if enough new data
        // has accumulated to warrant retraining the model
        // For now, we'll return a placeholder
        return false;
    }
    // Retrain the recommendation model
    async retrainModel() {
        console.log('Retraining recommendation model...');
        // Reload data
        await this.preloadData();
        // Rebuild collaborative filtering matrix
        await this.buildCollaborativeMatrix();
        console.log('Recommendation model retrained successfully');
    }
}
// Export singleton instance
const recommendationService = new RecommendationService();
module.exports = recommendationService;
//# sourceMappingURL=recommendationService.js.map