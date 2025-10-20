import Head from 'next/head'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Analytics from '../components/analytics'
import { getPosts, getPages, getPage } from './api/ghost_data'
import LinkConverter from '../components/linkconverter'
import postFormat from '../components/postformat'
import TalkCard from '../components/talkcard'
import { decode, parseFromH2Sections, parseFromBookmarks, parseFromEmbeds, parseFromLinks } from '../lib/talks-parse'
// Using two-column interleaving to preserve left→right order while allowing variable heights

export async function getStaticProps() {
  // Source-of-truth: the Ghost "talks" page
  const page = await getPage('talks')
  const pageHtml = page?.html || ''

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
