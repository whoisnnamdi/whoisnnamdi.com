/**
 * Migrate images in portfolio.json and talks.json to Vercel Blob
 */

const fs = require('fs-extra')
const path = require('path')
const https = require('https')
const http = require('http')

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error('Error: BLOB_READ_WRITE_TOKEN required')
  process.exit(1)
}

const DATA_DIR = path.join(__dirname, '..', 'content', 'data')

function downloadFile(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile(response.headers.location).then(resolve).catch(reject)
      }
      if (response.statusCode !== 200) {
        reject(new Error(`Failed: ${response.statusCode}`))
        return
      }
      const chunks = []
      response.on('data', chunk => chunks.push(chunk))
      response.on('end', () => resolve(Buffer.concat(chunks)))
      response.on('error', reject)
    }).on('error', reject)
  })
}

async function uploadToBlob(buffer, filename, contentType) {
  const { put } = await import('@vercel/blob')
  const blob = await put(filename, buffer, { access: 'public', contentType })
  return blob.url
}

function getContentType(url) {
  const ext = path.extname(url).toLowerCase().split('?')[0]
  const types = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.gif': 'image/gif', '.webp': 'image/webp', '.svg': 'image/svg+xml' }
  return types[ext] || 'application/octet-stream'
}

async function migrateJsonImages() {
  const files = ['portfolio.json', 'talks.json']
  const urlCache = {}

  for (const file of files) {
    const filePath = path.join(DATA_DIR, file)
    if (!fs.existsSync(filePath)) continue

    console.log(`\nProcessing ${file}...`)
    let data = fs.readJsonSync(filePath)
    let modified = false

    for (const item of data) {
      // Check src field (portfolio) and feature_image field (talks)
      for (const field of ['src', 'feature_image']) {
        const url = item[field]
        if (!url || !url.includes('nnamdi.net/content/images')) continue

        if (urlCache[url]) {
          item[field] = urlCache[url]
          modified = true
          continue
        }

        try {
          console.log(`  Migrating: ${url.split('/').pop()}`)
          const buffer = await downloadFile(url)
          const filename = `${Date.now()}-${path.basename(url).split('?')[0]}`
          const newUrl = await uploadToBlob(buffer, filename, getContentType(url))
          urlCache[url] = newUrl
          item[field] = newUrl
          modified = true
          console.log(`    → ${newUrl}`)
        } catch (err) {
          console.error(`    Error: ${err.message}`)
        }
      }
    }

    if (modified) {
      fs.writeJsonSync(filePath, data, { spaces: 2 })
      console.log(`  Updated ${file}`)
    }
  }

  console.log('\nDone!')
}

migrateJsonImages().catch(console.error)
