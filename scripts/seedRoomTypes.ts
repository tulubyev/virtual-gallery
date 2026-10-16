import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/virtual_gallery'
});

const roomTypes = [
  {
    name: 'Renaissance Hall',
    description: 'A grand hall inspired by Renaissance architecture with high ceilings and classical proportions',
    category: 'classical',
    base_template: {
      geometry: {
        width: 20,
        height: 15,
        depth: 30,
        ceilingHeight: 8,
        wallThickness: 0.3
      },
      materials: [
        {
          name: 'marble_floor',
          type: 'floor',
          color: '#f5f5dc',
          texture: 'marble.jpg',
          roughness: 0.1,
          metalness: 0.0
        },
        {
          name: 'plaster_walls',
          type: 'wall',
          color: '#faf0e6',
          roughness: 0.8,
          metalness: 0.0
        },
        {
          name: 'vaulted_ceiling',
          type: 'ceiling',
          color: '#ffffff',
          roughness: 0.9,
          metalness: 0.0
        }
      ],
      decorations: [
        {
          type: 'pillar',
          position: [5, 0, 5],
          rotation: [0, 0, 0],
          scale: [1, 1, 1],
          material: 'marble'
        },
        {
          type: 'pillar',
          position: [-5, 0, 5],
          rotation: [0, 0, 0],
          scale: [1, 1, 1],
          material: 'marble'
        }
      ],
      interactionPoints: []
    },
    customization_options: [
      {
        id: 'wall_color',
        name: 'Wall Color',
        type: 'color',
        values: ['#faf0e6', '#f5deb3', '#deb887'],
        defaultValue: '#faf0e6'
      },
      {
        id: 'lighting_intensity',
        name: 'Lighting Intensity',
        type: 'lighting',
        values: [0.5, 0.7, 1.0],
        defaultValue: 0.7
      }
    ],
    lighting_preset: {
      ambient: {
        color: '#ffffff',
        intensity: 0.3
      },
      directional: {
        color: '#fff8dc',
        intensity: 0.8,
        position: [10, 10, 5]
      }
    },
    audio_preset: {
      backgroundMusic: 'renaissance_classical.mp3',
      ambientSounds: ['echo_hall.mp3'],
      spatialAudio: true
    },
    supported_artwork_types: ['renaissance', 'baroque', 'classical'],
    visitor_capacity: 75,
    accessibility_features: ['wheelchair_accessible', 'audio_descriptions'],
    thumbnail_url: '/assets/room-thumbnails/renaissance-hall.jpg'
  },
  {
    name: 'Modern White Cube',
    description: 'Minimalist contemporary gallery space with clean lines and neutral lighting',
    category: 'modern',
    base_template: {
      geometry: {
        width: 12,
        height: 12,
        depth: 18,
        ceilingHeight: 4,
        wallThickness: 0.2
      },
      materials: [
        {
          name: 'white_walls',
          type: 'wall',
          color: '#ffffff',
          roughness: 0.9,
          metalness: 0.0
        },
        {
          name: 'concrete_floor',
          type: 'floor',
          color: '#f8f8f8',
          roughness: 0.7,
          metalness: 0.0
        },
        {
          name: 'white_ceiling',
          type: 'ceiling',
          color: '#ffffff',
          roughness: 0.9,
          metalness: 0.0
        }
      ],
      decorations: [],
      interactionPoints: []
    },
    customization_options: [
      {
        id: 'accent_wall',
        name: 'Accent Wall Color',
        type: 'color',
        values: ['#ffffff', '#f8f8f8', '#e8e8e8'],
        defaultValue: '#ffffff'
      }
    ],
    lighting_preset: {
      ambient: {
        color: '#ffffff',
        intensity: 0.6
      },
      directional: {
        color: '#ffffff',
        intensity: 0.4,
        position: [0, 5, 0]
      },
      pointLights: [
        {
          color: '#ffffff',
          intensity: 0.8,
          position: [0, 3.5, 0],
          distance: 10
        }
      ]
    },
    supported_artwork_types: ['contemporary', 'minimalist', 'abstract'],
    visitor_capacity: 30,
    accessibility_features: ['wheelchair_accessible', 'low_glare_lighting'],
    thumbnail_url: '/assets/room-thumbnails/white-cube.jpg'
  },
  {
    name: 'Impressionist Garden',
    description: 'An outdoor-inspired gallery with garden elements and natural lighting',
    category: 'themed',
    base_template: {
      geometry: {
        width: 25,
        height: 20,
        depth: 35,
        ceilingHeight: 6,
        wallThickness: 0.1
      },
      materials: [
        {
          name: 'grass_floor',
          type: 'floor',
          color: '#90EE90',
          texture: 'grass.jpg',
          roughness: 0.8,
          metalness: 0.0
        },
        {
          name: 'garden_wall',
          type: 'wall',
          color: '#228B22',
          roughness: 0.6,
          metalness: 0.0
        }
      ],
      decorations: [
        {
          type: 'furniture',
          position: [8, 0, 8],
          rotation: [0, 0, 0],
          scale: [2, 1, 1],
          material: 'wood'
        }
      ],
      interactionPoints: []
    },
    customization_options: [
      {
        id: 'season_theme',
        name: 'Season Theme',
        type: 'decoration',
        values: ['spring', 'summer', 'autumn', 'winter'],
        defaultValue: 'summer'
      }
    ],
    lighting_preset: {
      ambient: {
        color: '#87CEEB',
        intensity: 0.7
      },
      directional: {
        color: '#FFF8DC',
        intensity: 0.9,
        position: [15, 15, 10]
      }
    },
    audio_preset: {
      ambientSounds: ['birds.mp3', 'wind.mp3'],
      spatialAudio: true
    },
    supported_artwork_types: ['impressionist', 'landscape', 'plein_air'],
    visitor_capacity: 60,
    accessibility_features: ['wheelchair_accessible', 'outdoor_access'],
    thumbnail_url: '/assets/room-thumbnails/impressionist-garden.jpg'
  }
];

async function seedRoomTypes() {
  try {
    console.log('Seeding room types...');

    for (const roomType of roomTypes) {
      const result = await pool.query(`
        INSERT INTO room_types (
          name, description, category, base_template, customization_options,
          lighting_preset, audio_preset, supported_artwork_types,
          visitor_capacity, accessibility_features, thumbnail_url
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        ON CONFLICT (name) DO NOTHING
      `, [
        roomType.name,
        roomType.description,
        roomType.category,
        JSON.stringify(roomType.base_template),
        JSON.stringify(roomType.customization_options),
        JSON.stringify(roomType.lighting_preset),
        JSON.stringify(roomType.audio_preset),
        roomType.supported_artwork_types,
        roomType.visitor_capacity,
        roomType.accessibility_features,
        roomType.thumbnail_url
      ]);

      if (result.rowCount > 0) {
        console.log(`✓ Seeded room type: ${roomType.name}`);
      } else {
        console.log(`- Room type already exists: ${roomType.name}`);
      }
    }

    console.log('Room types seeding completed!');
  } catch (error) {
    console.error('Error seeding room types:', error);
  } finally {
    await pool.end();
  }
}

// Run the seeding
seedRoomTypes().catch(console.error);import * as fs from 'fs';
import * as path from 'path';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const roomTypes = [
  {
    name: 'Renaissance Hall',
    description: 'A grand hall inspired by Renaissance architecture with high ceilings and classical proportions',
    category: 'classical',
    base_template: {
      geometry: {
        width: 20,
        height: 15,
        depth: 30,
        ceilingHeight: 8,
        wallThickness: 0.3
      },
      materials: [
        {
          name: 'marble_floor',
          type: 'floor',
          color: '#f5f5dc',
          texture: 'marble.jpg',
          roughness: 0.1,
          metalness: 0.0
        },
        {
          name: 'plaster_walls',
          type: 'wall',
          color: '#faf0e6',
          roughness: 0.8,
          metalness: 0.0
        },
        {
          name: 'vaulted_ceiling',
          type: 'ceiling',
          color: '#ffffff',
          roughness: 0.9,
          metalness: 0.0
        }
      ],
      decorations: [
        {
          type: 'pillar',
          position: [5, 0, 5],
          rotation: [0, 0, 0],
          scale: [1, 1, 1],
          material: 'marble'
        },
        {
          type: 'pillar',
          position: [-5, 0, 5],
          rotation: [0, 0, 0],
          scale: [1, 1, 1],
          material: 'marble'
        }
      ],
      interactionPoints: []
    },
    customization_options: [
      {
        id: 'wall_color',
        name: 'Wall Color',
        type: 'color',
        values: ['#faf0e6', '#f5deb3', '#deb887'],
        defaultValue: '#faf0e6'
      },
      {
        id: 'lighting_intensity',
        name: 'Lighting Intensity',
        type: 'lighting',
        values: [0.5, 0.7, 1.0],
        defaultValue: 0.7
      }
    ],
    lighting_preset: {
      ambient: {
        color: '#ffffff',
        intensity: 0.3
      },
      directional: {
        color: '#fff8dc',
        intensity: 0.8,
        position: [10, 10, 5]
      }
    },
    audio_preset: {
      backgroundMusic: 'renaissance_classical.mp3',
      ambientSounds: ['echo_hall.mp3'],
      spatialAudio: true
    },
    supported_artwork_types: ['renaissance', 'baroque', 'classical'],
    visitor_capacity: 75,
    accessibility_features: ['wheelchair_accessible', 'audio_descriptions'],
    thumbnail_url: '/assets/room-thumbnails/renaissance-hall.jpg'
  },
  {
    name: 'Modern White Cube',
    description: 'Minimalist contemporary gallery space with clean lines and neutral lighting',
    category: 'modern',
    base_template: {
      geometry: {
        width: 12,
        height: 12,
        depth: 18,
        ceilingHeight: 4,
        wallThickness: 0.2
      },
      materials: [
        {
          name: 'white_walls',
          type: 'wall',
          color: '#ffffff',
          roughness: 0.9,
          metalness: 0.0
        },
        {
          name: 'concrete_floor',
          type: 'floor',
          color: '#f8f8f8',
          roughness: 0.7,
          metalness: 0.0
        },
        {
          name: 'white_ceiling',
          type: 'ceiling',
          color: '#ffffff',
          roughness: 0.9,
          metalness: 0.0
        }
      ],
      decorations: [],
      interactionPoints: []
    },
    customization_options: [
      {
        id: 'accent_wall',
        name: 'Accent Wall Color',
        type: 'color',
        values: ['#ffffff', '#f8f8f8', '#e8e8e8'],
        defaultValue: '#ffffff'
      }
    ],
    lighting_preset: {
      ambient: {
        color: '#ffffff',
        intensity: 0.6
      },
      directional: {
        color: '#ffffff',
        intensity: 0.4,
        position: [0, 5, 0]
      },
      pointLights: [
        {
          color: '#ffffff',
          intensity: 0.8,
          position: [0, 3.5, 0],
          distance: 10
        }
      ]
    },
    supported_artwork_types: ['contemporary', 'minimalist', 'abstract'],
    visitor_capacity: 30,
    accessibility_features: ['wheelchair_accessible', 'low_glare_lighting'],
    thumbnail_url: '/assets/room-thumbnails/white-cube.jpg'
  },
  {
    name: 'Impressionist Garden',
    description: 'An outdoor-inspired gallery with garden elements and natural lighting',
    category: 'themed',
    base_template: {
      geometry: {
        width: 25,
        height: 20,
        depth: 35,
        ceilingHeight: 6,
        wallThickness: 0.1
      },
      materials: [
        {
          name: 'grass_floor',
          type: 'floor',
          color: '#90EE90',
          texture: 'grass.jpg',
          roughness: 0.8,
          metalness: 0.0
        },
        {
          name: 'garden_wall',
          type: 'wall',
          color: '#228B22',
          roughness: 0.6,
          metalness: 0.0
        }
      ],
      decorations: [
        {
          type: 'furniture',
          position: [8, 0, 8],
          rotation: [0, 0, 0],
          scale: [2, 1, 1],
          material: 'wood'
        }
      ],
      interactionPoints: []
    },
    customization_options: [
      {
        id: 'season_theme',
        name: 'Season Theme',
        type: 'decoration',
        values: ['spring', 'summer', 'autumn', 'winter'],
        defaultValue: 'summer'
      }
    ],
    lighting_preset: {
      ambient: {
        color: '#87CEEB',
        intensity: 0.7
      },
      directional: {
        color: '#FFF8DC',
        intensity: 0.9,
        position: [15, 15, 10]
      }
    },
    audio_preset: {
      ambientSounds: ['birds.mp3', 'wind.mp3'],
      spatialAudio: true
    },
    supported_artwork_types: ['impressionist', 'landscape', 'plein_air'],
    visitor_capacity: 60,
    accessibility_features: ['wheelchair_accessible', 'outdoor_access'],
    thumbnail_url: '/assets/room-thumbnails/impressionist-garden.jpg'
  }
];

async function seedRoomTypes() {
  try {
    console.log('Seeding room types...');

    for (const roomType of roomTypes) {
      const result = await pool.query(`
        INSERT INTO room_types (
          name, description, category, base_template, customization_options,
          lighting_preset, audio_preset, supported_artwork_types,
          visitor_capacity, accessibility_features, thumbnail_url
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        ON CONFLICT (name) DO NOTHING
      `, [
        roomType.name,
        roomType.description,
        roomType.category,
        JSON.stringify(roomType.base_template),
        JSON.stringify(roomType.customization_options),
        JSON.stringify(roomType.lighting_preset),
        JSON.stringify(roomType.audio_preset),
        roomType.supported_artwork_types,
        roomType.visitor_capacity,
        roomType.accessibility_features,
        roomType.thumbnail_url
      ]);

      if (result.rowCount > 0) {
        console.log(`✓ Seeded room type: ${roomType.name}`);
      } else {
        console.log(`- Room type already exists: ${roomType.name}`);
      }
    }

    console.log('Room types seeding completed!');
  } catch (error) {
    console.error('Error seeding room types:', error);
  } finally {
    await pool.end();
  }
}

// Run the seeding
seedRoomTypes().catch(console.error);
import * as fs from 'fs';
import * as path from 'path';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/virtual_gallery'
});

const roomTypes = [
  {
    name: 'Renaissance Hall',
    description: 'A grand hall inspired by Renaissance architecture with high ceilings and classical proportions',
    category: 'classical',
    base_template: {
      geometry: {
        width: 20,
        height: 15,
        depth: 30,
        ceilingHeight: 8,
        wallThickness: 0.3
      },
      materials: [
        {
          name: 'marble_floor',
          type: 'floor',
          color: '#f5f5dc',
          texture: 'marble.jpg',
          roughness: 0.1,
          metalness: 0.0
        },
        {
          name: 'plaster_walls',
          type: 'wall',
          color: '#faf0e6',
          roughness: 0.8,
          metalness: 0.0
        },
        {
          name: 'vaulted_ceiling',
          type: 'ceiling',
          color: '#ffffff',
          roughness: 0.9,
          metalness: 0.0
        }
      ],
      decorations: [
        {
          type: 'pillar',
          position: [5, 0, 5],
          rotation: [0, 0, 0],
          scale: [1, 1, 1],
          material: 'marble'
        },
        {
          type: 'pillar',
          position: [-5, 0, 5],
          rotation: [0, 0, 0],
          scale: [1, 1, 1],
          material: 'marble'
        }
      ],
      interactionPoints: []
    },
    customization_options: [
      {
        id: 'wall_color',
        name: 'Wall Color',
        type: 'color',
        values: ['#faf0e6', '#f5deb3', '#deb887'],
        defaultValue: '#faf0e6'
      },
      {
        id: 'lighting_intensity',
        name: 'Lighting Intensity',
        type: 'lighting',
        values: [0.5, 0.7, 1.0],
        defaultValue: 0.7
      }
    ],
    lighting_preset: {
      ambient: {
        color: '#ffffff',
        intensity: 0.3
      },
      directional: {
        color: '#fff8dc',
        intensity: 0.8,
        position: [10, 10, 5]
      }
    },
    audio_preset: {
      backgroundMusic: 'renaissance_classical.mp3',
      ambientSounds: ['echo_hall.mp3'],
      spatialAudio: true
    },
    supported_artwork_types: ['renaissance', 'baroque', 'classical'],
    visitor_capacity: 75,
    accessibility_features: ['wheelchair_accessible', 'audio_descriptions'],
    thumbnail_url: '/assets/room-thumbnails/renaissance-hall.jpg'
  },
  {
    name: 'Modern White Cube',
    description: 'Minimalist contemporary gallery space with clean lines and neutral lighting',
    category: 'modern',
    base_template: {
      geometry: {
        width: 12,
        height: 12,
        depth: 18,
        ceilingHeight: 4,
        wallThickness: 0.2
      },
      materials: [
        {
          name: 'white_walls',
          type: 'wall',
          color: '#ffffff',
          roughness: 0.9,
          metalness: 0.0
        },
        {
          name: 'concrete_floor',
          type: 'floor',
          color: '#f8f8f8',
          roughness: 0.7,
          metalness: 0.0
        },
        {
          name: 'white_ceiling',
          type: 'ceiling',
          color: '#ffffff',
          roughness: 0.9,
          metalness: 0.0
        }
      ],
      decorations: [],
      interactionPoints: []
    },
    customization_options: [
      {
        id: 'accent_wall',
        name: 'Accent Wall Color',
        type: 'color',
        values: ['#ffffff', '#f8f8f8', '#e8e8e8'],
        defaultValue: '#ffffff'
      }
    ],
    lighting_preset: {
      ambient: {
        color: '#ffffff',
        intensity: 0.6
      },
      directional: {
        color: '#ffffff',
        intensity: 0.4,
        position: [0, 5, 0]
      },
      pointLights: [
        {
          color: '#ffffff',
          intensity: 0.8,
          position: [0, 3.5, 0],
          distance: 10
        }
      ]
    },
    supported_artwork_types: ['contemporary', 'minimalist', 'abstract'],
    visitor_capacity: 30,
    accessibility_features: ['wheelchair_accessible', 'low_glare_lighting'],
    thumbnail_url: '/assets/room-thumbnails/white-cube.jpg'
  },
  {
    name: 'Impressionist Garden',
    description: 'An outdoor-inspired gallery with garden elements and natural lighting',
    category: 'themed',
    base_template: {
      geometry: {
        width: 25,
        height: 20,
        depth: 35,
        ceilingHeight: 6,
        wallThickness: 0.1
      },
      materials: [
        {
          name: 'grass_floor',
          type: 'floor',
          color: '#90EE90',
          texture: 'grass.jpg',
          roughness: 0.8,
          metalness: 0.0
        },
        {
          name: 'garden_wall',
          type: 'wall',
          color: '#228B22',
          roughness: 0.6,
          metalness: 0.0
        }
      ],
      decorations: [
        {
          type: 'furniture',
          position: [8, 0, 8],
          rotation: [0, 0, 0],
          scale: [2, 1, 1],
          material: 'wood'
        }
      ],
      interactionPoints: []
    },
    customization_options: [
      {
        id: 'season_theme',
        name: 'Season Theme',
        type: 'decoration',
        values: ['spring', 'summer', 'autumn', 'winter'],
        defaultValue: 'summer'
      }
    ],
    lighting_preset: {
      ambient: {
        color: '#87CEEB',
        intensity: 0.7
      },
      directional: {
        color: '#FFF8DC',
        intensity: 0.9,
        position: [15, 15, 10]
      }
    },
    audio_preset: {
      ambientSounds: ['birds.mp3', 'wind.mp3'],
      spatialAudio: true
    },
    supported_artwork_types: ['impressionist', 'landscape', 'plein_air'],
    visitor_capacity: 60,
    accessibility_features: ['wheelchair_accessible', 'outdoor_access'],
    thumbnail_url: '/assets/room-thumbnails/impressionist-garden.jpg'
  }
];

async function seedRoomTypes() {
  try {
    console.log('Seeding room types...');

    for (const roomType of roomTypes) {
      const result = await pool.query(`
        INSERT INTO room_types (
          name, description, category, base_template, customization_options,
          lighting_preset, audio_preset, supported_artwork_types,
          visitor_capacity, accessibility_features, thumbnail_url
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        ON CONFLICT (name) DO NOTHING
      `, [
        roomType.name,
        roomType.description,
        roomType.category,
        JSON.stringify(roomType.base_template),
        JSON.stringify(roomType.customization_options),
        JSON.stringify(roomType.lighting_preset),
        JSON.stringify(roomType.audio_preset),
        roomType.supported_artwork_types,
        roomType.visitor_capacity,
        roomType.accessibility_features,
        roomType.thumbnail_url
      ]);

      if (result.rowCount > 0) {
        console.log(`✓ Seeded room type: ${roomType.name}`);
      } else {
        console.log(`- Room type already exists: ${roomType.name}`);
      }
    }

    console.log('Room types seeding completed!');
  } catch (error) {
    console.error('Error seeding room types:', error);
  } finally {
    await pool.end();
  }
}

// Run the seeding
seedRoomTypes().catch(console.error);import * as fs from 'fs';
import * as path from 'path';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const roomTypes = [
  {
    name: 'Renaissance Hall',
    description: 'A grand hall inspired by Renaissance architecture with high ceilings and classical proportions',
    category: 'classical',
    base_template: {
      geometry: {
        width: 20,
        height: 15,
        depth: 30,
        ceilingHeight: 8,
        wallThickness: 0.3
      },
      materials: [
        {
          name: 'marble_floor',
          type: 'floor',
          color: '#f5f5dc',
          texture: 'marble.jpg',
          roughness: 0.1,
          metalness: 0.0
        },
        {
          name: 'plaster_walls',
          type: 'wall',
          color: '#faf0e6',
          roughness: 0.8,
          metalness: 0.0
        },
        {
          name: 'vaulted_ceiling',
          type: 'ceiling',
          color: '#ffffff',
          roughness: 0.9,
          metalness: 0.0
        }
      ],
      decorations: [
        {
          type: 'pillar',
          position: [5, 0, 5],
          rotation: [0, 0, 0],
          scale: [1, 1, 1],
          material: 'marble'
        },
        {
          type: 'pillar',
          position: [-5, 0, 5],
          rotation: [0, 0, 0],
          scale: [1, 1, 1],
          material: 'marble'
        }
      ],
      interactionPoints: []
    },
    customization_options: [
      {
        id: 'wall_color',
        name: 'Wall Color',
        type: 'color',
        values: ['#faf0e6', '#f5deb3', '#deb887'],
        defaultValue: '#faf0e6'
      },
      {
        id: 'lighting_intensity',
        name: 'Lighting Intensity',
        type: 'lighting',
        values: [0.5, 0.7, 1.0],
        defaultValue: 0.7
      }
    ],
    lighting_preset: {
      ambient: {
        color: '#ffffff',
        intensity: 0.3
      },
      directional: {
        color: '#fff8dc',
        intensity: 0.8,
        position: [10, 10, 5]
      }
    },
    audio_preset: {
      backgroundMusic: 'renaissance_classical.mp3',
      ambientSounds: ['echo_hall.mp3'],
      spatialAudio: true
    },
    supported_artwork_types: ['renaissance', 'baroque', 'classical'],
    visitor_capacity: 75,
    accessibility_features: ['wheelchair_accessible', 'audio_descriptions'],
    thumbnail_url: '/assets/room-thumbnails/renaissance-hall.jpg'
  },
  {
    name: 'Modern White Cube',
    description: 'Minimalist contemporary gallery space with clean lines and neutral lighting',
    category: 'modern',
    base_template: {
      geometry: {
        width: 12,
        height: 12,
        depth: 18,
        ceilingHeight: 4,
        wallThickness: 0.2
      },
      materials: [
        {
          name: 'white_walls',
          type: 'wall',
          color: '#ffffff',
          roughness: 0.9,
          metalness: 0.0
        },
        {
          name: 'concrete_floor',
          type: 'floor',
          color: '#f8f8f8',
          roughness: 0.7,
          metalness: 0.0
        },
        {
          name: 'white_ceiling',
          type: 'ceiling',
          color: '#ffffff',
          roughness: 0.9,
          metalness: 0.0
        }
      ],
      decorations: [],
      interactionPoints: []
    },
    customization_options: [
      {
        id: 'accent_wall',
        name: 'Accent Wall Color',
        type: 'color',
        values: ['#ffffff', '#f8f8f8', '#e8e8e8'],
        defaultValue: '#ffffff'
      }
    ],
    lighting_preset: {
      ambient: {
        color: '#ffffff',
        intensity: 0.6
      },
      directional: {
        color: '#ffffff',
        intensity: 0.4,
        position: [0, 5, 0]
      },
      pointLights: [
        {
          color: '#ffffff',
          intensity: 0.8,
          position: [0, 3.5, 0],
          distance: 10
        }
      ]
    },
    supported_artwork_types: ['contemporary', 'minimalist', 'abstract'],
    visitor_capacity: 30,
    accessibility_features: ['wheelchair_accessible', 'low_glare_lighting'],
    thumbnail_url: '/assets/room-thumbnails/white-cube.jpg'
  },
  {
    name: 'Impressionist Garden',
    description: 'An outdoor-inspired gallery with garden elements and natural lighting',
    category: 'themed',
    base_template: {
      geometry: {
        width: 25,
        height: 20,
        depth: 35,
        ceilingHeight: 6,
        wallThickness: 0.1
      },
      materials: [
        {
          name: 'grass_floor',
          type: 'floor',
          color: '#90EE90',
          texture: 'grass.jpg',
          roughness: 0.8,
          metalness: 0.0
        },
        {
          name: 'garden_wall',
          type: 'wall',
          color: '#228B22',
          roughness: 0.6,
          metalness: 0.0
        }
      ],
      decorations: [
        {
          type: 'furniture',
          position: [8, 0, 8],
          rotation: [0, 0, 0],
          scale: [2, 1, 1],
          material: 'wood'
        }
      ],
      interactionPoints: []
    },
    customization_options: [
      {
        id: 'season_theme',
        name: 'Season Theme',
        type: 'decoration',
        values: ['spring', 'summer', 'autumn', 'winter'],
        defaultValue: 'summer'
      }
    ],
    lighting_preset: {
      ambient: {
        color: '#87CEEB',
        intensity: 0.7
      },
      directional: {
        color: '#FFF8DC',
        intensity: 0.9,
        position: [15, 15, 10]
      }
    },
    audio_preset: {
      ambientSounds: ['birds.mp3', 'wind.mp3'],
      spatialAudio: true
    },
    supported_artwork_types: ['impressionist', 'landscape', 'plein_air'],
    visitor_capacity: 60,
    accessibility_features: ['wheelchair_accessible', 'outdoor_access'],
    thumbnail_url: '/assets/room-thumbnails/impressionist-garden.jpg'
  }
];

async function seedRoomTypes() {
  try {
    console.log('Seeding room types...');

    for (const roomType of roomTypes) {
      const result = await pool.query(`
        INSERT INTO room_types (
          name, description, category, base_template, customization_options,
          lighting_preset, audio_preset, supported_artwork_types,
          visitor_capacity, accessibility_features, thumbnail_url
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        ON CONFLICT (name) DO NOTHING
      `, [
        roomType.name,
        roomType.description,
        roomType.category,
        JSON.stringify(roomType.base_template),
        JSON.stringify(roomType.customization_options),
        JSON.stringify(roomType.lighting_preset),
        JSON.stringify(roomType.audio_preset),
        roomType.supported_artwork_types,
        roomType.visitor_capacity,
        roomType.accessibility_features,
        roomType.thumbnail_url
      ]);

      if (result.rowCount > 0) {
        console.log(`✓ Seeded room type: ${roomType.name}`);
      } else {
        console.log(`- Room type already exists: ${roomType.name}`);
      }
    }

    console.log('Room types seeding completed!');
  } catch (error) {
    console.error('Error seeding room types:', error);
  } finally {
    await pool.end();
  }
}

// Run the seeding
seedRoomTypes().catch(console.error);

