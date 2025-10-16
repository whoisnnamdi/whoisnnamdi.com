import Head from 'next/head'
import Image from 'next/legacy/image'
import Link from 'next/link'
import Analytics from '../components/analytics'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import { getPage } from './api/ghost_data'

const LOGO_IMAGE_REGEX = /<img[^>]*src=["']([^"']+)["'][^>]*>/gi

function extractAttribute(tag, attribute) {
    const attrRegex = new RegExp(`${attribute}\\s*=\\s*["']([^"']*)["']`, 'i')
    const match = attrRegex.exec(tag)
    return match ? match[1] : undefined
}

function extractPortfolioLogos(html) {
    if (!html) {
        return []
    }

    const logos = []
    let match

    while ((match = LOGO_IMAGE_REGEX.exec(html)) !== null) {
        const [tag, src] = match

        if (!src) {
            continue
        }

        const alt = extractAttribute(tag, 'alt')?.trim()
        const dataSrc = extractAttribute(tag, 'data-src')?.trim()
        const resolvedSrc = src.startsWith('data:') && dataSrc ? dataSrc : src

        if (!resolvedSrc || resolvedSrc.startsWith('data:')) {
            continue
        }

        let href
        const beforeImage = html.slice(0, match.index)
        const anchorOpenIndex = beforeImage.lastIndexOf('<a')
        const anchorCloseIndexBeforeImage = beforeImage.lastIndexOf('</a>')

        if (anchorOpenIndex !== -1 && (anchorCloseIndexBeforeImage === -1 || anchorCloseIndexBeforeImage < anchorOpenIndex)) {
            const anchorTagEnd = html.indexOf('>', anchorOpenIndex)
            const anchorClosing = html.indexOf('</a>', match.index)

            if (anchorTagEnd !== -1 && anchorClosing !== -1 && anchorClosing > match.index) {
                const anchorTag = html.slice(anchorOpenIndex, anchorTagEnd + 1)
                href = extractAttribute(anchorTag, 'href')?.trim()
            }
        }

        // Only use explicit alt text from Ghost for display labels; no hostname fallback
        const displayName = alt || null

        logos.push({
            alt: alt || 'Portfolio company logo',
            displayName: displayName || null,
            href: href && href !== '#' ? href : null,
            src: resolvedSrc
        })
    }

    const seen = new Set()
    return logos.filter((logo) => {
        const key = `${logo.href || ''}-${logo.src}`
        if (seen.has(key)) {
            return false
        }
        seen.add(key)
        return true
    })
}

const DEFAULT_META = {
    description: 'Partnerships with technical founders building enduring software and infrastructure companies.',
    ogDescription: undefined,
    ogTitle: 'Portfolio — Nnamdi Iregbulem',
    ogUrl: 'https://whoisnnamdi.com/portfolio',
    title: 'Portfolio — Nnamdi Iregbulem'
}

export async function getStaticProps() {
    let portfolioPage

    try {
        portfolioPage = await getPage('portfolio')
    } catch (error) {
        console.error('Unable to fetch Ghost portfolio page', error)
    }

    const logos = extractPortfolioLogos(portfolioPage?.html)

    const meta = {
        description: portfolioPage?.meta_description || DEFAULT_META.description,
        ogDescription: portfolioPage?.og_description || portfolioPage?.meta_description || DEFAULT_META.ogDescription || DEFAULT_META.description,
        ogTitle: portfolioPage?.og_title || portfolioPage?.title || DEFAULT_META.ogTitle,
        ogUrl: portfolioPage?.canonical_url || DEFAULT_META.ogUrl,
        title: portfolioPage?.title ? `${portfolioPage.title} — Nnamdi Iregbulem` : DEFAULT_META.title
    }

    return {
        props: {
            logos,
            meta
        }
    }
}

export default function Portfolio({ logos, meta }) {

    const stats = [
        {
            label: 'Investment focus',
            value: 'Technical tooling and infrastructure'
        },
        {
            label: 'Stage range',
            value: 'Pre-seed through Series B'
        },
        {
            label: 'Geography',
            value: 'Primarily North America, selectively global'
        }
    ]

    return (
        <div className="max-w-4xl sm:mx-auto px-6 mt-8 mb-10 lg:px-0">
            <Head>
                <meta charSet="utf-8" />
                <title>{meta.title}</title>
                <meta name="description" content={meta.description} />
                <link rel="canonical" href="https://whoisnnamdi.com/portfolio" />
                <meta name="referrer" content="no-referrer-when-downgrade" />
                <meta property="og:site_name" content="Who is Nnamdi?" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={meta.ogTitle || meta.title} />
                <meta property="og:description" content={meta.ogDescription || meta.description} />
                <meta property="og:url" content={meta.ogUrl || 'https://whoisnnamdi.com/portfolio'} />
                <meta property="og:image" content="https://whoisnnamdi.com/content/images/2019/10/DSC_0562_cropped_2.jpg" />
                <meta property="article:publisher" content="https://www.facebook.com/nnamdi.iregbulem" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={meta.ogTitle || meta.title} />
                <meta name="twitter:description" content={meta.ogDescription || meta.description} />
                <meta name="twitter:url" content={meta.ogUrl || 'https://whoisnnamdi.com/portfolio'} />
                <meta name="twitter:site" content="@whoisnnamdi" />
            </Head>
            <Analytics />
            <Navbar source="portfolio" />

            <main className="mt-12">
                <header className="space-y-6">
                    <h1 className="text-4xl font-bold text-gray-900 leading-tight">Backing technical founders building enduring companies</h1>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        I partner closely with entrepreneurs reimagining how the world works — from developer platforms and applied AI
                        to the infrastructure that supports them. Below is a sample of the teams I&apos;ve been fortunate to back.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <Link
                            href="mailto:nnamdi@lsvp.com"
                            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                        >
                            Get in touch
                        </Link>
                    </div>
                </header>

                <section className="mt-12 grid gap-4 sm:grid-cols-3">
                    {stats.map((stat) => (
                        <div key={stat.label} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">{stat.label}</p>
                            <p className="mt-2 text-base font-semibold text-gray-900">{stat.value}</p>
                        </div>
                    ))}
                </section>

                <section className="mt-16">
                    <div className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900">Selected companies</h2>
                    </div>

                    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {logos.length === 0 && (
                            <p className="col-span-full text-center text-base text-gray-600">
                                Check back soon — portfolio updates are on the way.
                            </p>
                        )}
                        {logos.map((logo) => {
                            const card = (
                                <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-gray-200 bg-white px-6 py-4 text-center transition duration-200 hover:shadow-md">
                                    <div className="relative flex h-20 w-full items-center justify-center">
                                        <Image
                                            src={logo.src}
                                            alt={logo.alt}
                                            width={220}
                                            height={120}
                                            objectFit="contain"
                                            className="max-h-16 w-auto"
                                            unoptimized
                                        />
                                    </div>
                                    {logo.displayName && (
                                        <p className="mt-3 text-sm font-medium text-gray-700">{logo.displayName}</p>
                                    )}
                                </div>
                            )

                            if (logo.href) {
                                return (
                                    <Link
                                        key={`${logo.href}-${logo.src}`}
                                        href={logo.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                                    >
                                        {card}
                                    </Link>
                                )
                            }

                            return (
                                <div key={logo.src} className="focus:outline-none">
                                    {card}
                                </div>
                            )
                        })}
                    </div>
                </section>

                <section className="mt-16 rounded-lg border border-gray-200 bg-blue-50 p-6">
                    <h3 className="text-xl font-semibold text-gray-900">Building something ambitious?</h3>
                    <p className="mt-2 text-base text-gray-700">
                        I love meeting founders at the earliest stages. Share what you&apos;re working on and let&apos;s explore how I can help — from underwriting your first rounds to scaling a breakout company.
                    </p>
                    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                        <Link
                            href="mailto:nnamdi@lsvp.com"
                            className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-50"
                        >
                            Send an email
                        </Link>
                    </div>
                </section>
            </main>

            <footer className="mt-12">
                <Footer />
            </footer>
        </div>
    )
}
