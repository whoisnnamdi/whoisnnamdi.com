import Link from "next/link";
import Layout from "../components/Layout";
import HeroSection from "../components/HeroSection";
import FeaturedEssayCard from "../components/FeaturedEssayCard";
import EssayListItem from "../components/EssayListItem";
import StatsRow from "../components/StatsRow";
import SubscribeCTA from "../components/SubscribeCTA";
import SEO from "../components/SEO";
import Container from "../components/Container";
import { getPostBySlug, getPostSummaries } from "../lib/content";
import postFormat from "../lib/postFormat";

function calculateReadingTime(content) {
  if (!content) return null;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min`;
}

function countCharts(html) {
  if (!html) return 0;
  const imgCount = (html.match(/<img\s/gi) || []).length;
  return imgCount;
}

export async function getStaticProps() {
  const allPosts = postFormat(await getPostSummaries());
  const latestPost = allPosts[0] || null;
  const latestPosts = allPosts.slice(0, 3);

  const featuredSlugs = [
    "dark-matter",
    "never-enough-developers",
    "developer-productivity-trends",
    "software-fat-tailed",
  ];

  const featuredPostsFull = await Promise.all(
    featuredSlugs.map(async (slug) => {
      const post = await getPostBySlug(slug);
      if (!post) return null;
      return {
        id: post.id || post.slug,
        slug: post.slug,
        title: post.title,
        tags: post.tags,
        excerpt: post.excerpt,
        published_at: post.published_at,
        readingTime: calculateReadingTime(post.content),
        chartCount: countCharts(post.html),
      };
    }),
  );

  const featuredPosts = postFormat(
    featuredPostsFull.filter((post) => post !== null),
  );

  return {
    props: {
      latestPost,
      latestPosts,
      featuredPosts,
    },
  };
}

export default function Home({ latestPost, latestPosts, featuredPosts }) {
  const stats = [
    { label: "Role", value: "VC @ Lightspeed" },
    { label: "Focus", value: "Infra & Dev Tools" },
    { label: "Location", value: "San Francisco, CA" },
    { label: "Status", value: "Deploying", accent: true },
  ];

  return (
    <Layout navbarProps={{ source: "Home" }}>
      <SEO
        title="Who Is Nnamdi?"
        description="Thoughts on technology, venture capital, and the economics of both"
        url="https://whoisnnamdi.com/"
      />
      <Container>
        <HeroSection latestPost={latestPost} />
      </Container>

      <Container>
        <StatsRow stats={stats} variant="dark" />
      </Container>

      <section className="bg-grid">
        <Container className="py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Founders",
              description:
                "Navigating the messy middle of zero to one. The theories and realities of building a valuable tech startup.",
              icon: "rocket_launch",
            },
            {
              title: "Developers",
              description:
                "The rise of the engineer-executive. Tooling, workflows, and the future of software construction.",
              icon: "terminal",
            },
            {
              title: "Investors",
              description:
                "Macro analysis for the micro-focused. Charts, models, and equations separating signal from the noise.",
              icon: "bar_chart",
            },
          ].map((card, index) => (
            <div
              key={card.title}
              className="group border border-neutral-300 bg-white p-6"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 border-2 border-ink bg-primary/10 text-ink flex items-center justify-center shadow-[4px_4px_0_0_rgba(17,17,17,0.9)] transition-all group-hover:bg-primary group-hover:text-white">
                  <span className="material-symbols-outlined text-2xl leading-none">
                    {card.icon}
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-6 font-serif text-xl text-neutral-900">
                {card.title}
              </h3>
              <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </Container>
      </section>

      {featuredPosts.length > 0 && (
        <section className="bg-grid">
          <Container>
            <FeaturedEssayCard post={featuredPosts[0]} />
          </Container>
        </section>
      )}

      <section className="bg-grid">
        <Container className="py-12">
          <div className="border border-neutral-900 bg-white p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-10">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-neutral-900">
                Latest Dispatches
              </h2>
              <p className="mt-3 text-sm font-mono uppercase tracking-[0.2em] text-neutral-500">
                Observations from the field.
              </p>
            </div>
            <div className="border-neutral-300">
              {latestPosts.map((post) => (
                <EssayListItem key={post.id} post={post} variant="dispatch" />
              ))}
              <div className="pt-6 text-right">
                <Link
                  href="/essays"
                  className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  View archive →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container as="section" className="mb-12">
        <SubscribeCTA source="Homepage CTA" />
      </Container>
    </Layout>
  );
}
