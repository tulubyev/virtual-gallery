"use strict";
// src/iot/devices/deviceManager.js
// Module for managing IoT devices in the virtual art gallery
const sensorProcessor = require('../sensors/sensorProcessor');
class DeviceManager {
    constructor() {
        this.devices = new Map(); // Store registered IoT devices
        this.connectionStatus = new Map(); // Track connection status
        this.deviceCallbacks = new Map(); // Store callbacks for device events
    }
    // Register a new IoT device
    registerDevice(deviceId, deviceType, galleryId, roomId, config = {}) {
        this.devices.set(deviceId, {
            deviceId,
            deviceType,
            galleryId,
            roomId,
            config,
            registeredAt: new Date(),
            lastHeartbeat: new Date(),
            status: 'registered'
        });
        this.connectionStatus.set(deviceId, {
            isConnected: false,
            lastSeen: null,
            connectionAttempts: 0
        });
        console.log(`Device registered: ${deviceId} (${deviceType}) in gallery ${galleryId}, room ${roomId}`);
        // If it's a sensor device, register with sensor processor
        if (deviceType.includes('sensor')) {
            sensorProcessor.registerSensor(deviceId, deviceType, galleryId, roomId);
        }
        return { success: true, deviceId };
    }
    // Connect a device
    connectDevice(deviceId) {
        const device = this.devices.get(deviceId);
        if (!device) {
            return { success: false, error: `Device not found: ${deviceId}` };
        }
        // Update device status
        device.status = 'connected';
        device.lastHeartbeat = new Date();
        // Update connection status
        this.connectionStatus.set(deviceId, {
            isConnected: true,
            lastSeen: new Date(),
            connectionAttempts: 0
        });
        console.log(`Device connected: ${deviceId}`);
        // Trigger connection callback if exists
        if (this.deviceCallbacks.has(deviceId)) {
            this.deviceCallbacks.get(deviceId).onConnect &&
                this.deviceCallbacks.get(deviceId).onConnect(device);
        }
        return { success: true, message: `Device ${deviceId} connected` };
    }
    // Disconnect a device
    disconnectDevice(deviceId) {
        const device = this.devices.get(deviceId);
        if (!device) {
            return { success: false, error: `Device not found: ${deviceId}` };
        }
        // Update device status
        device.status = 'disconnected';
        // Update connection status
        const status = this.connectionStatus.get(deviceId);
        if (status) {
            status.isConnected = false;
        }
        console.log(`Device disconnected: ${deviceId}`);
        // Trigger disconnection callback if exists
        if (this.deviceCallbacks.has(deviceId)) {
            this.deviceCallbacks.get(deviceId).onDisconnect &&
                this.deviceCallbacks.get(deviceId).onDisconnect(device);
        }
        return { success: true, message: `Device ${deviceId} disconnected` };
    }
    // Handle incoming data from a device
    async handleDeviceData(deviceId, data) {
        const device = this.devices.get(deviceId);
        if (!device) {
            return { success: false, error: `Device not found: ${deviceId}` };
        }
        // Update last heartbeat
        device.lastHeartbeat = new Date();
        const status = this.connectionStatus.get(deviceId);
        if (status) {
            status.lastSeen = new Date();
        }
        // Process the data based on device type
        switch (device.deviceType) {
            case 'audio_sensor':
                return await this.processAudioData(deviceId, data);
            case 'motion_sensor':
                return await this.processMotionData(deviceId, data);
            case 'proximity_sensor':
                return await this.processProximityData(deviceId, data);
            case 'environment_sensor':
                return await this.processEnvironmentData(deviceId, data);
            case 'display_controller':
                return await this.processDisplayCommand(deviceId, data);
            case 'lighting_controller':
                return await this.processLightingCommand(deviceId, data);
            default:
                console.warn(`Unknown device type: ${device.deviceType}`);
                return { success: false, error: `Unknown device type: ${device.deviceType}` };
        }
    }
    // Process audio sensor data
    async processAudioData(deviceId, data) {
        // Validate audio data
        if (!data.volume_level || !data.frequency_analysis) {
            return { success: false, error: 'Invalid audio data format' };
        }
        // Send to sensor processor
        return await sensorProcessor.processSensorData(deviceId, {
            type: 'audio',
            timestamp: new Date(),
            ...data
        });
    }
    // Process motion sensor data
    async processMotionData(deviceId, data) {
        // Validate motion data
        if (!data.visitor_count && !data.movement_patterns) {
            return { success: false, error: 'Invalid motion data format' };
        }
        // Send to sensor processor
        return await sensorProcessor.processSensorData(deviceId, {
            type: 'motion',
            timestamp: new Date(),
            ...data
        });
    }
    // Process proximity sensor data
    async processProximityData(deviceId, data) {
        // Validate proximity data
        if (!data.proximity_events) {
            return { success: false, error: 'Invalid proximity data format' };
        }
        // Send to sensor processor
        return await sensorProcessor.processSensorData(deviceId, {
            type: 'proximity',
            timestamp: new Date(),
            ...data
        });
    }
    // Process environment sensor data
    async processEnvironmentData(deviceId, data) {
        // Validate environment data
        if (!data.temperature && !data.humidity && !data.lighting_level) {
            return { success: false, error: 'Invalid environment data format' };
        }
        // Send to sensor processor
        return await sensorProcessor.processSensorData(deviceId, {
            type: 'environment',
            timestamp: new Date(),
            ...data
        });
    }
    // Process display command
    async processDisplayCommand(deviceId, command) {
        // Validate command
        if (!command.action) {
            return { success: false, error: 'Invalid display command format' };
        }
        // Execute display command
        switch (command.action) {
            case 'show_content':
                return await this.executeShowContent(deviceId, command);
            case 'change_brightness':
                return await this.executeChangeBrightness(deviceId, command);
            case 'show_message':
                return await this.executeShowMessage(deviceId, command);
            default:
                return { success: false, error: `Unknown display command: ${command.action}` };
        }
    }
    // Process lighting command
    async processLightingCommand(deviceId, command) {
        // Validate command
        if (!command.action) {
            return { success: false, error: 'Invalid lighting command format' };
        }
        // Execute lighting command
        switch (command.action) {
            case 'adjust_intensity':
                return await this.executeAdjustIntensity(deviceId, command);
            case 'change_color':
                return await this.executeChangeColor(deviceId, command);
            case 'toggle':
                return await this.executeToggleLight(deviceId, command);
            default:
                return { success: false, error: `Unknown lighting command: ${command.action}` };
        }
    }
    // Execute show content command
    async executeShowContent(deviceId, command) {
        console.log(`Display ${deviceId} showing content: ${command.contentId}`);
        // In a real implementation, this would send the command to the display device
        return { success: true, message: `Content ${command.contentId} shown on display ${deviceId}` };
    }
    // Execute change brightness command
    async executeChangeBrightness(deviceId, command) {
        console.log(`Display ${deviceId} brightness changed to: ${command.level}`);
        // In a real implementation, this would send the command to the display device
        return { success: true, message: `Brightness set to ${command.level} on display ${deviceId}` };
    }
    // Execute show message command
    async executeShowMessage(deviceId, command) {
        console.log(`Display ${deviceId} showing message: ${command.message}`);
        // In a real implementation, this would send the command to the display device
        return { success: true, message: `Message displayed on ${deviceId}` };
    }
    // Execute adjust intensity command
    async executeAdjustIntensity(deviceId, command) {
        console.log(`Light ${deviceId} intensity adjusted to: ${command.level}`);
        // In a real implementation, this would send the command to the lighting device
        return { success: true, message: `Intensity set to ${command.level} on light ${deviceId}` };
    }
    // Execute change color command
    async executeChangeColor(deviceId, command) {
        console.log(`Light ${deviceId} color changed to: ${command.color}`);
        // In a real implementation, this would send the command to the lighting device
        return { success: true, message: `Color set to ${command.color} on light ${deviceId}` };
    }
    // Execute toggle light command
    async executeToggleLight(deviceId, command) {
        console.log(`Light ${deviceId} toggled: ${command.state}`);
        // In a real implementation, this would send the command to the lighting device
        return { success: true, message: `Light ${deviceId} set to ${command.state}` };
    }
    // Send command to a device
    sendCommandToDevice(deviceId, command) {
        const device = this.devices.get(deviceId);
        if (!device) {
            return { success: false, error: `Device not found: ${deviceId}` };
        }
        // In a real implementation, this would send the command to the actual device
        // For simulation, we'll just log the command
        console.log(`Sending command to device ${deviceId}:`, command);
        // Trigger command callback if exists
        if (this.deviceCallbacks.has(deviceId)) {
            this.deviceCallbacks.get(deviceId).onCommand &&
                this.deviceCallbacks.get(deviceId).onCommand(deviceId, command);
        }
        return { success: true, message: `Command sent to device ${deviceId}` };
    }
    // Get status of all devices
    getDevicesStatus() {
        const status = [];
        for (const [deviceId, device] of this.devices) {
            const connectionStatus = this.connectionStatus.get(deviceId) || {};
            status.push({
                deviceId: device.deviceId,
                deviceType: device.deviceType,
                galleryId: device.galleryId,
                roomId: device.roomId,
                status: device.status,
                lastHeartbeat: device.lastHeartbeat,
                isConnected: connectionStatus.isConnected,
                lastSeen: connectionStatus.lastSeen
            });
        }
        return status;
    }
    // Get device by ID
    getDevice(deviceId) {
        return this.devices.get(deviceId) || null;
    }
    // Register a callback for device events
    registerCallback(deviceId, callbacks) {
        this.deviceCallbacks.set(deviceId, callbacks);
    }
    // Simulate device heartbeat
    simulateHeartbeat(deviceId) {
        const device = this.devices.get(deviceId);
        if (!device) {
            return { success: false, error: `Device not found: ${deviceId}` };
        }
        device.lastHeartbeat = new Date();
        const status = this.connectionStatus.get(deviceId);
        if (status) {
            status.lastSeen = new Date();
        }
        return { success: true, message: `Heartbeat received from ${deviceId}` };
    }
    // Monitor device health and detect offline devices
    monitorDeviceHealth() {
        const now = new Date();
        const timeoutThreshold = 5 * 60 * 1000; // 5 minutes
        for (const [deviceId, status] of this.connectionStatus) {
            const device = this.devices.get(deviceId);
            if (!device)
                continue;
            const timeSinceLastHeartbeat = now - device.lastHeartbeat;
            if (timeSinceLastHeartbeat > timeoutThreshold && status.isConnected) {
                console.warn(`Device ${deviceId} appears to be offline`);
                // Update status
                status.isConnected = false;
                device.status = 'offline';
                // Trigger offline callback if exists
                if (this.deviceCallbacks.has(deviceId)) {
                    this.deviceCallbacks.get(deviceId).onOffline &&
                        this.deviceCallbacks.get(deviceId).onOffline(device);
                }
            }
        }
    }
    // Initialize the device manager
    async initialize() {
        console.log('Initializing IoT Device Manager...');
        // Set up periodic health monitoring
        setInterval(() => {
            this.monitorDeviceHealth();
        }, 60000); // Check every minute
        console.log('IoT Device Manager initialized');
    }
}
// Export singleton instance
const deviceManager = new DeviceManager();
module.exports = deviceManager;
//# sourceMappingURL=deviceManager.js.map