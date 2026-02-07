class TextureGenerator {
  static _hexToRgb(hex) {
    if (typeof hex === 'number') {
      return { r: (hex >> 16) & 255, g: (hex >> 8) & 255, b: hex & 255 };
    }
    hex = hex.replace('#', '');
    return {
      r: parseInt(hex.substring(0, 2), 16),
      g: parseInt(hex.substring(2, 4), 16),
      b: parseInt(hex.substring(4, 6), 16)
    };
  }

  static generateParquet(baseColor, size = 256) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const { r, g, b } = this._hexToRgb(baseColor);
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
        ctx.fillRect(x, y, plankW - 1, plankH - 1);
        ctx.strokeStyle = 'rgba(0,0,0,0.1)';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(x, y, plankW - 1, plankH - 1);
      }
    }
    return canvas;
  }

  static generateMarble(baseColor, size = 256) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const { r, g, b } = this._hexToRgb(baseColor);
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
      ctx.strokeStyle = `rgba(${Math.max(0, r - 40)},${Math.max(0, g - 40)},${Math.max(0, b - 40)},${0.05 + Math.random() * 0.1})`;
      ctx.lineWidth = 0.5 + Math.random();
      ctx.stroke();
    }
    return canvas;
  }

  static generateWall(baseColor, size = 128) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const { r, g, b } = this._hexToRgb(baseColor);
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
    return canvas;
  }

  static generateConcrete(baseColor, size = 128) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const { r, g, b } = this._hexToRgb(baseColor);
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
    return canvas;
  }

  static canvasToBlob(canvas) {
    return new Promise((resolve) => {
      canvas.toBlob(resolve, 'image/png');
    });
  }

  static getFloorTextureType(theme) {
    if (theme === 'classical' || theme === 'classic' || theme === 'impressionism') return 'parquet';
    if (theme === 'modern' || theme === 'contemporary' || theme === 'dark') return 'concrete';
    return 'marble';
  }

  static generateRoomTextures(room) {
    const textures = {};
    const floorType = this.getFloorTextureType(room.theme);
    const floorColor = room.floorColor || room.wallColor || '#4a3f35';
    const wallColor = room.wallColor || '#d4c5b9';

    if (floorType === 'parquet') {
      textures[`floor_${room.id}`] = this.generateParquet(floorColor, 256);
    } else if (floorType === 'concrete') {
      textures[`floor_${room.id}`] = this.generateConcrete(floorColor, 128);
    } else {
      textures[`floor_${room.id}`] = this.generateMarble(floorColor, 256);
    }

    textures[`wall_${room.id}`] = this.generateWall(wallColor, 128);

    return textures;
  }

  static async generateAndUploadAll(rooms, onProgress) {
    const totalSteps = rooms.length * 2 + 1;
    let currentStep = 0;

    const formData = new FormData();
    const textureKeys = [];

    for (const room of rooms) {
      if (onProgress) onProgress(++currentStep, totalSteps, `Генерация текстур: ${room.name}...`);

      const textures = this.generateRoomTextures(room);

      for (const [key, canvas] of Object.entries(textures)) {
        const blob = await this.canvasToBlob(canvas);
        formData.append(key, blob, `${key}.png`);
        textureKeys.push(key);
      }
    }

    if (onProgress) onProgress(++currentStep, totalSteps, 'Загрузка текстур в облако...');

    const response = await fetch('/api/gallery/textures', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Ошибка загрузки текстур');
    }

    const result = await response.json();
    return result.textureUrls;
  }
}

if (typeof window !== 'undefined') {
  window.TextureGenerator = TextureGenerator;
}
