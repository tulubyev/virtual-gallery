import * as THREE from 'three';

export class ProceduralTextures {
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
