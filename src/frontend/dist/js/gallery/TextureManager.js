import * as THREE from 'three';

export class TextureManager {
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
