// Crops and converts MilkyLush photos into responsive AVIF + WebP files under public/images.
//  • _source-assets/            — photos downloaded from milkylush.com
//  • _source-assets/generated/  — AI-generated imagery (Figma AI, Oct 2026) — replace with real shoots when available
// Re-run with `npm run images` after replacing any source photo.
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const SRC = path.resolve('_source-assets')
const OUT = path.resolve('public/images')
const WIDTHS = [640, 1024, 1600]
// Optional: `npm run images -- founder` only processes assets whose name contains the filter.
const only = process.argv[2]


/** Free-form crops. crop: { left, top, width, height } in source pixels — used to remove baked-in marketing text */
const jobs = [
  { src: 'onboard02.jpeg', name: 'sourcing-village' },
  { src: 'slider5.jpg', name: 'bottle-washing' },
  { src: 'blog 2 cleaning.jpg', name: 'bottle-crate', crop: { left: 0, top: 560, width: 1024, height: 464 } },
  { src: 'blog-main.jpg', name: 'delivery-rider', crop: { left: 0, top: 150, width: 700, height: 618 } },
  { src: 'generated/curd-tub.webp', name: 'curd', widths: [640, 1024] }, // MilkyLush Traditional Curd tub (supplied)
  { src: 'malai/malai-packet.webp', name: 'malai-packet', widths: [640, 1024, 1536] }, // packet vs raw-milk malai comparison (supplied)
  { src: 'malai/malai-lush.webp', name: 'malai-lush', widths: [640, 1024, 1536] },
  { src: 'generated/app-doorstep.webp', name: 'app-doorstep', widths: [640, 1024], crop: { left: 0, top: 170, width: 1024, height: 1280 } },
  { src: 'milkylush logo.png', name: 'logo', crop: { left: 260, top: 850, width: 1410, height: 320 }, widths: [600], png: true },
]

/**
 * Fixed-aspect assets for the product cards (4:5) and reel covers (9:16).
 * fit 'contain' pads cut-out product shots on white so every card lines up.
 */
const CARD = { w: 800, h: 1000, widths: [400, 800] }
const REEL = { w: 720, h: 1280, widths: [360, 720] }
const framed = [
  // product cards — primary image
  { src: 'product-1l-photo.webp', name: 'card-milk', ...CARD, blurFill: true }, // the real 1 L product photo
  { src: 'generated/ghee-jar.webp', name: 'card-ghee', ...CARD, fit: 'contain' }, // supplied MilkyLush ghee jar on white
  { src: 'generated/ghee-jar.webp', name: 'ghee', w: 1024, h: 1024, widths: [640, 1024], fit: 'contain' },
  { src: 'generated/paneer-jar.webp', name: 'card-paneer', ...CARD }, // MilkyLush paneer jar (supplied, square source cropped to 4:5)
  { src: 'generated/curd-tub.webp', name: 'card-curd', ...CARD }, // square source cropped to 4:5 around the tub
  { src: 'coconut oil.webp', name: 'card-coconut-oil', ...CARD, fit: 'contain' },
  { src: 'coconut oil.webp', name: 'coconut-oil', w: 1024, h: 1024, widths: [640, 1024], fit: 'contain' },
  { src: 'groundnut.webp', name: 'card-groundnut-oil', ...CARD, fit: 'contain' },
  { src: 'groundnut.webp', name: 'groundnut-oil', w: 1024, h: 1024, widths: [640, 1024], fit: 'contain' },
  // product cards — hover image (generated lifestyle shots)
  // real MilkyLush bottle composited into the pouring scene (scripts/composite-pour.mjs)
  { src: 'generated/milk-breakfast-lush.webp', name: 'hover-milk', ...CARD, position: 'right' }, // MilkyLush bottle on a breakfast table (supplied)
  { src: 'generated/ghee-dosa.webp', name: 'hover-ghee', w: 1000, h: 1000, widths: [400, 800], crop: { left: 150, top: 0, width: 1162, height: 1199 } }, // ghee poured on a dosa, MilkyLush jar beside it (supplied)
  { src: 'generated/paneer-bowl.png', name: 'hover-paneer', ...CARD },
  { src: 'generated/curd-scoop.png', name: 'hover-curd', ...CARD },
  { src: 'generated/coconut-oil-pour.png', name: 'hover-coconut-oil', ...CARD },
  { src: 'generated/groundnut-oil.png', name: 'hover-groundnut-oil', ...CARD },
  // founders (supplied photos) — 4:5 portrait crops
  { src: 'founder-yashwanth.webp', name: 'founder-yashwanth', ...CARD, crop: { left: 230, top: 0, width: 916, height: 1145 } },
  { src: 'founder-gokul.webp', name: 'founder-gokul', ...CARD, crop: { left: 150, top: 0, width: 978, height: 1223 } },
  // reel covers — the original Instagram thumbnails (360x640, saved from each reel's cover; don't upscale)
  { src: 'reels/DUqMVJJFa4M.jpg', name: 'ig-DUqMVJJFa4M', w: 360, h: 640, widths: [360] },
  { src: 'reels/DU8hUa4FBhE.jpg', name: 'ig-DU8hUa4FBhE', w: 360, h: 640, widths: [360] },
  { src: 'reels/DTaSXUDE7Hj.jpg', name: 'ig-DTaSXUDE7Hj', w: 360, h: 640, widths: [360] },
  { src: 'reels/DVQn__SjDqv.jpg', name: 'ig-DVQn__SjDqv', w: 360, h: 640, widths: [360] },
  { src: 'reels/DVlWieHEb7p.jpg', name: 'ig-DVlWieHEb7p', w: 360, h: 640, widths: [360] },
  // reel covers
  // the doorstep scene with real MilkyLush bottles placed on it (scripts/composite-doorstep.mjs)
  // delivery-journey steps 1-3 (supplied images)
  { src: 'generated/journey-sourcing.webp', name: 'journey-sourcing', w: 768, h: 576, widths: [384, 768] },
  { src: 'generated/journey-bottling.webp', name: 'journey-bottling', w: 768, h: 576, widths: [384, 768] },
  { src: 'generated/journey-prep.webp', name: 'journey-prep', w: 768, h: 576, widths: [384, 768] },
  { src: 'generated/doorstep-delivery.webp', name: 'journey-doorstep', w: 768, h: 576, widths: [384, 768] }, // MilkyLush delivery partner handing a bottle to a customer (supplied)
]

await mkdir(OUT, { recursive: true })
for (const job of jobs) {
  if (only && !job.name.includes(only)) continue
  const srcMeta = await (job.crop ? sharp(path.join(SRC, job.src)).extract(job.crop) : sharp(path.join(SRC, job.src))).toBuffer({ resolveWithObject: true })
  const maxW = srcMeta.info.width
  const widths = job.widths ?? [...WIDTHS.filter((w) => w < maxW), ...(WIDTHS.some((w) => w >= maxW) ? [maxW] : [])]
  for (const w of widths) {
    const base = () => {
      let img = sharp(path.join(SRC, job.src))
      if (job.crop) img = img.extract(job.crop)
      return img.resize({ width: w, withoutEnlargement: true })
    }
    if (job.png) {
      await base().png({ compressionLevel: 9 }).toFile(path.join(OUT, `${job.name}.png`))
      continue
    }
    await base().avif({ quality: 52 }).toFile(path.join(OUT, `${job.name}-${w}.avif`))
    await base().webp({ quality: 74 }).toFile(path.join(OUT, `${job.name}-${w}.webp`))
  }
  console.log(`${job.name}: ${maxW}x${srcMeta.info.height} -> ${widths.join(', ')}`)
}

for (const job of framed) {
  if (only && !job.name.includes(only)) continue
  for (const w of job.widths) {
    const h = Math.round((w * job.h) / job.w)
    let img = sharp(path.join(SRC, job.src))
    if (job.crop) img = img.extract(job.crop)
    let buf
    if (job.blurFill) {
      // whole image fitted to the frame height; the leftover width is filled by mirroring the photo's own edges (seamless)
      const front = await sharp(await img.toBuffer()).resize({ height: h }).toBuffer()
      const fm = await sharp(front).metadata()
      const pad = Math.max(0, w - fm.width)
      const left = Math.floor(pad / 2)
      buf = await sharp(front).extend({ left, right: pad - left, extendWith: 'mirror' }).flatten({ background: '#ffffff' }).toBuffer()
    } else {
      buf = await img
        .resize({ width: w, height: h, fit: job.fit ?? 'cover', position: job.position ?? 'centre', background: '#ffffff' })
        .flatten({ background: '#ffffff' })
        .toBuffer()
    }
    await sharp(buf).avif({ quality: 52 }).toFile(path.join(OUT, `${job.name}-${w}.avif`))
    await sharp(buf).webp({ quality: 76 }).toFile(path.join(OUT, `${job.name}-${w}.webp`))
  }
  console.log(`${job.name}: ${job.widths.join(', ')}`)
}
