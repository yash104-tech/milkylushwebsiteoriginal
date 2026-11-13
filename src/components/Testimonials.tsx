import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useState } from 'react'
import { testimonials } from '../config/site'

/**
 * Editorial testimonial carousel (pattern adapted from 21st.dev "Editorial Testimonial").
 * Quotes are real customer quotes published on milkylush.com — no photos or star ratings
 * are shown because none were supplied with permission.
 */
export function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1])
  const n = testimonials.length
  const go = (next: number) => setState(([i]) => [((next % n) + n) % n, next > i ? 1 : -1])
  const t = testimonials[index]
  const initials = t.name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)

  return (
    <section id="stories" aria-labelledby="stories-title" className="relative overflow-hidden bg-beige/60 py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow text-forest">Customer stories</p>
          <h2 id="stories-title" className="mt-4 text-[clamp(2.3rem,4.4vw,3.6rem)] font-[340] text-ink">
            In their own words.
          </h2>
          <p className="mt-5 max-w-sm text-ink-soft">What households around Bangalore have shared with us about their MilkyLush mornings.</p>
        </div>

        <div className="lg:col-span-8" aria-roledescription="carousel" aria-label="Customer testimonials">
          <div className="flex items-start gap-5 sm:gap-10">
            {/* Decorative numeral drawn with CSS content, so it isn't page text (contrast checks and screen readers skip it) */}
            <span
              aria-hidden
              data-n={String(index + 1).padStart(2, '0')}
              className="hidden font-serif text-[clamp(5rem,10vw,8.5rem)] font-[300] leading-[0.8] text-forest/15 tabular-nums before:content-[attr(data-n)] sm:block"
            />
            <div className="relative min-h-[17rem] flex-1 sm:min-h-[15rem]" aria-live="polite">
              <Quote className="mb-5 size-8 text-leaf" strokeWidth={1.5} aria-hidden />
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <motion.figure
                  key={index}
                  custom={dir}
                  variants={{
                    enter: (d: number) => ({ opacity: 0, x: 30 * d, filter: 'blur(4px)' }),
                    center: { opacity: 1, x: 0, filter: 'blur(0px)' },
                    exit: (d: number) => ({ opacity: 0, x: -20 * d, filter: 'blur(4px)' }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${n}`}
                >
                  <blockquote className="font-serif text-[clamp(1.6rem,3.2vw,2.5rem)] font-[340] leading-[1.25] tracking-[-0.015em] text-ink">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-4">
                    <span aria-hidden className="flex size-12 items-center justify-center rounded-full bg-forest font-serif text-lg text-ivory">
                      {initials}
                    </span>
                    <span>
                      <span className="block font-semibold text-ink">{t.name}</span>
                      <span className="block text-sm text-ink-soft">{t.place}</span>
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-between gap-4 sm:pl-[calc(clamp(5rem,10vw,8.5rem)+2.5rem)]">
            <div className="flex items-center gap-2">
              {testimonials.map((q, i) => (
                <button
                  key={q.name}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  aria-current={i === index}
                  className="group flex h-11 cursor-pointer items-center px-1"
                >
                  <span className={`block h-px transition-all duration-500 ease-[var(--ease-silk)] ${i === index ? 'w-12 bg-forest' : 'w-6 bg-forest/25 group-hover:w-8 group-hover:bg-forest/50'}`} />
                </button>
              ))}
              <span className="ml-3 text-xs font-semibold tracking-[0.2em] text-ink-soft">
                {String(index + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
              </span>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => go(index - 1)} className="flex size-12 cursor-pointer items-center justify-center rounded-full border border-forest/20 text-forest transition-colors hover:bg-forest hover:text-ivory">
                <ChevronLeft className="size-5" aria-hidden />
                <span className="sr-only">Previous testimonial</span>
              </button>
              <button type="button" onClick={() => go(index + 1)} className="flex size-12 cursor-pointer items-center justify-center rounded-full border border-forest/20 text-forest transition-colors hover:bg-forest hover:text-ivory">
                <ChevronRight className="size-5" aria-hidden />
                <span className="sr-only">Next testimonial</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
