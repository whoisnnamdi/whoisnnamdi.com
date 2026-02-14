/**
 * Tests for notes-proxy API security and path resolution
 */

jest.mock('fs')

const fs = require('fs')
const path = require('path')

// Import handler
const handler = require('../pages/api/notes-proxy').default

// Mock process.cwd() to return a predictable path
const MOCK_CWD = '/app'
jest.spyOn(process, 'cwd').mockReturnValue(MOCK_CWD)

function createReq(queryPath) {
  return { query: { path: queryPath } }
}

function createRes() {
  return {
    statusCode: 200,
    headers: {},
    body: null,
    setHeader: function(k, v) { this.headers[k] = v },
    status: function(c) { this.statusCode = c; return this },
    send: function(b) { this.body = b; return this },
  }
}

describe('notes-proxy API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Default: no files exist
    fs.existsSync.mockReturnValue(false)
    fs.readFileSync.mockReturnValue('<html><head></head><body></body></html>')
  })

  describe('path traversal protection', () => {
    test('blocks path traversal with ../', () => {
      const res = createRes()
      handler(createReq('/notes/../../../etc/passwd'), res)
      expect(res.statusCode).toBe(404)
    })

    test('blocks encoded path traversal', () => {
      const res = createRes()
      handler(createReq('/notes/%2e%2e%2f%2e%2e%2fetc/passwd'), res)
      expect(res.statusCode).toBe(404)
    })

    test('blocks backslash in slug', () => {
      const res = createRes()
      handler(createReq('/notes/foo%5Cbar'), res)
      expect(res.statusCode).toBe(404)
    })

    test('rejects paths outside /notes', () => {
      const res = createRes()
      handler(createReq('/other/path'), res)
      expect(res.statusCode).toBe(404)
    })
  })

  describe('valid path resolution', () => {
    test('resolves /notes to index.html', () => {
      fs.existsSync.mockReturnValue(true)
      const res = createRes()
      handler(createReq('/notes'), res)
      expect(res.statusCode).toBe(200)
      expect(fs.readFileSync).toHaveBeenCalledWith(
        path.join(MOCK_CWD, 'public', 'notes', 'index.html'),
        'utf8'
      )
    })

    test('resolves /notes/ to index.html', () => {
      fs.existsSync.mockReturnValue(true)
      const res = createRes()
      handler(createReq('/notes/'), res)
      expect(res.statusCode).toBe(200)
    })

    test('resolves /notes/slug to slug.html', () => {
      fs.existsSync.mockImplementation((p) => p.endsWith('test-note.html'))
      const res = createRes()
      handler(createReq('/notes/test-note'), res)
      expect(res.statusCode).toBe(200)
    })

    test('resolves nested tag pages like /notes/tags/online/', () => {
      fs.existsSync.mockImplementation((p) => p.endsWith('tags/online.html'))
      const res = createRes()
      handler(createReq('/notes/tags/online/'), res)
      expect(res.statusCode).toBe(200)
    })

    test('resolves deeply nested tag pages', () => {
      fs.existsSync.mockImplementation((p) => p.endsWith('tags/Economics/Competition.html'))
      const res = createRes()
      handler(createReq('/notes/tags/Economics/Competition/'), res)
      expect(res.statusCode).toBe(200)
    })

    test('resolves tag index page', () => {
      fs.existsSync.mockImplementation((p) => p.endsWith('tags/index.html'))
      const res = createRes()
      handler(createReq('/notes/tags/'), res)
      expect(res.statusCode).toBe(200)
    })
  })

  describe('input validation', () => {
    test('rejects missing path', () => {
      const res = createRes()
      handler({ query: {} }, res)
      expect(res.statusCode).toBe(400)
    })

    test('rejects array path', () => {
      const res = createRes()
      handler({ query: { path: ['/notes', '/other'] } }, res)
      expect(res.statusCode).toBe(400)
    })
  })

  describe('Fathom injection', () => {
    beforeEach(() => {
      process.env.NEXT_PUBLIC_FATHOM_KEY = 'TEST123'
      process.env.NEXT_PUBLIC_FATHOM_URL = 'https://cdn.usefathom.com/script.js'
    })

    afterEach(() => {
      delete process.env.NEXT_PUBLIC_FATHOM_KEY
      delete process.env.NEXT_PUBLIC_FATHOM_URL
    })

    test('injects Fathom script before </head>', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue('<html><head><title>Test</title></head><body></body></html>')
      const res = createRes()
      handler(createReq('/notes'), res)
      expect(res.body).toContain('data-site="TEST123"')
      expect(res.body).toContain('</head>')
    })

    test('sets base tag to /notes/ for the root page', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue('<html><head></head><body></body></html>')
      const res = createRes()
      handler(createReq('/notes/'), res)
      expect(res.body).toContain('<base href="/notes/" />')
    })

    test('always sets base tag to /notes/ regardless of page depth', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head><base href="/notes/" /></head><body></body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/tags/online/'), res)
      expect(res.body).toContain('<base href="/notes/" />')
    })

    test('always sets base tag to /notes/ for deep nested pages', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head><base href="/notes/" /></head><body></body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/tags/Economics/Competition/'), res)
      expect(res.body).toContain('<base href="/notes/" />')
    })

    test('always sets base tag to /notes/ for top-level notes', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head><base href="/notes/" /></head><body></body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/Autoregressive-models/'), res)
      expect(res.body).toContain('<base href="/notes/" />')
    })

    test('does not double-inject Fathom script', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head><script src="https://cdn.usefathom.com/script.js" data-site="TEST123"></script></head><body></body></html>'
      )
      const res = createRes()
      handler(createReq('/notes'), res)
      // Should only have one occurrence
      const matches = res.body.match(/data-site="TEST123"/g)
      expect(matches).toHaveLength(1)
    })
  })

  describe('relative URL resolution', () => {
    test('converts ./ note links to absolute with trailing slash', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body>' +
        '<a href="./Autoregressive-models">link</a>' +
        '<a href="./@wang1000LayerNetworks2025">link</a>' +
        '</body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/'), res)
      expect(res.body).toContain('href="/notes/Autoregressive-models/"')
      expect(res.body).toContain('href="/notes/@wang1000LayerNetworks2025/"')
    })

    test('converts ../ links from tag pages to absolute with trailing slash', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body>' +
        '<a href="../">Home</a>' +
        '<a href="../tags/">tags</a>' +
        '<a href="../Autoregressive-models">link</a>' +
        '</body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/tags/online/'), res)
      expect(res.body).toContain('href="/notes/"')
      expect(res.body).toContain('href="/notes/tags/"')
      expect(res.body).toContain('href="/notes/Autoregressive-models/"')
    })

    test('converts ../../ links from deep tag pages to absolute with trailing slash', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body>' +
        '<a href="../../">Home</a>' +
        '<a href="../../Autoregressive-models">link</a>' +
        '</body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/tags/Economics/Competition/'), res)
      expect(res.body).toContain('href="/notes/"')
      expect(res.body).toContain('href="/notes/Autoregressive-models/"')
    })

    test('converts bare ".." to absolute', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body><a href="..">Home</a></body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/tags/online/'), res)
      expect(res.body).toContain('href="/notes/"')
    })

    test('converts bare "." to absolute', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body><a href=".">Notes</a></body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/'), res)
      expect(res.body).toContain('href="/notes/"')
    })

    test('converts dotted note slugs to absolute with trailing slash', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body>' +
        '<a href="./Tweets-From-vitalik.eth">link</a>' +
        '<a href="./i.i.d.">link</a>' +
        '</body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/'), res)
      expect(res.body).toContain('href="/notes/Tweets-From-vitalik.eth/"')
      expect(res.body).toContain('href="/notes/i.i.d./"')
    })

    test('resolves static file links to absolute paths', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head>' +
        '<link href="../index.css"/>' +
        '<script src="../prescript.js"></script>' +
        '</head><body>' +
        '<img src="../static/icon.png"/>' +
        '</body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/tags/online/'), res)
      expect(res.body).toContain('href="/notes/index.css"')
      expect(res.body).toContain('src="/notes/prescript.js"')
      expect(res.body).toContain('src="/notes/static/icon.png"')
    })

    test('resolves static files from tags index page', () => {
      // tags/ is a directory-index page: tags.html doesn't exist, tags/index.html does
      fs.existsSync.mockImplementation((p) => p.endsWith('index.html'))
      fs.readFileSync.mockReturnValue(
        '<html><head>' +
        '<link href="../index.css"/>' +
        '<script src="../prescript.js"></script>' +
        '</head><body></body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/tags/'), res)
      expect(res.body).toContain('href="/notes/index.css"')
      expect(res.body).toContain('src="/notes/prescript.js"')
    })

    test('resolves static files from notes root', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head>' +
        '<link href="./index.css"/>' +
        '<script src="./prescript.js"></script>' +
        '</head><body></body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/'), res)
      expect(res.body).toContain('href="/notes/index.css"')
      expect(res.body).toContain('src="/notes/prescript.js"')
    })

    test('places hash after trailing slash', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body>' +
        '<a href="./@jonesGrowthIdeas2005#17fe4e">link</a>' +
        '<a href="./Augmenting-Long-term-Memory#80aa23">link</a>' +
        '</body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/'), res)
      expect(res.body).toContain('href="/notes/@jonesGrowthIdeas2005/#17fe4e"')
      expect(res.body).toContain('href="/notes/Augmenting-Long-term-Memory/#80aa23"')
    })

    test('handles dotted slugs with hash from tag pages', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body>' +
        '<a href="../Tweets-From-vitalik.eth#85c681">link</a>' +
        '</body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/tags/online/'), res)
      expect(res.body).toContain('href="/notes/Tweets-From-vitalik.eth/#85c681"')
    })

    test('handles mixed links on a tag page', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body>' +
        '<a href="../">Home</a>' +
        '<a href="../tags/">tags</a>' +
        '<a href="../Note-A">A</a>' +
        '<a href="../index.css">css</a>' +
        '<a href="..">up</a>' +
        '</body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/tags/online/'), res)
      expect(res.body).toContain('href="/notes/"')
      expect(res.body).toContain('href="/notes/tags/"')
      expect(res.body).toContain('href="/notes/Note-A/"')
      expect(res.body).toContain('href="/notes/index.css"')
      expect(res.body).toContain('href="/notes/"')
    })
  })

  describe('trailing slashes on page links', () => {
    // The SPA router uses element.href for pushState.  Links must include
    // a trailing slash so the URL bar shows the canonical /notes/slug/ URL
    // and the middleware redirect (/notes/slug → /notes/slug/) is never
    // needed during SPA navigation.

    test('note links from root get trailing slash', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body>' +
        '<a href="./Autoregressive-models">link</a>' +
        '<a href="./@wang1000LayerNetworks2025">link</a>' +
        '</body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/'), res)
      expect(res.body).toContain('href="/notes/Autoregressive-models/"')
      expect(res.body).toContain('href="/notes/@wang1000LayerNetworks2025/"')
    })

    test('note links from tag pages get trailing slash', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body>' +
        '<a href="../Autoregressive-models">link</a>' +
        '</body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/tags/online/'), res)
      expect(res.body).toContain('href="/notes/Autoregressive-models/"')
    })

    test('directory links (../ and ../tags/) get trailing slash', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body>' +
        '<a href="../">Home</a>' +
        '<a href="../tags/">tags</a>' +
        '</body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/tags/online/'), res)
      expect(res.body).toContain('href="/notes/"')
      expect(res.body).toContain('href="/notes/tags/"')
    })

    test('dotted note slugs get trailing slash', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body>' +
        '<a href="./Tweets-From-vitalik.eth">link</a>' +
        '<a href="./i.i.d.">link</a>' +
        '</body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/'), res)
      expect(res.body).toContain('href="/notes/Tweets-From-vitalik.eth/"')
      expect(res.body).toContain('href="/notes/i.i.d./"')
    })

    test('hash placed after trailing slash', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body>' +
        '<a href="./@jonesGrowthIdeas2005#17fe4e">link</a>' +
        '</body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/'), res)
      expect(res.body).toContain('href="/notes/@jonesGrowthIdeas2005/#17fe4e"')
    })

    test('bare ".." gets trailing slash', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body><a href="..">up</a></body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/tags/online/'), res)
      expect(res.body).toContain('href="/notes/"')
    })

    test('bare "." gets trailing slash', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body><a href=".">self</a></body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/'), res)
      expect(res.body).toContain('href="/notes/"')
    })

    test('static files do NOT get trailing slash', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head><link href="./index.css"/></head>' +
        '<body><script src="./postscript.js"></script></body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/'), res)
      expect(res.body).toContain('href="/notes/index.css"')
      expect(res.body).not.toContain('href="/notes/index.css/"')
      expect(res.body).toContain('src="/notes/postscript.js"')
      expect(res.body).not.toContain('src="/notes/postscript.js/"')
    })
  })

  describe('inline script URL resolution', () => {
    // Quartz spa-preserve scripts contain fetch("../static/contentIndex.json")
    // on tag pages and fetch("../../static/...") on deep tag pages.  These
    // resolve against <base href="/notes/"> in the browser, so ../static
    // becomes /static/ (404).  The proxy must rewrite them to absolute.

    test('rewrites fetch("../static/...") to /notes/static/... on tag pages', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head>' +
        '<script type="application/javascript" spa-preserve>' +
        'const fetchData = fetch("../static/contentIndex.json").then(d => d.json())' +
        '</script></head><body></body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/tags/online/'), res)
      expect(res.body).toContain('fetch("/notes/static/contentIndex.json")')
      expect(res.body).not.toContain('fetch("../static/')
    })

    test('rewrites fetch("../../static/...") on deep tag pages', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head>' +
        '<script type="application/javascript" spa-preserve>' +
        'const fetchData = fetch("../../static/contentIndex.json").then(d => d.json())' +
        '</script></head><body></body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/tags/Economics/Competition/'), res)
      expect(res.body).toContain('fetch("/notes/static/contentIndex.json")')
      expect(res.body).not.toContain('fetch("../../static/')
    })

    test('rewrites fetch("./static/...") on root page (already correct but normalized)', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head>' +
        '<script type="application/javascript" spa-preserve>' +
        'const fetchData = fetch("./static/contentIndex.json").then(d => d.json())' +
        '</script></head><body></body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/'), res)
      expect(res.body).toContain('fetch("/notes/static/contentIndex.json")')
    })

    test('does not rewrite fetch() with absolute URLs', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head>' +
        '<script>fetch("https://example.com/data.json")</script>' +
        '</head><body></body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/'), res)
      expect(res.body).toContain('fetch("https://example.com/data.json")')
    })
  })

  describe('client-side URL resolution fix', () => {
    // Quartz's SPA router constructs URLs like:
    //   new URL('./slug', location.toString())
    // When location has a trailing slash (e.g., /notes/page-A/), the
    // browser treats page-A/ as a directory, so ./slug resolves to
    // /notes/page-A/slug instead of /notes/slug — the path-stacking bug.
    //
    // The proxy must inject an inline script that patches the global URL
    // constructor to strip the trailing slash from the base URL when
    // resolving relative paths against /notes/ subpages.

    test('injects URL-fix script into <head>', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body></body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/'), res)
      expect(res.body).toContain('__quartz_url_fix__')
    })

    test('URL-fix script appears before </head>', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head><script src="./prescript.js"></script></head><body></body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/Autoregressive-models/'), res)
      const fixIdx = res.body.indexOf('__quartz_url_fix__')
      const headCloseIdx = res.body.indexOf('</head>')
      expect(fixIdx).toBeGreaterThan(-1)
      expect(fixIdx).toBeLessThan(headCloseIdx)
    })

    test('URL-fix script is only injected once', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body></body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/'), res)
      const matches = res.body.match(/__quartz_url_fix__/g)
      expect(matches).toHaveLength(1)
    })

    test('URL-fix script prevents path stacking on notes subpages', () => {
      // Quartz's ee() does: new URL(Ze(currentSlug, targetSlug), location)
      // Ze() builds the correct ../ chain for the page depth:
      //   from "page-A"              → Ze returns "./target"
      //   from "tags/online"         → Ze returns "../target"
      //   from "tags/Econ/Comp"      → Ze returns "../../target"
      //
      // With trailing slash in location, each ../ goes up one fewer level
      // than intended, causing stacking.  The fix strips the trailing
      // slash so the last segment is treated as a "file" not a "directory".
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body></body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/'), res)

      // Extract and evaluate the fix script
      const scriptMatch = res.body.match(/<script[^>]*>(\s*\/\/ __quartz_url_fix__[\s\S]*?)<\/script>/)
      expect(scriptMatch).not.toBeNull()

      // Stub browser-only static methods before eval so the script runs
      // in Node.js without TypeError (Node's URL lacks these).
      const OrigURL = globalThis.URL
      if (!OrigURL.createObjectURL) OrigURL.createObjectURL = () => {}
      if (!OrigURL.revokeObjectURL) OrigURL.revokeObjectURL = () => {}

      eval(scriptMatch[1])

      try {
        // ── Realistic ee() calls (Ze builds the relative path) ──

        // From top-level note: Ze("page-A","target") = "./target"
        // Without fix: /notes/page-A/target  (stacked!)
        // With fix:    /notes/target          (correct)
        const r1 = new URL('./target', 'https://example.com/notes/page-A/')
        expect(r1.pathname).toBe('/notes/target')

        // From tag page: Ze("tags/online","target") = "../target"
        // Without fix: /notes/tags/target  (stacked!)
        // With fix:    /notes/target       (correct)
        const r2 = new URL('../target', 'https://example.com/notes/tags/online/')
        expect(r2.pathname).toBe('/notes/target')

        // From deep tag: Ze("tags/Econ/Comp","target") = "../../target"
        // Without fix: /notes/tags/target  (stacked!)
        // With fix:    /notes/target       (correct)
        const r3 = new URL('../../target', 'https://example.com/notes/tags/Econ/Comp/')
        expect(r3.pathname).toBe('/notes/target')

        // ── Notes root: no patch needed (already correct) ──
        const r4 = new URL('./some-note', 'https://example.com/notes/')
        expect(r4.pathname).toBe('/notes/some-note')

        // ── Absolute input: unaffected ──
        const r5 = new URL('/notes/slug/', 'https://example.com/notes/page-A/')
        expect(r5.pathname).toBe('/notes/slug/')

        // ── Non-notes URL: unaffected by patch ──
        const r6 = new URL('./page', 'https://example.com/blog/post/')
        expect(r6.pathname).toBe('/blog/post/page')

        // ── Single argument: unaffected ──
        const r7 = new URL('https://example.com/notes/page/')
        expect(r7.pathname).toBe('/notes/page/')
      } finally {
        // Restore original URL constructor
        globalThis.URL = OrigURL
      }
    })
  })

  describe('error handling', () => {
    test('returns 404 when file read fails', () => {
      fs.existsSync.mockReturnValue(false)
      fs.readFileSync.mockImplementation(() => { throw new Error('ENOENT') })
      const res = createRes()
      handler(createReq('/notes/nonexistent'), res)
      expect(res.statusCode).toBe(404)
    })

    test('returns 404 on unexpected read error', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockImplementation(() => { throw new Error('EACCES') })
      const res = createRes()
      handler(createReq('/notes'), res)
      expect(res.statusCode).toBe(404)
    })
  })
})
