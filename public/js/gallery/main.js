import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function galleryToast(message, type = 'info') {
  let container = document.getElementById('gallery-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'gallery-toast-container';
    container.style.cssText = 'position:fixed;top:20px;right:20px;z-index:10000;display:flex;flex-direction:column;gap:10px;pointer-events:none;';
    document.body.appendChild(container);
  }
  const colors = { success: '#22c55e', error: '#ef4444', warning: '#f59e0b', info: '#6366f1' };
  const toast = document.createElement('div');
  toast.style.cssText = `background:rgba(20,20,40,0.95);color:#fff;padding:14px 20px;border-radius:10px;font-family:'Inter',sans-serif;font-size:14px;max-width:350px;border-left:3px solid ${colors[type] || colors.info};backdrop-filter:blur(10px);pointer-events:auto;opacity:0;transform:translateX(30px);transition:all 0.3s ease;`;
  toast.textContent = message;
  container.appendChild(toast);
  requestAnimationFrame(() => { toast.style.opacity = '1'; toast.style.transform = 'translateX(0)'; });
  setTimeout(() => {
    toast.style.opacity = '0'; toast.style.transform = 'translateX(30px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

let GALLERY_CONFIG = {
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
      position: { x: 0, y: 0, z: -32.5 },
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
      position: { x: 30, y: 0, z: 0 },
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
      position: { x: -30, y: 0, z: 0 },
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
      position: { x: 0, y: 0, z: 32.5 },
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
    { id: "corridor_to_impressionism", from: "main_hall", to: "impressionism", dimensions: { width: 4, height: 4, length: 5 }, floor: { color: 0x2a2a2a }, walls: { color: 0x3a3a3a }, lighting: { ambient: 0.3 } },
    { id: "corridor_to_modern", from: "main_hall", to: "modern_art", dimensions: { width: 4, height: 4, length: 5 }, floor: { color: 0x2a2a2a }, walls: { color: 0x3a3a3a }, lighting: { ambient: 0.3 } },
    { id: "corridor_to_renaissance", from: "main_hall", to: "renaissance", dimensions: { width: 4, height: 4, length: 5 }, floor: { color: 0x2a2a2a }, walls: { color: 0x3a3a3a }, lighting: { ambient: 0.3 } },
    { id: "corridor_to_contemporary", from: "main_hall", to: "contemporary", dimensions: { width: 4, height: 4, length: 5 }, floor: { color: 0x2a2a2a }, walls: { color: 0x3a3a3a }, lighting: { ambient: 0.3 } }
  ]
};

class TextureManager {
  constructor(maxCacheSize = 50) {
    this.textureLoader = new THREE.TextureLoader();
    this.textureLoader.crossOrigin = 'anonymous';
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

class ProceduralTextures {
  static _cache = new Map();

  static _getCached(key, createFn) {
    if (this._cache.has(key)) return this._cache.get(key);
    const texture = createFn();
    this._cache.set(key, texture);
    return texture;
  }

  static createParquetTexture(baseColor = 0x4a3f35, size = 256) {
    return this._getCached(`parquet_${baseColor}_${size}`, () => this._genParquet(baseColor, size));
  }
  static createMarbleTexture(baseColor = 0xf0e8d8, size = 256) {
    return this._getCached(`marble_${baseColor}_${size}`, () => this._genMarble(baseColor, size));
  }
  static createWallTexture(baseColor = 0xd4c5b9, size = 128) {
    return this._getCached(`wall_${baseColor}_${size}`, () => this._genWall(baseColor, size));
  }
  static createConcreteTexture(baseColor = 0x2a2a2a, size = 128) {
    return this._getCached(`concrete_${baseColor}_${size}`, () => this._genConcrete(baseColor, size));
  }

  static _genParquet(baseColor, size) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const r = (baseColor >> 16) & 255, g = (baseColor >> 8) & 255, b = baseColor & 255;
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(0, 0, size, size);
    const plankW = size / 8, plankH = size / 2;
    for (let row = 0; row < size / plankH + 1; row++) {
      const offset = (row % 2) * (plankW / 2);
      for (let col = -1; col < size / plankW + 1; col++) {
        const x = col * plankW + offset;
        const y = row * plankH;
        const variation = (Math.random() - 0.5) * 30;
        ctx.fillStyle = `rgb(${Math.min(255, Math.max(0, r + variation))},${Math.min(255, Math.max(0, g + variation))},${Math.min(255, Math.max(0, b + variation))})`;
        ctx.fillRect(x + 1, y + 1, plankW - 2, plankH - 2);
        ctx.strokeStyle = `rgba(0,0,0,0.15)`;
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, plankW, plankH);
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.encoding = THREE.sRGBEncoding;
    return texture;
  }

  static _genMarble(baseColor, size) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const r = (baseColor >> 16) & 255, g = (baseColor >> 8) & 255, b = baseColor & 255;
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 10; i++) {
      const sx = Math.random() * size, sy = Math.random() * size;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      for (let j = 0; j < 5; j++) {
        ctx.bezierCurveTo(
          sx + (Math.random() - 0.5) * size * 0.5, sy + (Math.random() - 0.5) * size * 0.5,
          sx + (Math.random() - 0.5) * size, sy + (Math.random() - 0.5) * size,
          sx + (Math.random() - 0.5) * size, sy + (Math.random() - 0.5) * size
        );
      }
      ctx.strokeStyle = `rgba(${r * 0.6},${g * 0.6},${b * 0.6},${0.04 + Math.random() * 0.06})`;
      ctx.lineWidth = 1 + Math.random() * 2;
      ctx.stroke();
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.encoding = THREE.sRGBEncoding;
    return texture;
  }

  static _genWall(baseColor, size) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const r = (baseColor >> 16) & 255, g = (baseColor >> 8) & 255, b = baseColor & 255;
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(0, 0, size, size);
    const imageData = ctx.getImageData(0, 0, size, size);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 8;
      data[i] = Math.min(255, Math.max(0, data[i] + noise));
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
    }
    ctx.putImageData(imageData, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.encoding = THREE.sRGBEncoding;
    return texture;
  }

  static _genConcrete(baseColor, size) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const r = (baseColor >> 16) & 255, g = (baseColor >> 8) & 255, b = baseColor & 255;
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(0, 0, size, size);
    const imageData = ctx.getImageData(0, 0, size, size);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 15;
      data[i] = Math.min(255, Math.max(0, data[i] + noise));
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
    }
    ctx.putImageData(imageData, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }
}

class ArtworkLODManager {
  constructor(textureManager, camera) {
    this.textureManager = textureManager;
    this.camera = camera;
    this.artworkMeshes = new Map();
    this.lodDistances = { high: 10, medium: 25, low: 50 };
    this._frameCount = 0;
    this._frustum = new THREE.Frustum();
    this._projScreenMatrix = new THREE.Matrix4();
    this._tempWorldPos = new THREE.Vector3();
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
    if (mesh.material && !mesh.material.map) {
      const placeholder = this.textureManager.createPlaceholderTexture(0x888888);
      mesh.material.map = placeholder;
      mesh.material.needsUpdate = true;
    }
  }

  async updateLOD(mesh) {
    const info = this.artworkMeshes.get(mesh.uuid);
    if (!info) return;
    mesh.getWorldPosition(this._tempWorldPos);
    const distance = this.camera.position.distanceTo(this._tempWorldPos);
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
    this._frameCount++;
    if (this._frameCount % 30 !== 0) return;
    this._projScreenMatrix.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse);
    this._frustum.setFromProjectionMatrix(this._projScreenMatrix);
    this.artworkMeshes.forEach((info) => {
      if (info.mesh.parent) {
        info.mesh.getWorldPosition(this._tempWorldPos);
        if (this._frustum.containsPoint(this._tempWorldPos)) {
          this.updateLOD(info.mesh);
        }
      }
    });
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
    this._pregenTextureUrls = {};
    this._pregenTextures = new Map();
  }

  setPregenTextureUrls(urls) {
    this._pregenTextureUrls = urls || {};
  }

  async loadPregenTexture(key) {
    if (this._pregenTextures.has(key)) return this._pregenTextures.get(key);
    const url = this._pregenTextureUrls[key];
    if (!url) return null;
    try {
      const texture = await this.textureManager.loadTexture(url);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      this._pregenTextures.set(key, texture);
      return texture;
    } catch (e) {
      console.warn(`Failed to load pregen texture ${key}:`, e);
      return null;
    }
  }

  async buildEntireGallery() {
    await this.buildRoom(this.config.rooms[0]);
    for (const corridor of this.config.corridors) {
      this.buildCorridor(corridor);
    }
    return this.getLoadedRooms();
  }

  async buildRoom(roomConfig) {
    if (this.loadedRooms.has(roomConfig.id)) return this.rooms.get(roomConfig.id);

    const roomGroup = new THREE.Group();
    roomGroup.name = roomConfig.id;
    roomGroup.userData = { type: 'room', id: roomConfig.id, name: roomConfig.name, theme: roomConfig.theme };

    const { width, height, depth } = roomConfig.dimensions;
    const pos = roomConfig.position;

    await this.createFloor(roomGroup, roomConfig);
    await this.createWalls(roomGroup, roomConfig);
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

  getFloorTextureFallback(config) {
    const theme = config.theme || 'classic';
    const color = config.floor.color;
    if (theme === 'classical' || theme === 'impressionism') {
      return ProceduralTextures.createParquetTexture(color);
    } else if (theme === 'modern' || theme === 'contemporary' || theme === 'dark') {
      return ProceduralTextures.createConcreteTexture(color);
    } else {
      return ProceduralTextures.createMarbleTexture(color);
    }
  }

  async createFloor(group, config) {
    const { width, depth } = config.dimensions;
    const geometry = new THREE.PlaneGeometry(width, depth);
    let floorTexture = await this.loadPregenTexture(`floor_${config.id}`);
    if (!floorTexture) {
      floorTexture = this.getFloorTextureFallback(config);
    }
    floorTexture.repeat.set(width / 4, depth / 4);
    const material = new THREE.MeshStandardMaterial({
      map: floorTexture,
      color: config.floor.color,
      metalness: 0.1,
      roughness: 0.7,
      side: THREE.DoubleSide
    });
    const floor = new THREE.Mesh(geometry, material);
    floor.rotation.x = -Math.PI / 2;
    group.add(floor);
  }

  async createWalls(group, config) {
    const { width, height, depth } = config.dimensions;
    let wallTexture = await this.loadPregenTexture(`wall_${config.id}`);
    if (!wallTexture) {
      wallTexture = ProceduralTextures.createWallTexture(config.walls.color);
    }
    wallTexture.repeat.set(2, 2);
    const wallMaterial = new THREE.MeshStandardMaterial({
      map: wallTexture,
      color: config.walls.color,
      metalness: 0.02,
      roughness: 0.92,
      side: THREE.DoubleSide
    });

    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(width, height), wallMaterial);
    backWall.position.set(0, height / 2, -depth / 2);
    group.add(backWall);

    const frontWall = new THREE.Mesh(new THREE.PlaneGeometry(width, height), wallMaterial);
    frontWall.position.set(0, height / 2, depth / 2);
    frontWall.rotation.y = Math.PI;
    group.add(frontWall);

    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(depth, height), wallMaterial);
    leftWall.position.set(-width / 2, height / 2, 0);
    leftWall.rotation.y = Math.PI / 2;
    group.add(leftWall);

    const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(depth, height), wallMaterial);
    rightWall.position.set(width / 2, height / 2, 0);
    rightWall.rotation.y = -Math.PI / 2;
    group.add(rightWall);

    this.addBaseboards(group, config);
    this.addCrownMolding(group, config);
  }

  addBaseboards(group, config) {
    const { width, height, depth } = config.dimensions;
    const bH = 0.15, bD = 0.04;
    if (!this._sharedBaseboardMat) {
      this._sharedBaseboardMat = new THREE.MeshStandardMaterial({ color: 0xf5f0e8, metalness: 0.1, roughness: 0.6 });
    }

    const positions = [
      { geo: [width, bH, bD], pos: [0, bH / 2, -depth / 2 + bD / 2], rot: [0, 0, 0] },
      { geo: [width, bH, bD], pos: [0, bH / 2, depth / 2 - bD / 2], rot: [0, 0, 0] },
      { geo: [bD, bH, depth], pos: [-width / 2 + bD / 2, bH / 2, 0], rot: [0, 0, 0] },
      { geo: [bD, bH, depth], pos: [width / 2 - bD / 2, bH / 2, 0], rot: [0, 0, 0] }
    ];

    positions.forEach(({ geo, pos }) => {
      const baseboard = new THREE.Mesh(new THREE.BoxGeometry(...geo), this._sharedBaseboardMat);
      baseboard.position.set(...pos);
      group.add(baseboard);
    });
  }

  addCrownMolding(group, config) {
    const { width, height, depth } = config.dimensions;
    const mH = 0.08, mD = 0.06;
    if (!this._sharedMoldingMat) {
      this._sharedMoldingMat = new THREE.MeshStandardMaterial({ color: 0xf5f0e8, metalness: 0.1, roughness: 0.5 });
    }

    const positions = [
      { geo: [width, mH, mD], pos: [0, height - mH / 2, -depth / 2 + mD / 2] },
      { geo: [width, mH, mD], pos: [0, height - mH / 2, depth / 2 - mD / 2] },
      { geo: [mD, mH, depth], pos: [-width / 2 + mD / 2, height - mH / 2, 0] },
      { geo: [mD, mH, depth], pos: [width / 2 - mD / 2, height - mH / 2, 0] }
    ];

    positions.forEach(({ geo, pos }) => {
      const molding = new THREE.Mesh(new THREE.BoxGeometry(...geo), this._sharedMoldingMat);
      molding.position.set(...pos);
      group.add(molding);
    });
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
    const { width, height, depth } = config.dimensions;

    const pointLight = new THREE.PointLight(0xfff0e0, 0.6, Math.max(width, depth) * 1.5);
    pointLight.position.set(0, height - 0.3, 0);
    group.add(pointLight);

    if (!this._sharedFixtureGeo) {
      this._sharedFixtureGeo = new THREE.CylinderGeometry(0.15, 0.2, 0.08, 8);
      this._sharedFixtureMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8, roughness: 0.2 });
      this._sharedBulbGeo = new THREE.SphereGeometry(0.06, 6, 6);
      this._sharedBulbMat = new THREE.MeshBasicMaterial({ color: 0xfff8e8 });
    }

    const fixturePositions = [
      [width * 0.2, -width * 0.2],
      [-width * 0.2, width * 0.2]
    ];
    fixturePositions.forEach(([fx, fz]) => {
      const fixture = new THREE.Mesh(this._sharedFixtureGeo, this._sharedFixtureMat);
      fixture.position.set(fx, height - 0.04, fz);
      group.add(fixture);
      const bulb = new THREE.Mesh(this._sharedBulbGeo, this._sharedBulbMat);
      bulb.position.set(fx, height - 0.12, fz);
      group.add(bulb);
    });

    if (config.lighting.spotlights) {
      config.lighting.spotlights.forEach(spotConfig => {
        const spotlight = new THREE.SpotLight(0xfff5e6, spotConfig.intensity);
        spotlight.position.set(spotConfig.position.x, spotConfig.position.y, spotConfig.position.z);
        spotlight.angle = Math.PI / 6;
        spotlight.penumbra = 0.3;
        group.add(spotlight);
      });
    }
  }

  addArtworkSpotlight(group, slotConfig, roomHeight) {
    const warmWhite = 0xfff0d4;
    const spotlight = new THREE.SpotLight(warmWhite, 0.8);
    spotlight.position.set(
      slotConfig.position.x,
      roomHeight - 0.2,
      slotConfig.position.z
    );

    const targetObj = new THREE.Object3D();
    targetObj.position.set(slotConfig.position.x, slotConfig.position.y, slotConfig.position.z);
    group.add(targetObj);
    spotlight.target = targetObj;

    spotlight.angle = Math.PI / 8;
    spotlight.penumbra = 0.5;
    spotlight.decay = 1.5;
    spotlight.distance = roomHeight * 2;
    group.add(spotlight);

    if (!this._sharedTrackGeo) {
      this._sharedTrackGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.3, 6);
      this._sharedTrackMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.7, roughness: 0.3 });
    }
    const trackHead = new THREE.Mesh(this._sharedTrackGeo, this._sharedTrackMat);
    trackHead.position.set(slotConfig.position.x, roomHeight - 0.15, slotConfig.position.z);
    trackHead.rotation.x = Math.PI / 6;
    group.add(trackHead);
  }

  createArtworkSlots(group, config) {
    if (!config.artworkSlots) return;
    config.artworkSlots.forEach(slot => {
      const slotMesh = this.createArtworkSlot(slot, config.id);
      group.add(slotMesh);
      this.artworkSlots.set(`${config.id}_${slot.id}`, slotMesh);
      this.addArtworkSpotlight(group, slot, config.dimensions.height);
    });
  }

  _getSlotMaterials() {
    if (!this._slotMats) {
      this._slotMats = {
        frame: new THREE.MeshStandardMaterial({ color: 0x3d2817, metalness: 0.4, roughness: 0.5 }),
        innerBorder: new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.6, roughness: 0.3 }),
        matte: new THREE.MeshStandardMaterial({ color: 0xf5f0e8, metalness: 0, roughness: 0.95 }),
      };
    }
    return this._slotMats;
  }

  createArtworkSlot(slotConfig, roomId) {
    const { w, h } = slotConfig.size;
    const frameDepth = 0.1;
    const frameWidth = 0.07;
    const mats = this._getSlotMaterials();

    const slotGroup = new THREE.Group();
    slotGroup.name = `slot_${slotConfig.id}`;
    slotGroup.userData = { type: 'artwork_slot', slotId: slotConfig.id, roomId: roomId, wall: slotConfig.wall, isEmpty: true, artworkId: null };

    const outerFrame = new THREE.Mesh(new THREE.BoxGeometry(w + frameWidth * 2, h + frameWidth * 2, frameDepth), mats.frame);
    slotGroup.add(outerFrame);

    const innerBorder = new THREE.Mesh(new THREE.BoxGeometry(w + 0.02, h + 0.02, frameDepth + 0.01), mats.innerBorder);
    innerBorder.position.z = 0.005;
    slotGroup.add(innerBorder);

    const matte = new THREE.Mesh(new THREE.PlaneGeometry(w + 0.04, h + 0.04), mats.matte);
    matte.position.z = frameDepth / 2 + 0.001;
    slotGroup.add(matte);

    const canvasGeometry = new THREE.PlaneGeometry(w, h);
    const canvasMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0, roughness: 0.8 });
    const canvas = new THREE.Mesh(canvasGeometry, canvasMaterial);
    canvas.position.z = frameDepth / 2 + 0.002;
    canvas.userData = { type: 'artwork_canvas' };
    slotGroup.add(canvas);

    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 256;
    labelCanvas.height = 32;
    const ctx = labelCanvas.getContext('2d');
    ctx.fillStyle = '#d4af37';
    ctx.fillRect(0, 0, 256, 32);
    ctx.fillStyle = '#1a1a1a';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(slotConfig.id.replace('slot_', '# '), 128, 16);
    const labelTexture = new THREE.CanvasTexture(labelCanvas);
    const labelGeo = new THREE.PlaneGeometry(w * 0.4, 0.12);
    const labelMat = new THREE.MeshBasicMaterial({ map: labelTexture, transparent: true });
    const label = new THREE.Mesh(labelGeo, labelMat);
    label.position.set(0, -(h / 2) - frameWidth - 0.15, frameDepth / 2);
    label.userData = { type: 'artwork_label' };
    slotGroup.add(label);

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
    const archRadius = doorWidth / 2;
    const straightHeight = doorHeight - archRadius;

    const archShape = new THREE.Shape();
    archShape.moveTo(-doorWidth / 2 - 0.2, 0);
    archShape.lineTo(-doorWidth / 2 - 0.2, straightHeight + archRadius + 0.2);
    archShape.lineTo(doorWidth / 2 + 0.2, straightHeight + archRadius + 0.2);
    archShape.lineTo(doorWidth / 2 + 0.2, 0);
    archShape.lineTo(doorWidth / 2, 0);
    archShape.lineTo(doorWidth / 2, straightHeight);
    archShape.absarc(0, straightHeight, archRadius, 0, Math.PI, false);
    archShape.lineTo(-doorWidth / 2, 0);
    archShape.lineTo(-doorWidth / 2 - 0.2, 0);

    const extrudeSettings = { depth: 0.3, bevelEnabled: false };
    const archGeometry = new THREE.ExtrudeGeometry(archShape, extrudeSettings);
    const archMaterial = new THREE.MeshStandardMaterial({ color: 0xd4c5a9, metalness: 0.2, roughness: 0.6 });
    const arch = new THREE.Mesh(archGeometry, archMaterial);
    arch.position.z = -0.15;
    doorGroup.add(arch);

    const openingShape = new THREE.Shape();
    openingShape.moveTo(-doorWidth / 2, 0);
    openingShape.lineTo(-doorWidth / 2, straightHeight);
    openingShape.absarc(0, straightHeight, archRadius, Math.PI, 0, true);
    openingShape.lineTo(doorWidth / 2, 0);
    openingShape.lineTo(-doorWidth / 2, 0);

    const openingGeo = new THREE.ShapeGeometry(openingShape);
    const openingMat = new THREE.MeshBasicMaterial({ color: 0x0a0a1a, transparent: true, opacity: 0.85 });
    const opening = new THREE.Mesh(openingGeo, openingMat);
    opening.position.z = 0.16;
    doorGroup.add(opening);

    const portalLight = new THREE.PointLight(0xfff5e6, 0.3, 8);
    portalLight.position.set(0, doorHeight / 2, 0.5);
    doorGroup.add(portalLight);

    const triggerGeometry = new THREE.BoxGeometry(doorWidth + 2, doorHeight, 2);
    const triggerMaterial = new THREE.MeshBasicMaterial({ visible: false });
    const trigger = new THREE.Mesh(triggerGeometry, triggerMaterial);
    trigger.position.y = doorHeight / 2;
    trigger.userData = { type: 'door_trigger', from: roomConfig.id, to: doorConfig.to, isEntrance: doorConfig.isEntrance };
    doorGroup.add(trigger);

    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 512;
    labelCanvas.height = 80;
    const ctx = labelCanvas.getContext('2d');
    ctx.fillStyle = 'rgba(26, 26, 46, 0.85)';
    const lw = 450, lh = 60, lx = (512 - lw) / 2, ly = (80 - lh) / 2;
    ctx.beginPath();
    ctx.roundRect(lx, ly, lw, lh, 8);
    ctx.fill();
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(lx, ly, lw, lh, 8);
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 26px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const targetRoom = this.config.rooms.find(r => r.id === doorConfig.to);
    ctx.fillText(targetRoom ? targetRoom.name : doorConfig.to, 256, 36);
    ctx.fillStyle = 'rgba(212, 175, 55, 0.8)';
    ctx.font = '16px Arial';
    ctx.fillText('→ перейти', 256, 58);

    const labelTexture = new THREE.CanvasTexture(labelCanvas);
    const labelGeometry = new THREE.PlaneGeometry(2.5, 0.5);
    const labelMaterial = new THREE.MeshBasicMaterial({ map: labelTexture, transparent: true });
    const label = new THREE.Mesh(labelGeometry, labelMaterial);
    label.position.y = straightHeight + archRadius + 0.5;
    label.position.z = 0.2;
    doorGroup.add(label);

    const keystoneGeo = new THREE.BoxGeometry(0.3, 0.4, 0.35);
    const keystoneMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.5, roughness: 0.4 });
    const keystone = new THREE.Mesh(keystoneGeo, keystoneMat);
    keystone.position.set(0, straightHeight + archRadius, 0);
    doorGroup.add(keystone);

    doorGroup.position.set(doorConfig.position.x, doorConfig.position.y, doorConfig.position.z);
    doorGroup.rotation.y = doorConfig.rotation;
    doorGroup.userData = { type: 'door', from: roomConfig.id, to: doorConfig.to, isEntrance: doorConfig.isEntrance };

    return doorGroup;
  }

  buildCorridor(corridorConfig) {
    const corridorGroup = new THREE.Group();
    corridorGroup.name = corridorConfig.id;
    
    const { width, height, length } = corridorConfig.dimensions;

    if (!this._corridorGeos) {
      this._corridorGeos = {
        floor: new THREE.PlaneGeometry(width, length),
        wall: new THREE.PlaneGeometry(length, height),
        ceiling: new THREE.PlaneGeometry(width, length)
      };
    }
    if (!this._corridorMats) {
      this._corridorMats = {
        floor: new THREE.MeshStandardMaterial({ color: corridorConfig.floor.color, metalness: 0.1, roughness: 0.8 }),
        wall: new THREE.MeshStandardMaterial({ color: corridorConfig.walls.color, metalness: 0.05, roughness: 0.9 }),
        ceiling: new THREE.MeshStandardMaterial({ color: 0x1a1a1a })
      };
    }

    const floor = new THREE.Mesh(this._corridorGeos.floor, this._corridorMats.floor);
    floor.rotation.x = -Math.PI / 2;
    corridorGroup.add(floor);

    const leftWall = new THREE.Mesh(this._corridorGeos.wall, this._corridorMats.wall);
    leftWall.position.set(-width / 2, height / 2, 0);
    leftWall.rotation.y = Math.PI / 2;
    corridorGroup.add(leftWall);

    const rightWall = new THREE.Mesh(this._corridorGeos.wall, this._corridorMats.wall);
    rightWall.position.set(width / 2, height / 2, 0);
    rightWall.rotation.y = -Math.PI / 2;
    corridorGroup.add(rightWall);

    const ceiling = new THREE.Mesh(this._corridorGeos.ceiling, this._corridorMats.ceiling);
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

    if (!this.galleryBuilder.loadedRooms.has(roomId)) {
      await this.galleryBuilder.buildRoom(roomConfig);
    }

    const targetPosition = new THREE.Vector3(roomConfig.position.x, 1.6, roomConfig.position.z + 5);
    await this.animateCameraTo(targetPosition, roomConfig.position);

    this.currentRoom = roomId;
    if (this.onRoomChange) this.onRoomChange(roomId, roomConfig);
    
    window.dispatchEvent(new CustomEvent('roomChanged', { detail: { roomId } }));
    this.isTransitioning = false;

    this._preloadAdjacentRooms(roomConfig);
  }

  _preloadAdjacentRooms(roomConfig) {
    if (!roomConfig.doors) return;
    for (const door of roomConfig.doors) {
      const adjacentConfig = this.galleryBuilder.getRoomConfig(door.to);
      if (adjacentConfig && !this.galleryBuilder.loadedRooms.has(door.to)) {
        this.galleryBuilder.buildRoom(adjacentConfig).catch(() => {});
      }
    }
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
    this.hoveredDoor = null;
    
    this.init();
  }

  async init() {
    this.updateLoadingProgress(5, 'Загрузка конфигурации...');
    await this.loadConfigFromAPI();
    
    this.updateLoadingProgress(15, 'Настройка сцены...');
    this.setupScene();
    this.setupCamera();
    this.setupRenderer();
    this.setupControls();
    this.addGlobalLighting();

    this.updateLoadingProgress(30, 'Создание текстур...');
    this.textureManager = new TextureManager(100);
    this.galleryBuilder = new GalleryBuilder(this.scene, this.textureManager);
    if (this._pregenTextureUrls) {
      this.galleryBuilder.setPregenTextureUrls(this._pregenTextureUrls);
    }
    
    this.updateLoadingProgress(40, 'Строим залы...');
    await this.galleryBuilder.buildEntireGallery();

    this.updateLoadingProgress(70, 'Настройка навигации...');
    this.roomNavigator = new RoomNavigator(this.camera, this.galleryBuilder, this.onRoomChange.bind(this));
    this.roomNavigator.initialize();
    
    this.artworkLODManager = new ArtworkLODManager(this.textureManager, this.camera);

    this.updateLoadingProgress(85, 'Загружаем картины...');
    await this.loadArtworksForRoom('main_hall');
    this.setupEventListeners();
    this.createRoomInfoUI();
    
    this.updateLoadingProgress(100, 'Готово!');
    this.isInitialized = true;
    
    await new Promise(r => setTimeout(r, 400));
    this.hideLoadingScreen();
    this.animate();
  }

  updateLoadingProgress(percent, statusText) {
    const progressBar = document.getElementById('loading-progress-bar');
    const progressText = document.getElementById('loading-progress-text');
    const progressPercent = document.getElementById('loading-progress-percent');
    if (progressBar) progressBar.style.width = percent + '%';
    if (progressText) progressText.textContent = statusText;
    if (progressPercent) progressPercent.textContent = percent + '%';
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
    this.renderer.shadowMap.enabled = false;
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
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.5);
    this.scene.add(ambientLight);
    const hemisphereLight = new THREE.HemisphereLight(0xfff8f0, 0x080820, 0.4);
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

    if (this.hoveredObject) {
      this.hoveredObject.scale.set(1, 1, 1);
      document.body.style.cursor = 'default';
      this.hoveredObject = null;
    }
    if (this.hoveredDoor) {
      this.hoveredDoor.traverse(child => {
        if (child.material && child.material.emissive) {
          child.material.emissive.setHex(0x000000);
          child.material.needsUpdate = true;
        }
      });
      document.body.style.cursor = 'default';
      this.hoveredDoor = null;
    }

    const slots = this.galleryBuilder.getArtworkSlotsForRoom(this.currentRoom);
    const artworkIntersects = this.raycaster.intersectObjects(slots, true);

    if (artworkIntersects.length > 0) {
      let parent = artworkIntersects[0].object;
      while (parent.parent && !parent.userData.type?.includes('slot')) parent = parent.parent;
      
      if (parent.userData.type === 'artwork_slot' && !parent.userData.isEmpty) {
        this.hoveredObject = parent;
        parent.scale.set(1.02, 1.02, 1.02);
        document.body.style.cursor = 'pointer';
        return;
      }
    }

    const allDoors = this.galleryBuilder.getAllDoors();
    const doorTriggers = [];
    allDoors.forEach(door => {
      door.traverse(obj => {
        if (obj.userData?.type === 'door_trigger') doorTriggers.push(obj);
      });
    });
    const doorIntersects = this.raycaster.intersectObjects(doorTriggers);
    if (doorIntersects.length > 0) {
      const doorTrigger = doorIntersects[0].object;
      let doorGroup = doorTrigger.parent;
      this.hoveredDoor = doorGroup;
      doorGroup.traverse(child => {
        if (child.material && child.material.emissive && child.userData?.type !== 'door_trigger') {
          child.material.emissive.setHex(0x222244);
          child.material.emissiveIntensity = 0.3;
          child.material.needsUpdate = true;
        }
      });
      document.body.style.cursor = 'pointer';
    }
  }

  onClick(event) {
    if (this.hoveredObject && !this.hoveredObject.userData.isEmpty) {
      this.showArtworkDetails(this.hoveredObject.userData.artworkId);
    }
  }

  onKeyDown(event) {
    if (event.key === 'm' || event.key === 'M' || event.key === 'ь' || event.key === 'Ь') {
      this.toggleMinimap();
      return;
    }
    const roomIds = GALLERY_CONFIG.rooms.map(r => r.id);
    const keyNum = parseInt(event.key);
    if (keyNum >= 1 && keyNum <= roomIds.length) {
      this.roomNavigator.navigateToRoom(roomIds[keyNum - 1]);
    }
  }

  toggleMinimap() {
    let minimap = document.getElementById('gallery-minimap');
    if (minimap) {
      minimap.style.display = minimap.style.display === 'none' ? 'block' : 'none';
      if (minimap.style.display === 'block') this.renderMinimap();
      return;
    }
    minimap = document.createElement('canvas');
    minimap.id = 'gallery-minimap';
    minimap.width = 280;
    minimap.height = 280;
    minimap.style.cssText = 'position:fixed;top:80px;right:20px;width:280px;height:280px;background:rgba(10,10,30,0.9);border:1px solid rgba(99,102,241,0.4);border-radius:12px;z-index:150;cursor:pointer;';
    document.body.appendChild(minimap);
    
    minimap.addEventListener('click', (e) => {
      const rect = minimap.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width;
      const cy = (e.clientY - rect.top) / rect.height;
      const mapRange = 120;
      const worldX = (cx - 0.5) * mapRange * 2;
      const worldZ = (cy - 0.5) * mapRange * 2;
      
      let closest = null, closestDist = Infinity;
      GALLERY_CONFIG.rooms.forEach(room => {
        const dist = Math.sqrt(Math.pow(room.position.x - worldX, 2) + Math.pow(room.position.z - worldZ, 2));
        if (dist < closestDist) { closestDist = dist; closest = room; }
      });
      if (closest && closestDist < 30) {
        this.roomNavigator.navigateToRoom(closest.id);
      }
    });
    
    this._lastMinimapCamPos = new THREE.Vector3();
    this.renderMinimap();
    this.minimapInterval = setInterval(() => {
      if (document.getElementById('gallery-minimap')?.style.display !== 'none') {
        const dist = this.camera.position.distanceTo(this._lastMinimapCamPos);
        if (dist > 0.1) {
          this._lastMinimapCamPos.copy(this.camera.position);
          this.renderMinimap();
        }
      }
    }, 1000);
  }

  renderMinimap() {
    const canvas = document.getElementById('gallery-minimap');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    const mapRange = 120;
    
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(10, 10, 30, 0.95)';
    ctx.fillRect(0, 0, w, h);

    const toMapX = (x) => (x / mapRange + 0.5) * w;
    const toMapY = (z) => (z / mapRange + 0.5) * h;

    GALLERY_CONFIG.corridors.forEach(corridor => {
      const fromRoom = GALLERY_CONFIG.rooms.find(r => r.id === corridor.from);
      const toRoom = GALLERY_CONFIG.rooms.find(r => r.id === corridor.to);
      if (fromRoom && toRoom) {
        ctx.strokeStyle = 'rgba(100, 100, 140, 0.5)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(toMapX(fromRoom.position.x), toMapY(fromRoom.position.z));
        ctx.lineTo(toMapX(toRoom.position.x), toMapY(toRoom.position.z));
        ctx.stroke();
      }
    });

    GALLERY_CONFIG.rooms.forEach(room => {
      const rx = toMapX(room.position.x);
      const ry = toMapY(room.position.z);
      const rw = (room.dimensions.width / mapRange) * w * 0.5;
      const rh = (room.dimensions.depth / mapRange) * h * 0.5;
      
      const isCurrentRoom = room.id === this.currentRoom;
      ctx.fillStyle = isCurrentRoom ? 'rgba(99, 102, 241, 0.4)' : 'rgba(60, 60, 90, 0.4)';
      ctx.strokeStyle = isCurrentRoom ? '#6366f1' : 'rgba(100, 100, 150, 0.5)';
      ctx.lineWidth = isCurrentRoom ? 2 : 1;
      
      ctx.beginPath();
      ctx.roundRect(rx - rw / 2, ry - rh / 2, rw, rh, 3);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = isCurrentRoom ? '#ffffff' : 'rgba(255,255,255,0.6)';
      ctx.font = isCurrentRoom ? 'bold 10px Inter, Arial' : '9px Inter, Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const shortName = room.name.length > 12 ? room.name.substring(0, 10) + '…' : room.name;
      ctx.fillText(shortName, rx, ry);
    });

    const camX = toMapX(this.camera.position.x);
    const camY = toMapY(this.camera.position.z);
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.arc(camX, camY, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = '9px Inter, Arial';
    ctx.textAlign = 'right';
    ctx.fillText('M — скрыть', w - 8, h - 8);
  }

  async onRoomChange(roomId, roomConfig) {
    this.currentRoom = roomId;
    this.controls.target.set(roomConfig.position.x, roomConfig.position.y + 1.5, roomConfig.position.z);
    await this.loadArtworksForRoom(roomId);
    this.updateRoomInfoUI(roomConfig);
  }

  async loadArtworksForRoom(roomId) {
    try {
      const response = await fetch(`/api/gallery/rooms/${roomId}/artworks`);
      if (!response.ok) throw new Error('Failed to fetch');
      const artworks = await response.json();
      if (artworks.length > 0) {
        this.placeArtworksInRoom(roomId, artworks);
      }
    } catch (error) {
      console.log('No artworks assigned for room:', roomId);
    }
  }

  placeArtworksInRoom(roomId, artworks) {
    artworks.forEach(artwork => {
      const slotMesh = this.galleryBuilder.getArtworkSlot(roomId, artwork.slot_id);
      if (slotMesh) {
        slotMesh.userData.isEmpty = false;
        slotMesh.userData.artworkId = artwork.id;
        slotMesh.userData.artworkData = artwork;

        const canvasMesh = slotMesh.children.find(c => c.userData?.type === 'artwork_canvas');
        if (canvasMesh) {
          const imageUrl = artwork.medium_url || artwork.image_url || artwork.thumbnail_url;
          if (imageUrl) {
            this.loadArtworkTexture(canvasMesh, imageUrl, artwork);
          } else {
            this.applyLabelTexture(canvasMesh, artwork);
          }
        }
      }
    });
  }

  async loadArtworkTexture(mesh, imageUrl, artwork) {
    try {
      const texture = await this.textureManager.loadTexture(imageUrl);
      mesh.material.map = texture;
      mesh.material.color.set(0xffffff);
      mesh.material.needsUpdate = true;

      if (this.artworkLODManager && artwork.thumbnail_url) {
        this.artworkLODManager.registerArtwork(mesh, artwork);
        this.artworkLODManager.artworkMeshes.get(mesh.uuid).currentLOD = 'medium';
      }
    } catch (error) {
      this.applyLabelTexture(mesh, artwork);
    }
  }

  applyLabelTexture(mesh, artwork) {
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

    const imageUrl = artworkData.image_url || artworkData.imageUrl || artworkData.thumbnail_url || artworkData.thumbnail || '';
    
    modal.innerHTML = `
      <div style="background:#1a1a2e;border-radius:16px;max-width:1000px;width:95%;max-height:95vh;overflow-y:auto;color:white;font-family:'Inter',sans-serif;">
        <div style="padding:25px;">
          <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:15px;">
            <div>
              <h2 style="font-size:24px;margin:0 0 6px 0;font-family:'Playfair Display',serif;">${artworkData.title || 'Без названия'}</h2>
              <p style="font-size:16px;color:rgba(255,255,255,0.7);margin:0;">${artworkData.artist || 'Неизвестный художник'}</p>
            </div>
            <button id="close-modal" style="background:none;border:none;color:white;font-size:28px;cursor:pointer;padding:5px;line-height:1;">&times;</button>
          </div>
          
          <!-- Image Viewer -->
          <div id="image-viewer-container" style="position:relative;background:#0a0a15;border-radius:12px;margin-bottom:15px;overflow:hidden;height:350px;">
            <div id="image-viewer" style="width:100%;height:100%;overflow:hidden;cursor:grab;position:relative;">
              <img id="artwork-image" src="${imageUrl}" alt="${artworkData.title}" 
                   style="position:absolute;transform-origin:0 0;transition:transform 0.1s ease-out;max-width:none;"
                   onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
              <div style="display:none;width:100%;height:100%;align-items:center;justify-content:center;color:rgba(255,255,255,0.5);">
                <span>Изображение недоступно</span>
              </div>
            </div>
            <div style="position:absolute;bottom:10px;right:10px;display:flex;gap:8px;">
              <button id="zoom-in" style="background:rgba(0,0,0,0.7);border:none;color:white;width:36px;height:36px;border-radius:8px;cursor:pointer;font-size:18px;">+</button>
              <button id="zoom-out" style="background:rgba(0,0,0,0.7);border:none;color:white;width:36px;height:36px;border-radius:8px;cursor:pointer;font-size:18px;">−</button>
              <button id="zoom-reset" style="background:rgba(0,0,0,0.7);border:none;color:white;padding:0 12px;height:36px;border-radius:8px;cursor:pointer;font-size:12px;">Сброс</button>
            </div>
            <div style="position:absolute;top:10px;left:10px;background:rgba(0,0,0,0.7);color:rgba(255,255,255,0.7);padding:6px 10px;border-radius:6px;font-size:11px;">
              Перетаскивайте для перемещения • Колесо мыши для масштаба
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div style="display:flex;gap:10px;margin-bottom:15px;">
            <button id="btn-favorite" style="flex:1;background:linear-gradient(135deg,#ec4899,#f43f5e);border:none;color:white;padding:12px 16px;border-radius:10px;cursor:pointer;font-size:14px;font-weight:500;display:flex;align-items:center;justify-content:center;gap:8px;transition:transform 0.2s,box-shadow 0.2s;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              Избранное
            </button>
            <button id="btn-auction" style="flex:1;background:linear-gradient(135deg,#8b5cf6,#6366f1);border:none;color:white;padding:12px 16px;border-radius:10px;cursor:pointer;font-size:14px;font-weight:500;display:flex;align-items:center;justify-content:center;gap:8px;transition:transform 0.2s,box-shadow 0.2s;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              Аукцион
            </button>
            <button id="btn-question" style="flex:1;background:linear-gradient(135deg,#14b8a6,#06b6d4);border:none;color:white;padding:12px 16px;border-radius:10px;cursor:pointer;font-size:14px;font-weight:500;display:flex;align-items:center;justify-content:center;gap:8px;transition:transform 0.2s,box-shadow 0.2s;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              Вопрос
            </button>
          </div>
          
          <!-- Info Grid -->
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:15px;">
            <div style="background:#2a2a4e;padding:12px;border-radius:8px;">
              <p style="font-size:11px;color:rgba(255,255,255,0.5);margin:0 0 4px 0;">Год</p>
              <p style="font-size:16px;margin:0;">${artworkData.year || 'Неизвестно'}</p>
            </div>
            <div style="background:#2a2a4e;padding:12px;border-radius:8px;">
              <p style="font-size:11px;color:rgba(255,255,255,0.5);margin:0 0 4px 0;">Стиль</p>
              <p style="font-size:16px;margin:0;">${artworkData.style || 'Не определен'}</p>
            </div>
            <div style="background:#2a2a4e;padding:12px;border-radius:8px;">
              <p style="font-size:11px;color:rgba(255,255,255,0.5);margin:0 0 4px 0;">Техника</p>
              <p style="font-size:16px;margin:0;">${artworkData.medium || 'Не указана'}</p>
            </div>
          </div>
          
          <!-- Description -->
          <div style="background:#2a2a4e;padding:15px;border-radius:8px;">
            <h3 style="font-size:14px;margin:0 0 8px 0;">Описание</h3>
            <p style="color:rgba(255,255,255,0.8);line-height:1.5;margin:0;font-size:13px;">${artworkData.description || 'Описание отсутствует.'}</p>
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

    // Image viewer zoom/pan functionality
    const img = modal.querySelector('#artwork-image');
    const viewer = modal.querySelector('#image-viewer');
    let scale = 1, posX = 0, posY = 0, isDragging = false, startX, startY;

    const updateTransform = () => {
      img.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
    };

    const centerImage = () => {
      if (img.naturalWidth) {
        const containerW = viewer.offsetWidth, containerH = viewer.offsetHeight;
        const imgW = img.naturalWidth, imgH = img.naturalHeight;
        const fitScale = Math.min(containerW / imgW, containerH / imgH, 1);
        scale = fitScale;
        posX = (containerW - imgW * scale) / 2;
        posY = (containerH - imgH * scale) / 2;
        updateTransform();
      }
    };

    img.onload = centerImage;
    if (img.complete) centerImage();

    modal.querySelector('#zoom-in').addEventListener('click', () => { scale = Math.min(scale * 1.3, 5); updateTransform(); });
    modal.querySelector('#zoom-out').addEventListener('click', () => { scale = Math.max(scale / 1.3, 0.2); updateTransform(); });
    modal.querySelector('#zoom-reset').addEventListener('click', centerImage);

    viewer.addEventListener('wheel', e => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      scale = Math.min(Math.max(scale * delta, 0.2), 5);
      updateTransform();
    });

    viewer.addEventListener('mousedown', e => {
      isDragging = true;
      startX = e.clientX - posX;
      startY = e.clientY - posY;
      viewer.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', e => {
      if (!isDragging) return;
      posX = e.clientX - startX;
      posY = e.clientY - startY;
      updateTransform();
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
      viewer.style.cursor = 'grab';
    });

    // Action button handlers
    modal.querySelector('#btn-favorite').addEventListener('click', () => {
      const btn = modal.querySelector('#btn-favorite');
      btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg> В избранном';
      btn.style.background = '#be185d';
    });

    modal.querySelector('#btn-auction').addEventListener('click', () => {
      galleryToast('Функция «Аукцион» позволяет выставить работу на торги. Для участия требуется регистрация.', 'info');
    });

    modal.querySelector('#btn-question').addEventListener('click', () => {
      galleryToast('Раздел вопросов модератору скоро будет доступен.', 'info');
    });
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

  async loadConfigFromAPI() {
    try {
      const response = await fetch('/api/gallery/config');
      if (response.ok) {
        const savedConfig = await response.json();
        if (savedConfig && savedConfig.rooms && savedConfig.rooms.length > 0) {
          this.applyAPIConfig(savedConfig);
          console.log('Loaded gallery configuration from API');
        }
        if (savedConfig && savedConfig.texture_urls) {
          this._pregenTextureUrls = savedConfig.texture_urls;
          console.log(`Loaded ${Object.keys(savedConfig.texture_urls).length} pre-generated texture URLs`);
        }
      }
    } catch (error) {
      console.log('Using default gallery configuration');
    }
  }

  applyAPIConfig(apiConfig) {
    const themeColors = {
      classic: { floor: 0x4a3f35, walls: 0xd4c5b9, ceiling: 0xffffff },
      modern: { floor: 0x2a2a2a, walls: 0xffffff, ceiling: 0xf0f0f0 },
      minimal: { floor: 0xf5f5f5, walls: 0xffffff, ceiling: 0xffffff },
      dark: { floor: 0x1a1a1a, walls: 0x2a2a2a, ceiling: 0x1a1a1a }
    };

    apiConfig.rooms.forEach(apiRoom => {
      const existingRoom = GALLERY_CONFIG.rooms.find(r => r.id === apiRoom.id);
      if (existingRoom) {
        existingRoom.name = apiRoom.name || existingRoom.name;
        if (apiRoom.width) existingRoom.dimensions.width = apiRoom.width;
        if (apiRoom.depth) existingRoom.dimensions.depth = apiRoom.depth;
        if (apiRoom.height) existingRoom.dimensions.height = apiRoom.height;
        
        if (apiRoom.wallColor) {
          const hex = parseInt(apiRoom.wallColor.replace('#', ''), 16);
          existingRoom.walls.color = hex;
        }
        
        if (apiRoom.theme && themeColors[apiRoom.theme]) {
          const colors = themeColors[apiRoom.theme];
          existingRoom.floor.color = colors.floor;
          existingRoom.ceiling.color = colors.ceiling;
        }
        
        if (apiRoom.lighting !== undefined) {
          existingRoom.lighting.ambient = apiRoom.lighting / 100;
        }

        if (apiRoom.slots !== undefined) {
          const slotsCount = parseInt(apiRoom.slots) || 0;
          if (slotsCount > 0) {
            existingRoom.artworkSlots = this.generateSlotPositions(existingRoom, slotsCount);
          } else {
            existingRoom.artworkSlots = [];
          }
        }
      }
    });
  }

  generateSlotPositions(room, slotsCount) {
    const slots = [];
    const { width, height, depth } = room.dimensions;
    const wallY = height * 0.5;
    const slotW = Math.min(2.5, (width - 2) / Math.ceil(slotsCount / 2));
    const slotH = Math.min(2, height * 0.4);
    
    const walls = [
      { name: 'left', xFn: () => -width / 2 + 0.1, zFn: (t) => (t - 0.5) * (depth - 4), rotWall: 'left' },
      { name: 'right', xFn: () => width / 2 - 0.1, zFn: (t) => (t - 0.5) * (depth - 4), rotWall: 'right' },
      { name: 'back', xFn: (t) => (t - 0.5) * (width - 4), zFn: () => -depth / 2 + 0.1, rotWall: 'back' }
    ];

    let slotIndex = 0;
    for (let wallIdx = 0; wallIdx < walls.length && slotIndex < slotsCount; wallIdx++) {
      const wall = walls[wallIdx];
      const slotsOnWall = wallIdx < 2 ? Math.ceil(slotsCount / 3) : slotsCount - slotIndex;
      
      for (let i = 0; i < slotsOnWall && slotIndex < slotsCount; i++) {
        const t = slotsOnWall === 1 ? 0.5 : i / (slotsOnWall - 1);
        const x = typeof wall.xFn === 'function' ? wall.xFn(t) : wall.xFn;
        const z = typeof wall.zFn === 'function' ? wall.zFn(t) : wall.zFn;
        
        slots.push({
          id: `slot_${slotIndex + 1}`,
          wall: wall.rotWall,
          position: { x, y: wallY, z },
          size: { w: slotW, h: slotH }
        });
        slotIndex++;
      }
    }
    
    return slots;
  }
}

const gallery = new VirtualGallery();
window.virtualGallery = gallery;
