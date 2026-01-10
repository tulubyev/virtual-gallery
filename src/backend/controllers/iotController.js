// src/backend/controllers/iotController.js
// Controller for IoT-related operations in the virtual art gallery

const deviceManager = require('../../../src/iot/devices/deviceManager');
const sensorProcessor = require('../../../src/iot/sensors/sensorProcessor');

const iotController = {
    // Register a new IoT device
    registerDevice: async (req, res) => {
        try {
            const { deviceId, deviceType, galleryId, roomId, config } = req.body;

            // Validate required fields
            if (!deviceId || !deviceType || !galleryId || !roomId) {
                return res.status(400).json({ 
                    error: 'Missing required fields: deviceId, deviceType, galleryId, roomId' 
                });
            }

            // Register the device
            const result = deviceManager.registerDevice(deviceId, deviceType, galleryId, roomId, config);

            if (result.success) {
                res.status(201).json(result);
            } else {
                res.status(400).json(result);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Connect an IoT device
    connectDevice: async (req, res) => {
        try {
            const { deviceId } = req.params;

            const result = deviceManager.connectDevice(deviceId);

            if (result.success) {
                res.json(result);
            } else {
                res.status(400).json(result);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Disconnect an IoT device
    disconnectDevice: async (req, res) => {
        try {
            const { deviceId } = req.params;

            const result = deviceManager.disconnectDevice(deviceId);

            if (result.success) {
                res.json(result);
            } else {
                res.status(400).json(result);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Handle incoming data from an IoT device
    handleDeviceData: async (req, res) => {
        try {
            const { deviceId } = req.params;
            const data = req.body;

            const result = await deviceManager.handleDeviceData(deviceId, data);

            if (result.success) {
                res.json(result);
            } else {
                res.status(400).json(result);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Send a command to an IoT device
    sendCommand: async (req, res) => {
        try {
            const { deviceId } = req.params;
            const command = req.body;

            const result = deviceManager.sendCommandToDevice(deviceId, command);

            if (result.success) {
                res.json(result);
            } else {
                res.status(400).json(result);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get status of all IoT devices
    getDevicesStatus: async (req, res) => {
        try {
            const status = deviceManager.getDevicesStatus();
            res.json(status);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get status of a specific device
    getDeviceStatus: async (req, res) => {
        try {
            const { deviceId } = req.params;
            const device = deviceManager.getDevice(deviceId);

            if (!device) {
                return res.status(404).json({ error: 'Device not found' });
            }

            const allStatus = deviceManager.getDevicesStatus();
            const deviceStatus = allStatus.find(d => d.deviceId === deviceId);

            res.json(deviceStatus);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get aggregated feedback from IoT sensors
    getAggregatedFeedback: async (req, res) => {
        try {
            const { galleryId } = req.params;
            const timeRangeHours = parseInt(req.query.timeRangeHours) || 24;

            // Get aggregated feedback from sensor processor
            const feedback = await sensorProcessor.getAggregatedFeedback(galleryId, timeRangeHours);

            res.json(feedback);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Simulate a device heartbeat
    simulateHeartbeat: async (req, res) => {
        try {
            const { deviceId } = req.params;

            const result = deviceManager.simulateHeartbeat(deviceId);

            if (result.success) {
                res.json(result);
            } else {
                res.status(400).json(result);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Initialize the IoT system
    initializeIoTSystem: async (req, res) => {
        try {
            await deviceManager.initialize();
            res.json({ message: 'IoT system initialized successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = iotController;