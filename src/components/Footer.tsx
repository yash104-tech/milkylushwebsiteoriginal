import { motion } from 'motion/react'
import { Mail, Phone } from 'lucide-react'
import { about, navLinks, products, site } from '../config/site'
import { orderTarget, usePlatform } from '../lib/platform'
import { Logo } from './ui/Logo'
import { WhatsAppIcon, socialIcon } from './ui/BrandIcons'

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const
const linkCls = 'inline-flex min-h-9 items-center text-ivory/75 transition-colors hover:text-leaf'

export function Footer({ home = true }: { home?: boolean }) {
  const platform = usePlatform()
  const to = (href: string) =>
    home || !href.startsWith('#') ? href : href === '#top' ? '/' : href === '#about' ? '/about/' : `/${href}`
  const year = new Date().getFullYear()
  return (
    <footer className="on-dark relative overflow-hidden bg-forest-deep text-ivory">
      {/* Botanical sprig */}
      <svg aria-hidden viewBox="0 0 300 300" className="pointer-events-none absolute -right-10 -top-10 w-[320px] opacity-[0.12] sm:w-[420px]">
        <g fill="none" stroke="#8EBB70" strokeWidth="1.2" strokeLinecap="round">
          <path d="M280 20 C220 80 170 150 150 290" />
          <path d="M230 70 c-40 -10 -60 10 -70 40 c30 10 60 0 70 -40z" />
          <path d="M200 120 c40 -10 60 10 66 40 c-30 8 -58 -4 -66 -40z" />
          <path d="M178 170 c-40 -6 -58 16 -64 44 c30 6 56 -8 64 -44z" />
          <path d="M162 222 c36 -4 54 18 58 44 c-28 4 -52 -10 -58 -44z" />
        </g>
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="container-x relative pb-28 pt-20 sm:pb-28 sm:pt-24"
      >
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="ivory" className="text-[1.6rem]" />
            <p className="mt-6 max-w-xs text-ivory/70">Fresh cow milk in reusable glass bottles, delivered to homes in Bangalore.</p>
            <ul className="mt-6 flex gap-2" aria-label="Social media">
              {site.socials.map((s) => {
                const Icon = socialIcon[s.name]
                return (
                  <li key={s.name}>
                    <a href={s.href} {...ext} className="flex size-11 items-center justify-center rounded-full border border-ivory/15 text-ivory/80 transition-colors hover:border-leaf hover:text-leaf">
                      <Icon className="size-5" />
                      <span className="sr-only">MilkyLush on {s.name} (opens in a new tab)</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            <div>
              <h2 className="eyebrow text-leaf">Explore</h2>
              <ul className="mt-5 flex flex-col gap-1">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a href={to(l.href)} className={linkCls}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="eyebrow text-leaf">Products</h2>
              <ul className="mt-5 flex flex-col gap-1">
                {products.map((p) => (
                  <li key={p.id}>
                    <a href={orderTarget(platform, { product: p.name, webUrl: p.href }).href} {...ext} className={linkCls}>
                      {p.name}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
                <li>
                  <a href={to(site.pages.shop)} className={linkCls}>All products</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="eyebrow text-leaf">MilkyLush</h2>
              <ul className="mt-5 flex flex-col gap-1">
                <li><a href="/about/" className={linkCls}>About us</a></li>
                <li><a href={to(site.pages.contact)} className={linkCls}>Contact</a></li>
              </ul>
            </div>
          </nav>

          {/* #contact: the old milkylush.com/contact.html redirects here */}
          <div id="contact" className="scroll-mt-28 lg:col-span-3">
            <h2 className="eyebrow text-leaf">Get in touch</h2>
            <ul className="mt-5 flex flex-col gap-3 text-ivory/80">
              <li>
                <a href={site.whatsapp} {...ext} className="inline-flex min-h-9 items-center gap-3 hover:text-leaf">
                  <WhatsAppIcon className="size-4 text-leaf" /> WhatsApp {site.phoneDisplay}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="inline-flex min-h-9 items-center gap-3 hover:text-leaf">
                  <Phone className="size-4 text-leaf" aria-hidden /> {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex min-h-9 items-center gap-3 break-all hover:text-leaf">
                  <Mail className="size-4 shrink-0 text-leaf" aria-hidden /> {site.email}
                </a>
              </li>
              <li className="text-sm text-ivory/60">{site.address}</li>
              <li>
                <a href={site.url} className="inline-flex min-h-9 items-center text-sm text-ivory/60 hover:text-leaf">{site.displayUrl}</a>
              </li>
            </ul>
          </div>
        </div>

        <p aria-hidden className="mt-20 select-none text-center font-serif text-[clamp(3rem,13vw,11rem)] font-[300] italic leading-none tracking-[-0.03em] text-ivory/[0.07]">
          Flavour of Purity
        </p>

        <div className="mt-8 flex flex-col gap-4 border-t border-ivory/10 pt-6 text-sm text-ivory/55 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <p>
              © {year} MilkyLush. All rights reserved.
              {site.fssaiLicense && <span className="mt-1 block sm:ml-3 sm:mt-0 sm:inline">FSSAI Lic. No. {site.fssaiLicense}</span>}
            </p>
            <a
              href={about.tech.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 items-center gap-3 text-ivory/55 hover:text-leaf"
            >
              Website by
              <img
                src="/images/ogspace-logo.webp"
                width={96}
                height={47}
                alt={about.tech.name}
                loading="lazy"
                decoding="async"
                className="h-[47px] w-24 rounded-lg object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
              />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
          <ul className="flex gap-6">
            <li><a href={site.pages.privacy} className="inline-flex min-h-11 items-center hover:text-leaf">Privacy Policy</a></li>
            <li><a href={site.pages.terms} className="inline-flex min-h-11 items-center hover:text-leaf">Terms of Service</a></li>
          </ul>
        </div>
      </motion.div>
    </footer>
  )
}
