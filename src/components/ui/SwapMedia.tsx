import type { ReactNode } from 'react'
import { Picture } from './Picture'

/** 4:5 card assets produced by scripts/optimize-images.mjs */
export const cardAsset = (name: string) => ({ name, widths: [400, 800] as const, width: 800, height: 1000 })

/**
 * Hover image-swap (as on doodhvalefarms.com product cards): the primary image fades
 * and eases out while a second, lifestyle image fades in and settles from a slight zoom.
 * Triggered by hovering or focusing anything inside the nearest `.group/swap` ancestor,
 * or by `swapped` (used for tap-to-swap on touch screens).
 */
export function SwapMedia({
  primary,
  hover,
  hoverAlt,
  hoverPosition,
  swapped = false,
  sizes,
  className = '',
}: {
  primary: ReactNode
  hover: string
  hoverAlt: string
  /** CSS object-position for the hover image when the frame crops it (e.g. "50% 30%") */
  hoverPosition?: string
  swapped?: boolean
  sizes: string
  className?: string
}) {
  const on = swapped ? 'opacity-0 scale-[1.04]' : ''
  const onHover = swapped ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.08]'
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className={`absolute inset-0 transition-[opacity,transform] duration-[300ms,600ms] ease-[var(--ease-silk)] group-hover/swap:scale-[1.04] group-hover/swap:opacity-0 group-focus-within/swap:opacity-0 ${on}`}
      >
        {primary}
      </div>
      <Picture
        {...cardAsset(hover)}
        alt={hoverAlt}
        sizes={sizes}
        style={hoverPosition ? { objectPosition: hoverPosition } : undefined}
        className={`absolute inset-0 size-full object-cover transition-[opacity,transform] duration-[400ms,900ms] ease-[var(--ease-silk)] group-hover/swap:scale-100 group-hover/swap:opacity-100 group-focus-within/swap:scale-100 group-focus-within/swap:opacity-100 ${onHover}`}
      />
    </div>
  )
}
