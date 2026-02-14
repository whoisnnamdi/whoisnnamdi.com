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

    // SECURITY: Guard against path traversal after decoding
    if (slug.includes('..') || slug.includes('\\')) {
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

// Known static file extensions served under /notes.
// Note slugs can contain dots (e.g., "vitalik.eth", "i.i.d.", "vs.-VARs"),
// so we match only actual file extensions rather than any dot in the path.
const STATIC_EXT = /\.(css|js|mjs|json|xml|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|webp|avif|mp4|webm|pdf)$/i

function resolveRelativeUrls(html, pagePath) {
    // Convert ALL relative href/src attributes to absolute paths.
    //
    // Quartz generates links like href="./slug" (top-level pages) and
    // href="../slug" (nested pages like tags). The SPA router resolves
    // ./  and ../ links against the current page URL during navigation,
    // which can break with trailing-slash URLs. Making them absolute
    // bypasses the SPA router's resolver entirely.
    //
    // pagePath is the requested URL path (e.g., "/notes/tags/online/").
    // Use the path WITHOUT trailing slash as the base URL for resolution.
    // This matches how Quartz generates relative links — they expect the page
    // to be treated as a "file" not a "directory". E.g., for /notes/tags/online/:
    //   base = /notes/tags/online  →  ../ resolves to /notes/  (correct)
    //   base = /notes/tags/online/ →  ../ resolves to /notes/tags/ (wrong)
    const isNotesRoot = pagePath === '/notes/' || pagePath === '/notes'
    const basePath = isNotesRoot ? '/notes/' : pagePath.replace(/\/$/, '')
    const baseUrl = 'http://localhost' + basePath

    // Resolve href attributes starting with ./ or ../
    html = html.replace(/href="(\.\.?\/[^"]*)"/g, (match, relPath) => {
        try {
            const resolved = new URL(relPath, baseUrl)
            let absPath = resolved.pathname
            const suffix = (resolved.search || '') + (resolved.hash || '')
            // Keep static files relative (handled by <base> tag + spa-preserve)
            if (STATIC_EXT.test(absPath)) return match
            // Ensure trailing slash for non-file paths
            if (!absPath.endsWith('/')) absPath += '/'
            return `href="${absPath}${suffix}"`
        } catch {
            return match
        }
    })
    // Also handle bare "." and ".." (no trailing slash)
    html = html.replace(/href="\.\."/g, (match) => {
        try {
            const resolved = new URL('..', baseUrl)
            let absPath = resolved.pathname
            if (!absPath.endsWith('/')) absPath += '/'
            return `href="${absPath}"`
        } catch {
            return match
        }
    })
    html = html.replace(/href="\."/g, (match) => {
        try {
            const resolved = new URL('.', baseUrl)
            let absPath = resolved.pathname
            if (!absPath.endsWith('/')) absPath += '/'
            return `href="${absPath}"`
        } catch {
            return match
        }
    })
    return html
}

function injectBaseTag(html, baseHref) {
    if (!html || !baseHref) return html

    // Replace existing base tag with the correct href for this page's depth
    if (/<base\b/i.test(html)) {
        return html.replace(/<base\b[^>]*>/i, `<base href="${baseHref}" />`)
    }

    // No existing base tag — inject one after <head>
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
        const withSlashes = resolveRelativeUrls(html, requestedPath)
        // Set base to the page path WITHOUT trailing slash so that ../
        // relative paths resolve correctly at any nesting depth.
        // e.g., for /notes/tags/online/, base="/notes/tags/online" makes
        // "../index.css" resolve to /notes/index.css (directory = /notes/tags/).
        // The root /notes/ keeps its trailing slash since ./ paths need
        // the directory to be /notes/ itself.
        const isNotesRoot = requestedPath === '/notes/' || requestedPath === '/notes'
        const baseHref = isNotesRoot ? '/notes/' : requestedPath.replace(/\/$/, '')
        const withBase = injectBaseTag(withSlashes, baseHref)
        const snippet = buildFathomScriptTag()
        const injected = injectBeforeHeadClose(withBase, snippet)

        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        // Cache aggressively at the CDN edge (24 h) to minimize Fast Origin
        // Transfer. stale-while-revalidate lets the CDN serve stale content
        // while refreshing in the background, so users never wait.
        // Notes content only changes on deploy, and Vercel automatically
        // purges its entire CDN cache on every deployment, so these TTLs
        // only govern caching *between* deploys.
        res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800')
        res.status(200).send(injected)
    } catch (err) {
        res.status(404).send('Not Found')
    }
}


