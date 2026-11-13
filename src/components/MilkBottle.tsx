/**
 * The real MilkyLush 1 litre bottle, cut out of the product photo (_source-assets/product-1l-photo.webp)
 * (scripts/cut-hero-bottle.mjs → public/images/hero-bottle.*). Swap the source photo and re-run the
 * script to update every place the bottle appears. `animatedMilk` is kept for API compatibility.
 */
export function MilkBottle({
  className = '',
  title = 'MilkyLush 1 litre reusable glass milk bottle with a green cap',
  priority = false,
}: {
  className?: string
  animatedMilk?: boolean
  title?: string
  priority?: boolean
}) {
  return (
    <picture>
      <source type="image/avif" srcSet="/images/hero-bottle.avif" />
      <source type="image/webp" srcSet="/images/hero-bottle.webp" />
      <img
        src="/images/hero-bottle.webp"
        width={400}
        height={1133}
        alt={title}
        aria-hidden={title ? undefined : true}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        draggable={false}
        className={className}
      />
    </picture>
  )
}
