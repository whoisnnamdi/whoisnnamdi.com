/**
 * CommonJS content API for build scripts (RSS, sitemap)
 * Replaces ghost-api.js
 */

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const CONTENT_DIR = path.join(process.cwd(), 'content')
const POSTS_DIR = path.join(CONTENT_DIR, 'posts')
const PAGES_DIR = path.join(CONTENT_DIR, 'pages')

/**
 * Read a markdown file and parse frontmatter
 */
function readMarkdownFile(filePath) {
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  // For build scripts, we return raw content (not rendered HTML)
  // The HTML will be the markdown content for RSS
  // Use slug as id if not present (for RSS guid)
  return { ...data, id: data.id || data.slug, html: content, content }
}

/**
 * Get all markdown files from a directory
 */
function getMarkdownFiles(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter(file => file.endsWith('.md'))
}

/**
 * Get all posts, sorted by published_at descending
 */
async function getPosts() {
  const files = getMarkdownFiles(POSTS_DIR)
  const posts = files.map(file => {
    const filePath = path.join(POSTS_DIR, file)
    return readMarkdownFile(filePath)
  })

  // Sort by published_at descending
  return posts.sort((a, b) => {
    const dateA = new Date(a.published_at || 0)
    const dateB = new Date(b.published_at || 0)
    return dateB - dateA
  })
}

/**
 * Get all pages
 */
async function getPages(slugsToExclude = ['newsletter', 'portfolio']) {
  const files = getMarkdownFiles(PAGES_DIR)
  const pages = files.map(file => {
    const filePath = path.join(PAGES_DIR, file)
    return readMarkdownFile(filePath)
  })

  return pages.filter(page => !slugsToExclude.includes(page.slug))
}

/**
 * Get all content (posts + pages)
 */
async function getAll() {
  const posts = await getPosts()
  const pages = await getPages()
  return posts.concat(pages)
}

module.exports = {
  getPosts,
  getPages,
  getAll
}
