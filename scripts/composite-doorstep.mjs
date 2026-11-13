// Places two real MilkyLush bottles (public/images/hero-bottle.webp, cut out from the product photo) onto the
// generated doorstep scene so the delivery image shows MilkyLush bottles only. Output goes to
// _source-assets/generated/doorstep-milkylush.png and is picked up by scripts/optimize-images.mjs.
//
// Replace with a real photo of a doorstep delivery when you have one.
import sharp from 'sharp'
import path from 'node:path'

const SCENE = path.resolve('_source-assets/generated/reel-doorstep.png') // 768 x 1376, unbranded bottles on a mat
const OUT = path.resolve('_source-assets/generated/doorstep-milkylush.png')
const BOTTLE_H = 360 // new bottle height in the scene (the old ones were ~265 px tall)
const BASE_Y = 1112 // bottom of the bottles on the mat
const CENTERS = [405, 520] // bottle centre lines (px) — wide enough to fully cover the old bottles

// Solid-neck variant of the cut-out so the bottles underneath cannot show through the clear glass.
const raw = await sharp(path.resolve('_source-assets/generated/bottle-500ml-cutout.webp')).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const { width: bw, height: bh } = raw.info
const px = Buffer.from(raw.data)
const MILK_ROW = 154 // rows above this (in the cut-out) are clear glass
for (let y = 0; y < bh; y++) {
  for (let x = 0; x < bw; x++) {
    const i = (y * bw + x) * 4
    if (y < MILK_ROW + 6 && px[i + 3] > 30) {
      px[i + 3] = 240
      // tone the pale backdrop seen through the glass down towards the warm scene
      px[i] = Math.round(px[i] * 0.78)
      px[i + 1] = Math.round(px[i + 1] * 0.74)
      px[i + 2] = Math.round(px[i + 2] * 0.66)
    }
  }
}
const bottle = await sharp(px, { raw: { width: bw, height: bh, channels: 4 } }).resize({ height: BOTTLE_H }).png().toBuffer()
const { width: w } = await sharp(bottle).metadata()

const shadow = (cx) =>
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="768" height="1376"><defs><filter id="b"><feGaussianBlur stdDeviation="7"/></filter></defs>` +
      `<ellipse cx="${cx + 8}" cy="${BASE_Y - 4}" rx="${w * 0.52}" ry="11" fill="#2a1a0a" opacity="0.5" filter="url(#b)"/></svg>`,
  )

const layers = [
  ...CENTERS.map((cx) => ({ input: shadow(cx), left: 0, top: 0 })),
  ...CENTERS.map((cx) => ({ input: bottle, left: Math.round(cx - w / 2), top: BASE_Y - BOTTLE_H })),
]
await sharp(SCENE).composite(layers).png().toFile(OUT)
console.log('doorstep composite written →', OUT)
