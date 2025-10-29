// Simple PNG icon generator to satisfy PWA install criteria (192x192, 512x512)
// Generates solid color squares using brand blue.
import { PNG } from 'pngjs';
import fs from 'node:fs';
import path from 'node:path';

const brand = { r: 37, g: 99, b: 235, a: 255 }; // #2563eb
const outDir = path.join(process.cwd(), 'public', 'icons');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeSolidPng(size, filename) {
  const png = new PNG({ width: size, height: size });
  for (let y = 0; y < png.height; y++) {
    for (let x = 0; x < png.width; x++) {
      const idx = (png.width * y + x) << 2;
      png.data[idx] = brand.r;
      png.data[idx + 1] = brand.g;
      png.data[idx + 2] = brand.b;
      png.data[idx + 3] = brand.a;
    }
  }
  return new Promise((resolve, reject) => {
    const filePath = path.join(outDir, filename);
    png
      .pack()
      .pipe(fs.createWriteStream(filePath))
      .on('finish', () => resolve(filePath))
      .on('error', reject);
  });
}

async function run() {
  ensureDir(outDir);
  const targets = [
    { size: 180, file: 'icon-180.png' },
    { size: 192, file: 'icon-192.png' },
    { size: 512, file: 'icon-512.png' },
  ];
  for (const t of targets) {
    const file = await writeSolidPng(t.size, t.file);
    console.log(`Generated ${t.size}x${t.size}: ${file}`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
