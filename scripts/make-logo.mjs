// Turns the supplied logo (green on white JPG) into transparent PNGs. Re-run with `npm run logo` after replacing the source.
//  • public/images/logo-forest.png — for light backgrounds (also public/images/logo.png, used in the JSON-LD)
//  • public/images/logo-ivory.png  — for the dark footer / mobile menu (wordmark in ivory, leaf stays green)
import sharp from 'sharp'
import path from 'node:path'

const SRC = path.resolve('_source-assets/milkylush-logo-2.jpg')
const OUT = path.resolve('public/images')
const WIDTH = 900
const IVORY = [250, 248, 241]
const INK_MIN = 23 // smallest channel of the darkest forest green in the artwork

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const { width, height } = info

const forest = Buffer.alloc(data.length)
const ivory = Buffer.alloc(data.length)
for (let i = 0; i < data.length; i += 4) {
  const r = data[i], g = data[i + 1], b = data[i + 2]
  // Ink coverage: how far the darkest channel is from white. Below ~6% is JPEG noise.
  let a = (255 - Math.min(r, g, b)) / (255 - INK_MIN)
  a = a < 0.06 ? 0 : Math.min(a, 1)
  // Un-mix the white background so edges keep their true colour.
  const un = (c) => (a === 0 ? 0 : Math.max(0, Math.min(255, Math.round((c - 255 * (1 - a)) / a))))
  const [R, G, B] = [un(r), un(g), un(b)]
  forest.set([R, G, B, Math.round(a * 255)], i)
  const isLeaf = 0.2126 * R + 0.7152 * G + 0.0722 * B > 90 // lighter green leaf; the wordmark is much darker
  ivory.set(isLeaf ? [R, G, B, Math.round(a * 255)] : [...IVORY, Math.round(a * 255)], i)
}

for (const [name, buf] of [['logo-forest.png', forest], ['logo-ivory.png', ivory]]) {
  const file = path.join(OUT, name)
  await sharp(buf, { raw: { width, height, channels: 4 } })
    .trim({ threshold: 1 }) // crop the empty margin around the artwork
    .resize({ width: WIDTH })
    .png({ compressionLevel: 9 })
    .toFile(file)
  const m = await sharp(file).metadata()
  console.log(name, m.width + '×' + m.height)
}
await sharp(path.join(OUT, 'logo-forest.png')).toFile(path.join(OUT, 'logo.png'))
