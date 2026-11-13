// Social-share image and app icons. Re-run with `npm run meta-assets` after changing the source photo or favicon.
//  • public/images/og-milkylush.jpg — 1200×630 Open Graph / Twitter card image
//  • public/apple-touch-icon.png (180), public/icon-192.png, public/icon-512.png — from public/favicon.svg
import sharp from 'sharp'
import path from 'node:path'

const OG_SRC = path.resolve('_source-assets/generated/doorstep-delivery.webp') // delivery partner handing over a bottle
await sharp(OG_SRC)
  .resize({ width: 1200, height: 630, fit: 'cover', position: 'centre' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.resolve('public/images/og-milkylush.jpg'))

const svg = path.resolve('public/favicon.svg')
for (const [name, size] of [
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
]) {
  // Opaque square (iOS ignores transparency and would draw black corners).
  await sharp(svg, { density: 600 })
    .resize(size, size)
    .flatten({ background: '#174B35' })
    .png({ compressionLevel: 9 })
    .toFile(path.resolve('public', name))
}
console.log('og image + icons written')
