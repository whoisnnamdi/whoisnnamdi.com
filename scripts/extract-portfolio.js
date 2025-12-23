/**
 * Extract portfolio logos from raw HTML
 */
const fs = require('fs')
const path = require('path')

const htmlPath = path.join(__dirname, '..', 'content', 'data', 'portfolio-raw.html')
const outputPath = path.join(__dirname, '..', 'content', 'data', 'portfolio.json')

const html = fs.readFileSync(htmlPath, 'utf8')
const logos = []
let currentSection = 'Current'

// Split by H2 to track sections
const parts = html.split(/<h2[^>]*>/i)

parts.forEach((part, i) => {
  // Extract section name if present
  const sectionMatch = part.match(/^([^<]+)<\/h2>/i)
  if (sectionMatch && i > 0) {
    currentSection = sectionMatch[1].replace(/[:-]/g, '').trim()
  }

  // Extract images from figure tags
  const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/gi
  let match
  while ((match = imgRegex.exec(part)) !== null) {
    const imgTag = match[0]
    const srcUrl = match[1]

    // Skip srcset variants (responsive images)
    if (srcUrl.includes('/size/w')) continue

    // Extract alt if present
    const altMatch = imgTag.match(/alt="([^"]*)"/i)
    const alt = altMatch ? altMatch[1] : ''

    // Generate display name from filename if no alt
    let displayName = alt
    if (!displayName) {
      const filename = srcUrl.split('/').pop().split('.')[0]
      displayName = filename
        .replace(/[-_]/g, ' ')
        .replace(/\d+/g, '')
        .trim()
    }

    logos.push({
      section: currentSection,
      src: srcUrl,
      alt: alt,
      displayName: displayName
    })
  }
})

fs.writeFileSync(outputPath, JSON.stringify(logos, null, 2))
console.log(`Extracted ${logos.length} portfolio logos`)
logos.forEach(l => console.log(`  [${l.section}] ${l.displayName || l.src.split('/').pop()}`))
