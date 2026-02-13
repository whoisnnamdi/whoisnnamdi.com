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

    test('blocks forward slash in slug', () => {
      const res = createRes()
      handler(createReq('/notes/foo%2Fbar'), res)
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

  describe('trailing slash rewriting', () => {
    test('appends trailing slash to internal note links', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body><a href="./Autoregressive-models">link</a></body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/'), res)
      expect(res.body).toContain('href="./Autoregressive-models/"')
    })

    test('appends trailing slash to @ prefixed note links', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body><a href="./@wang1000LayerNetworks2025">link</a></body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/'), res)
      expect(res.body).toContain('href="./@wang1000LayerNetworks2025/"')
    })

    test('appends trailing slash to dotted note slugs', () => {
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
      expect(res.body).toContain('href="./Tweets-From-vitalik.eth/"')
      expect(res.body).toContain('href="./Local-projections-vs.-VARs/"')
      expect(res.body).toContain('href="./i.i.d./"')
    })

    test('does not add slash to file links with extensions', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body><link href="./index.css"/><a href="./prescript.js">js</a><img src="./static/icon.png"/></body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/'), res)
      expect(res.body).toContain('href="./index.css"')
      expect(res.body).toContain('href="./prescript.js"')
    })

    test('does not double-slash links that already have trailing slash', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body><a href="./some-note/">link</a></body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/'), res)
      expect(res.body).toContain('href="./some-note/"')
      expect(res.body).not.toContain('href="./some-note//"')
    })

    test('handles multiple note links in one page', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(
        '<html><head></head><body>' +
        '<a href="./Note-A">A</a>' +
        '<a href="./Note-B">B</a>' +
        '<a href="./index.css">css</a>' +
        '</body></html>'
      )
      const res = createRes()
      handler(createReq('/notes/'), res)
      expect(res.body).toContain('href="./Note-A/"')
      expect(res.body).toContain('href="./Note-B/"')
      expect(res.body).toContain('href="./index.css"')
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
