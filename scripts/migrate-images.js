/**
 * Migrate images from Ghost CDN to Vercel Blob
 *
 * Usage:
 *   BLOB_READ_WRITE_TOKEN=xxx node scripts/migrate-images.js
 *
 * Prerequisites:
 *   - Run process-ghost-export.js first to generate content/data/image-urls.json
 *   - Set BLOB_READ_WRITE_TOKEN environment variable (from Vercel dashboard)
 */

const fs = require('fs-extra')
const path = require('path')
const https = require('https')
const http = require('http')

// Check for token
if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error('Error: BLOB_READ_WRITE_TOKEN environment variable is required')
  console.error('Get this from your Vercel dashboard under Storage > Blob')
  process.exit(1)
}

const DATA_DIR = path.join(__dirname, '..', 'content', 'data')
const POSTS_DIR = path.join(__dirname, '..', 'content', 'posts')
const PAGES_DIR = path.join(__dirname, '..', 'content', 'pages')

/**
 * Download a file from URL
 */
function downloadFile(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http

    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Follow redirects
        return downloadFile(response.headers.location).then(resolve).catch(reject)
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`))
        return
      }

      const chunks = []
      response.on('data', chunk => chunks.push(chunk))
      response.on('end', () => resolve(Buffer.concat(chunks)))
      response.on('error', reject)
    }).on('error', reject)
  })
}

/**
 * Upload to Vercel Blob
 */
async function uploadToBlob(buffer, filename, contentType) {
  const { put } = await import('@vercel/blob')
  const blob = await put(filename, buffer, {
    access: 'public',
    contentType
  })
  return blob.url
}

/**
 * Get content type from URL
 */
function getContentType(url) {
  const ext = path.extname(url).toLowerCase().split('?')[0]
  const types = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  }
  return types[ext] || 'application/octet-stream'
}

/**
 * Extract filename from URL
 */
function getFilename(url) {
  const parsed = new URL(url)
  const pathname = parsed.pathname
  // Get just the filename, clean up any query strings
  let filename = path.basename(pathname).split('?')[0]
  // Add timestamp prefix to avoid collisions
  const timestamp = Date.now()
  return `${timestamp}-${filename}`
}

/**
 * Replace URL in all markdown files
 */
async function replaceUrlInFiles(oldUrl, newUrl) {
  const dirs = [POSTS_DIR, PAGES_DIR]

  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'))

    for (const file of files) {
      const filePath = path.join(dir, file)
      let content = fs.readFileSync(filePath, 'utf8')

      if (content.includes(oldUrl)) {
        content = content.split(oldUrl).join(newUrl)
        fs.writeFileSync(filePath, content)
        console.log(`    Updated: ${file}`)
      }
    }
  }
}

/**
 * Main migration function
 */
async function migrateImages() {
  console.log('Starting image migration to Vercel Blob...\n')

  // Read image URLs list
  const imageUrlsPath = path.join(DATA_DIR, 'image-urls.json')
  if (!fs.existsSync(imageUrlsPath)) {
    console.error('Error: content/data/image-urls.json not found')
    console.error('Run process-ghost-export.js first to generate this file')
    process.exit(1)
  }

  const imageUrls = await fs.readJson(imageUrlsPath)
  console.log(`Found ${imageUrls.length} images to migrate\n`)

  // Track URL mappings
  const urlMappings = {}
  const errors = []

  for (let i = 0; i < imageUrls.length; i++) {
    const oldUrl = imageUrls[i]
    console.log(`[${i + 1}/${imageUrls.length}] ${oldUrl}`)

    try {
      // Download image
      const buffer = await downloadFile(oldUrl)
      const filename = getFilename(oldUrl)
      const contentType = getContentType(oldUrl)

      // Upload to Vercel Blob
      const newUrl = await uploadToBlob(buffer, filename, contentType)
      console.log(`    → ${newUrl}`)

      urlMappings[oldUrl] = newUrl

      // Replace in markdown files
      await replaceUrlInFiles(oldUrl, newUrl)

    } catch (err) {
      console.error(`    Error: ${err.message}`)
      errors.push({ url: oldUrl, error: err.message })
    }
  }

  // Save URL mappings for reference
  const mappingsPath = path.join(DATA_DIR, 'image-url-mappings.json')
  await fs.outputJson(mappingsPath, urlMappings, { spaces: 2 })
  console.log(`\nURL mappings saved to: content/data/image-url-mappings.json`)

  // Report results
  console.log('\n=== Migration complete ===')
  console.log(`Success: ${Object.keys(urlMappings).length}`)
  console.log(`Errors: ${errors.length}`)

  if (errors.length > 0) {
    console.log('\nFailed images:')
    errors.forEach(e => console.log(`  - ${e.url}: ${e.error}`))

    // Save errors for review
    const errorsPath = path.join(DATA_DIR, 'image-migration-errors.json')
    await fs.outputJson(errorsPath, errors, { spaces: 2 })
    console.log(`\nError details saved to: content/data/image-migration-errors.json`)
  }
}

// Run
migrateImages().catch(err => {
  console.error('Migration failed:', err)
  process.exit(1)
})
