/**
 * Remove all inline subscribe forms from markdown files
 * These are being replaced by the new SubscribeCTA React component
 */

const fs = require('fs')
const path = require('path')

const POSTS_DIR = path.join(__dirname, '..', 'content', 'posts')

// Pattern to match the subscribe form divs (including all variations)
// This matches the entire subscribe-form div block
const subscribeFormPattern = /<div class="subscribe-form">\s*<h3 class="subscribe-form-title">.*?<\/h3>\s*<p>.*?<\/p>\s*<form[^>]*>[\s\S]*?<\/form>\s*<\/div>/g

function removeSubscribeForms() {
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'))
  let modifiedCount = 0
  let totalFormsRemoved = 0

  for (const file of files) {
    const filePath = path.join(POSTS_DIR, file)
    let content = fs.readFileSync(filePath, 'utf8')
    
    const matches = content.match(subscribeFormPattern)
    if (matches && matches.length > 0) {
      const formsCount = matches.length
      content = content.replace(subscribeFormPattern, '')
      
      // Clean up any double newlines left behind
      content = content.replace(/\n{3,}/g, '\n\n')
      
      fs.writeFileSync(filePath, content)
      console.log(`Removed ${formsCount} form(s) from: ${file}`)
      modifiedCount++
      totalFormsRemoved += formsCount
    }
  }

  console.log(`\n✓ Modified ${modifiedCount} files`)
  console.log(`✓ Removed ${totalFormsRemoved} subscribe forms total`)
}

removeSubscribeForms()
