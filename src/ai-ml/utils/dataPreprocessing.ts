// Data preprocessing utilities for AI/ML pipeline

export interface ImageData {
  resized: Buffer;
  normalized: Buffer;
  shape: [number, number, number]; // [height, width, channels]
}

export interface TargetSize {
  width: number;
  height: number;
}

export interface InteractionData {
  user_id: string;
  artwork_id: string;
  interaction_type: string;
  duration: number;
  timestamp: number;
}

export interface RawInteraction {
  user_id: string;
  artwork_id: string;
  interaction_type: string;
  duration: number;
  timestamp: string | number;
}

// Resize and normalize image data
export function preprocessImageData(imageBuffer: Buffer, targetSize: TargetSize = { width: 224, height: 224 }): ImageData {
  // In a real implementation, this would use a library like OpenCV
  // to resize and normalize the image data for model input
  return {
    resized: imageBuffer, // Placeholder for resized image
    normalized: imageBuffer, // Placeholder for normalized image
    shape: [targetSize.height, targetSize.width, 3] // [height, width, channels]
  };
}

// Prepare user interaction data for training
export function prepareInteractionData(rawInteractions: RawInteraction[]): InteractionData[] {
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
export function normalizeFeatures(features: number[]): number[] {
  // Calculate min and max values for normalization
  const minVal = Math.min(...features);
  const maxVal = Math.max(...features);

  // Handle edge case where all values are the same
  if (minVal === maxVal) {
    return features.map(() => 0.5); // Return middle value if all inputs are the same
  }

  // Apply min-max normalization
  return features.map(feature => (feature - minVal) / (maxVal - minVal));
}

// Encode categorical variables
export function encodeCategories(categories: string[], vocabulary: string[]): number[] {
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
export function splitDataset<T>(data: T[], trainRatio: number = 0.8): { train: T[]; validation: T[] } {
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