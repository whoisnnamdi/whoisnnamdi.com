/**
 * Markdown to HTML renderer
 * Uses remark/rehype with syntax highlighting and math support
 */

import { remark } from 'remark'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeMathjax from 'rehype-mathjax'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'

/**
 * Convert single-line $$...$$ to multi-line format
 * so remark-math treats them as display math
 */
function normalizeDisplayMath(content) {
  // Match $$...$$ on a single line (not already multi-line)
  // Use $$$$ to output literal $$ in replacement string
  return content.replace(/^\$\$([^$\n]+)\$\$$/gm, '$$$$\n$1\n$$$$')
}

/**
 * Escape currency dollar signs so they don't trigger LaTeX parsing
 * Matches $ followed by digits, optionally with commas/decimals (e.g. $10,000 or $5.5M)
 */
function escapeCurrencyDollars(content) {
  // Match $ followed by number patterns like $10, $10,000, $5.5M, $100K
  // In replace: \\ = literal \, $$ = literal $, $1 = capture group
  return content.replace(/\$(\d[\d,]*\.?\d*[MKBmkb]?)/g, '\\$$$1')
}

/**
 * Render markdown content to HTML
 *
 * Supports:
 * - Code syntax highlighting via highlight.js
 * - Math equations rendered to SVG server-side via MathJax
 * - Raw HTML passthrough
 */
export async function renderMarkdown(content) {
  if (!content) return ''

  // Pre-process content before parsing
  content = escapeCurrencyDollars(content)
  content = normalizeDisplayMath(content)

  const result = await remark()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeMathjax)
    .use(rehypeHighlight, { detect: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)

  return result.toString()
}
