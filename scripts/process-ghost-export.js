/**
 * Process Ghost CMS JSON export to markdown files
 *
 * Usage: node scripts/process-ghost-export.js <path-to-ghost-export.json>
 */

const fs = require('fs-extra')
const path = require('path')
const TurndownService = require('turndown')

// Initialize Turndown for HTML to Markdown conversion
const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-'
})

// Custom rule for Ghost figure/figcaption
turndown.addRule('figure', {
  filter: 'figure',
  replacement: function(content, node) {
    const img = node.querySelector('img')
    const figcaption = node.querySelector('figcaption')
    if (img) {
      const alt = img.alt || ''
      const src = img.src || ''
      const caption = figcaption ? figcaption.textContent : ''
      if (caption) {
        return `\n\n![${alt}](${src})\n*${caption}*\n\n`
      }
      return `\n\n![${alt}](${src})\n\n`
    }
    return content
  }
})

// Custom rule for Ghost bookmark cards
turndown.addRule('bookmark', {
  filter: function(node) {
    return node.classList && node.classList.contains('kg-bookmark-card')
  },
  replacement: function(content, node) {
    const link = node.querySelector('a.kg-bookmark-container')
    if (link) {
      const title = node.querySelector('.kg-bookmark-title')?.textContent || ''
      const href = link.href || ''
      return `\n\n[${title}](${href})\n\n`
    }
    return content
  }
})

// Custom rule for Ghost embed cards (YouTube, etc.)
turndown.addRule('embed', {
  filter: function(node) {
    return node.classList && node.classList.contains('kg-embed-card')
  },
  replacement: function(content, node) {
    const iframe = node.querySelector('iframe')
    if (iframe && iframe.src) {
      return `\n\n<iframe src="${iframe.src}" width="100%" height="400" frameborder="0" allowfullscreen></iframe>\n\n`
    }
    return content
  }
})

/**
 * Convert a Ghost post/page to markdown with frontmatter
 */
function convertToMarkdown(item, type) {
  const html = item.html || ''
  const markdown = turndown.turndown(html)

  // Build frontmatter
  const frontmatter = {
    slug: item.slug,
    title: item.title,
    excerpt: item.custom_excerpt || item.excerpt || '',
    published_at: item.published_at,
    updated_at: item.updated_at,
    feature_image: item.feature_image || '',
    tags: (item.tags || []).map(t => ({ slug: t.slug, name: t.name })),
    meta_description: item.meta_description || '',
    canonical_url: item.canonical_url || `https://whoisnnamdi.com/${item.slug}/`,
    og_title: item.og_title || item.title,
    og_description: item.og_description || item.meta_description || '',
    og_image: item.og_image || item.feature_image || '',
    twitter_title: item.twitter_title || item.title,
    twitter_description: item.twitter_description || item.meta_description || '',
    twitter_image: item.twitter_image || item.feature_image || ''
  }

  // Convert frontmatter to YAML
  const yamlLines = ['---']
  yamlLines.push(`slug: "${frontmatter.slug}"`)
  yamlLines.push(`title: "${escapeYaml(frontmatter.title)}"`)
  yamlLines.push(`excerpt: "${escapeYaml(frontmatter.excerpt)}"`)
  yamlLines.push(`published_at: "${frontmatter.published_at}"`)
  yamlLines.push(`updated_at: "${frontmatter.updated_at}"`)
  yamlLines.push(`feature_image: "${frontmatter.feature_image}"`)

  // Tags as array
  if (frontmatter.tags.length > 0) {
    yamlLines.push('tags:')
    frontmatter.tags.forEach(t => {
      yamlLines.push(`  - slug: "${t.slug}"`)
      yamlLines.push(`    name: "${escapeYaml(t.name)}"`)
    })
  } else {
    yamlLines.push('tags: []')
  }

  yamlLines.push(`meta_description: "${escapeYaml(frontmatter.meta_description)}"`)
  yamlLines.push(`canonical_url: "${frontmatter.canonical_url}"`)
  yamlLines.push(`og_title: "${escapeYaml(frontmatter.og_title)}"`)
  yamlLines.push(`og_description: "${escapeYaml(frontmatter.og_description)}"`)
  yamlLines.push(`og_image: "${frontmatter.og_image}"`)
  yamlLines.push(`twitter_title: "${escapeYaml(frontmatter.twitter_title)}"`)
  yamlLines.push(`twitter_description: "${escapeYaml(frontmatter.twitter_description)}"`)
  yamlLines.push(`twitter_image: "${frontmatter.twitter_image}"`)
  yamlLines.push('---')

  return yamlLines.join('\n') + '\n\n' + markdown
}

/**
 * Escape special characters in YAML strings
 */
function escapeYaml(str) {
  if (!str) return ''
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
}

/**
 * Extract all image URLs from content
 */
function extractImageUrls(items) {
  const imageUrls = new Set()
  const imageRegex = /https?:\/\/[^"'\s)]+\/content\/images\/[^"'\s)]+/g

  items.forEach(item => {
    // From HTML content
    const htmlMatches = (item.html || '').match(imageRegex) || []
    htmlMatches.forEach(url => imageUrls.add(url))

    // From feature image
    if (item.feature_image) {
      imageUrls.add(item.feature_image)
    }

    // From OG/Twitter images
    if (item.og_image) imageUrls.add(item.og_image)
    if (item.twitter_image) imageUrls.add(item.twitter_image)
  })

  return Array.from(imageUrls)
}

/**
 * Main processing function
 */
async function processGhostExport(exportPath) {
  console.log(`Processing Ghost export: ${exportPath}`)

  // Read and parse the export file
  const exportData = await fs.readJson(exportPath)
  const db = exportData.db[0].data

  // Get posts and pages
  const posts = db.posts.filter(p => p.type === 'post' && p.status === 'published')
  const pages = db.posts.filter(p => p.type === 'page' && p.status === 'published')

  // Get tags and create lookup
  const tagsById = {}
  db.tags.forEach(tag => {
    tagsById[tag.id] = tag
  })

  // Create posts_tags lookup
  const postTags = {}
  db.posts_tags.forEach(pt => {
    if (!postTags[pt.post_id]) postTags[pt.post_id] = []
    if (tagsById[pt.tag_id]) {
      postTags[pt.post_id].push(tagsById[pt.tag_id])
    }
  })

  // Attach tags to posts/pages
  ;[...posts, ...pages].forEach(item => {
    item.tags = postTags[item.id] || []
  })

  // Process posts
  console.log(`\nProcessing ${posts.length} posts...`)
  for (const post of posts) {
    const markdown = convertToMarkdown(post, 'post')
    const filePath = path.join(__dirname, '..', 'content', 'posts', `${post.slug}.md`)
    await fs.outputFile(filePath, markdown)
    console.log(`  Created: content/posts/${post.slug}.md`)
  }

  // Process pages
  console.log(`\nProcessing ${pages.length} pages...`)
  for (const page of pages) {
    const markdown = convertToMarkdown(page, 'page')
    const filePath = path.join(__dirname, '..', 'content', 'pages', `${page.slug}.md`)
    await fs.outputFile(filePath, markdown)
    console.log(`  Created: content/pages/${page.slug}.md`)

    // Save raw HTML for special pages (portfolio, talks) for structured data extraction
    if (['portfolio', 'talks'].includes(page.slug) && page.html) {
      const htmlPath = path.join(__dirname, '..', 'content', 'data', `${page.slug}-raw.html`)
      await fs.outputFile(htmlPath, page.html)
      console.log(`  Saved raw HTML: content/data/${page.slug}-raw.html`)
    }
  }

  // Extract and log all image URLs for migration
  const allItems = [...posts, ...pages]
  const imageUrls = extractImageUrls(allItems)

  console.log(`\n=== Image URLs to migrate (${imageUrls.length}) ===`)
  imageUrls.forEach(url => console.log(url))

  // Save image URLs to file for migration script
  const imageListPath = path.join(__dirname, '..', 'content', 'data', 'image-urls.json')
  await fs.outputJson(imageListPath, imageUrls, { spaces: 2 })
  console.log(`\nImage URL list saved to: content/data/image-urls.json`)

  console.log('\n=== Export complete ===')
  console.log(`Posts: ${posts.length}`)
  console.log(`Pages: ${pages.length}`)
  console.log(`Images: ${imageUrls.length}`)
}

// Run if called directly
const exportPath = process.argv[2]
if (!exportPath) {
  console.error('Usage: node scripts/process-ghost-export.js <path-to-ghost-export.json>')
  process.exit(1)
}

processGhostExport(exportPath).catch(err => {
  console.error('Error processing export:', err)
  process.exit(1)
})
