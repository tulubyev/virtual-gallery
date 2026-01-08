// Sensor Data Processor for Virtual Art Gallery
// Processes raw sensor data and converts it to actionable insights

class SensorDataProcessor {
    constructor() {
        this.processingHistory = [];
    }

    // Process raw sensor data
    processRawData(rawData) {
        // Apply filters and transformations to raw sensor data
        const processedData = {
            timestamp: new Date(),
            audio: this.processAudioData(rawData.audio),
            motion: this.processMotionData(rawData.motion),
            proximity: this.processProximityData(rawData.proximity)
        };

        // Store in processing history
        this.processingHistory.push(processedData);
        if (this.processingHistory.length > 1000) {
            this.processingHistory.shift(); // Keep only last 1000 entries
        }

        return processedData;
    }

    // Process audio sensor data
    processAudioData(audioData) {
        if (!audioData) return null;

        // Calculate sound level averages and detect patterns
        const processed = {
            averageLevel: audioData.reduce((sum, sample) => sum + sample.level, 0) / audioData.length,
            peakLevel: Math.max(...audioData.map(sample => sample.level)),
            clapEvents: audioData.filter(sample => sample.level > 80).length, // Loud sounds
            speechPatterns: this.detectSpeechPatterns(audioData),
            noiseLevel: this.calculateNoiseLevel(audioData)
        };

        return processed;
    }

    // Process motion sensor data
    processMotionData(motionData) {
        if (!motionData) return null;

        // Calculate movement patterns and visitor flow
        const processed = {
            totalMovementEvents: motionData.length,
            visitorFlow: this.calculateVisitorFlow(motionData),
            dwellTime: this.calculateDwellTime(motionData),
            movementIntensity: this.calculateMovementIntensity(motionData)
        };

        return processed;
    }

    // Process proximity sensor data
    processProximityData(proximityData) {
        if (!proximityData) return null;

        // Calculate proximity patterns and engagement
        const processed = {
            averageProximity: proximityData.reduce((sum, sample) => sum + sample.distance, 0) / proximityData.length,
            engagementEvents: proximityData.filter(sample => sample.distance < 2).length, // Close interactions
            interactionDuration: this.calculateInteractionDuration(proximityData),
            attentionLevel: this.calculateAttentionLevel(proximityData)
        };

        return processed;
    }

    // Detect speech patterns in audio data
    detectSpeechPatterns(audioData) {
        // Simple pattern detection - in reality, this would use more sophisticated algorithms
        let speechCount = 0;
        let consecutiveSpeech = 0;
        let maxConsecutiveSpeech = 0;

        for (let i = 0; i < audioData.length; i++) {
            if (audioData[i].level > 30 && audioData[i].level < 70) { // Likely speech range
                speechCount++;
                consecutiveSpeech++;
                maxConsecutiveSpeech = Math.max(maxConsecutiveSpeech, consecutiveSpeech);
            } else {
                consecutiveSpeech = 0;
            }
        }

        return {
            speechCount,
            maxConsecutiveSpeech,
            speechRatio: speechCount / audioData.length
        };
    }

    // Calculate noise level from audio data
    calculateNoiseLevel(audioData) {
        // Calculate standard deviation to measure noise level
        const mean = audioData.reduce((sum, sample) => sum + sample.level, 0) / audioData.length;
        const squaredDifferences = audioData.map(sample => Math.pow(sample.level - mean, 2));
        const avgSquaredDiff = squaredDifferences.reduce((sum, diff) => sum + diff, 0) / squaredDifferences.length;
        return Math.sqrt(avgSquaredDiff);
    }

    // Calculate visitor flow from motion data
    calculateVisitorFlow(motionData) {
        // Group motion events by time windows to detect flow patterns
        const timeWindows = {};
        const windowSize = 5 * 60 * 1000; // 5 minutes in milliseconds

        motionData.forEach(event => {
            const window = Math.floor(event.timestamp / windowSize) * windowSize;
            if (!timeWindows[window]) {
                timeWindows[window] = 0;
            }
            timeWindows[window]++;
        });

        return Object.entries(timeWindows).map(([window, count]) => ({
            window: new Date(parseInt(window)),
            count
        }));
    }

    // Calculate dwell time from motion data
    calculateDwellTime(motionData) {
        if (motionData.length < 2) return 0;

        // Calculate time between first and last motion event as dwell time
        const firstEvent = new Date(motionData[0].timestamp);
        const lastEvent = new Date(motionData[motionData.length - 1].timestamp);
        return (lastEvent - firstEvent) / 1000; // Return in seconds
    }

    // Calculate movement intensity from motion data
    calculateMovementIntensity(motionData) {
        // Calculate how frequently motion is detected
        if (motionData.length < 2) return 0;

        let totalDuration = 0;
        for (let i = 1; i < motionData.length; i++) {
            totalDuration += motionData[i].timestamp - motionData[i - 1].timestamp;
        }

        return motionData.length / (totalDuration / 1000); // Events per second
    }

    // Calculate interaction duration from proximity data
    calculateInteractionDuration(proximityData) {
        let totalDuration = 0;
        let inInteraction = false;
        let interactionStart = null;

        for (let i = 0; i < proximityData.length; i++) {
            const close = proximityData[i].distance < 2; // Within 2 units

            if (close && !inInteraction) {
                // Start of interaction
                inInteraction = true;
                interactionStart = proximityData[i].timestamp;
            } else if (!close && inInteraction) {
                // End of interaction
                totalDuration += proximityData[i].timestamp - interactionStart;
                inInteraction = false;
            }
        }

        // If still in interaction at the end, add that duration too
        if (inInteraction) {
            totalDuration += Date.now() - interactionStart;
        }

        return totalDuration / 1000; // Return in seconds
    }

    // Calculate attention level from proximity data
    calculateAttentionLevel(proximityData) {
        // Calculate how close and how long people stay near the artwork
        let attentionScore = 0;
        const closeThreshold = 1.5; // Considered "close" interaction

        proximityData.forEach(sample => {
            if (sample.distance <= closeThreshold) {
                attentionScore += (closeThreshold - sample.distance) / closeThreshold;
            }
        });

        return attentionScore / proximityData.length;
    }

    // Generate insights from processed data
    generateInsights(processedData) {
        const insights = {
            crowdEngagement: this.calculateCrowdEngagement(processedData),
            popularTimes: this.identifyPopularTimes(processedData),
            visitorBehavior: this.analyzeVisitorBehavior(processedData),
            feedbackSummary: this.createFeedbackSummary(processedData)
        };

        return insights;
    }

    // Calculate crowd engagement metrics
    calculateCrowdEngagement(processedData) {
        const audio = processedData.audio;
        const motion = processedData.motion;
        const proximity = processedData.proximity;

        let engagementScore = 0;

        // Audio engagement (clapping, speech)
        if (audio) {
            engagementScore += audio.clapEvents * 0.4;
            engagementScore += audio.speechPatterns.speechRatio * 0.3;
        }

        // Motion engagement (movement patterns)
        if (motion) {
            engagementScore += motion.movementIntensity * 0.2;
        }

        // Proximity engagement (close interactions)
        if (proximity) {
            engagementScore += proximity.engagementEvents * 0.1;
        }

        return Math.min(engagementScore, 1.0); // Cap at 1.0
    }

    // Identify popular times based on sensor data
    identifyPopularTimes(processedData) {
        // This would analyze time-based patterns in the data
        // For now, returning mock data
        return [
            { time: '10:00-12:00', popularity: 0.8 },
            { time: '14:00-16:00', popularity: 0.9 },
            { time: '18:00-20:00', popularity: 0.6 }
        ];
    }

    // Analyze visitor behavior patterns
    analyzeVisitorBehavior(processedData) {
        const behavior = {
            exploration_style: 'browsing', // Could be 'focused', 'browsing', 'quick'
            engagement_level: 'medium', // Could be 'low', 'medium', 'high'
            preferred_artworks: [] // IDs of artworks with highest engagement
        };

        // Determine behavior based on processed data
        if (processedData.proximity && processedData.proximity.engagementEvents > 5) {
            behavior.exploration_style = 'focused';
        } else if (processedData.motion && processedData.motion.totalMovementEvents > 20) {
            behavior.exploration_style = 'browsing';
        }

        if (processedData.audio && processedData.audio.clapEvents > 2) {
            behavior.engagement_level = 'high';
        } else if (processedData.proximity && processedData.proximity.attentionLevel > 0.5) {
            behavior.engagement_level = 'high';
        }

        return behavior;
    }

    // Create feedback summary from sensor data
    createFeedbackSummary(processedData) {
        const feedback = {
            positive_signals: 0,
            negative_signals: 0,
            neutral_signals: 0,
            overall_sentiment: 'neutral'
        };

        if (processedData.audio) {
            feedback.positive_signals += processedData.audio.clapEvents;
            feedback.positive_signals += processedData.audio.speechPatterns.speechCount > 0 ? 1 : 0;
        }

        if (processedData.proximity) {
            feedback.positive_signals += processedData.proximity.engagementEvents;
        }

        // Determine overall sentiment
        if (feedback.positive_signals > 5) {
            feedback.overall_sentiment = 'positive';
        } else if (feedback.positive_signals === 0) {
            feedback.overall_sentiment = 'negative';
        }

        return feedback;
    }
}

module.exports = new SensorDataProcessor();