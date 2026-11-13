# MilkyLush — Pre-launch audit (27 Oct 2026)

Scope: the landing page (`/`), `/about/`, `/privacy/`, `/terms/` in this repository (React 19 + Vite, deployed with Netlify).
Statuses: **PASS** = checked and working · **FAIL** = checked and not meeting the target · **NOT VERIFIED** = needs a real deploy, a device or business input.

## 1. Readiness

**Not ready to launch yet.** The build, SEO, accessibility and the main journey pass. Before going live, three things are still needed:

1. ~~Decide where the site lives.~~ Decided: it replaces `milkylush.com`. The old pages 301-redirect here (see below).
2. Add the FSSAI licence number.
3. Confirm the business facts listed in §10.

Mobile performance is below the Core Web Vitals targets in lab tests (see §7), but these lab numbers are unreliable on this machine. Measure again on the deployed URL.

## 2. Issues found and fixed

| Pri | Issue | Fix | Status |
|---|---|---|---|
| P0 | No `robots.txt`, no sitemap, no 404 page | Added `public/robots.txt`, `public/sitemap.xml` (4 canonical URLs), `public/404.html` (`noindex`; Netlify serves it with a 404 status) | PASS |
| P0 | Staging/preview deploys would be indexed | Vite plugin adds `noindex, nofollow` to every page unless it is the production build (`CONTEXT`/`VITE_NOINDEX`); deploy previews and branch deploys set `VITE_NOINDEX` in `netlify.toml` | PASS (tested with a staging build) |
| P0 | Canonical domain didn't match the live site: pages used `www.milkylush.com`, but the current site's canonical and sitemap use `milkylush.com`, and both hosts serve the same page | All canonicals, OG URLs, sitemap and JSON-LD now use `https://milkylush.com`; `netlify.toml` 301s `www` → apex | PASS (redirect NOT VERIFIED until deployed) |
| P1 | Hero claimed "Bangalore · Hosur" — Hosur service is not confirmed anywhere | Now "Electronic City, Bengaluru", matching the 5 km delivery-area FAQ | PASS |
| P1 | H1 read as "Pure Milk. A More Beautiful Everyday.PureMilk.AMoreBeautifulEveryday." to crawlers (duplicated sr-only + aria-hidden text); same issue in every animated heading | Text now appears once with real spaces (`HeroSection`, `SplitWords`) | PASS |
| P1 | Meta description still promised a location checker that was removed; title and description had no service-area intent | New title "Glass Bottle Milk Delivery, Electronic City Bengaluru \| MilkyLush" (65 chars) and a 159-char description; unique titles/descriptions on all pages | PASS |
| P1 | OG image was a placeholder (`sourcing-village`), no `og:locale`, no image size/alt; About used a portrait image | New 1200×630 `og-milkylush.jpg` on every page, with `og:locale en_IN`, image size and alt | PASS |
| P1 | Structured data was a bare `LocalBusiness` | `@graph` of `Organization` (published contact, address, founders, socials), `WebSite`, `WebPage`; `AboutPage` + `BreadcrumbList` on inner pages. No ratings, prices or opening hours | PASS (JSON parses; not run through Google's Rich Results Test) |
| P1 | Smooth scrolling to a section (menu links, "Discover our bottle return process") stopped half-way down the page | Root cause: Motion measures `height: 'auto'` and mixed-unit animations, calling `window.scrollTo` mid-scroll. Bottle-return steps and FAQ answers now expand with CSS grid rows; the sticky bar animates `%`→`%` | PASS (no stray `scrollTo` calls across the page) |
| P1 | Shop range had no product descriptions after the gallery was removed; "Shop our bestsellers" is an unverified claim; "Hover over a product" doesn't apply on phones | One-line description per product; heading "Fresh dairy and wood-pressed oils."; copy points to WhatsApp/app for prices | PASS |
| P1 | Customers' key questions unanswered: delivery time, other products, price | Three new FAQs. Price answer is honest: "check WhatsApp or the app" | PASS |
| P1 | Cow video was 5.3 MB | Re-encoded H.264, 478×850: 1.2 MB, visually identical; skipped when Data Saver is on | PASS |
| P1 | First visit hid the page behind a loading curtain, and the hero bottle (the LCP image) faded in from opacity 0 | Curtain removed; bottle visible from the first frame; hero image preloaded | PASS |
| P1 | Whole page rendered in one long JS task | First screen renders first; the rest mounts in 5 idle-time batches (deep links render everything at once) | PASS |
| P1 | Fonts from Google Fonts: render-blocking third-party CSS, IP addresses sent to Google, and a layout shift (CLS 0.093) when the fonts swapped in | Self-hosted Fraunces + Manrope (OFL) with preload and metric-matched Georgia/Arial fallbacks; desktop CLS 0.093 → 0.003; privacy policy updated | PASS |
| P1 | "Glass is how every MilkyLush product is delivered" contradicts the curd tub | Now "bottles and jars for our milk, ghee, paneer and oils" | PASS |
| P2 | "Delivered every morning" badge on the app photo was clipped by the reveal animation | Clip moved to the photo only (same bug fixed earlier on founder captions) | PASS |
| P2 | `<video role="img">` is invalid ARIA (Lighthouse a11y fail) | Video `aria-hidden` + visually hidden description | PASS |
| P2 | Decorative testimonial numeral failed colour contrast | Drawn with CSS `content`, so it is not page text | PASS |
| P2 | Footer Privacy/Terms/domain links were 19 px tall (WCAG 2.2 target size) | 44 px tap targets | PASS |
| P2 | "Small difference, big difference." heading | "Small change, big difference." | PASS |
| P2 | WhyMilkyLush said "bottled for the next morning", contradicting "delivered within hours of milking" | "bottled for your morning delivery" | PASS |
| P2 | No FSSAI licence slot | `site.fssaiLicense` renders in the footer once filled; nothing shown while empty | PASS (number missing) |
| P0 | This site replaces milkylush.com, so the old `shop.html`, `blog.html` and `contact.html` would 404, and the footer linked to them | Footer "All products" → `#shop`, "Contact" → the footer contact block (`#contact`), Blog link removed. 301s: `shop.html` → `/#shop`, `contact.html` → `/#contact`, `trial.html` → `/#get-started`, `blog.html` → `/`, `Aboutus.html` → `/about/`, `privacy.html` → `/privacy/` | PASS (redirects NOT VERIFIED until deployed) |
| P3 | Old reel cover images left in `public/images` | Deleted 20 unused files and their script entries | PASS |
| P3 | No Apple touch icon or web manifest | `apple-touch-icon.png`, `icon-192/512.png`, `site.webmanifest` (`npm run meta-assets`) | PASS |
| P3 | No `Permissions-Policy` header | Added (camera, mic, location, payment off) | PASS (NOT VERIFIED live) |

## 3. Files created or modified

**Created:** `LAUNCH-AUDIT.md`, `scripts/make-meta-assets.mjs`, `public/robots.txt`, `public/sitemap.xml`, `public/site.webmanifest`, `public/404.html`, `public/apple-touch-icon.png`, `public/icon-192.png`, `public/icon-512.png`, `public/images/og-milkylush.jpg`, `public/fonts/*.woff2` (6), `_source-assets/generated/journey-*.webp`.

**Modified:** `index.html`, `about/index.html`, `privacy/index.html`, `terms/index.html`, `vite.config.ts`, `netlify.toml`, `package.json`, `README.md`, `scripts/optimize-images.mjs`, `public/videos/village-calves.mp4` (re-encoded), `src/App.tsx`, `src/index.css`, `src/config/site.ts`, `src/config/legal.ts`, and these components: `HeroSection`, `ShopRange`, `AppSection`, `Comparison`, `WhyMilkyLush`, `Testimonials`, `FAQ`, `BottleReturnSection`, `StickyCtaBar`, `Footer`, `ui/SplitWords`, `ui/LoopVideo`.

**Removed:** 20 unused `public/images/reel-*` files. `src/components/Preloader.tsx` and `ProductShowcase.tsx` are no longer used but kept in case you want them back.

## 4. SEO implemented

- Unique titles and descriptions on all 4 pages; one H1 per page with a logical H2/H3 outline; `lang="en-IN"`.
- `robots` meta on every page; `noindex` on the 404 page and on every non-production build.
- Canonicals and sitemap on `https://milkylush.com`; `www` → apex 301; 301s from the old `Aboutus.html`, `privacy.html` and `trial.html`.
- JSON-LD as listed in §2; Open Graph and Twitter card on every page.
- FAQ answers are now always in the HTML, so they are crawlable even when collapsed.
- Keyword focus, by real search intent: fresh cow milk / glass bottle milk delivery + Electronic City, Bengaluru (title, H1 area, hero, FAQ), with secondary terms ghee, paneer, curd and wood-pressed oils in the product range and FAQ. I didn't add city or area pages: only Electronic City (5 km radius) is confirmed.
- Images: AVIF/WebP with `srcset`, explicit width/height, lazy below the fold, hero eager + `fetchpriority=high` + preload; descriptive alt text on all product photos; decorative images `alt=""`.
- Not done (recommendations): FAQPage schema (Google only shows FAQ rich results for government and health sites); Product schema (needs prices and availability to be useful); separate product pages (not enough product information yet to avoid thin pages).

**Local SEO:** a Google Business Profile as a *service-area business* (address hidden, area = Electronic City and the delivery radius) suits a delivery-only dairy. Use exactly "MilkyLush", +91 99028 82332 and the same category everywhere. Don't publish an address that isn't a staffed location.

## 5. Content changes

Covered in §2: the hero location, the shop heading/copy and product blurbs, three new FAQs, the glass claim, the comparison heading, the WhyMilkyLush timing line, the meta copy and the privacy-policy font line.

## 6. UI/UX and mobile

Checked at 320, 375, 768, 1350 and 1440 px: **no horizontal overflow** at any width (PASS). Mobile menu opens with focus moved inside, scroll locked, Escape/close works, and links close the menu (PASS). Tap targets under 24 px: none left (PASS). Not checked on real iOS/Android devices (NOT VERIFIED).

## 7. Performance and accessibility (Lighthouse 12, lab data, local production build)

| Run | Perf | A11y | Best pr. | SEO | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| Mobile, before | 38 | 99 | 100 | 100 | 3.9 s | 5.3 s | 3.3 s | 0 |
| Mobile, after (9 runs on the final font setup) | 40–53 | 100 | 100 | 100 | 2.7–2.8 s | 3.9–5.1 s | 1.9–6.8 s | 0 |
| Desktop, after (final) | 85 | 100 | 100 | 100 | 0.6 s | 0.9 s | 0.29 s | 0.003 |

- **Caveat:** Lighthouse rated this machine's CPU at 214–454 on its benchmark; Lighthouse treats anything under 1000 as underpowered, and the TBT swings between runs show it. These are **lab** numbers; there is no **field** (real-user) data yet.
- **Core Web Vitals on mobile (lab): LCP FAIL (target ≤ 2.5 s), CLS PASS, INP NOT VERIFIED** (needs real users). Desktop lab passes LCP and CLS.
- Remaining cost is client-side JavaScript (~200 KB gzipped: React, GSAP, Motion). Next steps, in order of impact:
  1. Prerender the HTML at build time, so the hero paints before JS runs.
  2. Use one animation library instead of both GSAP and Motion.
  3. Trim the hero intro animation.
- Accessibility: Lighthouse 100 on all pages; keyboard focus styles, skip link, reduced-motion support and dialog focus return all checked. A screen-reader pass with NVDA/VoiceOver is NOT VERIFIED.

## 8. Tests run

| Test | Result |
|---|---|
| `tsc` type check | PASS |
| `npm run build` (4 pages) | PASS |
| `npm audit --omit=dev` | PASS (0 vulnerabilities) |
| All routes and assets on the preview server (`/`, `/about/`, `/privacy/`, `/terms/`, robots, sitemap, manifest, icons, OG image, video) | PASS (200) |
| Unknown URL → 404 | NOT VERIFIED (Vite preview falls back to `index.html`; Netlify serves `404.html` with a 404 status) |
| JSON-LD parses on every page | PASS |
| Staging build gets `noindex`; production doesn't | PASS |
| Every link has a real destination; every in-page anchor target exists; no unnamed buttons | PASS (67 links) |
| Live external targets: old milkylush.com pages and the Play Store search | PASS (200 today) |
| Console errors on `/` and `/about/` | PASS (none) |
| Deep link `/#faq`, nav anchors, FAQ open/close, reel viewer open/Escape/focus return, mobile menu | PASS |
| Responsive widths | PASS (see §6) |
| Google Rich Results Test, PageSpeed Insights, Search Console | NOT VERIFIED (needs the live URL) |

## 9. Remaining issues and external checks

- The old blog's two articles aren't migrated (`blog.html` redirects home). Add them as pages if they had search traffic.
- Mobile LCP/TBT (see §7). Re-measure on PageSpeed Insights after deploy.
- The Play Store link is a search page; use the direct listing.
- After launch:
  - Submit `sitemap.xml` in Google Search Console.
  - Set up a Google Business Profile.
  - Confirm the `www` → apex redirect and the 404 status.
- No analytics is installed (the `data-cta` click events are ready for Google Tag Manager). If you add analytics or ads tags, add a cookie-consent banner and update the privacy policy.

## 10. Information I need from you

1. ~~The production domain~~ — confirmed: `milkylush.com`.
2. The FSSAI licence or registration number (14 digits).
3. Confirmation of these facts:
   - delivery by 7:30 AM
   - free sample "delivered the next morning"
   - 5 km radius around the Electronic City hub
   - 30–40 reuses per bottle
   - "delivered within hours of milking"
   - "village producers we work with directly" and fair pricing
4. Whether the curd tub label claims (live cultures, no preservatives) and the bottle label claims (no hormones, no added preservatives, natural) are accurate. FSSAI labelling rules apply to these.
5. Consent from Anjali Menon and Priya S. to reuse their quotes.
6. The direct Google Play listing URL, and the legal entity name and grievance contact for the privacy policy and terms.
7. Whether the AI-generated photos (journey steps, malai comparison, product hover shots) should be replaced with real photography. The malai images in particular imply a real side-by-side test.

## 11. Pre-launch checklist

- [x] **P0** Domain confirmed (`milkylush.com`); old pages redirect here
- [ ] **P0** After deploy, open each old URL (`/shop.html`, `/contact.html`, `/blog.html`, `/trial.html`, `/Aboutus.html`, `/privacy.html`) and confirm the 301
- [ ] **P0** Add the FSSAI number (`src/config/site.ts` → `fssaiLicense`)
- [ ] **P0** Confirm the facts in §10.3–4 or edit the copy
- [ ] **P1** Lawyer review of `/privacy/` and `/terms/`
- [ ] **P1** Testimonial consent
- [ ] **P1** Direct Play Store link
- [ ] **P1** Deploy, then run PageSpeed Insights (mobile) and the Rich Results Test on the live URL
- [ ] **P1** Submit the sitemap in Search Console and check the `www` redirect and 404 status
- [ ] **P2** Set up a Google Business Profile (service-area business)
- [ ] **P2** Real photos in place of the AI-generated images
- [ ] **P2** If mobile LCP is still above 2.5 s in the field: prerender the HTML and drop one animation library
