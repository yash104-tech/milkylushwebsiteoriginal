import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { faqs, site } from '../config/site'
import { ButtonLink } from './ui/Button'
import { WhatsAppIcon } from './ui/BrandIcons'

export function FAQ() {
  const [open, setOpen] = useState<string | null>(faqs[0].id)

  // Deep links such as #faq-bottle-return open the matching answer.
  useEffect(() => {
    const sync = () => {
      const id = location.hash.replace('#faq-', '')
      if (location.hash.startsWith('#faq-') && faqs.some((f) => f.id === id)) setOpen(id)
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative bg-ivory py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow text-forest">FAQ</p>
          <h2 id="faq-title" className="mt-4 text-[clamp(2.3rem,4.4vw,3.6rem)] font-[340] text-ink">
            Questions, answered simply.
          </h2>
          <p className="mt-5 max-w-sm text-ink-soft">Can’t find what you’re looking for? We’re happy to help on WhatsApp.</p>
          <ButtonLink href={site.whatsapp} target="_blank" variant="ghost" className="mt-8" icon={<WhatsAppIcon className="size-5" />}>
            Ask us anything
          </ButtonLink>
        </div>

        <div className="lg:col-span-8">
          <ul className="border-t border-forest/15">
            {faqs.map((f) => {
              const isOpen = open === f.id
              return (
                <li key={f.id} id={`faq-${f.id}`} className="scroll-mt-28 border-b border-forest/15">
                  <h3>
                    <button
                      type="button"
                      id={`faq-q-${f.id}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${f.id}`}
                      onClick={() => setOpen(isOpen ? null : f.id)}
                      className="group flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className="font-serif text-[1.25rem] leading-snug text-ink transition-colors group-hover:text-forest sm:text-[1.45rem]">
                        {f.q}
                      </span>
                      <span
                        className={`flex size-10 shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,color,transform] duration-500 ease-[var(--ease-silk)] ${
                          isOpen ? 'rotate-45 border-forest bg-forest text-ivory' : 'border-forest/25 text-forest group-hover:border-forest'
                        }`}
                        aria-hidden
                      >
                        <Plus className="size-4" />
                      </span>
                    </button>
                  </h3>
                  {/*
                    Answers stay in the page (readable by search engines) and expand with CSS grid rows, not a JS
                    height animation, so opening one never interrupts smooth scrolling. `inert` hides closed answers
                    from keyboard and screen-reader users.
                  */}
                  <div
                    id={`faq-a-${f.id}`}
                    role="region"
                    aria-labelledby={`faq-q-${f.id}`}
                    inert={!isOpen}
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-silk)] ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-7 pr-12 text-[1.02rem] leading-relaxed text-ink-soft">{f.a}</p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
