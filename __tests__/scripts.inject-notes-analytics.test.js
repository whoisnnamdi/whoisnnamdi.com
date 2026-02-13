/**
 * Unit tests for the Fathom analytics injection helpers in
 * scripts/fathom-helpers.js.
 */

const {
  buildFathomScriptTag,
  stripExistingFathom,
  injectBeforeHeadClose,
} = require('../scripts/fathom-helpers')

const FATHOM_KEY = 'TESTKEY'
const FATHOM_CUSTOM_DOMAIN = 'https://my-proxy.example.com/script.js'
const FATHOM_BASE_URL = 'https://cdn.usefathom.com/'

let origKey, origUrl
beforeEach(() => {
  origKey = process.env.NEXT_PUBLIC_FATHOM_KEY
  origUrl = process.env.NEXT_PUBLIC_FATHOM_URL
  process.env.NEXT_PUBLIC_FATHOM_KEY = FATHOM_KEY
  process.env.NEXT_PUBLIC_FATHOM_URL = FATHOM_CUSTOM_DOMAIN
})
afterEach(() => {
  process.env.NEXT_PUBLIC_FATHOM_KEY = origKey
  process.env.NEXT_PUBLIC_FATHOM_URL = origUrl
})

// ---------------------------------------------------------------------------
// buildFathomScriptTag
// ---------------------------------------------------------------------------
describe('buildFathomScriptTag', () => {
  it('uses a full script URL as-is for src (custom domain)', () => {
    const tag = buildFathomScriptTag()
    expect(tag).toContain(`src="${FATHOM_CUSTOM_DOMAIN}"`)
    expect(tag).toContain(`data-site="${FATHOM_KEY}"`)
    expect(tag).toMatch(/^<!-- fathom -->/)
  })

  it('appends script.js to a base URL', () => {
    process.env.NEXT_PUBLIC_FATHOM_URL = FATHOM_BASE_URL
    const tag = buildFathomScriptTag()
    expect(tag).toContain(`src="${FATHOM_BASE_URL}script.js"`)
  })

  it('returns empty string when env vars are missing', () => {
    delete process.env.NEXT_PUBLIC_FATHOM_KEY
    expect(buildFathomScriptTag()).toBe('')
  })
})

// ---------------------------------------------------------------------------
// stripExistingFathom
// ---------------------------------------------------------------------------
describe('stripExistingFathom', () => {
  it('strips a marked Fathom tag', () => {
    const html = '<head>\n<!-- fathom --><script src="old.js" data-site="X" defer></script>\n</head>'
    expect(stripExistingFathom(html)).toBe('<head></head>')
  })

  it('strips a legacy marker-less tag with data-domains', () => {
    const html = '<head>\n<script src="old.js" data-site="X" data-domains="whoisnnamdi.com,www.whoisnnamdi.com" defer></script>\n</head>'
    expect(stripExistingFathom(html)).toBe('<head></head>')
  })

  it('preserves unrelated scripts that use data-site', () => {
    const thirdParty = '<script src="https://other.com/widget.js" data-site="ABCD" defer></script>'
    const html = `<head>\n${thirdParty}\n</head>`
    expect(stripExistingFathom(html)).toContain(thirdParty)
  })

  it('strips both legacy and marked tags in one pass', () => {
    const html = [
      '<head>',
      '<script src="old.js" data-site="X" data-domains="whoisnnamdi.com,www.whoisnnamdi.com" defer></script>',
      '<!-- fathom --><script src="new.js" data-site="Y" defer></script>',
      '</head>',
    ].join('\n')
    const result = stripExistingFathom(html)
    expect(result).not.toContain('data-site')
    expect(result).toContain('</head>')
  })
})

// ---------------------------------------------------------------------------
// injectBeforeHeadClose
// ---------------------------------------------------------------------------
describe('injectBeforeHeadClose', () => {
  const snippet =
    '<!-- fathom --><script src="https://f.example.com/script.js" data-site="KEY" data-domains="whoisnnamdi.com,www.whoisnnamdi.com" defer></script>'

  it('injects before </head>', () => {
    const html = '<html><head><title>T</title></head><body></body></html>'
    const result = injectBeforeHeadClose(html, snippet)
    expect(result).toContain(`${snippet}\n</head>`)
    expect(result.indexOf(snippet)).toBeLessThan(result.indexOf('</head>'))
  })

  it('replaces an existing stale Fathom tag', () => {
    const stale =
      '<script src="old.js" data-site="OLD" data-domains="whoisnnamdi.com,www.whoisnnamdi.com" defer></script>'
    const html = `<head>${stale}</head><body></body>`
    const result = injectBeforeHeadClose(html, snippet)
    expect(result).not.toContain('OLD')
    expect(result).toContain('data-site="KEY"')
    // Exactly one data-site attribute
    expect(result.match(/data-site=/g)).toHaveLength(1)
  })

  it('preserves unrelated data-site scripts when replacing', () => {
    const thirdParty =
      '<script src="https://other.com/w.js" data-site="OTHER"></script>'
    const stale =
      '<!-- fathom --><script src="old.js" data-site="STALE" defer></script>'
    const html = `<head>\n${thirdParty}\n${stale}\n</head><body></body>`
    const result = injectBeforeHeadClose(html, snippet)
    expect(result).toContain(thirdParty)
    expect(result).not.toContain('STALE')
    expect(result).toContain('data-site="KEY"')
  })

  it('falls back to body injection when </head> is missing', () => {
    const html = '<html><body class="app"><p>Hi</p></body></html>'
    const result = injectBeforeHeadClose(html, snippet)
    expect(result).toContain(snippet)
    expect(result).toContain('<body class="app">')
    // Snippet appears after <body>
    expect(result.indexOf(snippet)).toBeGreaterThan(result.indexOf('<body'))
  })

  it('returns html unchanged when snippet is empty', () => {
    const html = '<head></head><body></body>'
    expect(injectBeforeHeadClose(html, '')).toBe(html)
  })
})
