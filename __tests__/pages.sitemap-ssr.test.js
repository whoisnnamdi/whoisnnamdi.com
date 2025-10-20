const sitemapModule = require('../pages/sitemap.xml.js')
const fs = require('fs')
const path = require('path')

jest.mock('fs', () => ({
  readFileSync: jest.fn(() => '<xml>ok</xml>'),
}))

describe('sitemap ssr', () => {
  test('getServerSideProps serves xml with header', async () => {
    const res = {
      headers: {},
      body: '',
      statusCode: 200,
      setHeader(k, v) { this.headers[k] = v },
      write(b) { this.body += b },
      end() {},
    }
    await sitemapModule.getServerSideProps({ res })
    expect(res.headers['Content-Type']).toBe('text/xml')
    expect(res.body).toContain('<xml>ok</xml>')
  })
})

