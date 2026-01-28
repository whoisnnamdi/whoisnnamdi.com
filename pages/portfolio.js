import Head from 'next/head'
import Link from 'next/link'
import Analytics from '../components/analytics'
import NavbarRedesign from '../components/NavbarRedesign'
import FooterRedesign from '../components/FooterRedesign'
import StatsRow from '../components/StatsRow'
import PortfolioCard from '../components/PortfolioCard'
import { getPage, getPortfolioData } from '../lib/content'

const DEFAULT_META = {
    description: 'Partnerships with technical founders building enduring software and infrastructure companies.',
    ogDescription: undefined,
    ogTitle: 'Portfolio — Nnamdi Iregbulem',
    ogUrl: 'https://whoisnnamdi.com/portfolio',
    title: 'Portfolio — Nnamdi Iregbulem'
}

export async function getStaticProps() {
    const logos = getPortfolioData()

    let portfolioPage
    try {
        portfolioPage = await getPage('portfolio')
    } catch (error) {
        console.error('Unable to fetch portfolio page', error)
    }

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
            label: 'Investment Focus',
            value: 'Technical tooling & infrastructure'
        },
        {
            label: 'Stage',
            value: 'Pre-seed through Series B'
        },
        {
            label: 'Geography',
            value: 'North America, Selectively Global'
        }
    ]

    return (
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
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
            <NavbarRedesign source="portfolio" />

            <main className="py-16">
                {/* Hero */}
                <header className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-neutral-900 mb-6">
                        Backing{' '}
                        <span className="italic text-accent">technical</span>{' '}
                        founders building{' '}
                        <span className="italic text-accent">enduring</span>{' '}
                        companies.
                    </h1>
                    <p className="text-lg text-neutral-600 leading-relaxed">
                        I partner closely with entrepreneurs reimagining how the world works — from developer platforms and applied AI
                        to the infrastructure that supports them.
                        <br />
                        Investing pre-seed through Series B, globally.
                    </p>
                </header>

                {/* Stats */}
                <StatsRow stats={stats} />

                {/* Portfolio Grid */}
                <section className="mt-16">
                    {logos.length === 0 ? (
                        <p className="text-center text-neutral-600">
                            Check back soon — portfolio updates are on the way.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {logos.map((logo, index) => (
                                <PortfolioCard key={`${logo.src}-${index}`} logo={logo} />
                            ))}
                        </div>
                    )}
                </section>

                {/* CTA */}
                <section className="mt-20 bg-neutral-900 rounded-xl py-12 px-8 md:px-12 text-center">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
                        Building something ambitious?
                    </h2>
                    <p className="text-neutral-400 text-lg mb-8 max-w-lg mx-auto">
                        I love meeting founders at the earliest stages. Share what you&apos;re working on and let&apos;s explore how
                        I can help — from underwriting your first rounds to scaling a breakout company.
                    </p>
                    <Link
                        href="mailto:nnamdi@lsvp.com"
                        className="inline-flex items-center gap-2 px-6 py-3 text-neutral-900 font-semibold bg-white rounded-lg hover:bg-neutral-100 transition-colors"
                    >
                        Send an email
                        <span aria-hidden="true">&rarr;</span>
                    </Link>
                </section>
            </main>

            <FooterRedesign />
        </div>
    )
}
