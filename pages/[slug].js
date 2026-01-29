import Head from "next/head";
import Image from "next/image";
import { getPosts, getPost, getPages, getPage } from "../lib/content";
import NavbarRedesign from "../components/NavbarRedesign";
import FooterRedesign from "../components/FooterRedesign";
import EssaySidebar from "../components/EssaySidebar";
import SubscribeCTA from "../components/SubscribeCTA";
import LinkConverter from "../components/linkconverter";
import Analytics from "../components/analytics";

export async function getStaticPaths() {
  const posts = await getPosts();
  const pages = (await getPages()).filter((p) => p.slug !== "talks");
  const paths = posts.concat(pages).map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const posts = await getPosts();

  const isPost = posts.some((post) => post.slug === params.slug);
  const post = await (isPost ? getPost : getPage)(params.slug);

  // Extract headings for sidebar navigation
  const headingRegex = /<h2[^>]*id="([^"]*)"[^>]*>([^<]*)<\/h2>/gi;
  const sections = [];
  let match;
  while ((match = headingRegex.exec(post.html)) !== null) {
    sections.push({
      id: match[1],
      title: match[2].replace(/<[^>]*>/g, "").trim(),
    });
  }

  return { props: { post, sections, isPost } };
}

export default function PostPage({ post, sections, isPost }) {
  const publishedLabel = post?.published_at
    ? new Intl.DateTimeFormat("default", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
        .format(new Date(post.published_at))
        .toUpperCase()
    : null;
  const navLabel = post?.slug === "about-me" ? "About Me." : publishedLabel;
  const titleMatch = post.title.match(/Aren[’']t/);
  const titleContent = titleMatch
    ? (() => {
        const [before, after] = post.title.split(titleMatch[0]);
        return (
          <>
            {before}
            <span className="italic text-blue-600">{titleMatch[0]}</span>
            {after}
          </>
        );
      })()
    : post.title;

  return (
    <div className="bg-paper min-h-screen">
      <Head>
        <meta charSet="utf-8" />
        <title>{post.title}</title>
        <meta name="description" content={post.meta_description} />
        <link rel="canonical" content={post.canonical_url} />
        <meta property="og:site_name" content="Who is Nnamdi?" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.og_description} />
        <meta
          property="og:url"
          content={"https://whoisnnamdi.com/" + post.slug + "/"}
        />
        <meta property="og:image" content={post.feature_image} />
        <meta property="article:published_time" content={post.published_at} />
        <meta property="article:modified_time" content={post.updated_at} />
        <meta
          property="article:publisher"
          content="https://www.facebook.com/nnamdi.iregbulem"
        />
        <meta
          property="article:author"
          content="https://www.facebook.com/nnamdi.iregbulem"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.twitter_title} />
        <meta name="twitter:description" content={post.twitter_description} />
        <meta
          name="twitter:url"
          content={"https://whoisnnamdi.com/" + post.slug + "/"}
        />
        <meta name="twitter:image" content={post.twitter_image} />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content="Nnamdi Iregbulem" />
        <meta name="twitter:site" content="@whoisnnamdi" />
        <meta name="twitter:creator" content="@whoisnnamdi" />
        <meta property="og:image:width" content="1172" />
        <meta property="og:image:height" content="584" />
      </Head>
      <Analytics />
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <NavbarRedesign
          source={post.title}
          dateLabel={navLabel}
          codeOverride={post?.slug === "about-me" ? "05" : undefined}
        />
      </div>

      <div className="bg-grid border-neutral-300">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-4 grid grid-cols-1 lg:grid-cols-[240px,1fr] gap-12">
          {isPost && <EssaySidebar sections={sections} post={post} />}

          <main className="min-w-0 lg:border-l lg:border-neutral-300 lg:pl-10">
            <header className="mb-10">
              <h1
                className={`font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-neutral-900 ${post.slug === "talks" ? "mb-4" : "mb-6"}`}
              >
                {titleContent}
              </h1>
              {post.excerpt && (
                <p className="text-base md:text-lg text-neutral-600 max-w-2xl">
                  {post.excerpt}
                </p>
              )}
            </header>

            {post.feature_image && (
              <div className="mb-10 border border-neutral-300 imageContainer">
                <Image
                  src={post.feature_image}
                  alt={post.title}
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="imageImage"
                  priority
                />
              </div>
            )}

            <article
              className={`prose prose-lg md:prose-xl max-w-none prose-essay ${post.slug === "talks" ? "talks-prose" : ""}`}
            >
              <LinkConverter content={post.html} />
            </article>

            {isPost && (
              <div className="mt-16">
                <SubscribeCTA source={`Essay: ${post.title}`} />
              </div>
            )}
          </main>
        </div>
      </div>

      <FooterRedesign />
    </div>
  );
}
