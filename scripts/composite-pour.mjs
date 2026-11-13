// Replaces the generic "FRESH MILK" bottle in the generated pouring scene with the real MilkyLush bottle
// (public/images/hero-bottle.webp): cap removed, neck filled with milk (it is pouring), shoulder shortened so the
// label shows, glass shading added, tilted into the pour.
// Output: _source-assets/generated/milk-pour-milkylush.png  (picked up by scripts/optimize-images.mjs)
import sharp from 'sharp'
import path from 'node:path'

const SCENE = path.resolve('_source-assets/generated/milk-pour.png') // 928 x 1152
const OUT = path.resolve('_source-assets/generated/milk-pour-milkylush.png')

const SCALE = 1.1 // bottle size relative to the cut-out (covers the old bottle's thickness)
const ANGLE = -83 // degrees clockwise: neck pointing left, tilted a little for the pour
const MOUTH = { x: 482, y: 497 } // where the centre of the bottle's open mouth lands in the scene

const raw = await sharp(path.resolve('_source-assets/generated/bottle-500ml-cutout.webp')).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const { width: bw, height: bh } = raw.info
const px = Buffer.from(raw.data)

// 1. the pouring bottle's neck is full of milk: extend a plain-milk row upwards over the clear glass
const NECK_END = 154
const SRC_ROW = 172
for (let y = 0; y < NECK_END; y++) {
  for (let x = 0; x < bw; x++) {
    const i = (y * bw + x) * 4
    const j = (SRC_ROW * bw + x) * 4
    if (px[i + 3] <= 20) continue
    px[i] = px[j]; px[i + 1] = px[j + 1]; px[i + 2] = px[j + 2]; px[i + 3] = 255
  }
}

// 2. cylinder shading across the bottle's width (window light comes from the upper left of the scene, which is
//    the right-hand edge of the piece once it is rotated), plus a soft highlight stripe and darker glass edges
for (let y = 0; y < bh; y++) {
  for (let x = 0; x < bw; x++) {
    const i = (y * bw + x) * 4
    if (px[i + 3] < 20) continue
    const t = x / (bw - 1)
    let f = 0.8 + 0.2 * Math.pow(Math.sin(Math.PI * Math.min(1, t * 0.92 + 0.12)), 0.8) // darker towards the left edge
    f += 0.07 * Math.exp(-Math.pow((t - 0.78) / 0.06, 2)) // highlight stripe
    const edge = Math.min(1, Math.min(t, 1 - t) / 0.05)
    f *= 0.86 + 0.14 * edge // thin darker rim
    for (let c = 0; c < 3; c++) px[i + c] = Math.max(0, Math.min(255, Math.round(px[i + c] * f)))
  }
}
const full = sharp(px, { raw: { width: bw, height: bh, channels: 4 } }).png()
const fullBuf = await full.toBuffer()

// 3. assemble: cap-less top, a shorter straight neck, a compressed shoulder (so the label sits nearer the mouth), then the body
const slice = (top, height) => sharp(fullBuf).extract({ left: 0, top, width: bw, height }).png().toBuffer()
const CAP_ROW = 52, NECK_KEEP = 40, SHOULDER_FROM = 142, SHOULDER_TO = 402, SHOULDER_NEW = 150
const part1 = await slice(CAP_ROW, NECK_KEEP)
const shoulder = await sharp(await slice(SHOULDER_FROM, SHOULDER_TO - SHOULDER_FROM)).resize({ width: bw, height: SHOULDER_NEW, fit: 'fill' }).png().toBuffer()
const body = await slice(SHOULDER_TO, bh - SHOULDER_TO)
const pieceH = NECK_KEEP + SHOULDER_NEW + (bh - SHOULDER_TO)
const piece = await sharp({ create: { width: bw, height: pieceH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite([
    { input: part1, left: 0, top: 0 },
    { input: shoulder, left: 0, top: NECK_KEEP },
    { input: body, left: 0, top: NECK_KEEP + SHOULDER_NEW },
  ])
  .png()
  .toBuffer()

const sw = Math.round(bw * SCALE), sh = Math.round(pieceH * SCALE)
const scaled = await sharp(piece).resize({ width: sw, height: sh }).png().toBuffer()
const rotated = await sharp(scaled).rotate(ANGLE, { background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer()
const rm = await sharp(rotated).metadata()

// where the mouth centre (top-centre of the piece) ends up after rotating about the image centre
const th = (ANGLE * Math.PI) / 180
const ry = 0 - sh / 2
const mx = rm.width / 2 + (0 * Math.cos(th) - ry * Math.sin(th))
const my = rm.height / 2 + (0 * Math.sin(th) + ry * Math.cos(th))

// the bottle runs off the right edge, so composite on a wider canvas and crop back to the scene size
const meta = await sharp(SCENE).metadata()
const wide = await sharp(SCENE).extend({ right: 700, bottom: 300, background: '#000' }).png().toBuffer()
const combined = await sharp(wide)
  .composite([{ input: rotated, left: Math.round(MOUTH.x - mx), top: Math.round(MOUTH.y - my) }])
  .png()
  .toBuffer()
await sharp(combined).extract({ left: 0, top: 0, width: meta.width, height: meta.height }).png().toFile(OUT)
console.log('pour composite written →', OUT)
