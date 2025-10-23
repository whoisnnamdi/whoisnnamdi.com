const nextConfig = require('../next.config.js')

describe('next.config rewrites and headers', () => {
  test('rewrites include RSS aliases', async () => {
    const rewrites = await nextConfig.rewrites()
    const paths = rewrites.map(r => r.source + '->' + r.destination)
    expect(paths).toEqual(expect.arrayContaining([
      '/rss->/static/rss.xml',
      '/rss.xml->/static/rss.xml',
      '/feed->/static/rss.xml',
      '/en/rss->/static/rss.xml',
    ]))
  })

  test('headers include RSS content-type', async () => {
    const headers = await nextConfig.headers()
    const rss = headers.find(h => h.source === '/static/rss.xml')
    expect(rss).toBeTruthy()
    const ct = rss.headers.find(h => h.key === 'Content-Type')
    expect(ct.value).toBe('application/rss+xml')
  })
})

