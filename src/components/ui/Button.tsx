import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'ghost' | 'light' | 'outline-light' | 'leaf'

const base =
  'group relative inline-flex min-h-12 cursor-pointer select-none items-center justify-center gap-3 overflow-hidden rounded-full px-6 py-3 text-[0.95rem] font-semibold tracking-[-0.005em] transition-[transform,background-color,color,box-shadow,border-color] duration-300 ease-[var(--ease-silk)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary:
    'bg-forest text-ivory shadow-[0_10px_30px_-12px_rgba(23,75,53,0.7)] hover:bg-forest-deep hover:shadow-[0_18px_40px_-14px_rgba(23,75,53,0.8)]',
  ghost: 'border border-forest/25 bg-white/40 text-forest hover:border-forest/60 hover:bg-white/80',
  light: 'bg-ivory text-forest-deep hover:bg-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)]',
  'outline-light': 'border border-ivory/35 text-ivory hover:border-ivory/80 hover:bg-ivory/10',
  leaf: 'bg-leaf text-forest-deep hover:bg-[#9dc781]',
}

/** Arrow that slides out and back in on hover — the shared CTA micro-interaction. */
function Arrow({ external }: { external?: boolean }) {
  const Icon = external ? ArrowUpRight : ArrowRight
  return (
    <span aria-hidden className="relative -mr-1 inline-flex size-7 items-center justify-center overflow-hidden rounded-full bg-current/10">
      <Icon className="size-4 transition-transform duration-500 ease-[var(--ease-silk)] group-hover:translate-x-[160%]" strokeWidth={2} />
      <Icon className="absolute size-4 -translate-x-[160%] transition-transform duration-500 ease-[var(--ease-silk)] group-hover:translate-x-0" strokeWidth={2} />
    </span>
  )
}

type Common = { variant?: Variant; children: ReactNode; icon?: ReactNode; arrow?: boolean; className?: string }

export function ButtonLink({ variant = 'primary', children, icon, arrow = true, className = '', ...rest }: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const external = rest.target === '_blank'
  return (
    <a {...rest} rel={external ? 'noopener noreferrer' : rest.rel} className={`${base} ${variants[variant]} ${className}`}>
      {icon}
      <span>{children}</span>
      {arrow && <Arrow external={external} />}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  )
}

export function Button({ variant = 'primary', children, icon, arrow = false, className = '', ...rest }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...rest} className={`${base} ${variants[variant]} ${className}`}>
      {icon}
      <span>{children}</span>
      {arrow && <Arrow />}
    </button>
  )
}
