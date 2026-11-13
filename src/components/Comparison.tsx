import { motion } from 'motion/react'
import { Check, X } from 'lucide-react'
import { comparison } from '../config/site'
import { MilkBottle } from './MilkBottle'
import { MalaiIllustration } from './MalaiIllustration'
import { SplitWords } from './ui/SplitWords'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * Illustrated branded plastic milk pouch. The brand ("Daily Dairy") is invented so no real company's name or
 * logo is shown — swap in a photo you have the rights to if you prefer.
 */
function Packet() {
  return (
    <svg viewBox="0 0 140 190" className="h-full w-auto" role="img" aria-label="A plastic pouch of toned milk from a generic dairy brand">
      <defs>
        <linearGradient id="pk-film" x1="0" x2="1">
          <stop offset="0" stopColor="#e4ebf3" />
          <stop offset="0.22" stopColor="#ffffff" />
          <stop offset="0.7" stopColor="#f1f5fa" />
          <stop offset="1" stopColor="#cdd7e3" />
        </linearGradient>
        <linearGradient id="pk-blue" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#2a6fc4" />
          <stop offset="1" stopColor="#1b4f98" />
        </linearGradient>
        <clipPath id="pk-body">
          <path d="M20 22 Q70 16 120 22 Q128 34 126 96 Q125 150 122 166 Q70 172 18 166 Q15 150 14 96 Q12 34 20 22 Z" />
        </clipPath>
      </defs>
      <ellipse cx="70" cy="178" rx="52" ry="5" fill="#000" opacity="0.12" />
      {/* body: the pouch bulges in the middle and pinches at the sealed ends */}
      <path d="M20 22 Q70 16 120 22 Q128 34 126 96 Q125 150 122 166 Q70 172 18 166 Q15 150 14 96 Q12 34 20 22 Z" fill="url(#pk-film)" stroke="#b6c2d0" strokeWidth="1.2" />
      <g clipPath="url(#pk-body)">
        {/* crimped seals */}
        <path d="M12 12 H128 V30 H12Z" fill="#dbe3ec" />
        <path d="M12 160 H128 V176 H12Z" fill="#dbe3ec" />
        {Array.from({ length: 26 }).map((_, i) => (
          <path key={i} d={`M${14 + i * 4.5} 14 v14 M${14 + i * 4.5} 162 v12`} stroke="#b6c2d0" strokeWidth="1" />
        ))}
        {/* print */}
        <path d="M12 48 Q70 40 128 48 V62 Q70 54 12 62Z" fill="#d7332b" />
        <rect x="12" y="62" width="116" height="60" fill="url(#pk-blue)" />
        <text x="70" y="86" textAnchor="middle" fontFamily="Georgia, serif" fontSize="17" fontWeight="700" fill="#fff">
          Daily
        </text>
        <text x="70" y="104" textAnchor="middle" fontFamily="Georgia, serif" fontSize="17" fontWeight="700" fill="#fff">
          Dairy
        </text>
        <path d="M12 122 H128 V150 H12Z" fill="#fff" />
        <text x="70" y="136" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="700" fill="#1b4f98" letterSpacing="0.6">
          TONED MILK
        </text>
        <text x="70" y="146" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="7" fill="#5d6b7c">
          500 ml
        </text>
        {/* film highlights */}
        <path d="M28 40 Q24 96 30 156" stroke="#fff" strokeOpacity="0.85" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M112 44 Q118 96 112 152" stroke="#fff" strokeOpacity="0.35" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  )
}

export function Comparison() {
  const { rows, reuse, footnote } = comparison
  const reusePct = Math.min(100, (reuse.glass / 40) * 100)

  return (
    <section id="compare" aria-labelledby="compare-title" className="relative overflow-hidden bg-ivory py-24 sm:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-forest">Glass vs plastic</p>
          <h2 id="compare-title" className="mt-4 text-[clamp(2.4rem,5.4vw,4.6rem)] font-[340] text-ink">
            <SplitWords text="Small change," wordClass="" /> <em className="font-[300] text-forest">big difference.</em>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[1.075rem] text-ink-soft">
            The same morning glass of milk — packed in a very different way.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-2 lg:gap-8">
          {/* Packet */}
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease }}
            aria-labelledby="cmp-packet"
            className="rounded-[28px] border border-forest/10 bg-white/60 p-7 sm:p-10"
          >
            <div className="flex items-end gap-5">
              <div className="h-32 shrink-0 sm:h-40">
                <Packet />
              </div>
              <div>
                <h3 id="cmp-packet" className="font-serif text-[1.6rem] leading-tight text-ink sm:text-[2rem]">
                  Typical plastic-packed milk
                </h3>
                <p className="mt-1 text-sm text-ink-soft">Single-use packet</p>
              </div>
            </div>
            <dl className="mt-8 divide-y divide-forest/10">
              {rows.map((r) => (
                <div key={r.aspect} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="text-xs font-bold uppercase tracking-[0.16em] text-ink-soft">{r.aspect}</dt>
                  <dd className="flex gap-3 text-[0.98rem] text-ink-soft">
                    <X className="mt-1 size-4 shrink-0 text-[#a0662a]" aria-hidden />
                    {r.packet}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-6">
              <p className="mb-2 flex justify-between text-sm text-ink-soft">
                <span>Times the packaging is reused</span>
                <span className="font-semibold text-ink">{comparison.reuse.plastic}</span>
              </p>
              <div className="h-2.5 overflow-hidden rounded-full bg-forest/10" aria-hidden>
                <motion.div
                  className="h-full origin-left rounded-full bg-[#b9ad96]"
                  style={{ width: `${(reuse.plastic / 40) * 100}%` }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease }}
                />
              </div>
            </div>
          </motion.article>

          {/* MilkyLush */}
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.12, ease }}
            aria-labelledby="cmp-lush"
            className="on-dark relative overflow-hidden rounded-[28px] bg-forest p-7 text-cream shadow-[0_40px_80px_-40px_rgba(15,52,36,0.7)] sm:p-10"
          >
            <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-leaf/20 blur-3xl" />
            <div className="relative flex items-end gap-5">
              <div className="h-28 shrink-0 sm:h-36">
                <MilkBottle animatedMilk={false} className="h-full w-auto" title="" />
              </div>
              <div>
                <h3 id="cmp-lush" className="font-serif text-[1.6rem] leading-tight sm:text-[2rem]">
                  MilkyLush
                </h3>
                <p className="mt-1 text-sm text-cream/70">Reusable glass bottle</p>
              </div>
            </div>
            <dl className="relative mt-8 divide-y divide-cream/15">
              {rows.map((r) => (
                <div key={r.aspect} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="text-xs font-bold uppercase tracking-[0.16em] text-leaf">{r.aspect}</dt>
                  <dd className="flex gap-3 text-[0.98rem] text-cream">
                    <Check className="mt-1 size-4 shrink-0 text-leaf" aria-hidden />
                    {r.lush}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="relative mt-6">
              <p className="mb-2 flex justify-between text-sm text-cream/75">
                <span>Times the packaging is reused</span>
                <span className="font-semibold text-cream">{reuse.label}</span>
              </p>
              <div className="h-2.5 overflow-hidden rounded-full bg-cream/15" aria-hidden>
                <motion.div
                  className="h-full origin-left rounded-full bg-leaf"
                  style={{ width: `${reusePct}%` }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, delay: 0.3, ease }}
                />
              </div>
            </div>
          </motion.article>
        </div>

        <MalaiIllustration />

        <p className="mx-auto mt-8 max-w-xl text-center text-sm text-ink-soft">{footnote}</p>
      </div>
    </section>
  )
}
