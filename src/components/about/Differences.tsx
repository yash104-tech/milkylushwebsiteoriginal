import { motion } from 'motion/react'
import { about } from '../../config/site'
import { Picture, photos } from '../ui/Picture'
import { Reveal } from '../ui/Reveal'

export function Differences() {
  return (
    <section id="different" aria-labelledby="diff-title" className="relative overflow-hidden bg-sand py-24 sm:py-32">
      <div className="container-x">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow text-forest">What makes us different</p>
            <h2 id="diff-title" className="mt-4 text-[clamp(2.3rem,4.8vw,4rem)] font-[340] text-ink">
              Three simple choices, <em className="font-[300] text-forest">made on purpose.</em>
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col gap-20 sm:gap-28">
          {about.differences.map((d, i) => (
            <article key={d.kicker} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
              <motion.div
                initial={{ opacity: 0, clipPath: 'inset(10% 8% 10% 8% round 26px)' }}
                whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 26px)' }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative aspect-[4/3] overflow-hidden rounded-[26px] bg-beige lg:col-span-7 ${i % 2 ? 'lg:order-2 lg:col-start-6' : ''}`}
              >
                <Picture
                  {...photos[d.photo]}
                  alt={d.alt}
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="size-full object-cover transition-transform duration-[1.6s] ease-[var(--ease-silk)] group-hover:scale-[1.04]"
                />
              </motion.div>
              <Reveal delay={0.1} className={`lg:col-span-5 ${i % 2 ? 'lg:order-1 lg:col-start-1 lg:row-start-1' : ''}`}>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4a7432]">
                  0{i + 1} — {d.kicker}
                </p>
                <h3 className="mt-4 text-[clamp(1.9rem,3.2vw,2.7rem)] font-[360] text-ink">{d.title}</h3>
                <p className="mt-4 max-w-md text-[1.05rem] leading-relaxed text-ink-soft">{d.body}</p>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
