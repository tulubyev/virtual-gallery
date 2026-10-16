"use strict";
// src/backend/routes/iotRoutes.js
// Routes for IoT-related operations in the virtual art gallery
const express = require('express');
const router = express.Router();
const iotController = require('../controllers/iotController');
const auth = require('../middleware/auth'); // Assuming we have authentication
// Register a new IoT device
router.post('/devices/register', iotController.registerDevice);
// Connect an IoT device
router.post('/devices/:deviceId/connect', iotController.connectDevice);
// Disconnect an IoT device
router.post('/devices/:deviceId/disconnect', iotController.disconnectDevice);
// Handle incoming data from an IoT device
router.post('/devices/:deviceId/data', iotController.handleDeviceData);
// Send a command to an IoT device
router.post('/devices/:deviceId/command', iotController.sendCommand);
// Get status of all IoT devices
router.get('/devices/status', iotController.getDevicesStatus);
// Get status of a specific device
router.get('/devices/:deviceId/status', iotController.getDeviceStatus);
// Get aggregated feedback from IoT sensors
router.get('/feedback/:galleryId', iotController.getAggregatedFeedback);
// Simulate a device heartbeat
router.post('/devices/:deviceId/heartbeat', iotController.simulateHeartbeat);
// Initialize the IoT system
router.post('/initialize', iotController.initializeIoTSystem);
module.exports = router;
//# sourceMappingURL=iotRoutes.js.map