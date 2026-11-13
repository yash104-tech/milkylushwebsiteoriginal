import { type LegalDoc, legalUpdated } from '../config/legal'

/** Plain reading layout for the Privacy Policy and Terms of Service. */
export function LegalPage({ doc, other }: { doc: LegalDoc; other: { label: string; href: string } }) {
  return (
    <section aria-labelledby="legal-title" className="bg-ivory pb-24 pt-32 sm:pt-40">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8 lg:col-start-3">
          <p className="eyebrow text-forest">Legal</p>
          <h1 id="legal-title" className="mt-4 text-[clamp(2.4rem,6vw,4.4rem)] font-[340] leading-[1.02] text-ink">
            {doc.title}
          </h1>
          <p className="mt-4 text-sm text-ink-soft">Last updated {legalUpdated}</p>
          <p className="mt-8 text-lg leading-relaxed text-ink-soft">{doc.intro}</p>

          <nav aria-label="On this page" className="mt-10 rounded-[24px] bg-sand p-6 sm:p-8">
            <p className="eyebrow text-forest">On this page</p>
            <ol className="mt-4 columns-1 gap-8 text-[0.95rem] text-ink sm:columns-2">
              {doc.sections.map((s, i) => (
                <li key={s.id} className="break-inside-avoid py-1">
                  <a href={`#${s.id}`} className="hover:text-forest hover:underline">
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-12 space-y-12">
            {doc.sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-28">
                <h2 id={`${s.id}-h`} className="font-serif text-[1.7rem] leading-tight text-ink">
                  {i + 1}. {s.title}
                </h2>
                <div className="mt-4 space-y-4 text-[1.02rem] leading-relaxed text-ink-soft">
                  {s.body.map((b, j) =>
                    typeof b === 'string' ? (
                      <p key={j}>{b}</p>
                    ) : (
                      <ul key={j} className="list-disc space-y-2 pl-6 marker:text-leaf">
                        {b.list.map((li) => (
                          <li key={li}>{li}</li>
                        ))}
                      </ul>
                    ),
                  )}
                </div>
              </section>
            ))}
          </div>

          <p className="mt-14 border-t border-forest/10 pt-6 text-sm text-ink-soft">
            See also our <a href={other.href} className="font-semibold text-forest underline underline-offset-4">{other.label}</a>.
          </p>
        </div>
      </div>
    </section>
  )
}
