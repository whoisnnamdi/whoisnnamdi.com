const path = require('path')
const fs = require('fs')
const { createRSS } = require('../scripts/generate-rss')
const { createSitemap } = require('../scripts/generate-sitemap')

describe('static file generators', () => {
  test('createRSS outputs valid basic feed with items', () => {
    const posts = [{
      id: 'p1',
      title: 'Hello',
      excerpt: 'World',
      slug: 'hello',
      html: '<p>Body</p>',
      published_at: '2023-01-01T00:00:00.000Z',
      feature_image: 'https://img/1.jpg',
      tags: [{ name: 'test' }],
    }]
    const xml = createRSS(posts)
    expect(xml).toContain('<?xml')
    expect(xml).toContain('<item>')
    expect(xml).toContain('<title>')
    expect(xml).toContain('https://whoisnnamdi.com/hello/')
  })

  test('createSitemap outputs urls for posts and others', () => {
    const items = [{ slug: 'hello' }, { slug: 'world' }]
    const xml = createSitemap(items)
    expect(xml).toContain('https://whoisnnamdi.com/hello/')
    expect(xml).toContain('https://whoisnnamdi.com/world/')
    expect(xml).toContain('https://whoisnnamdi.com/founders/')
    expect(xml).toContain('https://whoisnnamdi.com/investors/')
  })
})

