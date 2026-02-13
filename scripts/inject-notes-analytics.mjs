/**
 * Build-time injection of Fathom analytics into Quartz-generated notes HTML.
 *
 * Previously this was done at runtime by the notes-proxy API route, which
 * meant every /notes/* request hit a serverless function. By injecting at
 * build time the pages can be served as static files — zero origin transfer.
 *
 * Reads NEXT_PUBLIC_FATHOM_KEY and NEXT_PUBLIC_FATHOM_URL from env (dotenv
 * is loaded by the parent generate-static-files.mjs script).
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const notesDir = path.resolve(__dirname, '..', 'public', 'notes')

function buildFathomScriptTag() {
  const siteId = process.env.NEXT_PUBLIC_FATHOM_KEY || ''
  let fathomUrl = process.env.NEXT_PUBLIC_FATHOM_URL || ''

  const isFullScriptUrl = /\.js(\?.*)?$/i.test(fathomUrl)
  if (!isFullScriptUrl && fathomUrl && !fathomUrl.endsWith('/')) {
    fathomUrl = `${fathomUrl}/`
  }

  if (!siteId || !fathomUrl) {
    console.warn('[inject-notes-analytics] FATHOM env vars missing — skipping analytics injection')
    return ''
  }

  const domains = 'whoisnnamdi.com,www.whoisnnamdi.com'
  const src = isFullScriptUrl ? fathomUrl : `${fathomUrl}script.js`
  return `<script src="${src}" data-site="${siteId}" data-domains="${domains}" defer></script>`
}

function injectBeforeHeadClose(html, snippet) {
  if (!snippet) return html

  // Avoid double-injection
  const siteId = process.env.NEXT_PUBLIC_FATHOM_KEY || ''
  if (
    html.includes(`data-site="${siteId}"`) ||
    html.includes('usefathom.com') ||
    html.includes('script.js" data-site=')
  ) {
    return html
  }

  const idx = html.indexOf('</head>')
  if (idx !== -1) {
    return html.slice(0, idx) + '\n' + snippet + '\n' + html.slice(idx)
  }

  // Fallback: inject at start of <body>
  return html.replace(/<body[^>]*>/i, (m) => `${m}\n${snippet}\n`)
}

/** Recursively find all .html files under a directory */
function findHtmlFiles(dir) {
  const results = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...findHtmlFiles(full))
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      results.push(full)
    }
  }
  return results
}

export default async function injectNotesAnalytics() {
  if (!fs.existsSync(notesDir)) {
    console.log('[inject-notes-analytics] No public/notes directory — skipping')
    return
  }

  const snippet = buildFathomScriptTag()
  if (!snippet) return

  const htmlFiles = findHtmlFiles(notesDir)
  let injected = 0

  for (const filePath of htmlFiles) {
    const original = fs.readFileSync(filePath, 'utf8')
    const modified = injectBeforeHeadClose(original, snippet)
    if (modified !== original) {
      fs.writeFileSync(filePath, modified, 'utf8')
      injected++
    }
  }

  console.log(`[inject-notes-analytics] Injected analytics into ${injected}/${htmlFiles.length} HTML files`)
}
