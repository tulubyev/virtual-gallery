const sharp = require('sharp');
const Jimp = require('jimp');
const CryptoJS = require('crypto-js');
const path = require('path');
const fs = require('fs');

class WatermarkService {
  constructor(options = {}) {
    this.logoPath = options.logoPath || path.join(__dirname, '../../public/assets/watermark-logo.png');
    this.secretKey = options.secretKey || process.env.WATERMARK_SECRET || 'virtgal-secret-2026';
  }

  async applyVisibleWatermark(imageBuffer, options = {}) {
    const {
      text = 'VirtGal.ru',
      opacity = 0.3,
      position = 'bottom-right',
      fontSize = 24,
      color = '#ffffff',
      useLogo = false
    } = options;

    const image = sharp(imageBuffer);
    const metadata = await image.metadata();
    const { width, height } = metadata;

    let overlay;

    if (useLogo && fs.existsSync(this.logoPath)) {
      const logoSize = Math.min(width, height) * 0.15;
      overlay = await sharp(this.logoPath)
        .resize(Math.round(logoSize), Math.round(logoSize), { fit: 'inside' })
        .ensureAlpha(opacity)
        .toBuffer();
    } else {
      const svgText = `
        <svg width="${width}" height="${height}">
          <style>
            .watermark { 
              fill: ${color}; 
              font-size: ${fontSize}px; 
              font-family: Arial, sans-serif;
              opacity: ${opacity};
            }
          </style>
          <text x="${width - 20}" y="${height - 20}" text-anchor="end" class="watermark">${text}</text>
        </svg>
      `;
      overlay = Buffer.from(svgText);
    }

    const positions = {
      'top-left': { left: 20, top: 20 },
      'top-right': { left: width - 200, top: 20 },
      'bottom-left': { left: 20, top: height - 60 },
      'bottom-right': { left: width - 200, top: height - 60 },
      'center': { left: Math.round(width / 2 - 100), top: Math.round(height / 2 - 30) }
    };

    const result = await image
      .composite([{
        input: overlay,
        gravity: position === 'center' ? 'center' : undefined,
        left: position !== 'center' ? positions[position]?.left : undefined,
        top: position !== 'center' ? positions[position]?.top : undefined
      }])
      .toBuffer();

    return result;
  }

  async applyTiledWatermark(imageBuffer, text = 'VirtGal.ru', options = {}) {
    const { opacity = 0.15, angle = -30, spacing = 150 } = options;
    
    const image = sharp(imageBuffer);
    const metadata = await image.metadata();
    const { width, height } = metadata;

    const tiles = [];
    for (let y = 0; y < height + 100; y += spacing) {
      for (let x = -100; x < width + 100; x += spacing) {
        tiles.push(`<text x="${x}" y="${y}" class="tile">${text}</text>`);
      }
    }

    const svgOverlay = `
      <svg width="${width}" height="${height}">
        <style>
          .tile { 
            fill: white; 
            font-size: 16px; 
            font-family: Arial, sans-serif;
            opacity: ${opacity};
          }
        </style>
        <g transform="rotate(${angle}, ${width/2}, ${height/2})">
          ${tiles.join('\n')}
        </g>
      </svg>
    `;

    const result = await image
      .composite([{ input: Buffer.from(svgOverlay) }])
      .toBuffer();

    return result;
  }

  async applyInvisibleWatermark(imageBuffer, data) {
    const image = await Jimp.read(imageBuffer);
    const width = image.getWidth();
    const height = image.getHeight();

    const payload = typeof data === 'object' ? JSON.stringify(data) : String(data);
    const encrypted = CryptoJS.AES.encrypt(payload, this.secretKey).toString();
    const binary = this.textToBinary(encrypted);

    let bitIndex = 0;
    const headerBits = this.textToBinary('VGAL');

    for (let y = 0; y < Math.min(height, 50); y++) {
      for (let x = 0; x < width && bitIndex < headerBits.length + binary.length; x++) {
        const pixelColor = image.getPixelColor(x, y);
        const rgba = Jimp.intToRGBA(pixelColor);

        if (bitIndex < headerBits.length) {
          rgba.b = (rgba.b & 0xFE) | parseInt(headerBits[bitIndex]);
        } else {
          const dataIdx = bitIndex - headerBits.length;
          if (dataIdx < binary.length) {
            rgba.b = (rgba.b & 0xFE) | parseInt(binary[dataIdx]);
          }
        }

        image.setPixelColor(Jimp.rgbaToInt(rgba.r, rgba.g, rgba.b, rgba.a), x, y);
        bitIndex++;
      }
    }

    const buffer = await image.getBufferAsync(Jimp.MIME_PNG);
    return buffer;
  }

  async extractInvisibleWatermark(imageBuffer) {
    try {
      const image = await Jimp.read(imageBuffer);
      const width = image.getWidth();
      const height = image.getHeight();

      let bits = '';
      const headerBits = this.textToBinary('VGAL');
      const maxBits = 50 * width;

      for (let y = 0; y < Math.min(height, 50); y++) {
        for (let x = 0; x < width && bits.length < maxBits; x++) {
          const pixelColor = image.getPixelColor(x, y);
          const rgba = Jimp.intToRGBA(pixelColor);
          bits += (rgba.b & 1).toString();
        }
      }

      const headerExtracted = bits.substring(0, headerBits.length);
      if (headerExtracted !== headerBits) {
        return { found: false, error: 'No watermark header found' };
      }

      const dataBits = bits.substring(headerBits.length);
      const encrypted = this.binaryToText(dataBits);

      const decrypted = CryptoJS.AES.decrypt(encrypted, this.secretKey);
      const payload = decrypted.toString(CryptoJS.enc.Utf8);

      try {
        return { found: true, data: JSON.parse(payload) };
      } catch {
        return { found: true, data: payload };
      }
    } catch (error) {
      return { found: false, error: error.message };
    }
  }

  async applySteganography(imageBuffer, metadata) {
    const payload = {
      id: metadata.id || this.generateId(),
      owner: metadata.owner || 'VirtGal',
      timestamp: new Date().toISOString(),
      hash: this.generateHash(imageBuffer),
      ...metadata
    };

    const image = await Jimp.read(imageBuffer);
    const width = image.getWidth();
    const height = image.getHeight();

    const marker = 'STEG';
    const json = JSON.stringify(payload);
    const encrypted = CryptoJS.AES.encrypt(json, this.secretKey).toString();
    const fullMessage = marker + ':' + encrypted.length.toString().padStart(6, '0') + ':' + encrypted;
    const binary = this.textToBinary(fullMessage);

    const channels = ['r', 'g', 'b'];
    let bitIndex = 0;

    outerLoop:
    for (let y = height - 1; y >= height - 100 && y >= 0; y--) {
      for (let x = 0; x < width; x++) {
        for (const channel of channels) {
          if (bitIndex >= binary.length) break outerLoop;

          const pixelColor = image.getPixelColor(x, y);
          const rgba = Jimp.intToRGBA(pixelColor);

          rgba[channel] = (rgba[channel] & 0xFE) | parseInt(binary[bitIndex]);
          image.setPixelColor(Jimp.rgbaToInt(rgba.r, rgba.g, rgba.b, rgba.a), x, y);
          bitIndex++;
        }
      }
    }

    const buffer = await image.getBufferAsync(Jimp.MIME_PNG);
    return { buffer, metadata: payload };
  }

  async extractSteganography(imageBuffer) {
    try {
      const image = await Jimp.read(imageBuffer);
      const width = image.getWidth();
      const height = image.getHeight();

      let bits = '';
      const channels = ['r', 'g', 'b'];
      const maxBits = 100 * width * 3;

      outerLoop:
      for (let y = height - 1; y >= height - 100 && y >= 0; y--) {
        for (let x = 0; x < width; x++) {
          for (const channel of channels) {
            if (bits.length >= maxBits) break outerLoop;

            const pixelColor = image.getPixelColor(x, y);
            const rgba = Jimp.intToRGBA(pixelColor);
            bits += (rgba[channel] & 1).toString();
          }
        }
      }

      const text = this.binaryToText(bits);
      
      if (!text.startsWith('STEG:')) {
        return { found: false, error: 'No steganographic marker found' };
      }

      const lengthStr = text.substring(5, 11);
      const length = parseInt(lengthStr, 10);
      const encrypted = text.substring(12, 12 + length);

      const decrypted = CryptoJS.AES.decrypt(encrypted, this.secretKey);
      const json = decrypted.toString(CryptoJS.enc.Utf8);

      return { found: true, metadata: JSON.parse(json) };
    } catch (error) {
      return { found: false, error: error.message };
    }
  }

  async applyAllProtection(imageBuffer, metadata, options = {}) {
    let result = imageBuffer;

    const stegResult = await this.applySteganography(result, metadata);
    result = stegResult.buffer;

    result = await this.applyInvisibleWatermark(result, {
      artworkId: metadata.id,
      protected: true,
      date: new Date().toISOString()
    });

    if (options.visibleWatermark !== false) {
      result = await this.applyVisibleWatermark(result, {
        text: options.watermarkText || 'VirtGal.ru',
        opacity: options.opacity || 0.25,
        position: options.position || 'bottom-right'
      });
    }

    return {
      buffer: result,
      metadata: stegResult.metadata,
      protection: {
        visible: options.visibleWatermark !== false,
        invisible: true,
        steganography: true
      }
    };
  }

  async verifyProtection(imageBuffer) {
    const invisibleResult = await this.extractInvisibleWatermark(imageBuffer);
    const stegResult = await this.extractSteganography(imageBuffer);

    return {
      invisibleWatermark: invisibleResult,
      steganography: stegResult,
      isProtected: invisibleResult.found || stegResult.found
    };
  }

  textToBinary(text) {
    return text.split('').map(char => 
      char.charCodeAt(0).toString(2).padStart(8, '0')
    ).join('');
  }

  binaryToText(binary) {
    const chars = [];
    for (let i = 0; i < binary.length; i += 8) {
      const byte = binary.substr(i, 8);
      if (byte.length === 8) {
        const charCode = parseInt(byte, 2);
        if (charCode === 0) break;
        chars.push(String.fromCharCode(charCode));
      }
    }
    return chars.join('');
  }

  generateId() {
    return 'vg_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }

  generateHash(buffer) {
    return CryptoJS.SHA256(CryptoJS.lib.WordArray.create(buffer)).toString().substring(0, 16);
  }
}

module.exports = WatermarkService;
