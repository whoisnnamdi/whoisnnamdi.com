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

// Markdown renderer (lazy loaded)
let renderMarkdown = null

async function getRenderer() {
  if (!renderMarkdown) {
    const { remark } = await import('remark')
    const remarkParse = (await import('remark-parse')).default
    const remarkMath = (await import('remark-math')).default
    const remarkRehype = (await import('remark-rehype')).default
    const rehypeMathjax = (await import('rehype-mathjax')).default
    const rehypeHighlight = (await import('rehype-highlight')).default
    const rehypeStringify = (await import('rehype-stringify')).default

    renderMarkdown = async (content) => {
      if (!content) return ''
      const result = await remark()
        .use(remarkParse)
        .use(remarkMath)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeMathjax)
        .use(rehypeHighlight, { detect: true })
        .use(rehypeStringify, { allowDangerousHtml: true })
        .process(content)
      return result.toString()
    }
  }
  return renderMarkdown
}

/**
 * Read a markdown file and parse frontmatter
 */
function readMarkdownFile(filePath) {
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  return { ...data, id: data.id || data.slug, content }
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
  const render = await getRenderer()
  const files = getMarkdownFiles(POSTS_DIR)
  const posts = await Promise.all(
    files.map(async file => {
      const filePath = path.join(POSTS_DIR, file)
      const post = readMarkdownFile(filePath)
      const html = await render(post.content)
      return { ...post, html }
    })
  )

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
  const render = await getRenderer()
  const files = getMarkdownFiles(PAGES_DIR)
  const pages = await Promise.all(
    files.map(async file => {
      const filePath = path.join(PAGES_DIR, file)
      const page = readMarkdownFile(filePath)
      const html = await render(page.content)
      return { ...page, html }
    })
  )

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
