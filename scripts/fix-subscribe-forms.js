/**
 * Fix subscribe forms that were converted to plain text
 * Restores the HTML structure with proper classes
 */

const fs = require('fs')
const path = require('path')

const POSTS_DIR = path.join(__dirname, '..', 'content', 'posts')

// Pattern to match the broken subscribe form
const brokenPattern = /### Receive my new long-form essays\n\nThoughtful analysis of the business and economics of tech\n\n\s*\n\nGo ⚡/g

// Replacement HTML with proper structure
const subscribeFormHtml = `<div class="subscribe-form">
<h3 class="subscribe-form-title">Receive my new long-form essays</h3>
<p>Thoughtful analysis of the business and economics of tech</p>
<form action="/api/subscribe" method="POST">
<input type="email" name="email" placeholder="Enter your email" required />
<button type="submit">Go ⚡</button>
</form>
</div>`

function fixSubscribeForms() {
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'))
  let fixedCount = 0

  for (const file of files) {
    const filePath = path.join(POSTS_DIR, file)
    let content = fs.readFileSync(filePath, 'utf8')

    if (brokenPattern.test(content)) {
      content = content.replace(brokenPattern, subscribeFormHtml)
      fs.writeFileSync(filePath, content)
      console.log(`Fixed: ${file}`)
      fixedCount++
    }
  }

  console.log(`\nFixed ${fixedCount} files with subscribe forms.`)
}

fixSubscribeForms()
