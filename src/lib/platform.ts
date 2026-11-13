import { useState } from 'react'
import { site, whatsappLink } from '../config/site'

export type Platform = 'android' | 'ios' | 'other'

/** Client-side device detection (this is a client-rendered site, so `navigator` is always available). */
export function detectPlatform(): Platform {
  if (typeof navigator === 'undefined') return 'other'
  const ua = navigator.userAgent || ''
  if (/android/i.test(ua)) return 'android'
  // iPadOS 13+ reports itself as a Mac, so look for a touch screen as well
  if (/iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) return 'ios'
  return 'other'
}

export function usePlatform(): Platform {
  const [platform] = useState<Platform>(detectPlatform)
  return platform
}

export type Target = { href: string; label?: string }
export type AppTarget = { href: string; label: string; short: string }

/**
 * Where a "buy / place an order" action should go (this is a landing page: free sample + app are the goals):
 *  - Android → the MilkyLush app (Google Play), or WhatsApp until the Play link is set in site.app.androidUrl
 *  - iPhone / iPad → WhatsApp, with the order message prefilled
 *  - desktop and everything else → WhatsApp too (the web shop is only linked from the footer)
 * `label` is set only when the wording should change for that device.
 */
export function orderTarget(platform: Platform, opts: { product?: string; webUrl?: string }): Target {
  const message = opts.product
    ? `Hi MilkyLush! I'd like to place an order for ${opts.product}.`
    : "Hi MilkyLush! I'd like to place an order."
  if (platform === 'android') return { href: site.app.androidUrl || whatsappLink(message), label: site.app.androidUrl ? 'Order in the app' : 'Order on WhatsApp' }
  if (platform === 'ios') return { href: whatsappLink(message), label: 'Order on WhatsApp' }
  return { href: whatsappLink(message), label: 'Order on WhatsApp' }
}

/**
 * "Download the App" button: the Play Store on Android, the App Store on iPhone if that app exists, otherwise
 * WhatsApp. The wording follows the destination, so an iPhone visitor is never promised an app that isn't there.
 */
export function appTarget(platform: Platform): AppTarget {
  const download = { label: 'Download the App', short: 'Get the App' }
  if (platform === 'ios') {
    if (site.app.iosUrl) return { href: site.app.iosUrl, ...download }
    return { href: whatsappLink('Hi MilkyLush! I use an iPhone. How can I order?'), label: 'Order on WhatsApp', short: 'WhatsApp' }
  }
  return { href: site.app.androidUrl || whatsappLink('Hi MilkyLush! Could you please send me the link to download the MilkyLush app?'), ...download }
}
