import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

/**
 * Keeps staging out of search results: any build that is not the production site gets
 * <meta name="robots" content="noindex, nofollow">. Netlify sets CONTEXT ("production", "deploy-preview",
 * "branch-deploy"); elsewhere set VITE_NOINDEX=true for staging builds.
 */
function noindexOutsideProduction(): Plugin {
  const context = process.env.CONTEXT
  const noindex = process.env.VITE_NOINDEX === 'true' || (context !== undefined && context !== 'production')
  return {
    name: 'milkylush-noindex-outside-production',
    transformIndexHtml(html) {
      if (!noindex) return html
      return html.replace(/<meta name="robots" content="[^"]*" \/>/, '<meta name="robots" content="noindex, nofollow" />')
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), noindexOutsideProduction()],
  build: {
    target: 'es2020',
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        about: resolve(import.meta.dirname, 'about/index.html'),
        privacy: resolve(import.meta.dirname, 'privacy/index.html'),
        terms: resolve(import.meta.dirname, 'terms/index.html'),
      },
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/gsap')) return 'gsap'
          if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) return 'motion'
        },
      },
    },
  },
})
