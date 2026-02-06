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

module.exports = router;
