import Link from "next/link";
import Analytics from "../components/Analytics";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import StatsRow from "../components/StatsRow";
import PortfolioCard from "../components/PortfolioCard";
import { getPage, getPortfolioData } from "../lib/content";

const DEFAULT_META = {
  description:
    "Partnerships with technical founders building enduring software and infrastructure companies.",
  ogDescription: undefined,
  ogTitle: "Portfolio — Nnamdi Iregbulem",
  ogUrl: "https://whoisnnamdi.com/portfolio",
  title: "Portfolio — Nnamdi Iregbulem",
};

export async function getStaticProps() {
  const logos = getPortfolioData();

  let portfolioPage;
  try {
    portfolioPage = await getPage("portfolio");
  } catch (error) {
    console.error("Unable to fetch portfolio page", error);
  }

  const meta = {
    description: portfolioPage?.meta_description || DEFAULT_META.description,
    ogDescription:
      portfolioPage?.og_description ||
      portfolioPage?.meta_description ||
      DEFAULT_META.ogDescription ||
      DEFAULT_META.description,
    ogTitle:
      portfolioPage?.og_title || portfolioPage?.title || DEFAULT_META.ogTitle,
    ogUrl: portfolioPage?.canonical_url || DEFAULT_META.ogUrl,
    title: portfolioPage?.title
      ? `${portfolioPage.title} — Nnamdi Iregbulem`
      : DEFAULT_META.title,
  };

  return {
    props: {
      logos,
      meta,
    },
  };
}

export default function Portfolio({ logos, meta }) {
  const stats = [
    {
      label: "Investment Focus",
      value: "Technical tooling & infrastructure",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M4 12h16M6 6h12M6 18h12" />
        </svg>
      ),
    },
    {
      label: "Stage",
      value: "Pre-seed through Series B",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M5 16l5-5 4 4 5-6" />
          <path d="M4 20h16" />
        </svg>
      ),
    },
    {
      label: "Geography",
      value: "North America, Selectively Global",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3c2.5 2.5 2.5 15 0 18" />
          <path d="M3 12h18" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-paper min-h-screen">
      <SEO
        title={meta.title}
        description={meta.description}
        url={meta.ogUrl || "https://whoisnnamdi.com/portfolio"}
      />
      <Analytics />
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <Navbar source="portfolio" />
      </div>

      <main className="bg-grid border-neutral-300">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 pt-4 pb-12">
          <header className="text-center max-w-4xl mx-auto">
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-neutral-900 mb-12">
              Backing <span className="italic text-accent">technical</span>{" "}
              founders building{" "}
              <span className="italic text-accent">enduring</span> companies.
            </h1>
            <p className="text-sm md:text-base font-mono uppercase tracking-[0.2em] text-neutral-500 leading-relaxed">
              I partner closely with entrepreneurs reimagining how the world
              works — from developer tools and AI to the infrastructure that
              supports them.
            </p>
          </header>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <StatsRow stats={stats} variant="split" />
        </div>

        <section className="max-w-[1200px] mx-auto px-6 lg:px-10 py-14">
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

        <section className="pb-12">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
            <div className="bg-blueprint border border-neutral-900 py-14 px-6 md:px-12 text-center text-white">
              <div className="max-w-[900px] mx-auto">
                <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4">
                  Building something ambitious?
                </h2>
                <p className="text-base md:text-lg text-white/90 mb-8 max-w-md mx-auto">
                  I love meeting founders at the earliest stages. Share what
                  you&apos;re working on and let&apos;s explore how we could
                  collaborate.
                </p>
                <Link
                  href="mailto:nnamdi@lsvp.com"
                  className="inline-flex items-center gap-2 px-6 py-3 text-white font-mono uppercase tracking-[0.2em] bg-neutral-900 border border-neutral-900 hover:bg-accent transition-colors"
                >
                  Send an email
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
