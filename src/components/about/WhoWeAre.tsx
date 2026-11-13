import { about } from '../../config/site'
import { Reveal } from '../ui/Reveal'

export function WhoWeAre() {
  return (
    <section id="who" aria-labelledby="who-title" className="relative bg-ivory py-20 sm:py-28">
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-3 lg:pt-3">
          <p className="eyebrow text-forest">Who we are</p>
        </Reveal>
        <div className="lg:col-span-9">
          <Reveal>
            <h2 id="who-title" className="text-[clamp(1.9rem,3.8vw,3.2rem)] font-[340] leading-[1.15] text-ink">
              MilkyLush is more than a milk delivery service. It is a movement towards a{' '}
              <em className="font-[300] text-forest">cleaner, simpler</em> way of living.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-2xl text-[1.075rem] leading-relaxed text-ink-soft">
              The idea is a simple one: fresh milk, without unnecessary processing and without plastic. From a few homes in Bangalore,
              we have grown into a name that families trust for quality and honesty — one morning delivery at a time.
            </p>
          </Reveal>

          <dl className="mt-14 grid gap-px overflow-hidden rounded-[24px] border border-forest/10 bg-forest/10 sm:grid-cols-3">
            {about.facts.map((f, i) => (
              <Reveal key={f.value} delay={i * 0.1} y={20} className="bg-ivory p-7">
                <dt className="font-serif text-[2.6rem] font-[320] leading-none text-forest">{f.value}</dt>
                <dd className="mt-3 text-[0.95rem] leading-snug text-ink-soft">{f.label}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
