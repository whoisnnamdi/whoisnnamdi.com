const path = require('path')

jest.mock('fs', () => ({
  existsSync: jest.fn(),
  readdirSync: jest.fn(),
  readFileSync: jest.fn(),
}))

jest.mock('gray-matter', () => jest.fn())

jest.mock('../lib/markdown.js', () => ({
  renderMarkdown: jest.fn(async (content) => `<p>${content}</p>`),
}))

const fs = require('fs')
const matter = require('gray-matter')
const { renderMarkdown } = require('../lib/markdown.js')
const content = require('../lib/content')

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')
const PAGES_DIR = path.join(process.cwd(), 'content', 'pages')
const DATA_DIR = path.join(process.cwd(), 'content', 'data')

function mdPath(dir, slug) {
  return path.join(dir, `${slug}.md`)
}

describe('lib/content', () => {
  let markdownByPath

  beforeEach(() => {
    jest.clearAllMocks()

    markdownByPath = {}

    fs.readFileSync.mockImplementation((filePath) => {
      if (filePath.endsWith('.json')) {
        return '[]'
      }
      return `FILE:${filePath}`
    })

    matter.mockImplementation((fileContents) => {
      const filePath = fileContents.replace(/^FILE:/, '')
      return markdownByPath[filePath] || { data: {}, content: '' }
    })

    fs.existsSync.mockImplementation((filePath) => {
      if (filePath === POSTS_DIR || filePath === PAGES_DIR) return true
      if (filePath.endsWith('.md')) return true
      return false
    })
  })

  test('sorts post summaries by published_at descending', async () => {
    fs.readdirSync.mockImplementation((dir) => {
      if (dir === POSTS_DIR) return ['old.md', 'new.md', 'middle.md']
      return []
    })

    markdownByPath[mdPath(POSTS_DIR, 'old')] = {
      data: { slug: 'old', published_at: '2022-01-01' },
      content: 'old',
    }
    markdownByPath[mdPath(POSTS_DIR, 'new')] = {
      data: { slug: 'new', published_at: '2024-09-01' },
      content: 'new',
    }
    markdownByPath[mdPath(POSTS_DIR, 'middle')] = {
      data: { slug: 'middle', published_at: '2023-04-15' },
      content: 'middle',
    }

    const posts = await content.getPostSummaries()

    expect(posts.map((p) => p.slug)).toEqual(['new', 'middle', 'old'])
  })

  test('getAllPages excludes newsletter and portfolio by default', async () => {
    fs.readdirSync.mockImplementation((dir) => {
      if (dir === PAGES_DIR) return ['about.md', 'newsletter.md', 'portfolio.md']
      return []
    })

    markdownByPath[mdPath(PAGES_DIR, 'about')] = {
      data: { slug: 'about', title: 'About' },
      content: 'about page',
    }
    markdownByPath[mdPath(PAGES_DIR, 'newsletter')] = {
      data: { slug: 'newsletter', title: 'Newsletter' },
      content: 'newsletter page',
    }
    markdownByPath[mdPath(PAGES_DIR, 'portfolio')] = {
      data: { slug: 'portfolio', title: 'Portfolio' },
      content: 'portfolio page',
    }

    const pages = await content.getAllPages()

    expect(pages.map((p) => p.slug)).toEqual(['about'])
    expect(renderMarkdown).toHaveBeenCalled()
  })

  test('getPostBySlug and getPageBySlug return null when files are missing', async () => {
    fs.existsSync.mockImplementation((filePath) => {
      if (filePath === POSTS_DIR || filePath === PAGES_DIR) return true
      if (filePath.endsWith('missing-post.md')) return false
      if (filePath.endsWith('missing-page.md')) return false
      return true
    })

    const post = await content.getPostBySlug('missing-post')
    const page = await content.getPageBySlug('missing-page')

    expect(post).toBeNull()
    expect(page).toBeNull()
  })

  test('JSON data loaders return [] when data files are missing', () => {
    fs.existsSync.mockImplementation((filePath) => {
      if (filePath === POSTS_DIR || filePath === PAGES_DIR) return true
      if (filePath === path.join(DATA_DIR, 'portfolio.json')) return false
      if (filePath === path.join(DATA_DIR, 'talks.json')) return false
      return false
    })

    expect(content.getPortfolioData()).toEqual([])
    expect(content.getTalksData()).toEqual([])
  })
})
