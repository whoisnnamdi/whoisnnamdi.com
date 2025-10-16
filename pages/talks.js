import Head from 'next/head'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Analytics from '../components/analytics'
import { getPosts, getPages, getPage } from './api/ghost_data'
import LinkConverter from '../components/linkconverter'
import postFormat from '../components/postformat'
import TalkCard from '../components/talkcard'
// Using two-column interleaving to preserve left→right order while allowing variable heights

export async function getStaticProps() {
  // Source-of-truth: the Ghost "talks" page
  const page = await getPage('talks')
  const pageHtml = page?.html || ''

  // Minimal HTML entity decoder (title/excerpt sanitization)
  const decode = (s) => {
    if (!s) return s
    return s
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#x27;/g, "'")
      .replace(/&nbsp;/g, ' ')
      .replace(/&#([0-9]{1,4});/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
      .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCharCode(parseInt(n, 16)))
  }

  // Helper: parse talks laid out as H2 + blockquote + links + image
  const parseFromH2Sections = (html) => {
    const items = []

    const h2Re = /<h2[^>]*>([\s\S]*?)<\/h2>/gi
    const matches = []
    let m
    while ((m = h2Re.exec(html)) !== null) {
      matches.push({ titleHtml: m[0], title: decode(m[1].replace(/<[^>]*>/g, '').trim()), start: m.index, end: m.index + m[0].length })
    }

    for (let i = 0; i < matches.length; i++) {
      const sectStart = matches[i].end
      const sectEnd = i + 1 < matches.length ? matches[i + 1].start : html.length
      const section = html.slice(sectStart, sectEnd)

      // Blockquote
      const bq = /<blockquote[^>]*>([\s\S]*?)<\/blockquote>/i.exec(section)
      const excerpt = bq ? decode(bq[1].replace(/<[^>]*>/g, '').trim()) : ''

      // Image (Ghost image card or plain img)
      let feature_image = null
      const imgGhost = /<figure[^>]*kg-image-card[^>]*>[\s\S]*?<img[^>]*src=\"([^\"]+)\"/i.exec(section)
      const imgPlain = feature_image ? null : /<img[^>]*src=\"([^\"]+)\"[^>]*>/i.exec(section)
      if (imgGhost) feature_image = imgGhost[1]
      else if (imgPlain) feature_image = imgPlain[1]

      // Links (prefer those inside list items)
      let anchors = [...section.matchAll(/<li[^>]*>[\s\S]*?<a[^>]*href=\"([^\"]+)\"[^>]*>([\s\S]*?)<\/a>[\s\S]*?<\/li>/gi)].map((a) => ({ href: a[1], text: decode(a[2].replace(/<[^>]*>/g, '').trim()) }))
      if (anchors.length === 0) {
        anchors = [...section.matchAll(/<a[^>]*href=\"([^\"]+)\"[^>]*>([\s\S]*?)<\/a>/gi)].map((a) => ({ href: a[1], text: decode(a[2].replace(/<[^>]*>/g, '').trim()) }))
      }
      const priority = [
        /youtu(\.be|be\.com)/i,
        /vimeo/i,
        /spotify|apple\.com\/podcasts|overcast|pocketcasts|castbox|google\.com\/podcasts|rss|soundcloud|simplecast|transistor|libsyn|buzzsprout|anchor\.fm/i,
        /slides/i,
      ]
      let href = null
      for (const re of priority) {
        const found = anchors.find((a) => re.test(a.href) || re.test(a.text))
        if (found) { href = found.href; break }
      }
      if (!href && anchors.length > 0) href = anchors[0].href

      if (matches[i].title && (href || feature_image || excerpt)) {
        items.push({ id: `h2-${i}-${href || matches[i].title}`, href, title: matches[i].title, excerpt, feature_image })
      }
    }
    return items
  }

  // Helper: parse Ghost bookmark cards
  const parseFromBookmarks = (html) => {
    const items = []
    const re = /<a[^>]*class=\"kg-bookmark-container\"[^>]*href=\"([^\"]+)\"[\s\S]*?<div[^>]*class=\"kg-bookmark-title\"[^>]*>([\s\S]*?)<\/div>[\s\S]*?(?:<div[^>]*class=\"kg-bookmark-description\"[^>]*>([\s\S]*?)<\/div>)?[\s\S]*?(?:<div[^>]*class=\"kg-bookmark-thumbnail\"[^>]*>[\s\S]*?<img[^>]*src=\"([^\"]+)\"[^>]*>)?/gi
    let m
    while ((m = re.exec(html)) !== null) {
      const href = m[1]
      const title = decode(m[2].replace(/<[^>]*>/g, '').trim())
      const excerpt = decode((m[3] || '').replace(/<[^>]*>/g, '').trim())
      const feature_image = m[4] || null
      items.push({ id: href, href, title, excerpt, feature_image })
    }
    return items
  }

  // Helper: parse embed iframes (YouTube/Spotify/etc.)
  const parseFromEmbeds = (html) => {
    const items = []
    const re = /<figure[^>]*class=\"kg-card\s+kg-embed-card[^\"]*\"[\s\S]*?<iframe[^>]*src=\"([^\"]+)\"[^>]*>\s*<\/iframe>[\s\S]*?<\/figure>/gi
    let m
    let idx = 0
    while ((m = re.exec(html)) !== null) {
      const href = m[1]
      items.push({ id: `embed-${idx++}`, href, title: 'Talk', excerpt: '', feature_image: null })
    }
    return items
  }

  // Helper: simple anchors that look like talks
  const parseFromLinks = (html) => {
    const items = []
    const re = /<a[^>]*href=\"([^\"]+)\"[^>]*>([\s\S]*?)<\/a>/gi
    const hint = /(youtube|youtu\.be|spotify|soundcloud|podcast|apple\.com\/podcasts|vimeo|substack|transistor|libsyn|buzzsprout|anchor\.fm)/i
    let m
    while ((m = re.exec(html)) !== null) {
      const href = m[1]
      const title = decode(m[2].replace(/<[^>]*>/g, '').trim())
      if (hint.test(href) && title) items.push({ id: href, href, title })
    }
    return items
  }

  // Try parsers in order
  let talks = parseFromH2Sections(pageHtml)
  if (talks.length === 0) talks = parseFromBookmarks(pageHtml)
  if (talks.length === 0) talks = parseFromEmbeds(pageHtml)
  if (talks.length === 0) talks = parseFromLinks(pageHtml)

  // If still nothing, fall back to tag-based discovery of posts/pages
  if (talks.length === 0) {
    const posts = postFormat(await getPosts())
    const pages = postFormat(await getPages())
    const items = [...posts, ...pages.filter(p => p.slug !== 'talks')]
    const talkTags = new Set(['talks', 'talk', 'interview', 'podcast', 'speaking'])
    talks = items.filter((i) => i.tags && i.tags.some((t) => talkTags.has(String(t.slug).toLowerCase())))
      .map((p) => ({ id: p.id, slug: p.slug, title: p.title, excerpt: p.excerpt, feature_image: p.feature_image, dateFormatted: p.dateFormatted }))
  }

  // De-duplicate by href
  const seen = new Set()
  talks = talks.filter((t) => {
    const key = t.slug ? t.slug : t.href
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  return { props: { talks, pageHtml } }
}

export default function TalksPage({ talks, pageHtml }) {
  const title = 'Talks & Interviews — Nnamdi Iregbulem'
  const description = 'Conversations on developer platforms, AI infrastructure, and building enduring software companies.'

  return (
    <div className="max-w-4xl sm:mx-auto px-6 mt-8 mb-10 lg:px-0">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://whoisnnamdi.com/talks" />
        <meta property="og:site_name" content="Who is Nnamdi?" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://whoisnnamdi.com/talks" />
        <meta property="og:image" content="https://whoisnnamdi.com/content/images/2019/10/DSC_0562_cropped_2.jpg" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:url" content="https://whoisnnamdi.com/talks" />
        <meta name="twitter:site" content="@whoisnnamdi" />
      </Head>
      <Analytics />
      <Navbar source="Talks" />

      <main className="mt-12">
      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Talks</h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-3xl">
          I speak with founders, engineers, and investors about building developer platforms, AI, and the economics of software.
        </p>
      </div>

      {/* Quick facts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs tracking-widest text-gray-400 font-semibold mb-2">TOPICS</p>
          <p className="text-gray-800 font-semibold">Developer platforms, data infrastructure, AI</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs tracking-widest text-gray-400 font-semibold mb-2">FORMATS</p>
          <p className="text-gray-800 font-semibold">Conferences, podcasts, panels, guest lectures</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs tracking-widest text-gray-400 font-semibold mb-2">AUDIENCE</p>
          <p className="text-gray-800 font-semibold">Founders, developers, and investors</p>
        </div>
      </div>

      {/* Talks grid */}
      {talks.length === 0 ? (
        <div className="prose md:prose-md lg:prose-lg max-w-4xl sm:mx-auto">
          {pageHtml ? (
            <LinkConverter content={pageHtml} />
          ) : (
            <p className="text-gray-600">Talks will appear here as they are published.</p>
          )}
        </div>
      ) : (
        (() => {
          const left = talks.filter((_, i) => i % 2 === 0)
          const right = talks.filter((_, i) => i % 2 === 1)
          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
              <div className="flex flex-col gap-6">
                {left.map((item) => <TalkCard key={item.id} item={item} />)}
              </div>
              <div className="flex flex-col gap-6">
                {right.map((item) => <TalkCard key={item.id} item={item} />)}
              </div>
            </div>
          )
        })()
      )}

      </main>
      <Footer />
    </div>
  )
}
