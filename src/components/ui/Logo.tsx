/**
 * The official MilkyLush logo (transparent PNGs made by `npm run logo` from _source-assets/milkylush-logo-2.jpg).
 * The size follows the font-size of `className`, as the old typographic wordmark did.
 */
export function Logo({ tone = 'forest', className = '' }: { tone?: 'forest' | 'ivory'; withTagline?: boolean; className?: string }) {
  return (
    <img
      src={tone === 'forest' ? '/images/logo-forest.png' : '/images/logo-ivory.png'}
      alt="MilkyLush — Flavour of Purity"
      width={900}
      height={222}
      decoding="async"
      className={`block h-[2.9em] w-auto select-none ${className}`}
    />
  )
}
