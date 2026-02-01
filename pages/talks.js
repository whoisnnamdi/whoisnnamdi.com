import { useState } from "react";
import Image from "next/image";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import SubscribeCTA from "../components/SubscribeCTA";
import Container from "../components/Container";
import { getTalksData } from "../lib/content";

function getPlatform(href = "") {
  if (href.includes("youtube")) return "YouTube";
  if (href.includes("spotify")) return "Spotify";
  if (href.includes("podcasts.apple")) return "Apple Podcasts";
  if (href.includes("substack")) return "Substack";
  if (href.includes("linkedin")) return "LinkedIn";
  return "Web";
}

function getFormatTag(href = "") {
  if (href.includes("youtube")) return "Video";
  if (href.includes("spotify") || href.includes("podcasts.apple"))
    return "Podcast";
  if (href.includes("substack")) return "Essay";
  return "Talk";
}

export async function getStaticProps() {
  const talks = getTalksData();
  return { props: { talks } };
}

export default function TalksPage({ talks }) {
  const title = "Talks & Interviews — Nnamdi Iregbulem";
  const description =
    "Conversations on technical infrastructure, AI, and the economics of software.";

  const totalCount = talks.length;
  const latest = talks[0];
  const featured = talks[1] || talks[0];
  const [showAll, setShowAll] = useState(false);
  const hasMore = talks.length > 10;
  const gridItems = showAll ? talks.slice(2) : talks.slice(2, 10);

  return (
    <Layout navbarProps={{ source: "talks" }}>
      <SEO
        title={title}
        description={description}
        url="https://whoisnnamdi.com/talks"
      />

      <section className="bg-grid border-neutral-300">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr,1fr] border border-neutral-900 bg-white">
            <div className="px-8 py-10 lg:px-12 lg:py-12">
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500">
                ↘ Talks Archive
              </p>
              <h1 className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-neutral-900">
                Conversations on{" "}
                <span className="italic text-accent">technology</span> & the{" "}
                <span className="italic text-accent">economics</span> of{" "}
                software.
              </h1>
              <div className="mt-8 border-l-2 border-neutral-900 pl-4 text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-600 space-y-1">
                <p>// Archive_Metadata</p>
                <p>Count: {totalCount} episodes</p>
                <p>Status: Active</p>
                <p>Focus: tech_moats, ai_infra, venture_economy</p>
              </div>
            </div>

            <a
              href={latest?.href || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="border-t lg:border-t-0 lg:border-l border-neutral-900 bg-grid-blue text-white px-6 py-8 block"
            >
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-blue-300">
                Latest Release
              </p>
              <div className="mt-4 relative border border-neutral-700 bg-neutral-800 overflow-hidden">
                {latest?.feature_image ? (
                  <Image
                    src={latest.feature_image}
                    alt={latest.title}
                    width={640}
                    height={360}
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <div className="h-40 bg-neutral-800" />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center shadow-lg">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="mt-4 font-serif text-xl italic text-white">
                {latest?.title || "Inside the Black Box"}
              </p>
              {latest?.excerpt && (
                <p className="mt-3 text-sm text-neutral-300 leading-relaxed line-clamp-3">
                  {latest.excerpt}
                </p>
              )}
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400">
                <span>Platform: {getPlatform(latest?.href)}</span>
              </div>
            </a>
          </div>
        </Container>
      </section>

      <section className="bg-grid border-neutral-300">
        <Container className="pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] border border-neutral-900 bg-white">
            <a
              href={featured?.href || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="relative bg-neutral-900 text-white px-8 py-10 lg:px-10 lg:py-12 overflow-hidden"
            >
              {featured?.feature_image && (
                <Image
                  src={featured.feature_image}
                  alt={featured.title}
                  fill
                  className="object-cover opacity-30"
                />
              )}
              <div className="relative z-10">
                <div className="flex items-center gap-4 text-[11px] font-mono uppercase tracking-[0.2em] text-blue-300">
                  <span className="px-2 py-1 border border-blue-400">
                    Featured
                  </span>
                </div>
                <h2 className="mt-6 font-serif text-3xl md:text-4xl leading-tight">
                  “{featured?.title || "The End of Free Money"}”
                </h2>
                <p className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-white text-neutral-900 text-[11px] font-mono uppercase tracking-[0.2em]">
                  Listen now →
                </p>
              </div>
            </a>

            <div className="border-t lg:border-t-0 lg:border-l border-neutral-300 bg-white px-8 py-10 lg:px-10 lg:py-12">
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500">
                Episode Summary
              </p>
              <p className="mt-4 text-base text-neutral-700 leading-relaxed">
                {featured?.excerpt ||
                  "In this wide-ranging conversation we discuss macro shifts affecting software valuations, why seed rounds are options not equity, and the return of technical diligence."}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-grid border-neutral-300">
        <Container className="pt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-neutral-300 bg-white">
            {gridItems.map((item, index) => {
              const platform = getPlatform(item.href);
              const formatTag = getFormatTag(item.href);
              return (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-neutral-300 p-6 flex flex-col gap-4 hover:bg-neutral-50 transition-colors"
                >
                  <div className="border border-neutral-300 bg-white overflow-hidden">
                    {item.feature_image ? (
                      <Image
                        src={item.feature_image}
                        alt={item.title}
                        width={560}
                        height={320}
                        className="w-full h-28 object-cover"
                      />
                    ) : (
                      <div className="h-28 bg-neutral-100 flex items-center justify-center text-neutral-400">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <circle cx="12" cy="12" r="9" />
                          <path d="M10 8l6 4-6 4V8z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400">
                    <span>{platform}</span>
                  </div>
                  <h3 className="font-serif text-xl text-neutral-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-600 line-clamp-3">
                    {item.excerpt ||
                      "A deep dive into the systems and stories shaping modern software."}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="px-2 py-1 border border-neutral-300 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">
                      {formatTag}
                    </span>
                    <span className="w-8 h-8 border border-neutral-900 flex items-center justify-center text-neutral-900">
                      {formatTag === "Podcast" || formatTag === "Video" ? (
                        <svg
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                          fill="currentColor"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M7 17L17 7" />
                          <path d="M10 7h7v7" />
                        </svg>
                      )}
                    </span>
                  </div>
                </a>
              );
            })}

            {hasMore && (
              <div className="border border-neutral-300 p-6 flex flex-col justify-between text-center">
                <div>
                  <p className="text-lg font-serif text-neutral-900">
                    {showAll ? "Collapse Archive" : "View Full Archive"}
                  </p>
                  <p className="mt-2 text-sm text-neutral-500">
                    Browse all {totalCount} recorded appearances including
                    panels, guest lectures, and podcasts.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAll((prev) => !prev)}
                  className="mt-6 inline-flex items-center justify-center px-5 py-2 border border-neutral-900 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors"
                >
                  {showAll ? "Collapse Archive" : "Open Archive"}
                </button>
              </div>
            )}
          </div>
        </Container>
      </section>

      <Container as="section" className="my-12">
        <SubscribeCTA source="Talks Page" />
      </Container>
    </Layout>
  );
}
