"use strict";
// src/iot/sensors/sensorProcessor.js
// Module for processing IoT sensor data in the virtual art gallery
const db = require('../../backend/models/db');
class SensorProcessor {
    constructor() {
        this.sensors = new Map(); // Store active sensors
        this.processingQueue = []; // Queue for incoming sensor data
        this.isProcessing = false;
    }
    // Register a new sensor
    registerSensor(sensorId, sensorType, galleryId, roomId) {
        this.sensors.set(sensorId, {
            sensorId,
            sensorType,
            galleryId,
            roomId,
            lastActive: new Date(),
            isActive: true
        });
        console.log(`Sensor registered: ${sensorId} (${sensorType}) in gallery ${galleryId}, room ${roomId}`);
    }
    // Process incoming sensor data
    async processSensorData(sensorId, dataPayload) {
        try {
            const sensor = this.sensors.get(sensorId);
            if (!sensor) {
                throw new Error(`Unknown sensor ID: ${sensorId}`);
            }
            // Update last active timestamp
            sensor.lastActive = new Date();
            // Prepare data for storage
            const sensorData = {
                sensor_id: sensorId,
                sensor_type: sensor.sensorType,
                gallery_id: sensor.galleryId,
                room_id: sensor.roomId,
                data_payload: dataPayload
            };
            // Add to processing queue
            this.processingQueue.push(sensorData);
            // Process the queue if not already processing
            if (!this.isProcessing) {
                this.processQueue();
            }
            return { success: true, message: 'Sensor data queued for processing' };
        }
        catch (error) {
            console.error('Error processing sensor data:', error);
            return { success: false, error: error.message };
        }
    }
    // Process the queue of sensor data
    async processQueue() {
        if (this.processingQueue.length === 0) {
            this.isProcessing = false;
            return;
        }
        this.isProcessing = true;
        const dataToProcess = this.processingQueue.shift();
        try {
            // Store sensor data in the database
            await this.storeSensorData(dataToProcess);
            // Trigger any relevant actions based on the sensor data
            await this.analyzeAndTriggerActions(dataToProcess);
            console.log(`Processed sensor data from ${dataToProcess.sensor_id}`);
        }
        catch (error) {
            console.error('Error processing sensor data from queue:', error);
            // Re-add to queue to retry later
            this.processingQueue.unshift(dataToProcess);
        }
        // Process next item in queue
        setTimeout(() => this.processQueue(), 100);
    }
    // Store sensor data in the database
    async storeSensorData(sensorData) {
        // In a real implementation, we would insert this into the iot_sensor_data table
        // Since we don't have a direct DB function for this, we'll simulate the insertion
        console.log('Storing sensor data in database:', sensorData);
        // For now, we'll just log the data. In a real implementation, we would have:
        // return await db.insertSensorData(sensorData);
    }
    // Analyze sensor data and trigger relevant actions
    async analyzeAndTriggerActions(sensorData) {
        switch (sensorData.sensor_type) {
            case 'audio':
                await this.processAudioData(sensorData);
                break;
            case 'motion':
                await this.processMotionData(sensorData);
                break;
            case 'proximity':
                await this.processProximityData(sensorData);
                break;
            case 'environment':
                await this.processEnvironmentData(sensorData);
                break;
            default:
                console.log(`Unknown sensor type: ${sensorData.sensor_type}`);
        }
    }
    // Process audio sensor data (e.g., applause, reactions)
    async processAudioData(sensorData) {
        const { data_payload } = sensorData;
        const { volume_level, frequency_analysis, duration } = data_payload;
        // Detect applause or positive reactions
        if (volume_level > 0.7 && duration > 2) {
            // Likely applause or strong reaction
            console.log(`Strong audio reaction detected in room ${sensorData.room_id}`);
            // Could trigger notifications, adjust lighting, record positive feedback, etc.
            await this.recordPositiveReaction(sensorData);
        }
        // Analyze frequency for emotional content
        if (frequency_analysis && frequency_analysis.tone === 'positive') {
            console.log(`Positive emotional tone detected in room ${sensorData.room_id}`);
            await this.recordEmotionalFeedback(sensorData, 'positive');
        }
    }
    // Process motion sensor data (e.g., visitor movement, dwell time)
    async processMotionData(sensorData) {
        const { data_payload } = sensorData;
        const { visitor_count, movement_patterns, dwell_times } = data_payload;
        // Track visitor engagement
        if (visitor_count > 0) {
            console.log(`Detected ${visitor_count} visitors in room ${sensorData.room_id}`);
            // Calculate average dwell time
            if (dwell_times && dwell_times.length > 0) {
                const avgDwellTime = dwell_times.reduce((sum, time) => sum + time, 0) / dwell_times.length;
                if (avgDwellTime > 60) { // More than 1 minute
                    console.log(`High engagement detected in room ${sensorData.room_id} (avg: ${avgDwellTime}s)`);
                    // Record high engagement
                    await this.recordEngagementLevel(sensorData, 'high', avgDwellTime);
                }
            }
        }
        // Detect interesting movement patterns
        if (movement_patterns && movement_patterns.includes('linger_near_artwork')) {
            console.log(`Visitors lingering near artwork in room ${sensorData.room_id}`);
            await this.recordInterestInArtwork(sensorData);
        }
    }
    // Process proximity sensor data (e.g., close interactions)
    async processProximityData(sensorData) {
        const { data_payload } = sensorData;
        const { proximity_events, distance_readings } = data_payload;
        // Count close interactions
        if (proximity_events && proximity_events.length > 0) {
            const closeInteractions = proximity_events.filter(event => event.distance < 1.0); // Within 1 meter
            if (closeInteractions.length > 3) { // Multiple close interactions
                console.log(`Multiple close interactions detected in room ${sensorData.room_id}`);
                // This could indicate high interest in specific artworks
                await this.recordCloseInteraction(sensorData, closeInteractions.length);
            }
        }
    }
    // Process environmental sensor data (e.g., temperature, humidity, lighting)
    async processEnvironmentData(sensorData) {
        const { data_payload } = sensorData;
        const { temperature, humidity, lighting_level, co2_level } = data_payload;
        // Monitor environmental conditions
        if (temperature > 25 || temperature < 18) {
            console.warn(`Temperature out of optimal range in room ${sensorData.room_id}: ${temperature}°C`);
            // Could trigger HVAC adjustments
        }
        if (lighting_level < 200) {
            console.log(`Low lighting detected in room ${sensorData.room_id}, adjusting lights`);
            // Could trigger lighting adjustments
            await this.adjustLighting(sensorData.room_id, 'increase');
        }
        if (co2_level > 1000) {
            console.warn(`High CO2 level in room ${sensorData.room_id}: ${co2_level} ppm`);
            // Could trigger air circulation
        }
    }
    // Helper methods for recording various types of feedback
    async recordPositiveReaction(sensorData) {
        // In a real implementation, this would store positive reaction data
        console.log(`Recording positive reaction in gallery ${sensorData.gallery_id}, room ${sensorData.room_id}`);
    }
    async recordEmotionalFeedback(sensorData, emotion) {
        // In a real implementation, this would store emotional feedback data
        console.log(`Recording ${emotion} emotion in gallery ${sensorData.gallery_id}, room ${sensorData.room_id}`);
    }
    async recordEngagementLevel(sensorData, level, avgTime) {
        // In a real implementation, this would store engagement metrics
        console.log(`Recording ${level} engagement (avg: ${avgTime}s) in gallery ${sensorData.gallery_id}, room ${sensorData.room_id}`);
    }
    async recordInterestInArtwork(sensorData) {
        // In a real implementation, this would store interest data
        console.log(`Recording artwork interest in gallery ${sensorData.gallery_id}, room ${sensorData.room_id}`);
    }
    async recordCloseInteraction(sensorData, count) {
        // In a real implementation, this would store interaction data
        console.log(`Recording ${count} close interactions in gallery ${sensorData.gallery_id}, room ${sensorData.room_id}`);
    }
    async adjustLighting(roomId, action) {
        // In a real implementation, this would send commands to IoT lighting systems
        console.log(`Adjusting lighting in room ${roomId}: ${action}`);
    }
    // Get status of all sensors
    getSensorsStatus() {
        const status = [];
        for (const [sensorId, sensor] of this.sensors) {
            status.push({
                sensorId: sensor.sensorId,
                sensorType: sensor.sensorType,
                galleryId: sensor.galleryId,
                roomId: sensor.roomId,
                lastActive: sensor.lastActive,
                isActive: sensor.isActive
            });
        }
        return status;
    }
    // Get aggregated feedback data
    async getAggregatedFeedback(galleryId, timeRangeHours = 24) {
        // In a real implementation, this would query the database for aggregated sensor data
        // For now, we'll return simulated data
        const simulatedFeedback = {
            galleryId,
            timeRange: `${timeRangeHours} hours`,
            totalVisitors: Math.floor(Math.random() * 100) + 50,
            averageEngagement: (Math.random() * 2 + 1).toFixed(2), // 1-3 minutes
            positiveReactions: Math.floor(Math.random() * 50) + 10,
            popularArtworks: [
                { artworkId: 1, reactions: 24 },
                { artworkId: 5, reactions: 18 },
                { artworkId: 3, reactions: 15 }
            ],
            environmentalIssues: Math.random() > 0.7 ? ['temperature fluctuation'] : []
        };
        return simulatedFeedback;
    }
}
// Export singleton instance
const sensorProcessor = new SensorProcessor();
module.exports = sensorProcessor;
//# sourceMappingURL=sensorProcessor.js.map