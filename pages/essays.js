import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout";
import EssayListItem from "../components/EssayListItem";
import FeaturedEssayCard from "../components/FeaturedEssayCard";
import SEO from "../components/SEO";
import SubscribeCTA from "../components/SubscribeCTA";
import Container from "../components/Container";
import { postFormat } from "../lib/postFormat";
import { getPostSummaries } from "../lib/content";

function toggleSelection(previousValues, value) {
  return previousValues.includes(value)
    ? previousValues.filter((item) => item !== value)
    : [...previousValues, value];
}

export async function getStaticProps() {
  const posts = postFormat(await getPostSummaries());

  return {
    props: {
      posts,
    },
  };
}

export default function Page({ posts = [] }) {
  const slug = "essays";
  const pageTitle = "Essays — Nnamdi Iregbulem";
  const pageDesc = "All essays by Nnamdi Iregbulem";
  const pageURL = "https://whoisnnamdi.com/essays";

  const totalCount = posts.length;
  const latestPost = posts[0];
  const featuredPost = posts[1] || latestPost;
  const showFeatured = featuredPost && featuredPost.id !== latestPost?.id;
  const excludedIds = new Set(
    [latestPost?.id, featuredPost?.id].filter(Boolean),
  );
  const archivePosts = posts.filter((post) => !excludedIds.has(post.id));
  const listPosts = archivePosts.length > 0 ? archivePosts : posts;
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedFocus, setSelectedFocus] = useState([]);

  const years = Array.from(
    new Set(
      listPosts
        .map((post) => new Date(post.published_at).getFullYear())
        .filter(Boolean),
    ),
  ).sort((a, b) => b - a);

  const tagCounts = listPosts.reduce((acc, post) => {
    (post.tags || []).forEach((tag) => {
      const key = tag?.name || tag?.slug;
      if (!key) return;
      acc[key] = (acc[key] || 0) + 1;
    });
    return acc;
  }, {});

  const focusTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name]) => name);

  const focusTagList = focusTags.length
    ? focusTags
    : ["Founders", "Investors", "Developers"];
  const focusLabel = focusTagList.join(", ");
  const filteredPosts = useMemo(() => {
    let filtered = listPosts;
    if (selectedYears.length > 0) {
      filtered = filtered.filter((post) =>
        selectedYears.includes(new Date(post.published_at).getFullYear()),
      );
    }
    if (selectedFocus.length > 0) {
      filtered = filtered.filter((post) => {
        const postTags = (post.tags || []).map((tag) => tag?.name || tag?.slug);
        return selectedFocus.some((tag) => postTags.includes(tag));
      });
    }
    return filtered;
  }, [listPosts, selectedFocus, selectedYears]);

  const toggleYear = (year) => {
    setSelectedYears((prev) => toggleSelection(prev, year));
  };

  const toggleFocus = (tag) => {
    setSelectedFocus((prev) => toggleSelection(prev, tag));
  };

  return (
    <Layout navbarProps={{ source: slug }}>
      <SEO title={pageTitle} description={pageDesc} url={pageURL} />

      <main>
        <section className="bg-grid border-neutral-300">
          <Container className="pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] border border-neutral-900 bg-white">
              <div className="px-8 py-10 lg:px-12 lg:py-12">
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500">
                  ↘ Essays Archive
                </p>
                <h1 className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-neutral-900">
                  Essays on{" "}
                  <span className="italic text-accent">technology</span> &{" "}
                  <span className="italic text-accent">capital</span> in the
                  real world.
                </h1>
                <p className="mt-4 max-w-lg text-sm text-neutral-600 leading-relaxed">
                  Long-form essays on technology, venture capital, and the
                  economics that bind them together.
                </p>
                <div className="mt-8 border-l-2 border-neutral-900 pl-4 text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-600 space-y-1">
                  <p>// Archive_Metadata</p>
                  <p>Count: {totalCount} essays</p>
                  <p>Latest: {latestPost?.dateFormatted || "—"}</p>
                  <p>Focus: {focusLabel}</p>
                </div>
              </div>

              {latestPost ? (
                <Link
                  href={`/${latestPost.slug}`}
                  className="relative border-t lg:border-t-0 lg:border-l border-neutral-900 bg-neutral-900 text-white px-6 py-8 block overflow-hidden"
                >
                  {latestPost.feature_image && (
                    <Image
                      src={latestPost.feature_image}
                      alt={latestPost.title}
                      fill
                      className="object-cover opacity-30"
                      sizes="(min-width: 1024px) 420px, 100vw"
                    />
                  )}
                  <div className="relative z-10">
                    <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-300">
                      Latest Essay
                    </p>
                    <h2 className="mt-4 font-serif text-2xl md:text-3xl leading-tight">
                      {latestPost.title}
                    </h2>
                    {latestPost.excerpt && (
                      <p className="mt-3 text-sm text-neutral-300 leading-relaxed line-clamp-3">
                        {latestPost.excerpt}
                      </p>
                    )}
                    {latestPost.tags?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">
                        {latestPost.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag.slug || tag.name}
                            className="px-2 py-1 border border-neutral-700"
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-300">
                      Read essay →
                    </span>
                  </div>
                </Link>
              ) : (
                <div className="border-t lg:border-t-0 lg:border-l border-neutral-900 bg-grid-blue text-white px-6 py-8">
                  <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-blue-300">
                    Latest Essay
                  </p>
                  <p className="mt-4 font-serif text-xl italic text-white">
                    Essays are on the way.
                  </p>
                </div>
              )}
            </div>
          </Container>
        </section>

        {showFeatured && (
          <section className="bg-grid border-neutral-300">
            <Container className="pb-6">
              <FeaturedEssayCard post={featuredPost} />
            </Container>
          </section>
        )}

        <section className="bg-grid border-neutral-300">
          <Container className="pt-6 pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-[260px,1fr] border border-neutral-300 bg-white">
              <aside className="border-b lg:border-b-0 lg:border-r border-neutral-300 p-6">
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500">
                  Filter Archive
                </p>
                <div className="mt-6 space-y-6">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">
                      Years
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {years.map((year) => (
                        <button
                          type="button"
                          key={year}
                          aria-pressed={selectedYears.includes(year)}
                          onClick={() => toggleYear(year)}
                          className={`px-2 py-1 border text-[10px] font-mono uppercase tracking-[0.2em] transition ${
                            selectedYears.includes(year)
                              ? "border-neutral-900 bg-neutral-900 text-white"
                              : "border-neutral-300 text-neutral-500 hover:border-neutral-500 hover:text-neutral-700"
                          }`}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">
                      Focus
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {focusTagList.map((tag) => (
                        <button
                          type="button"
                          key={tag}
                          aria-pressed={selectedFocus.includes(tag)}
                          onClick={() => toggleFocus(tag)}
                          className={`px-2 py-1 border text-[10px] font-mono uppercase tracking-[0.2em] transition ${
                            selectedFocus.includes(tag)
                              ? "border-neutral-900 bg-neutral-900 text-white"
                              : "border-neutral-300 text-neutral-500 hover:border-neutral-500 hover:text-neutral-700"
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>

              <div className="border-neutral-300">
                <div className="px-6 pt-6 pb-4 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-2xl text-neutral-900">
                      Essay Index
                    </h2>
                    <p className="mt-2 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500">
                      Sorted by publish date — newest first.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">
                    {filteredPosts.length} entries
                  </span>
                </div>

                <div className="px-6 border-t border-neutral-200">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                      <EssayListItem
                        key={post.id}
                        post={post}
                        variant="archive"
                      />
                    ))
                  ) : (
                    <p className="py-10 text-sm text-neutral-500">
                      No essays match those filters.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <Container as="section" className="mb-12">
          <SubscribeCTA source="Essays Page" />
        </Container>
      </main>
    </Layout>
  );
}
