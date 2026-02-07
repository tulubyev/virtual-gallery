const express = require('express');
const router = express.Router();

let galleryConfiguration = null;

router.get('/rooms', (req, res) => {
  const rooms = [
    { id: 'main_hall', name: 'Главный холл', theme: 'neutral', artworks_count: 0 },
    { id: 'impressionism', name: 'Импрессионизм', theme: 'impressionism', artworks_count: 6 },
    { id: 'modern_art', name: 'Современное искусство', theme: 'modern', artworks_count: 5 },
    { id: 'renaissance', name: 'Ренессанс', theme: 'classical', artworks_count: 6 },
    { id: 'contemporary', name: 'Современное искусство XXI века', theme: 'contemporary', artworks_count: 5 }
  ];
  res.json(rooms);
});

router.get('/config', (req, res) => {
  if (galleryConfiguration) {
    res.json(galleryConfiguration);
  } else {
    res.json({
      rooms: [
        { id: 'main_hall', name: 'Главный холл', theme: 'classic', width: 20, depth: 25, height: 6, wallColor: '#f5f0e6', lighting: 70, slots: 5, connections: ['impressionism', 'modern_art'] },
        { id: 'impressionism', name: 'Импрессионизм', theme: 'classic', width: 18, depth: 20, height: 5, wallColor: '#faf5f0', lighting: 80, slots: 6, connections: ['main_hall'] },
        { id: 'modern_art', name: 'Современное искусство', theme: 'modern', width: 15, depth: 15, height: 4, wallColor: '#ffffff', lighting: 90, slots: 4, connections: ['main_hall'] },
        { id: 'renaissance', name: 'Ренессанс', theme: 'classic', width: 22, depth: 28, height: 7, wallColor: '#f0e8d8', lighting: 60, slots: 6, connections: ['main_hall'] },
        { id: 'contemporary', name: 'Современность', theme: 'dark', width: 16, depth: 16, height: 4, wallColor: '#2a2a2a', lighting: 50, slots: 5, connections: ['main_hall'] }
      ],
      currentRoom: 'main_hall'
    });
  }
});

router.post('/config', (req, res) => {
  galleryConfiguration = req.body;
  res.json({ success: true });
});

router.get('/rooms/:roomId/artworks', (req, res) => {
  const { roomId } = req.params;
  
  if (!galleryConfiguration || !galleryConfiguration.rooms) {
    return res.json([]);
  }
  
  const room = galleryConfiguration.rooms.find(r => r.id === roomId);
  if (!room || !room.artworkAssignments) {
    return res.json([]);
  }
  
  const artworks = [];
  const defaultSlotIds = ['slot_1', 'slot_2', 'slot_3', 'slot_4', 'slot_5', 'slot_6', 'slot_7', 'slot_8', 'slot_9', 'slot_10'];
  
  Object.entries(room.artworkAssignments).forEach(([key, assignment]) => {
    if (assignment) {
      let slotIndex;
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
        medium_url: assignment.medium_url || assignment.image_url || ''
      });
    }
  });
  
  res.json(artworks);
});

module.exports = router;
