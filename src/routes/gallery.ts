import express, { Request, Response } from 'express';
import multer from 'multer';

const router = express.Router();
const { getActiveConfig, saveConfig, updateTextureUrls } = require('../services/gallery-config');
const { uploadBufferToS3 } = require('../services/s3-upload');

const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
const MAX_FILE_SIZE = 2 * 1024 * 1024;
const MAX_FILES = 20;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE, files: MAX_FILES },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PNG, JPEG and WebP images are allowed'));
    }
  },
});

const defaultConfig = {
  rooms: [
    { id: 'main_hall', name: 'Главный холл', theme: 'classic', width: 20, depth: 25, height: 6, wallColor: '#f5f0e6', lighting: 70, slots: 5, connections: ['impressionism', 'modern_art'] },
    { id: 'impressionism', name: 'Импрессионизм', theme: 'classic', width: 18, depth: 20, height: 5, wallColor: '#faf5f0', lighting: 80, slots: 6, connections: ['main_hall'] },
    { id: 'modern_art', name: 'Современное искусство', theme: 'modern', width: 15, depth: 15, height: 4, wallColor: '#ffffff', lighting: 90, slots: 4, connections: ['main_hall'] },
    { id: 'renaissance', name: 'Ренессанс', theme: 'classic', width: 22, depth: 28, height: 7, wallColor: '#f0e8d8', lighting: 60, slots: 6, connections: ['main_hall'] },
    { id: 'contemporary', name: 'Современность', theme: 'dark', width: 16, depth: 16, height: 4, wallColor: '#2a2a2a', lighting: 50, slots: 5, connections: ['main_hall'] },
  ],
  currentRoom: 'main_hall',
};

router.get('/rooms', (_req: Request, res: Response) => {
  const rooms = [
    { id: 'main_hall', name: 'Главный холл', theme: 'neutral', artworks_count: 0 },
    { id: 'impressionism', name: 'Импрессионизм', theme: 'impressionism', artworks_count: 6 },
    { id: 'modern_art', name: 'Современное искусство', theme: 'modern', artworks_count: 5 },
    { id: 'renaissance', name: 'Ренессанс', theme: 'classical', artworks_count: 6 },
    { id: 'contemporary', name: 'Современное искусство XXI века', theme: 'contemporary', artworks_count: 5 },
  ];
  res.json(rooms);
});

router.get('/config', async (_req: Request, res: Response) => {
  try {
    const dbConfig = await getActiveConfig();
    if (dbConfig) {
      const response = dbConfig.config || defaultConfig;
      if (dbConfig.texture_urls) response.texture_urls = dbConfig.texture_urls;
      res.json(response);
    } else {
      res.json(defaultConfig);
    }
  } catch (error) {
    console.error('Error loading gallery config:', error);
    res.json(defaultConfig);
  }
});

router.post('/config', async (req: Request, res: Response) => {
  try {
    const { textureUrls, ...config } = req.body;
    await saveConfig(config, textureUrls || null);
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving gallery config:', error);
    res.status(500).json({ success: false, error: 'Failed to save configuration' });
  }
});

router.post('/textures', upload.any(), async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const textureUrls: Record<string, string> = {};
    const uploadPromises = files.map(async (file) => {
      const textureKey = file.fieldname.replace(/[^a-zA-Z0-9_-]/g, '');
      if (!textureKey) return;
      const extMap: Record<string, string> = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp' };
      const ext = extMap[file.mimetype] || 'png';
      const fileName = `${textureKey}_${Date.now()}.${ext}`;
      const url = await uploadBufferToS3(file.buffer, fileName, file.mimetype);
      textureUrls[textureKey] = url;
    });

    await Promise.all(uploadPromises);

    const dbConfig = await getActiveConfig();
    const existingUrls = dbConfig ? (dbConfig.texture_urls || {}) : {};
    const mergedUrls = { ...existingUrls, ...textureUrls };
    await updateTextureUrls(mergedUrls);

    res.json({ success: true, textureUrls: mergedUrls });
  } catch (error) {
    console.error('Error uploading textures:', error);
    res.status(500).json({ error: 'Failed to upload textures' });
  }
});

router.get('/rooms/:roomId/artworks', async (req: Request, res: Response) => {
  const { roomId } = req.params;
  try {
    const dbConfig = await getActiveConfig();
    const galleryConfiguration = dbConfig ? dbConfig.config : null;

    if (!galleryConfiguration || !galleryConfiguration.rooms) return res.json([]);

    const room = galleryConfiguration.rooms.find((r: any) => r.id === roomId);
    if (!room || !room.artworkAssignments) return res.json([]);

    const artworks: any[] = [];
    const defaultSlotIds = ['slot_1', 'slot_2', 'slot_3', 'slot_4', 'slot_5', 'slot_6', 'slot_7', 'slot_8', 'slot_9', 'slot_10'];

    Object.entries(room.artworkAssignments).forEach(([key, assignment]: [string, any]) => {
      if (assignment) {
        let slotIndex: number;
        if (key.startsWith('slot_')) {
          slotIndex = parseInt(key.replace('slot_', '')) - 1;
        } else {
          slotIndex = parseInt(key);
        }
        if (isNaN(slotIndex)) slotIndex = 0;
        artworks.push({
          id: assignment.id || `artwork_${slotIndex}`,
          slot_id: defaultSlotIds[slotIndex] || `slot_${slotIndex + 1}`,
          slot_index: slotIndex,
          title: assignment.title || 'Без названия',
          artist: assignment.artist || 'Неизвестный художник',
          year: assignment.year || null,
          image_url: assignment.image_url || '',
          thumbnail_url: assignment.thumbnail_url || '',
          medium_url: assignment.medium_url || assignment.image_url || '',
        });
      }
    });

    res.json(artworks);
  } catch (error) {
    console.error('Error loading artworks:', error);
    res.json([]);
  }
});

export = router;
