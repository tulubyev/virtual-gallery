import * as THREE from 'three';

export class TextureManager {
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
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          
          this.addToCache(url, texture);
          this.loadingQueue.delete(url);
          resolve(texture);
        },
        undefined,
        (error) => {
          console.warn(`Failed to load texture: ${url}`, error);
          this.loadingQueue.delete(url);
          resolve(this.createPlaceholderTexture());
        }
      );
    });

    this.loadingQueue.set(url, loadPromise);
    return loadPromise;
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
    
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
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
    if (index > -1) {
      this.accessOrder.splice(index, 1);
    }
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

  preloadTextures(urls) {
    return Promise.all(urls.map(url => this.loadTexture(url, 'low')));
  }

  disposeAll() {
    this.cache.forEach(texture => texture.dispose());
    this.cache.clear();
    this.accessOrder = [];
    this.loadingQueue.clear();
  }

  getLoadingProgress() {
    const total = this.loadingQueue.size + this.cache.size;
    const loaded = this.cache.size;
    return total > 0 ? loaded / total : 1;
  }
}

export class ArtworkLODManager {
  constructor(textureManager, camera) {
    this.textureManager = textureManager;
    this.camera = camera;
    this.artworkMeshes = new Map();
    this.lodDistances = {
      high: 10,
      medium: 25,
      low: 50
    };
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

    if (distance < this.lodDistances.high) {
      targetLOD = 'high';
    } else if (distance < this.lodDistances.medium) {
      targetLOD = 'medium';
    } else if (distance < this.lodDistances.low) {
      targetLOD = 'low';
    } else {
      targetLOD = 'placeholder';
    }

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
    } catch (error) {
      console.warn(`Failed to load LOD ${targetLOD} for artwork`, error);
    }
  }

  update() {
    this.artworkMeshes.forEach((info) => {
      this.updateLOD(info.mesh);
    });
  }

  setLODDistances(high, medium, low) {
    this.lodDistances = { high, medium, low };
  }

  unregisterArtwork(mesh) {
    this.artworkMeshes.delete(mesh.uuid);
  }

  dispose() {
    this.artworkMeshes.clear();
  }
}
