const { extractAttribute, extractPortfolioLogos } = require('../lib/portfolio')

describe('portfolio parsing', () => {
  test('extractAttribute finds attribute values', () => {
    const tag = '<img src="/logo.png" alt="Acme" data-src="/logo@2x.png" />'
    expect(extractAttribute(tag, 'src')).toBe('/logo.png')
    expect(extractAttribute(tag, 'alt')).toBe('Acme')
    expect(extractAttribute(tag, 'data-src')).toBe('/logo@2x.png')
    expect(extractAttribute(tag, 'missing')).toBeUndefined()
  })

  test('extractPortfolioLogos parses linked and unlinked images, resolves data-src, dedupes', () => {
    const html = `
      <a href="https://example.com"><img src="/a.png" alt="Alpha" /></a>
      <img src="data:image/png;base64,AAAA" data-src="/b@2x.png" alt="Beta" />
      <img src="/b@2x.png" alt="Beta" />
      <a href="#"><img src="/c.png" alt="" /></a>
    `
    const logos = extractPortfolioLogos(html)
    expect(logos).toEqual([
      { alt: 'Alpha', displayName: 'Alpha', href: 'https://example.com', src: '/a.png' },
      { alt: 'Beta', displayName: 'Beta', href: null, src: '/b@2x.png' },
      { alt: 'Portfolio company logo', displayName: null, href: null, src: '/c.png' },
    ])
  })
})

