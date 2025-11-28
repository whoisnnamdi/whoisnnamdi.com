import Head from 'next/head'
import Image from 'next/legacy/image'
import Link from 'next/link'
import Analytics from '../components/analytics'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import { getPage } from './api/ghost_data'
import { extractPortfolioLogos } from '../lib/portfolio'

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
            label: 'Focus',
            value: 'Technical tooling and infrastructure'
        },
        {
            label: 'Stage',
            value: 'Pre-seed through Series B'
        },
        {
            label: 'Geography',
            value: 'Primarily North America'
        }
    ]

    return (
        <div className="max-w-3xl px-6 mx-auto lg:px-0">
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

            <main>
                <header className="mb-12">
                    <h1 className="font-serif text-3xl md:text-4xl mb-4">
                        <span className="border-b-2 border-coral pb-1">Portfolio</span>
                    </h1>
                    <p className="text-lg text-text-secondary leading-relaxed mb-6">
                        I partner with founders reimagining how the world works — from developer platforms and applied AI
                        to the infrastructure that supports them.
                    </p>
                    <Link
                        href="mailto:nnamdi@lsvp.com"
                        className="inline-flex items-center rounded-lg bg-coral px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-opacity"
                    >
                        Get in touch
                    </Link>
                </header>

                <section className="grid gap-4 sm:grid-cols-3 mb-12">
                    {stats.map((stat) => (
                        <div key={stat.label} className="rounded-xl border border-border bg-surface p-4">
                            <p className="text-xs font-mono uppercase tracking-wider text-cyan mb-2">{stat.label}</p>
                            <p className="text-sm font-medium">{stat.value}</p>
                        </div>
                    ))}
                </section>

                <section className="mb-12">
                    <h2 className="font-serif text-2xl mb-6">Selected Investments</h2>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {logos.length === 0 && (
                            <p className="col-span-full text-center text-text-secondary">
                                Check back soon — portfolio updates are on the way.
                            </p>
                        )}
                        {logos.map((logo) => {
                            const card = (
                                <div className="flex h-32 flex-col items-center justify-center rounded-xl border border-border bg-surface p-4 text-center hover:border-coral/30 transition-colors duration-150">
                                    <div className="relative flex h-16 w-full items-center justify-center">
                                        <Image
                                            src={logo.src}
                                            alt={logo.alt}
                                            width={160}
                                            height={80}
                                            objectFit="contain"
                                            className="max-h-12 w-auto"
                                            unoptimized
                                        />
                                    </div>
                                    {logo.displayName && (
                                        <p className="mt-2 text-xs text-text-secondary">{logo.displayName}</p>
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
                                    >
                                        {card}
                                    </Link>
                                )
                            }

                            return (
                                <div key={logo.src}>
                                    {card}
                                </div>
                            )
                        })}
                    </div>
                </section>

                <section className="rounded-xl border border-border bg-surface p-6 mb-16">
                    <h3 className="font-serif text-xl mb-2">Building something ambitious?</h3>
                    <p className="text-text-secondary mb-4">
                        I love meeting founders at the earliest stages. Share what you&apos;re working on and let&apos;s explore how I can help.
                    </p>
                    <Link
                        href="mailto:nnamdi@lsvp.com"
                        className="inline-flex items-center text-sm text-coral hover:opacity-80 transition-opacity"
                    >
                        Send an email →
                    </Link>
                </section>
            </main>

            <Footer />
        </div>
    )
}
