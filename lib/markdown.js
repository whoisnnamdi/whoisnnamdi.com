/**
 * Markdown to HTML renderer
 * Uses remark/rehype with syntax highlighting and math support
 */

import { remark } from 'remark'
import remarkParse from 'remark-parse'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeMathjax from 'rehype-mathjax'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'

/**
 * Render markdown content to HTML
 *
 * Supports:
 * - Code syntax highlighting via highlight.js
 * - Math equations via MathJax (inline $...$ and block $$...$$)
 * - Raw HTML passthrough
 */
export async function renderMarkdown(content) {
  if (!content) return ''

  const result = await remark()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeMathjax)
    .use(rehypeHighlight, { detect: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)

  return result.toString()
}
