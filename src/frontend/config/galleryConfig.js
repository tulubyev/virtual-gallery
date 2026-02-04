export const GALLERY_CONFIG = {
  building: {
    name: "Virtual Art Museum",
    theme: "modern",
    ambientColor: 0x111111,
    fogColor: 0x111111,
    fogNear: 10,
    fogFar: 100
  },
  
  rooms: [
    {
      id: "main_hall",
      type: "hall",
      name: "Главный холл",
      position: { x: 0, y: 0, z: 0 },
      dimensions: { width: 30, height: 8, depth: 30 },
      floor: { color: 0x2a2a2a, texture: null },
      walls: { color: 0x3a3a3a, texture: null },
      ceiling: { color: 0x1a1a1a, texture: null },
      artworkSlots: [],
      doors: [
        { to: "impressionism", position: { x: 0, y: 0, z: -14.5 }, rotation: 0 },
        { to: "modern_art", position: { x: 14.5, y: 0, z: 0 }, rotation: Math.PI / 2 },
        { to: "renaissance", position: { x: -14.5, y: 0, z: 0 }, rotation: -Math.PI / 2 },
        { to: "contemporary", position: { x: 0, y: 0, z: 14.5 }, rotation: Math.PI }
      ],
      lighting: {
        ambient: 0.5,
        spotlights: [
          { position: { x: 0, y: 7, z: 0 }, intensity: 0.8, target: { x: 0, y: 0, z: 0 } }
        ]
      }
    },
    {
      id: "impressionism",
      type: "gallery",
      name: "Импрессионизм",
      theme: "impressionism",
      position: { x: 0, y: 0, z: -45 },
      dimensions: { width: 20, height: 6, depth: 25 },
      floor: { color: 0x4a3f35, texture: "wood_floor" },
      walls: { color: 0xd4c5b9, texture: null },
      ceiling: { color: 0xffffff, texture: null },
      artworkSlots: [
        { id: "slot_1", wall: "left", position: { x: -9.9, y: 3, z: -5 }, size: { w: 2, h: 1.5 } },
        { id: "slot_2", wall: "left", position: { x: -9.9, y: 3, z: 0 }, size: { w: 2.5, h: 2 } },
        { id: "slot_3", wall: "left", position: { x: -9.9, y: 3, z: 5 }, size: { w: 2, h: 1.5 } },
        { id: "slot_4", wall: "right", position: { x: 9.9, y: 3, z: -5 }, size: { w: 2, h: 1.5 } },
        { id: "slot_5", wall: "right", position: { x: 9.9, y: 3, z: 0 }, size: { w: 3, h: 2.5 } },
        { id: "slot_6", wall: "right", position: { x: 9.9, y: 3, z: 5 }, size: { w: 2, h: 1.5 } },
        { id: "slot_7", wall: "back", position: { x: -4, y: 3, z: -12.4 }, size: { w: 2, h: 1.5 } },
        { id: "slot_8", wall: "back", position: { x: 4, y: 3, z: -12.4 }, size: { w: 2, h: 1.5 } }
      ],
      doors: [
        { to: "main_hall", position: { x: 0, y: 0, z: 12.4 }, rotation: Math.PI, isEntrance: true }
      ],
      lighting: {
        ambient: 0.4,
        spotlights: [
          { position: { x: -5, y: 5.5, z: -5 }, intensity: 0.6, target: { x: -9.9, y: 3, z: -5 } },
          { position: { x: -5, y: 5.5, z: 0 }, intensity: 0.7, target: { x: -9.9, y: 3, z: 0 } },
          { position: { x: -5, y: 5.5, z: 5 }, intensity: 0.6, target: { x: -9.9, y: 3, z: 5 } },
          { position: { x: 5, y: 5.5, z: -5 }, intensity: 0.6, target: { x: 9.9, y: 3, z: -5 } },
          { position: { x: 5, y: 5.5, z: 0 }, intensity: 0.7, target: { x: 9.9, y: 3, z: 0 } },
          { position: { x: 5, y: 5.5, z: 5 }, intensity: 0.6, target: { x: 9.9, y: 3, z: 5 } }
        ]
      }
    },
    {
      id: "modern_art",
      type: "gallery",
      name: "Современное искусство",
      theme: "modern",
      position: { x: 45, y: 0, z: 0 },
      dimensions: { width: 25, height: 7, depth: 20 },
      floor: { color: 0x222222, texture: "concrete" },
      walls: { color: 0xffffff, texture: null },
      ceiling: { color: 0x111111, texture: null },
      artworkSlots: [
        { id: "slot_1", wall: "left", position: { x: -12.4, y: 3.5, z: -4 }, size: { w: 3, h: 3 } },
        { id: "slot_2", wall: "left", position: { x: -12.4, y: 3.5, z: 4 }, size: { w: 2.5, h: 2.5 } },
        { id: "slot_3", wall: "right", position: { x: 12.4, y: 3.5, z: -4 }, size: { w: 2.5, h: 2.5 } },
        { id: "slot_4", wall: "right", position: { x: 12.4, y: 3.5, z: 4 }, size: { w: 3, h: 3 } },
        { id: "slot_5", wall: "back", position: { x: 0, y: 3.5, z: -9.9 }, size: { w: 4, h: 3 } },
        { id: "slot_6", wall: "center", position: { x: 0, y: 1.5, z: 0 }, size: { w: 2, h: 2 }, isSculpture: true }
      ],
      doors: [
        { to: "main_hall", position: { x: -12.4, y: 0, z: 0 }, rotation: -Math.PI / 2, isEntrance: true }
      ],
      lighting: {
        ambient: 0.6,
        spotlights: [
          { position: { x: -8, y: 6.5, z: -4 }, intensity: 0.8, target: { x: -12.4, y: 3.5, z: -4 } },
          { position: { x: -8, y: 6.5, z: 4 }, intensity: 0.8, target: { x: -12.4, y: 3.5, z: 4 } },
          { position: { x: 8, y: 6.5, z: -4 }, intensity: 0.8, target: { x: 12.4, y: 3.5, z: -4 } },
          { position: { x: 8, y: 6.5, z: 4 }, intensity: 0.8, target: { x: 12.4, y: 3.5, z: 4 } },
          { position: { x: 0, y: 6.5, z: -5 }, intensity: 1.0, target: { x: 0, y: 3.5, z: -9.9 } },
          { position: { x: 0, y: 4, z: 3 }, intensity: 0.5, target: { x: 0, y: 1.5, z: 0 } }
        ]
      }
    },
    {
      id: "renaissance",
      type: "gallery",
      name: "Ренессанс",
      theme: "classical",
      position: { x: -45, y: 0, z: 0 },
      dimensions: { width: 25, height: 8, depth: 20 },
      floor: { color: 0x5a4a3a, texture: "marble" },
      walls: { color: 0x8b0000, texture: null },
      ceiling: { color: 0xf5f5dc, texture: "ornate_ceiling" },
      artworkSlots: [
        { id: "slot_1", wall: "left", position: { x: -12.4, y: 4, z: -4 }, size: { w: 2.5, h: 3 } },
        { id: "slot_2", wall: "left", position: { x: -12.4, y: 4, z: 4 }, size: { w: 2.5, h: 3 } },
        { id: "slot_3", wall: "right", position: { x: 12.4, y: 4, z: -4 }, size: { w: 2.5, h: 3 } },
        { id: "slot_4", wall: "right", position: { x: 12.4, y: 4, z: 4 }, size: { w: 2.5, h: 3 } },
        { id: "slot_5", wall: "back", position: { x: -5, y: 4, z: -9.9 }, size: { w: 2, h: 2.5 } },
        { id: "slot_6", wall: "back", position: { x: 0, y: 4, z: -9.9 }, size: { w: 3, h: 4 } },
        { id: "slot_7", wall: "back", position: { x: 5, y: 4, z: -9.9 }, size: { w: 2, h: 2.5 } }
      ],
      doors: [
        { to: "main_hall", position: { x: 12.4, y: 0, z: 0 }, rotation: Math.PI / 2, isEntrance: true }
      ],
      lighting: {
        ambient: 0.35,
        spotlights: [
          { position: { x: -8, y: 7.5, z: -4 }, intensity: 0.7, target: { x: -12.4, y: 4, z: -4 } },
          { position: { x: -8, y: 7.5, z: 4 }, intensity: 0.7, target: { x: -12.4, y: 4, z: 4 } },
          { position: { x: 8, y: 7.5, z: -4 }, intensity: 0.7, target: { x: 12.4, y: 4, z: -4 } },
          { position: { x: 8, y: 7.5, z: 4 }, intensity: 0.7, target: { x: 12.4, y: 4, z: 4 } },
          { position: { x: 0, y: 7.5, z: -5 }, intensity: 0.9, target: { x: 0, y: 4, z: -9.9 } }
        ]
      }
    },
    {
      id: "contemporary",
      type: "gallery",
      name: "Современное искусство XXI века",
      theme: "contemporary",
      position: { x: 0, y: 0, z: 45 },
      dimensions: { width: 20, height: 6, depth: 25 },
      floor: { color: 0x1a1a1a, texture: "polished_concrete" },
      walls: { color: 0xe0e0e0, texture: null },
      ceiling: { color: 0x1a1a1a, texture: null },
      artworkSlots: [
        { id: "slot_1", wall: "left", position: { x: -9.9, y: 3, z: -6 }, size: { w: 2, h: 2 } },
        { id: "slot_2", wall: "left", position: { x: -9.9, y: 3, z: 0 }, size: { w: 3, h: 2 } },
        { id: "slot_3", wall: "left", position: { x: -9.9, y: 3, z: 6 }, size: { w: 2, h: 2 } },
        { id: "slot_4", wall: "right", position: { x: 9.9, y: 3, z: -6 }, size: { w: 2, h: 2 } },
        { id: "slot_5", wall: "right", position: { x: 9.9, y: 3, z: 0 }, size: { w: 3, h: 2 } },
        { id: "slot_6", wall: "right", position: { x: 9.9, y: 3, z: 6 }, size: { w: 2, h: 2 } },
        { id: "slot_7", wall: "back", position: { x: 0, y: 3, z: 12.4 }, size: { w: 4, h: 2.5 } }
      ],
      doors: [
        { to: "main_hall", position: { x: 0, y: 0, z: -12.4 }, rotation: 0, isEntrance: true }
      ],
      lighting: {
        ambient: 0.5,
        spotlights: [
          { position: { x: -5, y: 5.5, z: -6 }, intensity: 0.6, target: { x: -9.9, y: 3, z: -6 } },
          { position: { x: -5, y: 5.5, z: 0 }, intensity: 0.7, target: { x: -9.9, y: 3, z: 0 } },
          { position: { x: -5, y: 5.5, z: 6 }, intensity: 0.6, target: { x: -9.9, y: 3, z: 6 } },
          { position: { x: 5, y: 5.5, z: -6 }, intensity: 0.6, target: { x: 9.9, y: 3, z: -6 } },
          { position: { x: 5, y: 5.5, z: 0 }, intensity: 0.7, target: { x: 9.9, y: 3, z: 0 } },
          { position: { x: 5, y: 5.5, z: 6 }, intensity: 0.6, target: { x: 9.9, y: 3, z: 6 } }
        ]
      }
    }
  ],
  
  corridors: [
    {
      id: "corridor_to_impressionism",
      from: "main_hall",
      to: "impressionism",
      dimensions: { width: 4, height: 4, length: 15 },
      floor: { color: 0x2a2a2a },
      walls: { color: 0x3a3a3a },
      lighting: { ambient: 0.3 }
    },
    {
      id: "corridor_to_modern",
      from: "main_hall",
      to: "modern_art",
      dimensions: { width: 4, height: 4, length: 15 },
      floor: { color: 0x2a2a2a },
      walls: { color: 0x3a3a3a },
      lighting: { ambient: 0.3 }
    },
    {
      id: "corridor_to_renaissance",
      from: "main_hall",
      to: "renaissance",
      dimensions: { width: 4, height: 4, length: 15 },
      floor: { color: 0x2a2a2a },
      walls: { color: 0x3a3a3a },
      lighting: { ambient: 0.3 }
    },
    {
      id: "corridor_to_contemporary",
      from: "main_hall",
      to: "contemporary",
      dimensions: { width: 4, height: 4, length: 15 },
      floor: { color: 0x2a2a2a },
      walls: { color: 0x3a3a3a },
      lighting: { ambient: 0.3 }
    }
  ],
  
  textures: {
    wood_floor: "/assets/textures/wood_floor.jpg",
    marble: "/assets/textures/marble.jpg",
    concrete: "/assets/textures/concrete.jpg",
    polished_concrete: "/assets/textures/polished_concrete.jpg",
    ornate_ceiling: "/assets/textures/ornate_ceiling.jpg"
  },
  
  lod: {
    distances: {
      high: 10,
      medium: 30,
      low: 60
    },
    placeholder: {
      color: 0x666666
    }
  }
};
