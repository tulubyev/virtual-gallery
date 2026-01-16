// src/routes/iotRoutes.ts
import { Router } from 'express';
import { IoTController } from '../controllers/IoTController';

export function createIotRoutes(controller: IoTController) {
  const router = Router();

  // Get IoT device status
  router.get('/devices/status', (req, res) => controller.getDeviceStatus(req, res));

  // Send command to IoT device
  router.post('/devices/:deviceId/command', (req, res) => controller.sendDeviceCommand(req, res));

  // Get sensor data
  router.get('/sensors/data', (req, res) => controller.getSensorData(req, res));

  // Update device configuration
  router.put('/devices/:deviceId/config', (req, res) => controller.updateDeviceConfig(req, res));

  // Get device logs
  router.get('/devices/:deviceId/logs', (req, res) => controller.getDeviceLogs(req, res));

  return router;
}