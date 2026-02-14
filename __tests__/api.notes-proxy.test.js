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

    test('sets base tag without trailing slash for nested pages', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue('<html><head></head><body></body></html>')
      const res = createRes()
      handler(createReq('/notes/tags/online/'), res)
      expect(res.body).toContain('<base href="/notes/tags/online" />')
    })

    test('sets base tag without trailing slash for deep nested pages', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue('<html><head></head><body></body></html>')
      const res = createRes()
      handler(createReq('/notes/tags/Economics/Competition/'), res)
      expect(res.body).toContain('<base href="/notes/tags/Economics/Competition" />')
    })

    test('sets base tag without trailing slash for top-level notes', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue('<html><head></head><body></body></html>')
      const res = createRes()
      handler(createReq('/notes/Autoregressive-models/'), res)
      expect(res.body).toContain('<base href="/notes/Autoregressive-models" />')
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

  describe('note link rewriting', () => {
    test('converts relative note links to absolute with trailing slash', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body><a href="./Autoregressive-models">link</a></body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/'), res)
      expect(res.body).toContain('href="/notes/Autoregressive-models/"')
    })

    test('converts @ prefixed note links to absolute', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body><a href="./@wang1000LayerNetworks2025">link</a></body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/'), res)
      expect(res.body).toContain('href="/notes/@wang1000LayerNetworks2025/"')
    })

    test('converts dotted note slugs to absolute', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body>' +
        '<a href="./Tweets-From-vitalik.eth">link</a>' +
        '<a href="./Local-projections-vs.-VARs">link</a>' +
        '<a href="./i.i.d.">link</a>' +
        '</body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/'), res)
      expect(res.body).toContain('href="/notes/Tweets-From-vitalik.eth/"')
      expect(res.body).toContain('href="/notes/Local-projections-vs.-VARs/"')
      expect(res.body).toContain('href="/notes/i.i.d./"')
    })

    test('keeps static file links relative', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body><link href="./index.css"/><a href="./prescript.js">js</a></body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/'), res)
      expect(res.body).toContain('href="./index.css"')
      expect(res.body).toContain('href="./prescript.js"')
    })

    test('preserves trailing slash on already-slashed links', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body><a href="./some-note/">link</a></body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/'), res)
      expect(res.body).toContain('href="/notes/some-note/"')
      expect(res.body).not.toContain('href="/notes/some-note//"')
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

    test('places query after trailing slash', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body><a href="./some-note?foo=bar">link</a></body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/'), res)
      expect(res.body).toContain('href="/notes/some-note/?foo=bar"')
    })

    test('handles hash on dotted note slugs', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body>' +
        '<a href="./Tweets-From-vitalik.eth#85c681">link</a>' +
        '<a href="./i.i.d.#section">link</a>' +
        '</body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/'), res)
      expect(res.body).toContain('href="/notes/Tweets-From-vitalik.eth/#85c681"')
      expect(res.body).toContain('href="/notes/i.i.d./#section"')
    })

    test('handles query on dotted note slugs', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body><a href="./Local-projections-vs.-VARs?highlight=true">link</a></body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/'), res)
      expect(res.body).toContain('href="/notes/Local-projections-vs.-VARs/?highlight=true"')
    })

    test('keeps static file links with hash or query relative', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body>' +
        '<a href="./index.css#section">link</a>' +
        '<a href="./prescript.js?v=123">link</a>' +
        '</body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/'), res)
      expect(res.body).toContain('href="./index.css#section"')
      expect(res.body).toContain('href="./prescript.js?v=123"')
    })

    test('handles combined query and hash', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body><a href="./some-note?foo=1#bar">link</a></body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/'), res)
      expect(res.body).toContain('href="/notes/some-note/?foo=1#bar"')
    })

    test('does not rewrite fragment-only or query-only links', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body>' +
        '<a href="./#section">link</a>' +
        '<a href="./?foo=bar">link</a>' +
        '</body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/'), res)
      expect(res.body).toContain('href="./#section"')
      expect(res.body).toContain('href="./?foo=bar"')
    })

    test('converts notes home link to absolute', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body><a href=".">Nnamdi\'s Notes</a></body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/'), res)
      expect(res.body).toContain('href="/notes/"')
    })

    test('handles mixed links in one page', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body>' +
        '<a href="./Note-A">A</a>' +
        '<a href="./Note-B#sec">B</a>' +
        '<a href="./index.css">css</a>' +
        '<a href=".">home</a>' +
        '</body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/'), res)
      expect(res.body).toContain('href="/notes/Note-A/"')
      expect(res.body).toContain('href="/notes/Note-B/#sec"')
      expect(res.body).toContain('href="./index.css"')
      expect(res.body).toContain('href="/notes/"')
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
