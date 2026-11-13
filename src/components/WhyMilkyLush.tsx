import { motion, useReducedMotion, type Variants } from 'motion/react'

/** Thin-stroke custom icons; each path draws itself in when the card enters view. */
const icons: Record<string, string[]> = {
  sprout: ['M24 42 V22', 'M24 26 C24 16 16 10 7 10 C7 20 14 26 24 26', 'M24 22 C24 13 31 7 41 7 C41 17 33 22 24 22', 'M12 42 H36'],
  door: ['M12 42 V8 H32 V42', 'M6 42 H42', 'M27 25 h0.5', 'M32 18 L40 22 V42'],
  bottle: [
    'M19 6 H29 V12 C29 16 34 17 34 23 V40 C34 41.5 33 42 31.5 42 H16.5 C15 42 14 41.5 14 40 V23 C14 17 19 16 19 12 Z',
    'M14 28 H34',
    'M18 4 H30',
    'M21 34 a3.5 3.5 0 1 0 6 -2.5 M27 31.5 l0.4 -2.4 l-2.4 0.4',
  ],
  calendar: ['M8 12 H40 V40 H8 Z', 'M8 20 H40', 'M16 7 V15', 'M32 7 V15', 'M17 30 L22 35 L31 26'],
}

const features = [
  { icon: 'sprout', title: 'Freshness-focused sourcing', body: 'Milk from village producers we work with directly, chilled and bottled for your morning delivery.' },
  { icon: 'door', title: 'Convenient home delivery', body: 'Bottles arrive at your door early, before the household is up and about.' },
  { icon: 'bottle', title: 'Reusable glass packaging', body: 'Glass bottles that are returned, cleaned and used again — instead of thrown away.' },
  { icon: 'calendar', title: 'A simple subscription', body: 'Choose your quantity, then pause, resume or change it with a quick WhatsApp message.' },
]

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({ pathLength: 1, opacity: 1, transition: { pathLength: { delay: 0.2 + i * 0.18, duration: 1.1, ease: 'easeInOut' }, opacity: { delay: 0.2 + i * 0.18, duration: 0.01 } } }),
}

function FeatureIcon({ name }: { name: string }) {
  const reduce = useReducedMotion()
  return (
    <svg viewBox="0 0 48 48" className="size-12 text-forest transition-transform duration-500 ease-[var(--ease-silk)] group-hover:-translate-y-1 group-hover:rotate-[-4deg]" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {icons[name].map((d, i) => (
        <motion.path key={i} d={d} variants={reduce ? undefined : draw} custom={i} />
      ))}
    </svg>
  )
}

export function WhyMilkyLush() {
  return (
    <section id="why" aria-labelledby="why-title" className="relative bg-forest py-24 text-ivory sm:py-32 on-dark">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12">
          <p className="eyebrow text-leaf lg:col-span-3 lg:pt-4">Why MilkyLush</p>
          <h2 id="why-title" className="text-[clamp(2.4rem,5vw,4.4rem)] font-[330] lg:col-span-9">
            Little Changes. <em className="font-[300] text-leaf">A Better Daily Ritual.</em>
          </h2>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-[28px] bg-ivory/12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.li
              key={f.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="group relative bg-forest p-8 transition-colors duration-500 hover:bg-[#1c5840] sm:p-10"
            >
              <motion.div
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
              >
                <FeatureIcon name={f.icon} />
                <h3 className="mt-10 font-serif text-[1.5rem] leading-tight text-ivory">{f.title}</h3>
                <p className="mt-3 text-[0.97rem] leading-relaxed text-ivory/75">{f.body}</p>
              </motion.div>
              <span aria-hidden className="absolute bottom-0 left-8 right-8 h-px origin-left scale-x-0 bg-leaf transition-transform duration-700 ease-[var(--ease-silk)] group-hover:scale-x-100 sm:left-10 sm:right-10" />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
