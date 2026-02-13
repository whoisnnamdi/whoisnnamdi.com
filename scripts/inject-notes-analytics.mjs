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
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const { buildFathomScriptTag, injectBeforeHeadClose } = require('./fathom-helpers.js')

const notesDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..', 'public', 'notes')

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
  if (!snippet) {
    console.warn('[inject-notes-analytics] FATHOM env vars missing — skipping analytics injection')
    return
  }

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
