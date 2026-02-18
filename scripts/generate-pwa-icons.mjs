import sharp from "sharp";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

// Ensure public directory exists
mkdirSync(publicDir, { recursive: true });

// SVG template for the icon
const createSvg = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${size * 0.167}" fill="#0e100f"/>
  <rect x="${size * 0.083}" y="${size * 0.083}" width="${size * 0.833}" height="${size * 0.833}" rx="${size * 0.125}" fill="#0ae448"/>
  <text x="${size / 2}" y="${size * 0.667}" font-family="Arial, sans-serif" font-size="${size * 0.52}" font-weight="bold" fill="#0e100f" text-anchor="middle">G</text>
</svg>
`;

async function generateIcons() {
  const sizes = [192, 512];

  for (const size of sizes) {
    const svg = createSvg(size);
    const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

    writeFileSync(join(publicDir, `pwa-${size}x${size}.png`), pngBuffer);
    console.log(`Generated pwa-${size}x${size}.png`);
  }

  // Also generate apple-touch-icon (180x180)
  const appleSvg = createSvg(180);
  const appleBuffer = await sharp(Buffer.from(appleSvg)).png().toBuffer();
  writeFileSync(join(publicDir, "apple-touch-icon.png"), appleBuffer);
  console.log("Generated apple-touch-icon.png");

  console.log("Done!");
}

generateIcons().catch(console.error);
