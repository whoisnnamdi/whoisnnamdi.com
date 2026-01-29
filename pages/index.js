import Head from "next/head";
import Link from "next/link";
import NavbarRedesign from "../components/NavbarRedesign";
import FooterRedesign from "../components/FooterRedesign";
import HeroSection from "../components/HeroSection";
import FeaturedEssayCard from "../components/FeaturedEssayCard";
import EssayListItem from "../components/EssayListItem";
import StatsRow from "../components/StatsRow";
import SubscribeCTA from "../components/SubscribeCTA";
import Analytics from "../components/analytics";
import { getPosts } from "../lib/content";

export async function getStaticProps() {
  const posts = await getPosts();

  posts.map((post) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    post.dateFormatted = new Intl.DateTimeFormat("default", options).format(
      new Date(post.published_at),
    );

    post.excerpt = (post.excerpt || "").replace(/\[(.*?)\]/, "");

    const cutoff = 166;

    post.excerpt =
      post.excerpt.substring(0, Math.min(cutoff, post.excerpt.length)) +
      (post.excerpt.length > cutoff ? "..." : "");
    post.excerpt = post.excerpt.replace(/\[(.*?)[$^.]/, "");
  });

  const featuredPosts = posts.filter((post) => {
    return [
      "dark-matter",
      "never-enough-developers",
      "developer-productivity-trends",
      "software-fat-tailed",
    ].includes(post.slug);
  });

  return {
    props: {
      posts,
      featuredPosts,
    },
  };
}

export default function Home({ posts, featuredPosts }) {
  const stats = [
    { label: "Role", value: "Venture Partner" },
    { label: "Focus", value: "Infra & Dev Tools" },
    { label: "Location", value: "San Francisco" },
    { label: "Status", value: "Deploying", accent: true },
  ];

  return (
    <div className="bg-paper min-h-screen">
      <Head>
        <meta charSet="utf-8" />
        <title>Who Is Nnamdi?</title>
        <meta
          name="description"
          content="Thoughts on technology, venture capital, and the economics of both"
        />
        <link rel="canonical" href="https://whoisnnamdi.com/" />
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <meta property="og:site_name" content="Who is Nnamdi?" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Who is Nnamdi?" />
        <meta
          property="og:description"
          content="Thoughts on technology, venture capital, and the economics of both"
        />
        <meta property="og:url" content="https://whoisnnamdi.com/" />
        <meta
          property="og:image"
          content="https://whoisnnamdi.com/content/images/2019/10/DSC_0562_cropped_2.jpg"
        />
        <meta
          property="article:publisher"
          content="https://www.facebook.com/nnamdi.iregbulem"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Who is Nnamdi?" />
        <meta
          name="twitter:description"
          content="Thoughts on technology, venture capital, and the economics of both"
        />
        <meta name="twitter:url" content="https://whoisnnamdi.com/" />
        <meta name="twitter:site" content="@whoisnnamdi" />
      </Head>
      <Analytics />
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <NavbarRedesign source="Home" />
        <HeroSection latestPost={posts[0]} />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <StatsRow stats={stats} variant="dark" />
      </div>

      <section className="bg-grid border-b border-neutral-300">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Founders",
              description:
                "Navigating the messy middle of zero to one. The theories and realities of building a valuable tech startup.",
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-neutral-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M4 10h16M6 6h12M7 14h10M8 18h8" />
                </svg>
              ),
            },
            {
              title: "Developers",
              description:
                "The rise of the engineer-executive. Tooling, workflows, and the future of software construction.",
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-neutral-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M4 6h16v12H4z" />
                  <path d="M8 10h8M8 14h6" />
                </svg>
              ),
            },
            {
              title: "Investors",
              description:
                "Macro analysis for the micro-focused. Charts, models, and equations separating signal from the noise.",
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-neutral-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M5 16l4-4 3 3 5-6" />
                  <path d="M4 20h16" />
                </svg>
              ),
            },
          ].map((card, index) => (
            <div
              key={card.title}
              className="border border-neutral-300 bg-white p-6"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 border border-neutral-300 flex items-center justify-center">
                  {card.icon}
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
        </div>
      </section>

      {featuredPosts.length > 0 && (
        <section className="bg-grid border-b border-neutral-300">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-12">
            <FeaturedEssayCard post={featuredPosts[0]} />
          </div>
        </section>
      )}

      <section className="bg-grid border-b border-neutral-300">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 pt-6 pb-12 grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-10">
          <div>
            <h2 className="pt-6 font-serif text-3xl md:text-4xl text-neutral-900">
              Latest Dispatches
            </h2>
            <p className="mt-3 text-sm font-mono uppercase tracking-[0.2em] text-neutral-500">
              Observations from the field.
            </p>
          </div>
          <div className="border-neutral-300">
            {posts.slice(0, 3).map((post) => (
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
      </section>

      <section className="max-w-[1200px] mx-auto px-6 lg:px-10 my-16">
        <SubscribeCTA source="Homepage CTA" />
      </section>

      <FooterRedesign />
    </div>
  );
}
