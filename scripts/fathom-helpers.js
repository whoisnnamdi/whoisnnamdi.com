/**
 * Pure helper functions for Fathom analytics injection into HTML.
 * Separated from inject-notes-analytics.mjs so they can be tested
 * without ESM/CJS transform issues.
 */

function buildFathomScriptTag() {
  const siteId = process.env.NEXT_PUBLIC_FATHOM_KEY || ''
  let fathomUrl = process.env.NEXT_PUBLIC_FATHOM_URL || ''

  const isFullScriptUrl = /\.js(\?.*)?$/i.test(fathomUrl)
  if (!isFullScriptUrl && fathomUrl && !fathomUrl.endsWith('/')) {
    fathomUrl = `${fathomUrl}/`
  }

  if (!siteId || !fathomUrl) {
    return ''
  }

  const domains = 'whoisnnamdi.com,www.whoisnnamdi.com'
  const src = isFullScriptUrl ? fathomUrl : `${fathomUrl}script.js`
  return `<!-- fathom --><script src="${src}" data-site="${siteId}" data-domains="${domains}" defer></script>`
}

/** Strip any previously-injected Fathom script tag (stale or current). */
function stripExistingFathom(html) {
  return html
    // Current format: <!-- fathom --> marker + script tag
    .replace(/\n?<!-- fathom --><script [^>]*><\/script>\n?/g, '')
    // Legacy format (pre-marker): match on data-domains which is unique to
    // our Fathom setup — won't collide with other scripts.
    .replace(/\n?<script [^>]*data-domains="whoisnnamdi\.com[^"]*"[^>]*><\/script>\n?/g, '')
}

function injectBeforeHeadClose(html, snippet) {
  if (!snippet) return html

  // Remove any stale Fathom tag so we always write the current one.
  const cleaned = stripExistingFathom(html)

  const idx = cleaned.indexOf('</head>')
  if (idx !== -1) {
    return cleaned.slice(0, idx) + '\n' + snippet + '\n' + cleaned.slice(idx)
  }

  // Fallback: inject at start of <body>
  return cleaned.replace(/<body[^>]*>/i, (m) => `${m}\n${snippet}\n`)
}

module.exports = { buildFathomScriptTag, stripExistingFathom, injectBeforeHeadClose }
