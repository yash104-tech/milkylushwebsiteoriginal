import type { ImgHTMLAttributes } from 'react'

type Props = {
  name: string
  widths: readonly number[]
  width: number
  height: number
  alt: string
  sizes?: string
  priority?: boolean
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'width' | 'height' | 'alt'>

/** Responsive AVIF/WebP picture. Width/height are always set so the browser reserves space (no CLS). */
export function Picture({ name, widths, width, height, alt, sizes = '100vw', priority, className, ...rest }: Props) {
  const set = (ext: string) => widths.map((w) => `/images/${name}-${w}.${ext} ${w}w`).join(', ')
  return (
    <picture>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img
        src={`/images/${name}-${widths[widths.length - 1]}.webp`}
        width={width}
        height={height}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className={className}
        {...rest}
      />
    </picture>
  )
}

/** Photography supplied from milkylush.com (cropped/optimised by scripts/optimize-images.mjs). */
export const photos = {
  village: { name: 'sourcing-village', widths: [640, 1024], width: 1024, height: 1024 },
  washing: { name: 'bottle-washing', widths: [640, 1024, 1344], width: 1344, height: 768 },
  crate: { name: 'bottle-crate', widths: [640, 1024], width: 1024, height: 464 },
  delivery: { name: 'delivery-rider', widths: [640, 700], width: 700, height: 618 },
} as const
