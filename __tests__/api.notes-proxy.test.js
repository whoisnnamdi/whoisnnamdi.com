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

    test('replaces existing base tag with correct depth for nested pages', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head><base href="/notes/" /></head><body></body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/tags/online/'), res)
      expect(res.body).toContain('<base href="/notes/tags/online" />')
      expect(res.body).not.toContain('<base href="/notes/" />')
    })

    test('replaces existing base tag for deep nested pages', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head><base href="/notes/" /></head><body></body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/tags/Economics/Competition/'), res)
      expect(res.body).toContain('<base href="/notes/tags/Economics/Competition" />')
    })

    test('replaces existing base tag for top-level notes', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head><base href="/notes/" /></head><body></body></html>'
      )
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

    test('converts ../ links from tag pages to absolute', () => {
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

    test('converts ../../ links from deep tag pages to absolute', () => {
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

    test('converts dotted note slugs to absolute', () => {
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
