// Cuts the real MilkyLush 1 litre bottle photo (_source-assets/product-1l-photo.webp) out of its kitchen backdrop and
// writes transparent AVIF/WebP to public/images/hero-bottle.*, used everywhere the bottle appears on the site.
//
// The silhouette is an explicit outline (half-width of the bottle at given rows, measured on the photo), mirrored around
// the bottle's centre line — the clear glass is almost invisible against the blurred backdrop, so edge-detecting it was
// unreliable. Above the milk line the clear glass is made semi-transparent so the page colour shows through it (works
// on light and dark sections).
//
// Replace the source photo and re-run:  node scripts/cut-hero-bottle.mjs   (a different photo needs the OUTLINE
// numbers re-measured). The previous 500 ml cut-out is kept in _source-assets/generated/bottle-500ml-cutout.webp.
import sharp from 'sharp'
import path from 'node:path'

const SRC = path.resolve('_source-assets/product-1l-photo.webp') // 1024 x 1536
const CX = 511 // bottle centre line (px)
const MILK_LINE = 215 // rows above this are clear glass
const CROP = { left: 255, top: 38, width: 512, height: 1450 }
const OUT_WIDTH = 400 // final width; the height follows
// [row, half-width] pairs, linearly interpolated then smoothed
const OUTLINE = [
  [46, 100], [52, 116], [62, 122], [100, 126], [108, 112], [120, 108], // cap and lip
  [215, 106], [225, 109], [260, 130], [300, 141], [340, 155], [380, 170], [420, 186], [460, 200], [500, 212], [540, 222], [580, 230], [620, 235], [660, 237], // neck → shoulder
  [1380, 237], [1420, 236], [1445, 228], [1465, 205], [1480, 150], // body → rounded base
]

const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true })
const W = info.width, H = info.height

const half = new Array(H).fill(0)
for (let i = 0; i < OUTLINE.length - 1; i++) {
  const [y0, h0] = OUTLINE[i], [y1, h1] = OUTLINE[i + 1]
  for (let y = y0; y <= y1; y++) half[y] = h0 + ((h1 - h0) * (y - y0)) / (y1 - y0)
}
const top = OUTLINE[0][0], bottom = OUTLINE[OUTLINE.length - 1][0]
const smooth = half.map((_, y) => {
  if (y < top || y > bottom) return 0
  let s = 0, n = 0
  for (let k = -4; k <= 4; k++) { s += half[Math.min(bottom, Math.max(top, y + k))]; n++ }
  return s / n
})

const L = (x, y) => { const i = (y * W + x) * 3; return 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2] }
const mask = Buffer.alloc(W * H)
for (let y = top; y <= bottom; y++) {
  const bgL = (L(CX - 330, y) + L(CX + 330, y)) / 2
  for (let x = Math.round(CX - smooth[y]); x <= Math.round(CX + smooth[y]); x++) {
    let a = 255
    if (y > top + 62 && y < MILK_LINE) a = Math.round(255 * Math.min(1, 0.22 + Math.abs(L(x, y) - bgL) / 34)) // clear glass
    mask[y * W + x] = a
  }
}

const alpha = await sharp(mask, { raw: { width: W, height: H, channels: 1 } }).blur(0.9).extractChannel(0).raw().toBuffer()
const out = await sharp(data, { raw: { width: W, height: H, channels: 3 } })
  .joinChannel(alpha, { raw: { width: W, height: H, channels: 1 } })
  .png()
  .toBuffer()
const crop = () => sharp(out).extract(CROP).resize({ width: OUT_WIDTH })
await crop().avif({ quality: 64, effort: 6 }).toFile(path.resolve('public/images/hero-bottle.avif'))
await crop().webp({ quality: 90, alphaQuality: 95 }).toFile(path.resolve('public/images/hero-bottle.webp'))
const meta = await sharp(path.resolve('public/images/hero-bottle.webp')).metadata()

// review sheet: the cut-out over dark green and over the hero cream
const piece = await crop().toBuffer()
await sharp({ create: { width: meta.width * 2 + 10, height: meta.height, channels: 3, background: '#f6efd9' } })
  .composite([
    { input: await sharp({ create: { width: meta.width, height: meta.height, channels: 3, background: '#174B35' } }).png().toBuffer(), left: 0, top: 0 },
    { input: piece, left: 0, top: 0 },
    { input: piece, left: meta.width + 10, top: 0 },
  ])
  .png()
  .toFile(path.resolve(process.env.TEMP ?? '.', 'bottle-review3.png'))
console.log(`hero bottle cut-out written (${meta.width}x${meta.height}); review sheet in %TEMP%/bottle-review3.png`)
