const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SIZES = {
  thumbnail: { width: 300, height: 300, suffix: 'thumb', fit: 'cover' },
  medium: { width: 800, height: 800, suffix: 'med', fit: 'inside' },
};

async function processImage(filePath, originalFilename) {
  const ext = path.extname(originalFilename);
  const baseName = path.basename(originalFilename, ext);
  const dir = path.dirname(filePath);
  const results = {};

  for (const [key, config] of Object.entries(SIZES)) {
    const outputFilename = `${baseName}-${config.suffix}${ext === '.png' ? '.png' : '.jpg'}`;
    const outputPath = path.join(dir, outputFilename);

    try {
      const pipeline = sharp(filePath)
        .resize(config.width, config.height, {
          fit: config.fit || 'inside',
          withoutEnlargement: true,
          position: 'centre',
        });

      if (ext === '.png') {
        pipeline.png({ quality: 85 });
      } else {
        pipeline.jpeg({ quality: 85, mozjpeg: true });
      }

      await pipeline.toFile(outputPath);
      
      results[key] = {
        path: outputPath,
        filename: outputFilename,
        contentType: ext === '.png' ? 'image/png' : 'image/jpeg',
      };
    } catch (err) {
      console.error(`Error generating ${key} image:`, err.message);
    }
  }

  return results;
}

function cleanupFiles(filePaths) {
  for (const fp of filePaths) {
    try {
      if (fs.existsSync(fp)) fs.unlinkSync(fp);
    } catch (e) {}
  }
}

module.exports = { processImage, cleanupFiles, SIZES };
