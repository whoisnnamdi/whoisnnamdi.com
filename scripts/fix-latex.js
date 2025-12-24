/**
 * Fix double-escaped backslashes in LaTeX blocks
 * Changes \\text to \text, \\frac to \frac, etc.
 */

const fs = require('fs')
const path = require('path')

const POSTS_DIR = path.join(__dirname, '..', 'content', 'posts')
const PAGES_DIR = path.join(__dirname, '..', 'content', 'pages')

function fixLatex(content) {
  // Fix double-escaped backslashes in $$ blocks
  let fixed = content.replace(/\$\$([\s\S]*?)\$\$/g, (match, latex) => {
    // Replace \\\\ with \\ (quad backslash to double)
    // Replace \\ with \ (double backslash to single)
    const fixedLatex = latex
      .replace(/\\\\\\\\/g, '\\\\')  // \\\\ -> \\
      .replace(/\\\\/g, '\\')         // \\ -> \
    return '$$' + fixedLatex + '$$'
  })

  // Also fix inline math $ blocks
  fixed = fixed.replace(/\$([^$\n]+)\$/g, (match, latex) => {
    if (latex.includes('\\\\')) {
      const fixedLatex = latex.replace(/\\\\/g, '\\')
      return '$' + fixedLatex + '$'
    }
    return match
  })

  return fixed
}

function processDirectory(dir) {
  if (!fs.existsSync(dir)) return

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'))
  let fixedCount = 0

  for (const file of files) {
    const filePath = path.join(dir, file)
    const content = fs.readFileSync(filePath, 'utf8')
    const fixed = fixLatex(content)

    if (fixed !== content) {
      fs.writeFileSync(filePath, fixed)
      console.log(`Fixed: ${file}`)
      fixedCount++
    }
  }

  return fixedCount
}

console.log('Fixing LaTeX in markdown files...\n')

const postsFixed = processDirectory(POSTS_DIR)
const pagesFixed = processDirectory(PAGES_DIR)

console.log(`\nDone. Fixed ${postsFixed + pagesFixed} files.`)
