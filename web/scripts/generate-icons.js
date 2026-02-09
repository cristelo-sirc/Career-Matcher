#!/usr/bin/env node

const sharp = require("sharp");
const path = require("path");

const PUBLIC_DIR = path.join(__dirname, "..", "public");
const BRAND_COLOR = "#0d9488"; // teal-600
const BRAND_DARK = "#0f766e"; // teal-700

function createIconSVG(size) {
  const fontSize = Math.round(size * 0.36);
  const cornerRadius = Math.round(size * 0.18);
  const yOffset = Math.round(size * 0.04);

  return Buffer.from(`
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${BRAND_COLOR}" />
          <stop offset="100%" style="stop-color:${BRAND_DARK}" />
        </linearGradient>
      </defs>
      <rect width="${size}" height="${size}" rx="${cornerRadius}" ry="${cornerRadius}" fill="url(#bg)" />
      <text
        x="${size / 2}"
        y="${size / 2 + yOffset}"
        text-anchor="middle"
        dominant-baseline="central"
        font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
        font-weight="700"
        font-size="${fontSize}"
        fill="white"
        letter-spacing="-1"
      >CM</text>
    </svg>
  `);
}

function createOGImageSVG() {
  return Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ogbg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f0fdfa" />
          <stop offset="100%" style="stop-color:#ccfbf1" />
        </linearGradient>
      </defs>
      <!-- Background -->
      <rect width="1200" height="630" fill="url(#ogbg)" />

      <!-- Top accent bar -->
      <rect width="1200" height="6" fill="${BRAND_COLOR}" />

      <!-- Icon -->
      <rect x="80" y="180" width="100" height="100" rx="18" ry="18" fill="${BRAND_COLOR}" />
      <text x="130" y="240" text-anchor="middle" dominant-baseline="central"
            font-family="system-ui, -apple-system, sans-serif" font-weight="700"
            font-size="40" fill="white">CM</text>

      <!-- Title -->
      <text x="210" y="215" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
            font-weight="700" font-size="42" fill="#0f172a">
        Discover Work Environments
      </text>
      <text x="210" y="265" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
            font-weight="700" font-size="42" fill="#0f172a">
        That Fit You
      </text>

      <!-- Subtitle -->
      <text x="80" y="360" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
            font-weight="400" font-size="24" fill="#475569">
        Answer 32 quick scenarios. See which real careers
      </text>
      <text x="80" y="395" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
            font-weight="400" font-size="24" fill="#475569">
        match your preferences. Free and private.
      </text>

      <!-- Footer line -->
      <line x1="80" y1="480" x2="1120" y2="480" stroke="#e2e8f0" stroke-width="1" />

      <!-- Footer text -->
      <text x="80" y="520" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
            font-weight="400" font-size="18" fill="#94a3b8">
        Career-Matcher  |  No sign-up  |  No data collected
      </text>

      <!-- Bottom accent bar -->
      <rect y="624" width="1200" height="6" fill="${BRAND_COLOR}" />
    </svg>
  `);
}

async function generateIcons() {
  console.log("Generating app icons and OG image...\n");

  const icons = [
    { name: "icon-512.png", size: 512 },
    { name: "icon-192.png", size: 192 },
    { name: "apple-touch-icon.png", size: 180 },
    { name: "favicon.ico", size: 32 },
  ];

  for (const { name, size } of icons) {
    const svg = createIconSVG(size);
    const outputPath = path.join(PUBLIC_DIR, name);
    await sharp(svg).resize(size, size).png().toFile(outputPath);
    console.log(`  Created ${name} (${size}x${size})`);
  }

  // OG Image
  const ogSvg = createOGImageSVG();
  const ogPath = path.join(PUBLIC_DIR, "og-image.png");
  await sharp(ogSvg).resize(1200, 630).png().toFile(ogPath);
  console.log("  Created og-image.png (1200x630)");

  console.log("\nAll assets generated in web/public/");
}

generateIcons().catch((err) => {
  console.error("Failed to generate icons:", err);
  process.exit(1);
});
