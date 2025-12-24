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
 * Render markdown content to HTML
 *
 * Supports:
 * - Code syntax highlighting via highlight.js
 * - Math equations rendered to SVG server-side via MathJax
 * - Raw HTML passthrough
 */
export async function renderMarkdown(content) {
  if (!content) return ''

  // Normalize display math before parsing
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
