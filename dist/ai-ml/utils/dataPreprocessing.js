"use strict";
// Data preprocessing utilities for AI/ML pipeline
// Resize and normalize image data
function preprocessImageData(imageBuffer, targetSize = { width: 224, height: 224 }) {
    // In a real implementation, this would use a library like OpenCV
    // to resize and normalize the image data for model input
    return {
        resized: imageBuffer, // Placeholder for resized image
        normalized: imageBuffer, // Placeholder for normalized image
        shape: [targetSize.height, targetSize.width, 3] // [height, width, channels]
    };
}
// Prepare user interaction data for training
function prepareInteractionData(rawInteractions) {
    // Convert raw interaction data to format suitable for training
    return rawInteractions.map(interaction => ({
        user_id: interaction.user_id,
        artwork_id: interaction.artwork_id,
        interaction_type: interaction.interaction_type,
        duration: interaction.duration,
        timestamp: new Date(interaction.timestamp).getTime()
    }));
}
// Normalize numerical features
function normalizeFeatures(features) {
    // Calculate min and max values for normalization
    const minVal = Math.min(...features);
    const maxVal = Math.max(...features);
    // Apply min-max normalization
    return features.map(feature => (feature - minVal) / (maxVal - minVal));
}
// Encode categorical variables
function encodeCategories(categories, vocabulary) {
    // Create one-hot encoding for categorical variables
    const encoded = new Array(vocabulary.length).fill(0);
    categories.forEach(category => {
        const index = vocabulary.indexOf(category);
        if (index !== -1) {
            encoded[index] = 1;
        }
    });
    return encoded;
}
// Split dataset into training and validation sets
function splitDataset(data, trainRatio = 0.8) {
    // Shuffle the data randomly
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    // Calculate split index
    const splitIndex = Math.floor(shuffled.length * trainRatio);
    // Split the data
    return {
        train: shuffled.slice(0, splitIndex),
        validation: shuffled.slice(splitIndex)
    };
}
module.exports = {
    preprocessImageData,
    prepareInteractionData,
    normalizeFeatures,
    encodeCategories,
    splitDataset
};
//# sourceMappingURL=dataPreprocessing.js.map