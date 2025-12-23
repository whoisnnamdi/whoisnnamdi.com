/**
 * Extract structured data from portfolio and talks pages
 * Run after processing Ghost export to create JSON data files
 *
 * Usage: node scripts/extract-structured-data.js
 */

const fs = require('fs-extra')
const path = require('path')
const matter = require('gray-matter')

const PAGES_DIR = path.join(__dirname, '..', 'content', 'pages')
const DATA_DIR = path.join(__dirname, '..', 'content', 'data')

/**
 * Parse portfolio HTML to extract company logos
 * Based on logic from the original portfolio.js
 */
function parsePortfolio(html) {
  if (!html) return []

  const logos = []

  // Match anchor tags containing images
  // Pattern: <a href="..."><img src="..." alt="..."></a>
  const anchorImgRegex = /<a[^>]+href="([^"]+)"[^>]*>\s*<img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>/gi
  let match

  while ((match = anchorImgRegex.exec(html)) !== null) {
    logos.push({
      href: match[1],
      src: match[2],
      alt: match[3] || '',
      displayName: match[3] || ''
    })
  }

  // Also try reverse order (img before alt)
  const anchorImgRegex2 = /<a[^>]+href="([^"]+)"[^>]*>\s*<img[^>]+alt="([^"]*)"[^>]*src="([^"]+)"[^>]*>/gi
  while ((match = anchorImgRegex2.exec(html)) !== null) {
    logos.push({
      href: match[1],
      src: match[3],
      alt: match[2] || '',
      displayName: match[2] || ''
    })
  }

  // Try figure/figcaption pattern
  const figureRegex = /<figure[^>]*>.*?<a[^>]+href="([^"]+)"[^>]*>.*?<img[^>]+src="([^"]+)"[^>]*>.*?<figcaption>([^<]*)<\/figcaption>.*?<\/figure>/gis
  while ((match = figureRegex.exec(html)) !== null) {
    logos.push({
      href: match[1],
      src: match[2],
      alt: match[3] || '',
      displayName: match[3] || ''
    })
  }

  // Deduplicate by src
  const seen = new Set()
  return logos.filter(logo => {
    if (seen.has(logo.src)) return false
    seen.add(logo.src)
    return true
  })
}

/**
 * Parse talks HTML to extract talk items
 * Based on logic from the original talks-parse.js
 */
function parseTalks(html) {
  if (!html) return []

  const talks = []
  let id = 0

  // Strategy 1: Parse H2 sections with subsequent content
  const h2Regex = /<h2[^>]*>([^<]+)<\/h2>/gi
  let h2Match
  const h2Positions = []

  while ((h2Match = h2Regex.exec(html)) !== null) {
    h2Positions.push({
      title: h2Match[1].trim(),
      start: h2Match.index + h2Match[0].length,
      end: html.length
    })
  }

  // Set end positions
  for (let i = 0; i < h2Positions.length - 1; i++) {
    h2Positions[i].end = h2Positions[i + 1].start
  }

  // Extract content from each section
  for (const section of h2Positions) {
    const sectionHtml = html.substring(section.start, section.end)

    // Look for links or embeds in this section
    const linkMatch = sectionHtml.match(/<a[^>]+href="([^"]+)"/)
    const embedMatch = sectionHtml.match(/src="(https:\/\/(?:www\.)?youtube\.com\/embed\/[^"]+)"/)
    const imgMatch = sectionHtml.match(/<img[^>]+src="([^"]+)"/)

    // Extract excerpt from paragraph
    const pMatch = sectionHtml.match(/<p[^>]*>([^<]+)<\/p>/)
    const excerpt = pMatch ? pMatch[1].trim() : ''

    if (linkMatch || embedMatch) {
      talks.push({
        id: `talk-${++id}`,
        title: section.title,
        excerpt: excerpt,
        href: embedMatch ? embedMatch[1] : (linkMatch ? linkMatch[1] : ''),
        feature_image: imgMatch ? imgMatch[1] : ''
      })
    }
  }

  // Strategy 2: Parse bookmark cards
  const bookmarkRegex = /<div[^>]*class="[^"]*kg-bookmark-card[^"]*"[^>]*>.*?<a[^>]+href="([^"]+)"[^>]*>.*?<div[^>]*class="[^"]*kg-bookmark-title[^"]*"[^>]*>([^<]*)<\/div>.*?<\/div>/gis
  let bookmarkMatch

  while ((bookmarkMatch = bookmarkRegex.exec(html)) !== null) {
    const href = bookmarkMatch[1]
    const title = bookmarkMatch[2].trim()

    // Check if we already have this URL
    if (!talks.some(t => t.href === href)) {
      talks.push({
        id: `talk-${++id}`,
        title: title,
        excerpt: '',
        href: href,
        feature_image: ''
      })
    }
  }

  // Strategy 3: Parse standalone links with YouTube
  const youtubeRegex = /<a[^>]+href="(https:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)[^"]+)"[^>]*>([^<]*)<\/a>/gi
  let ytMatch

  while ((ytMatch = youtubeRegex.exec(html)) !== null) {
    const href = ytMatch[1]
    const title = ytMatch[2].trim() || 'YouTube Video'

    if (!talks.some(t => t.href === href)) {
      talks.push({
        id: `talk-${++id}`,
        title: title,
        excerpt: '',
        href: href,
        feature_image: ''
      })
    }
  }

  return talks
}

/**
 * Main extraction function
 */
async function extractStructuredData() {
  console.log('Extracting structured data from pages...\n')

  // Ensure data directory exists
  await fs.ensureDir(DATA_DIR)

  // Process portfolio
  const portfolioPath = path.join(PAGES_DIR, 'portfolio.md')
  if (fs.existsSync(portfolioPath)) {
    const content = fs.readFileSync(portfolioPath, 'utf8')
    const { data, content: markdown } = matter(content)

    // The markdown content may have been converted from HTML
    // Try to get the original HTML from the Ghost export if available
    // Otherwise parse from markdown (less reliable)

    // For now, we'll need the original HTML - this script should be run
    // with the Ghost export available
    console.log('Portfolio page found at content/pages/portfolio.md')
    console.log('Note: Portfolio logos need to be manually extracted or')
    console.log('run this script with --html flag and provide original HTML')

    // Check if there's a raw HTML backup
    const htmlBackupPath = path.join(DATA_DIR, 'portfolio-raw.html')
    if (fs.existsSync(htmlBackupPath)) {
      const html = fs.readFileSync(htmlBackupPath, 'utf8')
      const logos = parsePortfolio(html)
      const outputPath = path.join(DATA_DIR, 'portfolio.json')
      await fs.outputJson(outputPath, logos, { spaces: 2 })
      console.log(`\nExtracted ${logos.length} portfolio logos to: content/data/portfolio.json`)
    }
  } else {
    console.log('Portfolio page not found at content/pages/portfolio.md')
  }

  // Process talks
  const talksPath = path.join(PAGES_DIR, 'talks.md')
  if (fs.existsSync(talksPath)) {
    const content = fs.readFileSync(talksPath, 'utf8')
    const { data } = matter(content)

    console.log('\nTalks page found at content/pages/talks.md')
    console.log('Note: Talks need to be manually extracted or')
    console.log('run this script with --html flag and provide original HTML')

    // Check if there's a raw HTML backup
    const htmlBackupPath = path.join(DATA_DIR, 'talks-raw.html')
    if (fs.existsSync(htmlBackupPath)) {
      const html = fs.readFileSync(htmlBackupPath, 'utf8')
      const talks = parseTalks(html)
      const outputPath = path.join(DATA_DIR, 'talks.json')
      await fs.outputJson(outputPath, talks, { spaces: 2 })
      console.log(`\nExtracted ${talks.length} talks to: content/data/talks.json`)
    }
  } else {
    console.log('Talks page not found at content/pages/talks.md')
  }

  console.log('\n=== Extraction complete ===')
  console.log('\nIf logos/talks were not extracted, ensure the raw HTML files exist:')
  console.log('- content/data/portfolio-raw.html')
  console.log('- content/data/talks-raw.html')
}

// Also export for programmatic use
module.exports = { parsePortfolio, parseTalks }

// Run if called directly
extractStructuredData().catch(err => {
  console.error('Error extracting data:', err)
  process.exit(1)
})
