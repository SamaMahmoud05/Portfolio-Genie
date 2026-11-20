import type { Portfolio } from '../types'

export function encodePortfolio(p: Portfolio): string {
  const bytes = new TextEncoder().encode(JSON.stringify(p))
  let bin = ''
  bytes.forEach((b) => (bin += String.fromCharCode(b)))
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function decodePortfolio(s: string): Portfolio | null {
  try {
    const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/'))
    const json = new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)))
    const p = JSON.parse(json) as Portfolio
    return typeof p.name === 'string' && Array.isArray(p.skills) && Array.isArray(p.projects) ? p : null
  } catch {
    return null
  }
}

export const shareUrl = (p: Portfolio) => `${location.origin}${location.pathname}#/p/${encodePortfolio(p)}`

export function downloadHtml(el: HTMLElement, name: string) {
  const css = Array.from(document.styleSheets)
    .map((s) => {
      try {
        return Array.from(s.cssRules).map((r) => r.cssText).join('\n')
      } catch {
        return ''
      }
    })
    .join('\n')
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${name.replace(/</g, '')} | Portfolio</title><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet"><style>${css}</style></head><body><main style="max-width:48rem;margin:0 auto;padding:1rem">${el.outerHTML}</main></body></html>`
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([html], { type: 'text/html' }))
  a.download = `${(name || 'portfolio').toLowerCase().replace(/\s+/g, '-')}.html`
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(a.href), 10000)
}
