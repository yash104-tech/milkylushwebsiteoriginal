/**
 * Conversion tracking hook. Any element with a `data-cta="name"` attribute pushes a `cta_click` event to
 * window.dataLayer when clicked, so Google Tag Manager / GA4 can count free-sample and app-download clicks.
 * It does nothing until a tag manager is added to the page, and sends no data anywhere by itself.
 */
type DataLayer = { push: (e: Record<string, unknown>) => void }
declare global {
  interface Window {
    dataLayer?: DataLayer
  }
}

export function initCtaTracking() {
  const onClick = (e: MouseEvent) => {
    const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-cta]')
    if (!el) return
    window.dataLayer = window.dataLayer ?? ([] as unknown as DataLayer)
    window.dataLayer.push({ event: 'cta_click', cta: el.dataset.cta, page: location.pathname })
  }
  document.addEventListener('click', onClick, { capture: true })
  return () => document.removeEventListener('click', onClick, { capture: true })
}
