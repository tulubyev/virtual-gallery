// src/routes/iotRoutes.ts
import { Router } from 'express';
import { IoTController } from '../controllers/IoTController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Register a new IoT device
router.post('/devices/register', authenticateToken, IoTController.registerDevice);

// Connect an IoT device
router.post('/devices/:deviceId/connect', authenticateToken, IoTController.connectDevice);

// Disconnect an IoT device
router.post('/devices/:deviceId/disconnect', authenticateToken, IoTController.disconnectDevice);

// Handle incoming data from an IoT device
router.post('/devices/:deviceId/data', authenticateToken, IoTController.handleDeviceData);

// Send a command to an IoT device
router.post('/devices/:deviceId/command', authenticateToken, IoTController.sendCommand);

// Get status of all IoT devices
router.get('/devices/status', authenticateToken, IoTController.getDevicesStatus);

// Get status of a specific device
router.get('/devices/:deviceId/status', authenticateToken, IoTController.getDeviceStatus);

// Get aggregated feedback from IoT sensors
router.get('/feedback/:galleryId', authenticateToken, IoTController.getAggregatedFeedback);

// Simulate a device heartbeat
router.post('/devices/:deviceId/heartbeat', authenticateToken, IoTController.simulateHeartbeat);

// Initialize the IoT system
router.post('/initialize', authenticateToken, IoTController.initializeIoTSystem);

export default router;