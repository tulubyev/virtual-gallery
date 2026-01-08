// IoT Device Manager for Virtual Art Gallery
// Handles communication with physical sensors and devices

class IoTDeviceManager {
    constructor() {
        this.devices = new Map(); // Store connected devices
        this.sensors = new Map(); // Store sensor readings
        this.isConnected = false;
    }

    // Initialize IoT connections
    async initialize() {
        console.log('Initializing IoT device manager...');
        
        // In a real implementation, this would connect to:
        // - Audio sensors for detecting applause/clapping
        // - Motion sensors for tracking visitor movement
        // - Environmental sensors for monitoring conditions
        
        // Mock initialization
        this.devices.set('audio_sensor_1', { type: 'audio', location: 'main_hall' });
        this.devices.set('motion_sensor_1', { type: 'motion', location: 'entrance' });
        this.devices.set('proximity_sensor_1', { type: 'proximity', location: 'featured_artwork' });
        
        this.isConnected = true;
        console.log('IoT device manager initialized');
    }

    // Get sensor readings
    async getSensorReadings(sensorId) {
        // In a real implementation, this would fetch real-time data from physical sensors
        if (!this.isConnected) {
            throw new Error('IoT device manager not initialized');
        }

        // Mock sensor data
        switch (sensorId) {
            case 'audio_sensor_1':
                return {
                    timestamp: new Date(),
                    sound_level: Math.random() * 100, // 0-100 dB
                    clap_detected: Math.random() > 0.95, // 5% chance of clap
                    speech_detected: Math.random() > 0.8 // 20% chance of speech
                };
            case 'motion_sensor_1':
                return {
                    timestamp: new Date(),
                    movement_detected: Math.random() > 0.7, // 30% chance of movement
                    visitor_count: Math.floor(Math.random() * 10) // 0-9 visitors
                };
            case 'proximity_sensor_1':
                return {
                    timestamp: new Date(),
                    proximity_level: Math.random() * 100, // 0-100% proximity
                    object_detected: Math.random() > 0.5 // 50% chance of detection
                };
            default:
                throw new Error(`Unknown sensor ID: ${sensorId}`);
        }
    }

    // Get all sensor readings
    async getAllSensorReadings() {
        if (!this.isConnected) {
            throw new Error('IoT device manager not initialized');
        }

        const readings = {};
        for (const [sensorId] of this.devices) {
            try {
                readings[sensorId] = await this.getSensorReadings(sensorId);
            } catch (error) {
                console.error(`Error reading sensor ${sensorId}:`, error);
            }
        }
        return readings;
    }

    // Process sensor data for insights
    async processSensorData() {
        const readings = await this.getAllSensorReadings();
        
        // Analyze the data for patterns
        const insights = {
            crowd_density: this.calculateCrowdDensity(readings),
            engagement_level: this.calculateEngagementLevel(readings),
            popular_areas: this.identifyPopularAreas(readings),
            feedback_summary: this.summarizeFeedback(readings)
        };
        
        return insights;
    }

    // Calculate crowd density based on sensor data
    calculateCrowdDensity(readings) {
        let totalVisitors = 0;
        let activeSensors = 0;
        
        for (const [sensorId, data] of Object.entries(readings)) {
            if (this.devices.get(sensorId).type === 'motion' && data.movement_detected) {
                totalVisitors += data.visitor_count;
                activeSensors++;
            }
        }
        
        return activeSensors > 0 ? totalVisitors / activeSensors : 0;
    }

    // Calculate engagement level based on sensor data
    calculateEngagementLevel(readings) {
        let engagementScore = 0;
        let sensorCount = 0;
        
        for (const [sensorId, data] of Object.entries(readings)) {
            if (this.devices.get(sensorId).type === 'audio') {
                // Higher sound levels and clapping indicate engagement
                engagementScore += data.sound_level / 100;
                if (data.clap_detected) engagementScore += 0.5;
                if (data.speech_detected) engagementScore += 0.3;
                sensorCount++;
            } else if (this.devices.get(sensorId).type === 'proximity') {
                // Longer proximity indicates interest
                engagementScore += data.proximity_level / 100;
                sensorCount++;
            }
        }
        
        return sensorCount > 0 ? engagementScore / sensorCount : 0;
    }

    // Identify popular areas based on sensor activity
    identifyPopularAreas(readings) {
        const areaActivity = new Map();
        
        for (const [sensorId, data] of Object.entries(readings)) {
            const device = this.devices.get(sensorId);
            const location = device.location;
            
            if (!areaActivity.has(location)) {
                areaActivity.set(location, { activity: 0, sensors: 0 });
            }
            
            const area = areaActivity.get(location);
            if (device.type === 'motion' && data.movement_detected) {
                area.activity += data.visitor_count;
            } else if (device.type === 'proximity' && data.object_detected) {
                area.activity += 1;
            }
            area.sensors += 1;
        }
        
        // Convert to sorted array
        return Array.from(areaActivity.entries())
            .map(([location, data]) => ({
                location,
                average_activity: data.activity / data.sensors
            }))
            .sort((a, b) => b.average_activity - a.average_activity);
    }

    // Summarize feedback from sensors
    summarizeFeedback(readings) {
        let applauseCount = 0;
        let positiveIndicators = 0;
        
        for (const [sensorId, data] of Object.entries(readings)) {
            if (this.devices.get(sensorId).type === 'audio') {
                if (data.clap_detected) applauseCount++;
                if (data.speech_detected || data.sound_level > 50) positiveIndicators++;
            }
        }
        
        return {
            applause_events: applauseCount,
            positive_indicators: positiveIndicators,
            overall_sentiment: positiveIndicators > applauseCount ? 'positive' : 'neutral'
        };
    }

    // Send command to IoT devices
    async sendCommand(deviceId, command, params = {}) {
        if (!this.isConnected) {
            throw new Error('IoT device manager not initialized');
        }

        // In a real implementation, this would send commands to physical devices
        console.log(`Sending command ${command} to device ${deviceId}`, params);
        
        // Mock response
        return {
            success: true,
            deviceId,
            command,
            timestamp: new Date()
        };
    }

    // Close connections
    async disconnect() {
        console.log('Disconnecting IoT devices...');
        this.isConnected = false;
        this.devices.clear();
        this.sensors.clear();
        console.log('IoT devices disconnected');
    }
}

module.exports = new IoTDeviceManager();