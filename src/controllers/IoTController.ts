// src/controllers/IoTController.ts
// Controller for IoT-related operations in the virtual art gallery

import { Request, Response } from 'express';
import deviceManager from '../iot/devices/DeviceManager';
import sensorProcessor from '../iot/sensors/SensorProcessor';

export const IoTController = {
  // Register a new IoT device
  registerDevice: async (req: Request, res: Response) => {
    try {
      const { deviceId, deviceType, galleryId, roomId, config } = req.body;

      // Validate required fields
      if (!deviceId || !deviceType || !galleryId || !roomId) {
        res.status(400).json({
          error: 'Missing required fields: deviceId, deviceType, galleryId, roomId'
        });
        return;
      }

      // Register the device
      const result = deviceManager.registerDevice(deviceId, deviceType, galleryId, roomId, config);

      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
    return;
  },

  // Connect an IoT device
  connectDevice: async (req: Request, res: Response) => {
    try {
      const { deviceId } = req.params;

      const result = deviceManager.connectDevice(deviceId);

      if (result.success) {
        res.json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  // Disconnect an IoT device
  disconnectDevice: async (req: Request, res: Response) => {
    try {
      const { deviceId } = req.params;

      const result = deviceManager.disconnectDevice(deviceId);

      if (result.success) {
        res.json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  // Handle incoming data from an IoT device
  handleDeviceData: async (req: Request, res: Response) => {
    try {
      const { deviceId } = req.params;
      const data = req.body;

      const result = await deviceManager.handleDeviceData(deviceId, data);

      if (result.success) {
        res.json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  // Send a command to an IoT device
  sendCommand: async (req: Request, res: Response) => {
    try {
      const { deviceId } = req.params;
      const command = req.body;

      const result = deviceManager.sendCommandToDevice(deviceId, command);

      if (result.success) {
        res.json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get status of all IoT devices
  getDevicesStatus: async (req: Request, res: Response) => {
    try {
      const status = deviceManager.getDevicesStatus();
      res.json(status);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get status of a specific device
  getDeviceStatus: async (req: Request, res: Response) => {
    try {
      const { deviceId } = req.params;
      const device = deviceManager.getDevice(deviceId);

      if (!device) {
        res.status(404).json({ error: 'Device not found' });
        return;
      }

      const allStatus = deviceManager.getDevicesStatus();
      const deviceStatus = allStatus.find((d: any) => d.deviceId === deviceId);

      res.json(deviceStatus);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
    return;
  },

  // Get aggregated feedback from IoT sensors
  getAggregatedFeedback: async (req: Request, res: Response) => {
    try {
      const { galleryId } = req.params;
      const timeRangeHours = parseInt(req.query.timeRangeHours as string) || 24;

      // Get aggregated feedback from sensor processor
      const feedback = await sensorProcessor.getAggregatedFeedback(galleryId, timeRangeHours);

      res.json(feedback);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  // Simulate a device heartbeat
  simulateHeartbeat: async (req: Request, res: Response) => {
    try {
      const { deviceId } = req.params;

      const result = deviceManager.simulateHeartbeat(deviceId);

      if (result.success) {
        res.json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  // Initialize the IoT system
  initializeIoTSystem: async (req: Request, res: Response) => {
    try {
      await deviceManager.initialize();
      res.json({ message: 'IoT system initialized successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
};