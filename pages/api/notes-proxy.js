import fs from 'fs'
import path from 'path'

function buildFathomScriptTag() {
    const siteId = process.env.NEXT_PUBLIC_FATHOM_KEY || ''
    let fathomUrl = process.env.NEXT_PUBLIC_FATHOM_URL || ''
    // Support both full script URL and base URL forms.
    // If it ends with .js, use as-is; otherwise append script.js (ensuring trailing slash)
    const isFullScriptUrl = /\.js(\?.*)?$/i.test(fathomUrl)
    if (!isFullScriptUrl && fathomUrl && !fathomUrl.endsWith('/')) {
        fathomUrl = `${fathomUrl}/`
    }

    if (!siteId || !fathomUrl) {
        return ''
    }

    const domains = 'whoisnnamdi.com,www.whoisnnamdi.com'
    const src = isFullScriptUrl ? fathomUrl : `${fathomUrl}script.js`
    return `<script src="${src}" data-site="${siteId}" data-domains="${domains}" defer></script>`
}

function resolveNotesIndexHtml(requestedPath) {
    // Ensure leading slash
    const safeRequested = requestedPath.startsWith('/') ? requestedPath : `/${requestedPath}`

    // Only allow under /notes
    if (!safeRequested.startsWith('/notes')) return null

    // Normalize and compute candidate filesystem paths under /public/notes
    const publicDir = path.join(process.cwd(), 'public')
    const notesRoot = path.join(publicDir, 'notes')

    // Prevent path traversal by normalizing then checking prefix
    const normalized = path.normalize(path.join(publicDir, safeRequested))
    if (!normalized.startsWith(notesRoot)) return null

    // 1) /notes/ -> /public/notes/index.html
    if (safeRequested === '/notes/' || safeRequested === '/notes') {
        const idx = path.join(notesRoot, 'index.html')
        return idx
    }

    // Decode the slug part after /notes/ (strip trailing slash)
    const slugEncoded = safeRequested.replace(/^\/notes\/?/, '').replace(/\/$/, '')
    const slug = decodeURIComponent(slugEncoded)

    // SECURITY: Guard against traversal and path separators after decoding
    // Disallow any path separators or parent directory segments
    if (slug.includes('..') || slug.includes('/') || slug.includes('\\')) {
        return null
    }

    // 2) Trailing-slash pages like /notes/foo/ map to /public/notes/foo.html
    const htmlFileCandidate = path.join(notesRoot, `${slug}.html`)
    if (fs.existsSync(htmlFileCandidate)) {
        const normalizedHtml = path.normalize(htmlFileCandidate)
        if (normalizedHtml.startsWith(notesRoot)) return normalizedHtml
        return null
    }

    // 3) Directory index fallback: /notes/foo/ -> /public/notes/foo/index.html
    const dirIndexCandidate = path.join(notesRoot, slug, 'index.html')
    if (fs.existsSync(dirIndexCandidate)) {
        const normalizedDirIdx = path.normalize(dirIndexCandidate)
        if (normalizedDirIdx.startsWith(notesRoot)) return normalizedDirIdx
        return null
    }

    // 4) Last resort: treat as normalized dir + index.html (maintains previous behavior)
    const targetDir = normalized
    const indexHtmlPath = path.join(targetDir, 'index.html')
    const normalizedIdx = path.normalize(indexHtmlPath)
    if (normalizedIdx.startsWith(notesRoot)) return normalizedIdx
    return null
}

function injectBaseTag(html, baseHref) {
    if (!html || !baseHref) return html
    if (/<base\b/i.test(html)) return html

    const headMatch = html.match(/<head[^>]*>/i)
    if (headMatch) {
        return html.replace(headMatch[0], `${headMatch[0]}\n<base href="${baseHref}" />`)
    }

    return html
}

function injectBeforeHeadClose(html, snippet) {
    if (!snippet) return html
    if (!html) return html

    // Avoid double-injection if already present
    if (html.includes('data-site="' + (process.env.NEXT_PUBLIC_FATHOM_KEY || '') + '"') || html.includes('usefathom.com') || html.includes('script.js" data-site=')) {
        return html
    }

    const closeHead = '</head>'
    const idx = html.toLowerCase().indexOf(closeHead)
    if (idx !== -1) {
        // Find actual case-sensitive closing tag by searching original html
        const realIdx = html.indexOf(closeHead)
        if (realIdx !== -1) {
            return html.slice(0, realIdx) + '\n' + snippet + '\n' + html.slice(realIdx)
        }
        // Fallback if case mismatch
        return html.replace(/<\/head>/i, `\n${snippet}\n</head>`)
    }

    // If no </head>, try injecting at start of body
    return html.replace(/<body[^>]*>/i, (m) => `${m}\n${snippet}\n`)
}

export default function handler(req, res) {
    const { path: requestedPath } = req.query

    if (!requestedPath || Array.isArray(requestedPath)) {
        res.status(400).send('Bad Request')
        return
    }

    const indexHtmlPath = resolveNotesIndexHtml(requestedPath)
    if (!indexHtmlPath) {
        res.status(404).send('Not Found')
        return
    }

    try {
        const html = fs.readFileSync(indexHtmlPath, 'utf8')
        const withBase = injectBaseTag(html, '/notes/')
        const snippet = buildFathomScriptTag()
        const injected = injectBeforeHeadClose(withBase, snippet)

        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        // Cache aggressively at the CDN edge (24 h) to minimize Fast Origin
        // Transfer. stale-while-revalidate lets the CDN serve stale content
        // while refreshing in the background, so users never wait.
        // Notes content only changes on deploy, so this is safe.
        res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800')
        res.status(200).send(injected)
    } catch (err) {
        res.status(404).send('Not Found')
    }
}


