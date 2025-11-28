import Head from 'next/head'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Analytics from '../components/analytics'
import { getPosts, getPages, getPage } from './api/ghost_data'
import LinkConverter from '../components/linkconverter'
import postFormat from '../components/postformat'
import TalkCard from '../components/talkcard'
import { parseFromH2Sections, parseFromBookmarks, parseFromEmbeds, parseFromLinks } from '../lib/talks-parse'

export async function getStaticProps() {
  const page = await getPage('talks')
  const pageHtml = page?.html || ''

  let talks = parseFromH2Sections(pageHtml)
  if (talks.length === 0) talks = parseFromBookmarks(pageHtml)
  if (talks.length === 0) talks = parseFromEmbeds(pageHtml)
  if (talks.length === 0) talks = parseFromLinks(pageHtml)

  if (talks.length === 0) {
    const posts = postFormat(await getPosts())
    const pages = postFormat(await getPages())
    const items = [...posts, ...pages.filter(p => p.slug !== 'talks')]
    const talkTags = new Set(['talks', 'talk', 'interview', 'podcast', 'speaking'])
    talks = items.filter((i) => i.tags && i.tags.some((t) => talkTags.has(String(t.slug).toLowerCase())))
      .map((p) => ({ id: p.id, slug: p.slug, title: p.title, excerpt: p.excerpt, feature_image: p.feature_image, dateFormatted: p.dateFormatted }))
  }

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

  const stats = [
    { label: 'Topics', value: 'Developer platforms, data infrastructure, AI' },
    { label: 'Formats', value: 'Conferences, podcasts, panels' },
    { label: 'Audience', value: 'Founders, developers, investors' }
  ]

  return (
    <div className="max-w-3xl px-6 mx-auto lg:px-0">
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

      <main>
        <header className="mb-12">
          <h1 className="font-serif text-3xl md:text-4xl mb-4">
            <span className="border-b-2 border-coral pb-1">Talks</span>
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            I speak with founders, engineers, and investors about building developer platforms, AI, and the economics of software.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-3 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-surface p-4">
              <p className="text-xs font-mono uppercase tracking-wider text-cyan mb-2">{stat.label}</p>
              <p className="text-sm font-medium">{stat.value}</p>
            </div>
          ))}
        </section>

        {talks.length === 0 ? (
          <div className="prose prose-lg max-w-none">
            {pageHtml ? (
              <LinkConverter content={pageHtml} />
            ) : (
              <p className="text-text-secondary">Talks will appear here as they are published.</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
            {talks.map((item) => <TalkCard key={item.id || item.href} item={item} />)}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
