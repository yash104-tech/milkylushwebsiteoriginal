import { motion } from 'motion/react'
import { about, founders } from '../config/site'
import { Picture } from './ui/Picture'
import { Reveal } from './ui/Reveal'
import { ButtonLink } from './ui/Button'

const asset = (name: string) => ({ name, widths: [400, 800] as const, width: 800, height: 1000 })

/** Home-page "About us" — a short version of /about/, sitting between Glass Bottles and Journey in the page flow. */
export function AboutPreview() {
  return (
    <section id="about" aria-labelledby="about-preview-title" className="relative overflow-hidden bg-ivory py-24 sm:py-32">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow text-forest">About us</p>
            <h2 id="about-preview-title" className="mt-4 text-[clamp(2.4rem,5vw,4.4rem)] font-[340] leading-[1.04] text-ink">
              Two friends. <em className="font-[300] text-forest">One simple idea.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-xl text-[1.075rem] leading-relaxed text-ink-soft">
              MilkyLush began as a student idea by two childhood friends, Yashwanth Kumar J and Gokul Kumar E, who noticed how much plastic had
              quietly entered everyday life, right down to the milk packet on the kitchen counter. They set out to bring fresh milk to
              Bangalore homes in reusable glass instead.
            </p>
          </Reveal>

          <dl className="mt-10 grid gap-px overflow-hidden rounded-[24px] border border-forest/10 bg-forest/10 sm:grid-cols-3">
            {about.facts.map((f, i) => (
              <Reveal key={f.value} delay={i * 0.1} y={20} className="bg-ivory p-6">
                <dt className="font-serif text-[2.2rem] font-[320] leading-none text-forest">{f.value}</dt>
                <dd className="mt-3 text-[0.9rem] leading-snug text-ink-soft">{f.label}</dd>
              </Reveal>
            ))}
          </dl>

          <div className="mt-9">
            <ButtonLink href="/about/" data-cta="home-about">
              Read Our Story
            </ButtonLink>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:col-span-6">
          {founders.map((f, i) => (
            <motion.figure
              key={f.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.1, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              className={`group ${i === 1 ? 'mt-10 sm:mt-14' : ''}`}
            >
              <motion.div
                initial={{ clipPath: 'inset(12% 8% 12% 8% round 26px)' }}
                whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 26px)' }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 1.1, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                  className="relative aspect-[4/5] overflow-hidden rounded-[26px] bg-beige"
                >
                <Picture
                  {...asset(f.photo)}
                  alt={f.alt}
                  sizes="(min-width: 1024px) 24vw, 44vw"
                  className="size-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-silk)] group-hover:scale-[1.05]"
                />
              </motion.div>
              <figcaption className="mt-4">
                <span className="block font-serif text-[1.25rem] leading-tight text-ink sm:text-[1.5rem]">{f.name}</span>
                <span className="mt-1 block text-xs font-bold uppercase tracking-[0.18em] text-[#4a7432]">Co-founder</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
