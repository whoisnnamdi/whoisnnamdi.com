/**
 * Integration tests for notes-proxy URL resolution.
 *
 * These tests use realistic HTML snippets that mirror what Quartz actually
 * generates at each page depth.  Every page type in the notes section is
 * covered so that regressions in link rewriting, static-asset resolution,
 * breadcrumb navigation, and base-tag injection are caught immediately.
 *
 * Page types tested:
 *   1. Notes root        /notes/                           → index.html
 *   2. Top-level note    /notes/Autoregressive-models/     → Autoregressive-models.html
 *   3. Tag page          /notes/tags/online/               → tags/online.html
 *   4. Tags index        /notes/tags/                      → tags/index.html   (dir-index)
 *   5. Deep tag page     /notes/tags/Economics/Competition/ → tags/Economics/Competition.html
 *   6. Dotted-slug note  /notes/i.i.d./                   → i.i.d..html
 */

jest.mock('fs')

const fs = require('fs')
const path = require('path')
const handler = require('../pages/api/notes-proxy').default

const MOCK_CWD = '/app'
jest.spyOn(process, 'cwd').mockReturnValue(MOCK_CWD)

// ── helpers ──────────────────────────────────────────────────────────────────

function createReq(queryPath) {
  return { query: { path: queryPath } }
}

function createRes() {
  return {
    statusCode: 200,
    headers: {},
    body: null,
    setHeader(k, v) { this.headers[k] = v },
    status(c) { this.statusCode = c; return this },
    send(b) { this.body = b; return this },
  }
}

/** Simulate a leaf page (slug.html exists) */
function mockLeafPage(html) {
  fs.existsSync.mockReturnValue(true)          // slug.html found on first try
  fs.readFileSync.mockReturnValue(html)
}

/** Simulate a directory-index page (slug.html missing, slug/index.html exists) */
function mockDirIndexPage(html) {
  fs.existsSync.mockImplementation((p) => p.endsWith('index.html'))
  fs.readFileSync.mockReturnValue(html)
}

function serve(reqPath, html, opts = {}) {
  if (opts.dirIndex) {
    mockDirIndexPage(html)
  } else {
    mockLeafPage(html)
  }
  const res = createRes()
  handler(createReq(reqPath), res)
  return res
}

// ── Realistic HTML snippets ──────────────────────────────────────────────────
// Modeled after actual Quartz output for each page type.

const ROOT_HTML = `<html><head>
<base href="/notes/" />
<link href="./index.css" rel="stylesheet" />
<script src="./prescript.js"></script>
</head><body>
<header><a href="./static/icon.png"><img src="./static/icon.png"/></a></header>
<a href=".">Nnamdi's Notes</a>
<a href="./Autoregressive-models">Autoregressive models</a>
<a href="./@jonesGrowthIdeas2005">Growth</a>
<a href="./@jonesGrowthIdeas2005#17fe4e">Growth §</a>
<a href="./Tweets-From-vitalik.eth">vitalik</a>
<a href="./i.i.d.">iid</a>
<a href="./tags/online">online</a>
<script src="./postscript.js"></script>
</body></html>`

const LEAF_NOTE_HTML = `<html><head>
<base href="/notes/" />
<link href="./index.css" rel="stylesheet" />
<script src="./prescript.js"></script>
</head><body>
<a href=".">Home</a>
<a href="./Vector-autoregression">VAR</a>
<a href="./Local-projections-vs.-VARs">LP vs VAR</a>
<a href="./@jonesGrowthIdeas2005#section">ref</a>
<script src="./postscript.js"></script>
</body></html>`

const TAG_PAGE_HTML = `<html><head>
<base href="/notes/" />
<link href="../index.css" rel="stylesheet" />
<script src="../prescript.js"></script>
</head><body>
<nav class="breadcrumb-container" aria-label="breadcrumbs">
  <div class="breadcrumb-element"><a href="../">Home</a><p> ❯ </p></div>
  <div class="breadcrumb-element"><a href="../tags/">tags</a><p> ❯ </p></div>
  <div class="breadcrumb-element"><a href>Tag: online</a></div>
</nav>
<a href="..">notes home</a>
<a href="../Autoregressive-models">AR</a>
<a href="../Tweets-From-vitalik.eth#85c681">vitalik §</a>
<a href="../tags/Economics">Economics tag</a>
<img src="../static/icon.png"/>
<script src="../postscript.js"></script>
</body></html>`

const TAGS_INDEX_HTML = `<html><head>
<base href="/notes/" />
<link href="../index.css" rel="stylesheet" />
<script src="../prescript.js"></script>
</head><body>
<nav class="breadcrumb-container" aria-label="breadcrumbs">
  <div class="breadcrumb-element"><a href="../">Home</a><p> ❯ </p></div>
  <div class="breadcrumb-element"><a href="../tags/">tags</a><p> ❯ </p></div>
</nav>
<a href="..">notes home</a>
<a href="../Autoregressive-models">AR</a>
<a href="../tags/online">online</a>
<img src="../static/icon.png"/>
<script src="../postscript.js"></script>
</body></html>`

const DEEP_TAG_HTML = `<html><head>
<base href="/notes/" />
<link href="../../index.css" rel="stylesheet" />
<script src="../../prescript.js"></script>
</head><body>
<nav class="breadcrumb-container" aria-label="breadcrumbs">
  <div class="breadcrumb-element"><a href="../../">Home</a><p> ❯ </p></div>
  <div class="breadcrumb-element"><a href="../../tags/">tags</a><p> ❯ </p></div>
  <div class="breadcrumb-element"><a href="../../tags/Economics">Economics</a><p> ❯ </p></div>
</nav>
<a href="../..">notes home</a>
<a href="../../Autoregressive-models">AR</a>
<img src="../../static/icon.png"/>
<script src="../../postscript.js"></script>
</body></html>`

// ── Tests ────────────────────────────────────────────────────────────────────

beforeEach(() => {
  jest.clearAllMocks()
  fs.existsSync.mockReturnValue(false)
  // Fathom disabled — keeps output clean for assertions
  delete process.env.NEXT_PUBLIC_FATHOM_KEY
  delete process.env.NEXT_PUBLIC_FATHOM_URL
})

// ---------------------------------------------------------------------------
// 1. Notes root  /notes/
// ---------------------------------------------------------------------------
describe('notes root (/notes/)', () => {
  let body
  beforeEach(() => { body = serve('/notes/', ROOT_HTML).body })

  test('CSS resolves to /notes/index.css', () => {
    expect(body).toContain('href="/notes/index.css"')
  })

  test('scripts resolve to /notes/*.js', () => {
    expect(body).toContain('src="/notes/prescript.js"')
    expect(body).toContain('src="/notes/postscript.js"')
  })

  test('image resolves to /notes/static/icon.png', () => {
    expect(body).toContain('src="/notes/static/icon.png"')
  })

  test('note links get trailing slash', () => {
    expect(body).toContain('href="/notes/Autoregressive-models/"')
    expect(body).toContain('href="/notes/@jonesGrowthIdeas2005/"')
  })

  test('dotted slugs get trailing slash', () => {
    expect(body).toContain('href="/notes/Tweets-From-vitalik.eth/"')
    expect(body).toContain('href="/notes/i.i.d./"')
  })

  test('tag links resolve correctly', () => {
    expect(body).toContain('href="/notes/tags/online/"')
  })

  test('hash preserved after trailing slash', () => {
    expect(body).toContain('href="/notes/@jonesGrowthIdeas2005/#17fe4e"')
  })

  test('self link "." becomes /notes/', () => {
    expect(body).toContain('href="/notes/"')
  })

  test('base tag is /notes/', () => {
    expect(body).toContain('<base href="/notes/" />')
  })
})

// ---------------------------------------------------------------------------
// 2. Top-level note  /notes/Autoregressive-models/
// ---------------------------------------------------------------------------
describe('leaf note (/notes/Autoregressive-models/)', () => {
  let body
  beforeEach(() => { body = serve('/notes/Autoregressive-models/', LEAF_NOTE_HTML).body })

  test('CSS resolves to /notes/index.css', () => {
    expect(body).toContain('href="/notes/index.css"')
  })

  test('scripts resolve to /notes/*.js', () => {
    expect(body).toContain('src="/notes/prescript.js"')
    expect(body).toContain('src="/notes/postscript.js"')
  })

  test('home link "." becomes /notes/', () => {
    expect(body).toContain('href="/notes/"')
  })

  test('sibling note links resolve correctly', () => {
    expect(body).toContain('href="/notes/Vector-autoregression/"')
    expect(body).toContain('href="/notes/Local-projections-vs.-VARs/"')
  })

  test('hash preserved on sibling links', () => {
    expect(body).toContain('href="/notes/@jonesGrowthIdeas2005/#section"')
  })

  test('base tag strips trailing slash', () => {
    expect(body).toContain('<base href="/notes/Autoregressive-models" />')
  })
})

// ---------------------------------------------------------------------------
// 3. Tag page  /notes/tags/online/  (leaf — tags/online.html)
// ---------------------------------------------------------------------------
describe('tag page (/notes/tags/online/)', () => {
  let body
  beforeEach(() => { body = serve('/notes/tags/online/', TAG_PAGE_HTML).body })

  test('CSS resolves to /notes/index.css', () => {
    expect(body).toContain('href="/notes/index.css"')
  })

  test('scripts resolve to /notes/*.js', () => {
    expect(body).toContain('src="/notes/prescript.js"')
    expect(body).toContain('src="/notes/postscript.js"')
  })

  test('images resolve to /notes/static/*', () => {
    expect(body).toContain('src="/notes/static/icon.png"')
  })

  test('breadcrumb Home → /notes/', () => {
    expect(body).toContain('href="/notes/"')
    expect(body).toMatch(/href="\/notes\/"[^>]*>Home</)
  })

  test('breadcrumb tags → /notes/tags/', () => {
    expect(body).toContain('href="/notes/tags/"')
    expect(body).toMatch(/href="\/notes\/tags\/"[^>]*>tags</)
  })

  test('bare ".." link → /notes/', () => {
    // href=".." on a tag page should go to notes root
    expect(body).toMatch(/href="\/notes\/"[^>]*>notes home</)
  })

  test('note links resolve to /notes/slug/', () => {
    expect(body).toContain('href="/notes/Autoregressive-models/"')
  })

  test('dotted slug with hash resolves correctly', () => {
    expect(body).toContain('href="/notes/Tweets-From-vitalik.eth/#85c681"')
  })

  test('sibling tag links resolve correctly', () => {
    expect(body).toContain('href="/notes/tags/Economics/"')
  })

  test('base tag strips trailing slash', () => {
    expect(body).toContain('<base href="/notes/tags/online" />')
  })
})

// ---------------------------------------------------------------------------
// 4. Tags index  /notes/tags/  (directory-index — tags/index.html)
// ---------------------------------------------------------------------------
describe('tags index (/notes/tags/) — directory-index page', () => {
  let body
  beforeEach(() => { body = serve('/notes/tags/', TAGS_INDEX_HTML, { dirIndex: true }).body })

  test('CSS resolves to /notes/index.css (not /index.css)', () => {
    expect(body).toContain('href="/notes/index.css"')
    expect(body).not.toContain('href="/index.css"')
  })

  test('scripts resolve to /notes/*.js', () => {
    expect(body).toContain('src="/notes/prescript.js"')
    expect(body).toContain('src="/notes/postscript.js"')
  })

  test('images resolve to /notes/static/*', () => {
    expect(body).toContain('src="/notes/static/icon.png"')
  })

  test('breadcrumb Home → /notes/', () => {
    expect(body).toMatch(/href="\/notes\/"[^>]*>Home</)
  })

  test('breadcrumb tags → /notes/tags/', () => {
    expect(body).toMatch(/href="\/notes\/tags\/"[^>]*>tags</)
  })

  test('bare ".." → /notes/', () => {
    expect(body).toMatch(/href="\/notes\/"[^>]*>notes home</)
  })

  test('note links resolve to /notes/slug/', () => {
    expect(body).toContain('href="/notes/Autoregressive-models/"')
  })

  test('nested tag link resolves correctly', () => {
    expect(body).toContain('href="/notes/tags/online/"')
  })

  test('base tag keeps trailing slash stripped (unchanged from code)', () => {
    // The base tag is computed independently from URL resolution
    expect(body).toContain('<base href="/notes/tags" />')
  })
})

// ---------------------------------------------------------------------------
// 5. Deep tag page  /notes/tags/Economics/Competition/  (leaf)
// ---------------------------------------------------------------------------
describe('deep tag page (/notes/tags/Economics/Competition/)', () => {
  let body
  beforeEach(() => { body = serve('/notes/tags/Economics/Competition/', DEEP_TAG_HTML).body })

  test('CSS resolves to /notes/index.css', () => {
    expect(body).toContain('href="/notes/index.css"')
    expect(body).not.toContain('href="/index.css"')
  })

  test('scripts resolve to /notes/*.js', () => {
    expect(body).toContain('src="/notes/prescript.js"')
    expect(body).toContain('src="/notes/postscript.js"')
  })

  test('images resolve to /notes/static/*', () => {
    expect(body).toContain('src="/notes/static/icon.png"')
  })

  test('breadcrumb Home → /notes/', () => {
    expect(body).toMatch(/href="\/notes\/"[^>]*>Home</)
  })

  test('breadcrumb tags → /notes/tags/', () => {
    expect(body).toMatch(/href="\/notes\/tags\/"[^>]*>tags</)
  })

  test('breadcrumb Economics → /notes/tags/Economics/', () => {
    expect(body).toMatch(/href="\/notes\/tags\/Economics\/"[^>]*>Economics</)
  })

  test('bare "../.." → /notes/', () => {
    expect(body).toMatch(/href="\/notes\/"[^>]*>notes home</)
  })

  test('note links resolve to /notes/slug/', () => {
    expect(body).toContain('href="/notes/Autoregressive-models/"')
  })

  test('base tag reflects full depth', () => {
    expect(body).toContain('<base href="/notes/tags/Economics/Competition" />')
  })
})

// ---------------------------------------------------------------------------
// 6. No relative URLs leak outside /notes/
// ---------------------------------------------------------------------------
describe('URL resolution never escapes /notes/ prefix', () => {
  test.each([
    ['/notes/',                            ROOT_HTML,      false],
    ['/notes/Autoregressive-models/',      LEAF_NOTE_HTML, false],
    ['/notes/tags/online/',                TAG_PAGE_HTML,  false],
    ['/notes/tags/',                        TAGS_INDEX_HTML, true],
    ['/notes/tags/Economics/Competition/',  DEEP_TAG_HTML,  false],
  ])('%s — all resolved URLs start with /notes/', (reqPath, html, dirIndex) => {
    const res = serve(reqPath, html, { dirIndex })
    // Extract all absolute href and src values
    const urls = [...res.body.matchAll(/(?:href|src)="(\/[^"]*)"/g)].map(m => m[1])
    for (const url of urls) {
      expect(url).toMatch(/^\/notes\//)
    }
  })
})

// ---------------------------------------------------------------------------
// 7. Existing base tag is always replaced, never doubled
// ---------------------------------------------------------------------------
describe('base tag handling', () => {
  test('replaces Quartz default base tag on every page type', () => {
    const pages = [
      ['/notes/',                            false, '<base href="/notes/" />'],
      ['/notes/Autoregressive-models/',      false, '<base href="/notes/Autoregressive-models" />'],
      ['/notes/tags/online/',                false, '<base href="/notes/tags/online" />'],
      ['/notes/tags/',                        true,  '<base href="/notes/tags" />'],
      ['/notes/tags/Economics/Competition/',  false, '<base href="/notes/tags/Economics/Competition" />'],
    ]
    for (const [reqPath, dirIndex, expected] of pages) {
      const html = '<html><head><base href="/notes/" /></head><body></body></html>'
      const res = serve(reqPath, html, { dirIndex })
      expect(res.body).toContain(expected)
      // Only one base tag
      const baseCount = (res.body.match(/<base\b/g) || []).length
      expect(baseCount).toBe(1)
    }
  })

  test('injects base tag when none exists', () => {
    const html = '<html><head></head><body></body></html>'
    const res = serve('/notes/tags/online/', html)
    expect(res.body).toContain('<base href="/notes/tags/online" />')
  })
})

// ---------------------------------------------------------------------------
// 8. Absolute links, data URIs, and external links are untouched
// ---------------------------------------------------------------------------
describe('non-relative links left unchanged', () => {
  test('absolute paths are not modified', () => {
    const html = '<html><head></head><body><a href="/about">about</a></body></html>'
    const res = serve('/notes/', html)
    expect(res.body).toContain('href="/about"')
  })

  test('full URLs are not modified', () => {
    const html = '<html><head></head><body><a href="https://example.com">ext</a></body></html>'
    const res = serve('/notes/', html)
    expect(res.body).toContain('href="https://example.com"')
  })

  test('fragment-only links are not modified', () => {
    const html = '<html><head></head><body><a href="#section">jump</a></body></html>'
    const res = serve('/notes/', html)
    expect(res.body).toContain('href="#section"')
  })

  test('data-router-ignore links are left in HTML (proxy does not remove them)', () => {
    const html = '<html><head></head><body><a href="/" data-router-ignore="true">Home</a></body></html>'
    const res = serve('/notes/', html)
    expect(res.body).toContain('data-router-ignore')
  })
})

// ---------------------------------------------------------------------------
// 9. Cache headers
// ---------------------------------------------------------------------------
describe('response headers', () => {
  test('sets correct content type', () => {
    const res = serve('/notes/', '<html><head></head><body></body></html>')
    expect(res.headers['Content-Type']).toBe('text/html; charset=utf-8')
  })

  test('sets CDN-friendly cache headers', () => {
    const res = serve('/notes/', '<html><head></head><body></body></html>')
    expect(res.headers['Cache-Control']).toContain('s-maxage=')
  })
})
