import { about } from '../../config/site'
import { Reveal } from '../ui/Reveal'

export function MissionVision() {
  return (
    <section id="mission" aria-labelledby="mission-title" className="on-dark relative overflow-hidden bg-forest py-24 text-cream sm:py-32">
      <svg aria-hidden className="pointer-events-none absolute -right-20 -top-10 w-[420px] opacity-[0.1]" viewBox="0 0 300 300">
        <g fill="none" stroke="#8EBB70" strokeWidth="1.2" strokeLinecap="round">
          <path d="M280 20 C220 80 170 150 150 290" />
          <path d="M230 70 c-40 -10 -60 10 -70 40 c30 10 60 0 70 -40z" />
          <path d="M200 120 c40 -10 60 10 66 40 c-30 8 -58 -4 -66 -40z" />
          <path d="M178 170 c-40 -6 -58 16 -64 44 c30 6 56 -8 64 -44z" />
        </g>
      </svg>
      <div className="container-x relative grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow text-leaf">Our mission</p>
            <h2 id="mission-title" className="mt-5 text-[clamp(2.2rem,4.8vw,4.2rem)] font-[330] leading-[1.08] text-cream">
              “To give people healthier products while{' '}
              <em className="font-[300] text-leaf">protecting the planet from plastic.</em>”
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-10 text-xs font-bold uppercase tracking-[0.2em] text-leaf">Our vision</p>
            <p className="mt-3 max-w-xl font-serif text-[1.6rem] font-[340] leading-snug text-cream/90">
              A cleaner, healthier and more sustainable tomorrow.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-5">
          <div className="rounded-[28px] border border-cream/15 bg-cream/[0.06] p-8 sm:p-10">
            <p className="font-serif text-2xl text-cream">Every delivery is a step towards</p>
            <ol className="mt-6 space-y-4">
              {about.steps.map((s, i) => (
                <li key={s} className="flex items-center gap-4 border-t border-cream/10 pt-4 first:border-0 first:pt-0">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-leaf/20 text-sm font-bold text-leaf">{i + 1}</span>
                  <span className="text-[1.02rem] text-cream/90">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
