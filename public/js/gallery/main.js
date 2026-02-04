import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const GALLERY_CONFIG = {
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
      floor: { color: 0x2a2a2a },
      walls: { color: 0x3a3a3a },
      ceiling: { color: 0x1a1a1a },
      artworkSlots: [],
      doors: [
        { to: "impressionism", position: { x: 0, y: 0, z: -14.5 }, rotation: 0 },
        { to: "modern_art", position: { x: 14.5, y: 0, z: 0 }, rotation: Math.PI / 2 },
        { to: "renaissance", position: { x: -14.5, y: 0, z: 0 }, rotation: -Math.PI / 2 },
        { to: "contemporary", position: { x: 0, y: 0, z: 14.5 }, rotation: Math.PI }
      ],
      lighting: { ambient: 0.5, spotlights: [{ position: { x: 0, y: 7, z: 0 }, intensity: 0.8, target: { x: 0, y: 0, z: 0 } }] }
    },
    {
      id: "impressionism",
      type: "gallery",
      name: "Импрессионизм",
      theme: "impressionism",
      position: { x: 0, y: 0, z: -45 },
      dimensions: { width: 20, height: 6, depth: 25 },
      floor: { color: 0x4a3f35 },
      walls: { color: 0xd4c5b9 },
      ceiling: { color: 0xffffff },
      artworkSlots: [
        { id: "slot_1", wall: "left", position: { x: -9.9, y: 3, z: -5 }, size: { w: 2, h: 1.5 } },
        { id: "slot_2", wall: "left", position: { x: -9.9, y: 3, z: 0 }, size: { w: 2.5, h: 2 } },
        { id: "slot_3", wall: "left", position: { x: -9.9, y: 3, z: 5 }, size: { w: 2, h: 1.5 } },
        { id: "slot_4", wall: "right", position: { x: 9.9, y: 3, z: -5 }, size: { w: 2, h: 1.5 } },
        { id: "slot_5", wall: "right", position: { x: 9.9, y: 3, z: 0 }, size: { w: 3, h: 2.5 } },
        { id: "slot_6", wall: "right", position: { x: 9.9, y: 3, z: 5 }, size: { w: 2, h: 1.5 } }
      ],
      doors: [{ to: "main_hall", position: { x: 0, y: 0, z: 12.4 }, rotation: Math.PI, isEntrance: true }],
      lighting: { ambient: 0.4, spotlights: [] }
    },
    {
      id: "modern_art",
      type: "gallery",
      name: "Современное искусство",
      theme: "modern",
      position: { x: 45, y: 0, z: 0 },
      dimensions: { width: 25, height: 7, depth: 20 },
      floor: { color: 0x222222 },
      walls: { color: 0xffffff },
      ceiling: { color: 0x111111 },
      artworkSlots: [
        { id: "slot_1", wall: "left", position: { x: -12.4, y: 3.5, z: -4 }, size: { w: 3, h: 3 } },
        { id: "slot_2", wall: "left", position: { x: -12.4, y: 3.5, z: 4 }, size: { w: 2.5, h: 2.5 } },
        { id: "slot_3", wall: "right", position: { x: 12.4, y: 3.5, z: -4 }, size: { w: 2.5, h: 2.5 } },
        { id: "slot_4", wall: "right", position: { x: 12.4, y: 3.5, z: 4 }, size: { w: 3, h: 3 } },
        { id: "slot_5", wall: "back", position: { x: 0, y: 3.5, z: -9.9 }, size: { w: 4, h: 3 } }
      ],
      doors: [{ to: "main_hall", position: { x: -12.4, y: 0, z: 0 }, rotation: -Math.PI / 2, isEntrance: true }],
      lighting: { ambient: 0.6, spotlights: [] }
    },
    {
      id: "renaissance",
      type: "gallery",
      name: "Ренессанс",
      theme: "classical",
      position: { x: -45, y: 0, z: 0 },
      dimensions: { width: 25, height: 8, depth: 20 },
      floor: { color: 0x5a4a3a },
      walls: { color: 0x8b0000 },
      ceiling: { color: 0xf5f5dc },
      artworkSlots: [
        { id: "slot_1", wall: "left", position: { x: -12.4, y: 4, z: -4 }, size: { w: 2.5, h: 3 } },
        { id: "slot_2", wall: "left", position: { x: -12.4, y: 4, z: 4 }, size: { w: 2.5, h: 3 } },
        { id: "slot_3", wall: "right", position: { x: 12.4, y: 4, z: -4 }, size: { w: 2.5, h: 3 } },
        { id: "slot_4", wall: "right", position: { x: 12.4, y: 4, z: 4 }, size: { w: 2.5, h: 3 } },
        { id: "slot_5", wall: "back", position: { x: -5, y: 4, z: -9.9 }, size: { w: 2, h: 2.5 } },
        { id: "slot_6", wall: "back", position: { x: 0, y: 4, z: -9.9 }, size: { w: 3, h: 4 } }
      ],
      doors: [{ to: "main_hall", position: { x: 12.4, y: 0, z: 0 }, rotation: Math.PI / 2, isEntrance: true }],
      lighting: { ambient: 0.35, spotlights: [] }
    },
    {
      id: "contemporary",
      type: "gallery",
      name: "Современное искусство XXI века",
      theme: "contemporary",
      position: { x: 0, y: 0, z: 45 },
      dimensions: { width: 20, height: 6, depth: 25 },
      floor: { color: 0x1a1a1a },
      walls: { color: 0xe0e0e0 },
      ceiling: { color: 0x1a1a1a },
      artworkSlots: [
        { id: "slot_1", wall: "left", position: { x: -9.9, y: 3, z: -6 }, size: { w: 2, h: 2 } },
        { id: "slot_2", wall: "left", position: { x: -9.9, y: 3, z: 0 }, size: { w: 3, h: 2 } },
        { id: "slot_3", wall: "left", position: { x: -9.9, y: 3, z: 6 }, size: { w: 2, h: 2 } },
        { id: "slot_4", wall: "right", position: { x: 9.9, y: 3, z: -6 }, size: { w: 2, h: 2 } },
        { id: "slot_5", wall: "right", position: { x: 9.9, y: 3, z: 0 }, size: { w: 3, h: 2 } }
      ],
      doors: [{ to: "main_hall", position: { x: 0, y: 0, z: -12.4 }, rotation: 0, isEntrance: true }],
      lighting: { ambient: 0.5, spotlights: [] }
    }
  ],
  
  corridors: [
    { id: "corridor_to_impressionism", from: "main_hall", to: "impressionism", dimensions: { width: 4, height: 4, length: 15 }, floor: { color: 0x2a2a2a }, walls: { color: 0x3a3a3a }, lighting: { ambient: 0.3 } },
    { id: "corridor_to_modern", from: "main_hall", to: "modern_art", dimensions: { width: 4, height: 4, length: 15 }, floor: { color: 0x2a2a2a }, walls: { color: 0x3a3a3a }, lighting: { ambient: 0.3 } },
    { id: "corridor_to_renaissance", from: "main_hall", to: "renaissance", dimensions: { width: 4, height: 4, length: 15 }, floor: { color: 0x2a2a2a }, walls: { color: 0x3a3a3a }, lighting: { ambient: 0.3 } },
    { id: "corridor_to_contemporary", from: "main_hall", to: "contemporary", dimensions: { width: 4, height: 4, length: 15 }, floor: { color: 0x2a2a2a }, walls: { color: 0x3a3a3a }, lighting: { ambient: 0.3 } }
  ]
};

class TextureManager {
  constructor(maxCacheSize = 50) {
    this.textureLoader = new THREE.TextureLoader();
    this.cache = new Map();
    this.loadingQueue = new Map();
    this.maxCacheSize = maxCacheSize;
    this.accessOrder = [];
  }

  async loadTexture(url, priority = 'normal') {
    if (this.cache.has(url)) {
      this.updateAccessOrder(url);
      return this.cache.get(url);
    }
    if (this.loadingQueue.has(url)) {
      return this.loadingQueue.get(url);
    }
    const loadPromise = new Promise((resolve, reject) => {
      this.textureLoader.load(
        url,
        (texture) => {
          texture.encoding = THREE.sRGBEncoding;
          this.addToCache(url, texture);
          this.loadingQueue.delete(url);
          resolve(texture);
        },
        undefined,
        (error) => {
          this.loadingQueue.delete(url);
          resolve(this.createPlaceholderTexture());
        }
      );
    });
    this.loadingQueue.set(url, loadPromise);
    return loadPromise;
  }

  addToCache(url, texture) {
    if (this.cache.size >= this.maxCacheSize) {
      this.evictLRU();
    }
    this.cache.set(url, texture);
    this.accessOrder.push(url);
  }

  updateAccessOrder(url) {
    const index = this.accessOrder.indexOf(url);
    if (index > -1) this.accessOrder.splice(index, 1);
    this.accessOrder.push(url);
  }

  evictLRU() {
    if (this.accessOrder.length === 0) return;
    const lruUrl = this.accessOrder.shift();
    const texture = this.cache.get(lruUrl);
    if (texture) {
      texture.dispose();
      this.cache.delete(lruUrl);
    }
  }

  createPlaceholderTexture(color = 0x666666) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const r = (color >> 16) & 255;
    const g = (color >> 8) & 255;
    const b = color & 255;
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  }

  disposeAll() {
    this.cache.forEach(texture => texture.dispose());
    this.cache.clear();
    this.accessOrder = [];
    this.loadingQueue.clear();
  }
}

class ArtworkLODManager {
  constructor(textureManager, camera) {
    this.textureManager = textureManager;
    this.camera = camera;
    this.artworkMeshes = new Map();
    this.lodDistances = { high: 10, medium: 25, low: 50 };
  }

  registerArtwork(mesh, artworkData) {
    this.artworkMeshes.set(mesh.uuid, {
      mesh,
      data: artworkData,
      currentLOD: 'placeholder',
      urls: {
        placeholder: null,
        low: artworkData.thumbnail_url,
        medium: artworkData.medium_url || artworkData.thumbnail_url,
        high: artworkData.image_url
      }
    });
    this.applyPlaceholder(mesh);
  }

  applyPlaceholder(mesh) {
    const placeholder = this.textureManager.createPlaceholderTexture(0x888888);
    if (mesh.material && mesh.material.map !== undefined) {
      mesh.material.map = placeholder;
      mesh.material.needsUpdate = true;
    }
  }

  async updateLOD(mesh) {
    const info = this.artworkMeshes.get(mesh.uuid);
    if (!info) return;
    const distance = this.camera.position.distanceTo(mesh.position);
    let targetLOD;
    if (distance < this.lodDistances.high) targetLOD = 'high';
    else if (distance < this.lodDistances.medium) targetLOD = 'medium';
    else if (distance < this.lodDistances.low) targetLOD = 'low';
    else targetLOD = 'placeholder';

    if (targetLOD === info.currentLOD) return;
    if (targetLOD === 'placeholder') {
      this.applyPlaceholder(mesh);
      info.currentLOD = 'placeholder';
      return;
    }
    const url = info.urls[targetLOD];
    if (!url) return;
    try {
      const texture = await this.textureManager.loadTexture(url);
      if (mesh.material) {
        mesh.material.map = texture;
        mesh.material.needsUpdate = true;
        info.currentLOD = targetLOD;
      }
    } catch (error) {}
  }

  update() {
    this.artworkMeshes.forEach((info) => this.updateLOD(info.mesh));
  }

  unregisterArtwork(mesh) { this.artworkMeshes.delete(mesh.uuid); }
  dispose() { this.artworkMeshes.clear(); }
}

class GalleryBuilder {
  constructor(scene, textureManager) {
    this.scene = scene;
    this.textureManager = textureManager || new TextureManager();
    this.rooms = new Map();
    this.corridors = new Map();
    this.doors = new Map();
    this.artworkSlots = new Map();
    this.loadedRooms = new Set();
    this.config = GALLERY_CONFIG;
  }

  async buildEntireGallery() {
    this.buildRoom(this.config.rooms[0]);
    for (const corridor of this.config.corridors) {
      this.buildCorridor(corridor);
    }
    for (let i = 1; i < this.config.rooms.length; i++) {
      this.buildRoom(this.config.rooms[i]);
    }
    return this.getLoadedRooms();
  }

  buildRoom(roomConfig) {
    if (this.loadedRooms.has(roomConfig.id)) return this.rooms.get(roomConfig.id);

    const roomGroup = new THREE.Group();
    roomGroup.name = roomConfig.id;
    roomGroup.userData = { type: 'room', id: roomConfig.id, name: roomConfig.name, theme: roomConfig.theme };

    const { width, height, depth } = roomConfig.dimensions;
    const pos = roomConfig.position;

    this.createFloor(roomGroup, roomConfig);
    this.createWalls(roomGroup, roomConfig);
    this.createCeiling(roomGroup, roomConfig);
    this.addRoomLighting(roomGroup, roomConfig);
    this.createArtworkSlots(roomGroup, roomConfig);
    this.createDoors(roomGroup, roomConfig);

    roomGroup.position.set(pos.x, pos.y, pos.z);
    this.scene.add(roomGroup);
    this.rooms.set(roomConfig.id, roomGroup);
    this.loadedRooms.add(roomConfig.id);
    return roomGroup;
  }

  createFloor(group, config) {
    const { width, depth } = config.dimensions;
    const geometry = new THREE.PlaneGeometry(width, depth);
    const material = new THREE.MeshStandardMaterial({ color: config.floor.color, metalness: 0.1, roughness: 0.8, side: THREE.DoubleSide });
    const floor = new THREE.Mesh(geometry, material);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    group.add(floor);
  }

  createWalls(group, config) {
    const { width, height, depth } = config.dimensions;
    const wallMaterial = new THREE.MeshStandardMaterial({ color: config.walls.color, metalness: 0.05, roughness: 0.9, side: THREE.DoubleSide });

    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(width, height), wallMaterial.clone());
    backWall.position.set(0, height / 2, -depth / 2);
    group.add(backWall);

    const frontWall = new THREE.Mesh(new THREE.PlaneGeometry(width, height), wallMaterial.clone());
    frontWall.position.set(0, height / 2, depth / 2);
    frontWall.rotation.y = Math.PI;
    group.add(frontWall);

    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(depth, height), wallMaterial.clone());
    leftWall.position.set(-width / 2, height / 2, 0);
    leftWall.rotation.y = Math.PI / 2;
    group.add(leftWall);

    const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(depth, height), wallMaterial.clone());
    rightWall.position.set(width / 2, height / 2, 0);
    rightWall.rotation.y = -Math.PI / 2;
    group.add(rightWall);
  }

  createCeiling(group, config) {
    const { width, height, depth } = config.dimensions;
    const geometry = new THREE.PlaneGeometry(width, depth);
    const material = new THREE.MeshStandardMaterial({ color: config.ceiling.color, metalness: 0, roughness: 1, side: THREE.DoubleSide });
    const ceiling = new THREE.Mesh(geometry, material);
    ceiling.position.y = height;
    ceiling.rotation.x = Math.PI / 2;
    group.add(ceiling);
  }

  addRoomLighting(group, config) {
    const ambient = new THREE.AmbientLight(0xffffff, config.lighting.ambient);
    group.add(ambient);

    if (config.lighting.spotlights) {
      config.lighting.spotlights.forEach(spotConfig => {
        const spotlight = new THREE.SpotLight(0xffffff, spotConfig.intensity);
        spotlight.position.set(spotConfig.position.x, spotConfig.position.y, spotConfig.position.z);
        spotlight.castShadow = true;
        spotlight.angle = Math.PI / 6;
        spotlight.penumbra = 0.3;
        group.add(spotlight);
      });
    }
  }

  createArtworkSlots(group, config) {
    if (!config.artworkSlots) return;
    config.artworkSlots.forEach(slot => {
      const slotMesh = this.createArtworkSlot(slot, config.id);
      group.add(slotMesh);
      this.artworkSlots.set(`${config.id}_${slot.id}`, slotMesh);
    });
  }

  createArtworkSlot(slotConfig, roomId) {
    const { w, h } = slotConfig.size;
    const frameDepth = 0.08;
    const frameWidth = 0.06;

    const slotGroup = new THREE.Group();
    slotGroup.name = `slot_${slotConfig.id}`;
    slotGroup.userData = { type: 'artwork_slot', slotId: slotConfig.id, roomId: roomId, wall: slotConfig.wall, isEmpty: true, artworkId: null };

    const frameGeometry = new THREE.BoxGeometry(w + frameWidth * 2, h + frameWidth * 2, frameDepth);
    const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x3d2817, metalness: 0.3, roughness: 0.7 });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.castShadow = true;
    slotGroup.add(frame);

    const canvasGeometry = new THREE.PlaneGeometry(w, h);
    const canvasMaterial = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0, roughness: 0.9 });
    const canvas = new THREE.Mesh(canvasGeometry, canvasMaterial);
    canvas.position.z = frameDepth / 2 + 0.001;
    canvas.userData = { type: 'artwork_canvas' };
    slotGroup.add(canvas);

    slotGroup.position.set(slotConfig.position.x, slotConfig.position.y, slotConfig.position.z);

    if (slotConfig.wall === 'left') slotGroup.rotation.y = Math.PI / 2;
    else if (slotConfig.wall === 'right') slotGroup.rotation.y = -Math.PI / 2;
    else if (slotConfig.wall === 'front') slotGroup.rotation.y = Math.PI;

    return slotGroup;
  }

  createDoors(group, config) {
    if (!config.doors) return;
    config.doors.forEach(doorConfig => {
      const door = this.createDoor(doorConfig, config);
      group.add(door);
      this.doors.set(`${config.id}_to_${doorConfig.to}`, door);
    });
  }

  createDoor(doorConfig, roomConfig) {
    const doorGroup = new THREE.Group();
    doorGroup.name = `door_${roomConfig.id}_to_${doorConfig.to}`;
    
    const doorWidth = 3;
    const doorHeight = 3.5;
    
    const frameGeometry = new THREE.BoxGeometry(doorWidth + 0.4, doorHeight + 0.2, 0.3);
    const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.4, roughness: 0.6 });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.y = doorHeight / 2;
    doorGroup.add(frame);

    const openingGeometry = new THREE.BoxGeometry(doorWidth, doorHeight, 0.5);
    const openingMaterial = new THREE.MeshBasicMaterial({ color: 0x050505, transparent: true, opacity: 0.9 });
    const opening = new THREE.Mesh(openingGeometry, openingMaterial);
    opening.position.y = doorHeight / 2;
    doorGroup.add(opening);

    const triggerGeometry = new THREE.BoxGeometry(doorWidth + 2, doorHeight, 2);
    const triggerMaterial = new THREE.MeshBasicMaterial({ visible: false });
    const trigger = new THREE.Mesh(triggerGeometry, triggerMaterial);
    trigger.position.y = doorHeight / 2;
    trigger.userData = { type: 'door_trigger', from: roomConfig.id, to: doorConfig.to, isEntrance: doorConfig.isEntrance };
    doorGroup.add(trigger);

    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 256;
    labelCanvas.height = 64;
    const ctx = labelCanvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const targetRoom = this.config.rooms.find(r => r.id === doorConfig.to);
    ctx.fillText(targetRoom ? targetRoom.name : doorConfig.to, 128, 32);

    const labelTexture = new THREE.CanvasTexture(labelCanvas);
    const labelGeometry = new THREE.PlaneGeometry(2, 0.5);
    const labelMaterial = new THREE.MeshBasicMaterial({ map: labelTexture, transparent: true });
    const label = new THREE.Mesh(labelGeometry, labelMaterial);
    label.position.y = doorHeight + 0.3;
    label.position.z = 0.2;
    doorGroup.add(label);

    doorGroup.position.set(doorConfig.position.x, doorConfig.position.y, doorConfig.position.z);
    doorGroup.rotation.y = doorConfig.rotation;
    doorGroup.userData = { type: 'door', from: roomConfig.id, to: doorConfig.to, isEntrance: doorConfig.isEntrance };

    return doorGroup;
  }

  buildCorridor(corridorConfig) {
    const corridorGroup = new THREE.Group();
    corridorGroup.name = corridorConfig.id;
    
    const { width, height, length } = corridorConfig.dimensions;

    const floorGeometry = new THREE.PlaneGeometry(width, length);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: corridorConfig.floor.color, metalness: 0.1, roughness: 0.8 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    corridorGroup.add(floor);

    const wallMaterial = new THREE.MeshStandardMaterial({ color: corridorConfig.walls.color, metalness: 0.05, roughness: 0.9 });

    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(length, height), wallMaterial.clone());
    leftWall.position.set(-width / 2, height / 2, 0);
    leftWall.rotation.y = Math.PI / 2;
    corridorGroup.add(leftWall);

    const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(length, height), wallMaterial.clone());
    rightWall.position.set(width / 2, height / 2, 0);
    rightWall.rotation.y = -Math.PI / 2;
    corridorGroup.add(rightWall);

    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(width, length), new THREE.MeshStandardMaterial({ color: 0x1a1a1a }));
    ceiling.position.y = height;
    ceiling.rotation.x = Math.PI / 2;
    corridorGroup.add(ceiling);

    const ambientLight = new THREE.PointLight(0xffffff, corridorConfig.lighting.ambient, length);
    ambientLight.position.set(0, height - 0.5, 0);
    corridorGroup.add(ambientLight);

    const fromRoom = this.config.rooms.find(r => r.id === corridorConfig.from);
    const toRoom = this.config.rooms.find(r => r.id === corridorConfig.to);
    
    if (fromRoom && toRoom) {
      const midX = (fromRoom.position.x + toRoom.position.x) / 2;
      const midZ = (fromRoom.position.z + toRoom.position.z) / 2;
      corridorGroup.position.set(midX, 0, midZ);
      const angle = Math.atan2(toRoom.position.z - fromRoom.position.z, toRoom.position.x - fromRoom.position.x);
      corridorGroup.rotation.y = -angle + Math.PI / 2;
    }

    this.scene.add(corridorGroup);
    this.corridors.set(corridorConfig.id, corridorGroup);
    return corridorGroup;
  }

  getRoom(roomId) { return this.rooms.get(roomId); }
  getRoomConfig(roomId) { return this.config.rooms.find(r => r.id === roomId); }
  getArtworkSlot(roomId, slotId) { return this.artworkSlots.get(`${roomId}_${slotId}`); }
  
  getArtworkSlotsForRoom(roomId) {
    const slots = [];
    this.artworkSlots.forEach((slot, key) => {
      if (key.startsWith(roomId)) slots.push(slot);
    });
    return slots;
  }

  getAllDoors() { return Array.from(this.doors.values()); }
  getLoadedRooms() { return Array.from(this.loadedRooms); }
}

class RoomNavigator {
  constructor(camera, galleryBuilder, onRoomChange) {
    this.camera = camera;
    this.galleryBuilder = galleryBuilder;
    this.onRoomChange = onRoomChange;
    this.currentRoom = 'main_hall';
    this.raycaster = new THREE.Raycaster();
    this.doors = [];
    this.isTransitioning = false;
    this.transitionDuration = 1000;
  }

  initialize() {
    this.doors = this.galleryBuilder.getAllDoors();
    this.setupClickListener();
  }

  setupClickListener() {
    const canvas = document.getElementById('gallery-canvas');
    if (canvas) {
      canvas.addEventListener('click', this.handleClick.bind(this));
    }
  }

  handleClick(event) {
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.checkDoorIntersection(mouse);
  }

  checkDoorIntersection(mouse) {
    if (this.isTransitioning) return;
    this.raycaster.setFromCamera(mouse, this.camera);
    
    const triggers = [];
    this.doors.forEach(door => {
      door.traverse(obj => {
        if (obj.userData && obj.userData.type === 'door_trigger') triggers.push(obj);
      });
    });

    const intersects = this.raycaster.intersectObjects(triggers);
    if (intersects.length > 0) {
      this.navigateToRoom(intersects[0].object.userData.to);
    }
  }

  async navigateToRoom(roomId) {
    if (this.isTransitioning || roomId === this.currentRoom) return;
    this.isTransitioning = true;

    const roomConfig = this.galleryBuilder.getRoomConfig(roomId);
    if (!roomConfig) {
      this.isTransitioning = false;
      return;
    }

    const targetPosition = new THREE.Vector3(roomConfig.position.x, 1.6, roomConfig.position.z + 5);
    await this.animateCameraTo(targetPosition, roomConfig.position);

    this.currentRoom = roomId;
    if (this.onRoomChange) this.onRoomChange(roomId, roomConfig);
    
    window.dispatchEvent(new CustomEvent('roomChanged', { detail: { roomId } }));
    this.isTransitioning = false;
  }

  animateCameraTo(targetPosition, lookAtPosition) {
    return new Promise((resolve) => {
      const startPosition = this.camera.position.clone();
      const startTime = Date.now();
      const lookAt = new THREE.Vector3(lookAtPosition.x, lookAtPosition.y + 2, lookAtPosition.z);

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / this.transitionDuration, 1);
        const eased = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        this.camera.position.lerpVectors(startPosition, targetPosition, eased);
        this.camera.lookAt(lookAt);

        if (progress < 1) requestAnimationFrame(animate);
        else resolve();
      };
      animate();
    });
  }

  getCurrentRoom() { return this.currentRoom; }
}

class VirtualGallery {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.clock = new THREE.Clock();
    
    this.textureManager = null;
    this.galleryBuilder = null;
    this.roomNavigator = null;
    this.artworkLODManager = null;
    
    this.artworks = new Map();
    this.currentRoom = 'main_hall';
    this.isInitialized = false;
    
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.hoveredObject = null;
    
    this.init();
  }

  async init() {
    this.setupScene();
    this.setupCamera();
    this.setupRenderer();
    this.setupControls();
    this.addGlobalLighting();

    this.textureManager = new TextureManager(100);
    this.galleryBuilder = new GalleryBuilder(this.scene, this.textureManager);
    await this.galleryBuilder.buildEntireGallery();

    this.roomNavigator = new RoomNavigator(this.camera, this.galleryBuilder, this.onRoomChange.bind(this));
    this.roomNavigator.initialize();
    
    this.artworkLODManager = new ArtworkLODManager(this.textureManager, this.camera);

    await this.loadArtworksForRoom('main_hall');
    this.setupEventListeners();
    this.createRoomInfoUI();
    
    this.isInitialized = true;
    this.hideLoadingScreen();
    this.animate();
  }

  setupScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(GALLERY_CONFIG.building.ambientColor);
    this.scene.fog = new THREE.Fog(GALLERY_CONFIG.building.fogColor, GALLERY_CONFIG.building.fogNear, GALLERY_CONFIG.building.fogFar);
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 200);
    this.camera.position.set(0, 1.6, 10);
  }

  setupRenderer() {
    const canvas = document.getElementById('gallery-canvas');
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
  }

  setupControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI * 0.85;
    this.controls.minPolarAngle = Math.PI * 0.15;
    this.controls.maxDistance = 30;
    this.controls.minDistance = 2;
    this.controls.target.set(0, 1.5, 0);
  }

  addGlobalLighting() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    this.scene.add(ambientLight);
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.4);
    hemisphereLight.position.set(0, 20, 0);
    this.scene.add(hemisphereLight);
  }

  setupEventListeners() {
    window.addEventListener('resize', this.onWindowResize.bind(this));
    const canvas = this.renderer.domElement;
    canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    canvas.addEventListener('click', this.onClick.bind(this));
    document.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onMouseMove(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const slots = this.galleryBuilder.getArtworkSlotsForRoom(this.currentRoom);
    const intersects = this.raycaster.intersectObjects(slots, true);

    if (this.hoveredObject) {
      this.hoveredObject.scale.set(1, 1, 1);
      document.body.style.cursor = 'default';
    }

    if (intersects.length > 0) {
      let parent = intersects[0].object;
      while (parent.parent && !parent.userData.type?.includes('slot')) parent = parent.parent;
      
      if (parent.userData.type === 'artwork_slot' && !parent.userData.isEmpty) {
        this.hoveredObject = parent;
        parent.scale.set(1.02, 1.02, 1.02);
        document.body.style.cursor = 'pointer';
      }
    }
  }

  onClick(event) {
    if (this.hoveredObject && !this.hoveredObject.userData.isEmpty) {
      this.showArtworkDetails(this.hoveredObject.userData.artworkId);
    }
  }

  onKeyDown(event) {
    const rooms = ['main_hall', 'impressionism', 'modern_art', 'renaissance', 'contemporary'];
    const keyNum = parseInt(event.key);
    if (keyNum >= 1 && keyNum <= rooms.length) {
      this.roomNavigator.navigateToRoom(rooms[keyNum - 1]);
    }
  }

  async onRoomChange(roomId, roomConfig) {
    this.currentRoom = roomId;
    this.controls.target.set(roomConfig.position.x, roomConfig.position.y + 1.5, roomConfig.position.z);
    await this.loadArtworksForRoom(roomId);
    this.updateRoomInfoUI(roomConfig);
  }

  async loadArtworksForRoom(roomId) {
    try {
      const response = await fetch(`/api/rooms/${roomId}/artworks`);
      if (!response.ok) throw new Error('Failed to fetch');
      const artworks = await response.json();
      this.placeArtworksInRoom(roomId, artworks);
    } catch (error) {
      console.log('Using demo artworks for room:', roomId);
    }
  }

  placeArtworksInRoom(roomId, artworks) {
    artworks.forEach(artwork => {
      const slotMesh = this.galleryBuilder.getArtworkSlot(roomId, artwork.slot_id);
      if (slotMesh) {
        slotMesh.userData.isEmpty = false;
        slotMesh.userData.artworkId = artwork.id;
        slotMesh.userData.artworkData = artwork;

        const canvas = slotMesh.children.find(c => c.userData?.type === 'artwork_canvas');
        if (canvas) this.applyDemoTexture(canvas, artwork);
      }
    });
  }

  applyDemoTexture(mesh, artwork) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    const colors = ['#2a4858', '#4a6858', '#6a4858', '#4a5868', '#5a4868'];
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.fillRect(0, 0, 512, 512);

    for (let i = 0; i < 50; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 512, Math.random() * 512, Math.random() * 30 + 10, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},0.3)`;
      ctx.fill();
    }

    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 400, 512, 112);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(artwork.title || 'Без названия', 256, 440);
    ctx.font = '18px Arial';
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.fillText(artwork.artist || 'Неизвестный художник', 256, 470);
    if (artwork.year) {
      ctx.font = '14px Arial';
      ctx.fillText(artwork.year.toString(), 256, 495);
    }

    const texture = new THREE.CanvasTexture(canvas);
    mesh.material.map = texture;
    mesh.material.needsUpdate = true;
  }

  showArtworkDetails(artworkId) {
    let artworkData = null;
    this.galleryBuilder.artworkSlots.forEach(slot => {
      if (slot.userData.artworkId === artworkId) artworkData = slot.userData.artworkData;
    });
    if (!artworkData) return;

    let modal = document.getElementById('artwork-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'artwork-modal';
      modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);display:flex;justify-content:center;align-items:center;z-index:2000;opacity:0;transition:opacity 0.3s ease;';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div style="background:#1a1a2e;border-radius:16px;max-width:800px;width:90%;max-height:90vh;overflow-y:auto;color:white;font-family:'Inter',sans-serif;">
        <div style="padding:30px;">
          <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:20px;">
            <div>
              <h2 style="font-size:28px;margin:0 0 8px 0;font-family:'Playfair Display',serif;">${artworkData.title || 'Без названия'}</h2>
              <p style="font-size:18px;color:rgba(255,255,255,0.7);margin:0;">${artworkData.artist || 'Неизвестный художник'}</p>
            </div>
            <button id="close-modal" style="background:none;border:none;color:white;font-size:28px;cursor:pointer;padding:5px;">&times;</button>
          </div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:15px;margin-bottom:20px;">
            <div style="background:#2a2a4e;padding:15px;border-radius:8px;">
              <p style="font-size:12px;color:rgba(255,255,255,0.5);margin:0 0 5px 0;">Год</p>
              <p style="font-size:18px;margin:0;">${artworkData.year || 'Неизвестно'}</p>
            </div>
            <div style="background:#2a2a4e;padding:15px;border-radius:8px;">
              <p style="font-size:12px;color:rgba(255,255,255,0.5);margin:0 0 5px 0;">Стиль</p>
              <p style="font-size:18px;margin:0;">${artworkData.style || 'Не определен'}</p>
            </div>
            <div style="background:#2a2a4e;padding:15px;border-radius:8px;">
              <p style="font-size:12px;color:rgba(255,255,255,0.5);margin:0 0 5px 0;">Техника</p>
              <p style="font-size:18px;margin:0;">${artworkData.medium || 'Не указана'}</p>
            </div>
          </div>
          <div style="background:#2a2a4e;padding:20px;border-radius:8px;">
            <h3 style="font-size:16px;margin:0 0 10px 0;">Описание</h3>
            <p style="color:rgba(255,255,255,0.8);line-height:1.6;margin:0;">${artworkData.description || 'Описание отсутствует.'}</p>
          </div>
        </div>
      </div>`;

    modal.style.display = 'flex';
    requestAnimationFrame(() => modal.style.opacity = '1');

    const closeModal = () => {
      modal.style.opacity = '0';
      setTimeout(() => modal.style.display = 'none', 300);
    };
    modal.querySelector('#close-modal').addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  }

  createRoomInfoUI() {
    const infoPanel = document.createElement('div');
    infoPanel.id = 'room-info-panel';
    infoPanel.style.cssText = 'position:fixed;top:20px;left:20px;background:rgba(0,0,0,0.7);color:white;padding:15px 20px;border-radius:10px;font-family:"Inter",sans-serif;backdrop-filter:blur(10px);z-index:100;';
    infoPanel.innerHTML = `<h3 id="room-name" style="margin:0 0 5px 0;font-size:18px;font-family:'Playfair Display',serif;">Главный холл</h3><p id="room-description" style="margin:0;font-size:12px;color:rgba(255,255,255,0.7);">Добро пожаловать в виртуальную галерею</p>`;
    document.body.appendChild(infoPanel);
  }

  updateRoomInfoUI(roomConfig) {
    const nameEl = document.getElementById('room-name');
    const descEl = document.getElementById('room-description');
    if (nameEl) nameEl.textContent = roomConfig.name;
    const descriptions = {
      main_hall: 'Добро пожаловать в виртуальную галерею',
      impressionism: 'Коллекция импрессионистов XIX века',
      modern_art: 'Абстракционизм и авангард XX века',
      renaissance: 'Шедевры эпохи Возрождения',
      contemporary: 'Современное искусство XXI века'
    };
    if (descEl) descEl.textContent = descriptions[roomConfig.id] || '';
  }

  hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.opacity = '0';
      setTimeout(() => loadingScreen.style.display = 'none', 500);
    }
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    if (this.controls) this.controls.update();
    if (this.artworkLODManager && this.isInitialized) {
      this.artworkLODManager.update();
    }
    this.renderer.render(this.scene, this.camera);
  }
}

const gallery = new VirtualGallery();
window.virtualGallery = gallery;
