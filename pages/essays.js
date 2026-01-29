import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Analytics from "../components/analytics";
import EssayListItem from "../components/EssayListItem";
import FeaturedEssayCard from "../components/FeaturedEssayCard";
import FooterRedesign from "../components/FooterRedesign";
import NavbarRedesign from "../components/NavbarRedesign";
import SubscribeCTA from "../components/SubscribeCTA";
import postFormat from "../components/postformat";
import { getPosts } from "../lib/content";

export async function getStaticProps() {
  const posts = postFormat(await getPosts());

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

  const years = Array.from(
    new Set(
      posts
        .map((post) => new Date(post.published_at).getFullYear())
        .filter(Boolean),
    ),
  ).sort((a, b) => b - a);
  const yearCounts = years.map(
    (year) =>
      posts.filter((post) => new Date(post.published_at).getFullYear() === year)
        .length,
  );
  const maxYearCount = Math.max(...yearCounts, 1);
  const archiveBars = yearCounts.length
    ? yearCounts
        .slice(0, 5)
        .map((count) => Math.round((count / maxYearCount) * 100))
    : [24, 38, 30, 52, 40];

  const tagCounts = posts.reduce((acc, post) => {
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

  return (
    <div className="bg-paper min-h-screen">
      <Head>
        <meta charSet="utf-8" />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={pageURL} />
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <meta property="og:site_name" content="Who is Nnamdi?" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={pageURL} />
        <meta
          property="og:image"
          content="https://whoisnnamdi.com/content/images/2019/10/DSC_0562_cropped_2.jpg"
        />
        <meta
          property="article:publisher"
          content="https://www.facebook.com/nnamdi.iregbulem"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <meta name="twitter:url" content={pageURL} />
        <meta name="twitter:site" content="@whoisnnamdi" />
      </Head>
      <Analytics />
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <NavbarRedesign source={slug} />
      </div>

      <main>
        <section className="bg-grid border-neutral-300">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] border border-neutral-900 bg-white">
              <div className="px-8 py-10 lg:px-12 lg:py-12">
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500">
                  ↘ Essays Archive
                </p>
                <h1 className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-neutral-900">
                  The Archive: Insights at the intersection of{" "}
                  <span className="italic text-accent">bits</span> &{" "}
                  <span className="italic text-accent">bullion</span>.
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
          </div>
        </section>

        {showFeatured && (
          <section className="bg-grid border-neutral-300">
            <div className="max-w-[1200px] mx-auto px-6 lg:px-10 pb-6">
              <FeaturedEssayCard post={featuredPost} />
            </div>
          </section>
        )}

        <section className="bg-grid border-neutral-300">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10 pt-6">
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
                        <span
                          key={year}
                          className="px-2 py-1 border border-neutral-300 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500"
                        >
                          {year}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">
                      Focus
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {focusTagList.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 border border-neutral-300 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500"
                        >
                          {tag}
                        </span>
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
                    {listPosts.length} entries
                  </span>
                </div>

                <div className="px-6 border-t border-neutral-200">
                  {listPosts.map((post) => (
                    <EssayListItem
                      key={post.id}
                      post={post}
                      variant="archive"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-6 lg:px-10 my-16">
          <SubscribeCTA source="Essays Page" />
        </section>
      </main>

      <FooterRedesign />
    </div>
  );
}
