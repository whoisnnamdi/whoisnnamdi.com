import Image from "next/image";
import { getPosts, getPost, getPages, getPage } from "../lib/content";
import Layout from "../components/Layout";
import EssaySidebar from "../components/EssaySidebar";
import SEO from "../components/SEO";
import SubscribeCTA from "../components/SubscribeCTA";
import LinkConverter from "../components/LinkConverter";
import Container from "../components/Container";
import { formatDate } from "../lib/dates";

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

  // Split content at first H2 for intro CTA placement (posts only)
  let introHtml = null;
  let mainHtml = post.html;
  if (isPost) {
    const firstH2Index = post.html.search(/<h2[\s>]/i);
    if (firstH2Index > 0) {
      introHtml = post.html.slice(0, firstH2Index);
      mainHtml = post.html.slice(firstH2Index);
    }
  }

  return { props: { post, sections, isPost, introHtml, mainHtml } };
}



export default function PostPage({ post, sections, isPost, introHtml, mainHtml }) {
  const publishedLabel = formatDate(post?.published_at, "upper");
  const navLabel = post?.slug === "about-me" ? "About" : publishedLabel;
  const isAbout = post?.slug === "about-me";
  const titleContent = post.title;

  const postUrl = `https://whoisnnamdi.com/${post.slug}/`;

  const navbarProps = {
    source: post.title,
    dateLabel: navLabel,
    codeOverride: post?.slug === "about-me" ? "Index 05" : undefined,
  };

  return (
    <Layout navbarProps={navbarProps}>
      <SEO
        title={post.title}
        description={post.meta_description || post.og_description}
        url={postUrl}
        image={post.feature_image}
        type="article"
        article={{
          publishedTime: post.published_at,
          modifiedTime: post.updated_at,
          author: "https://www.facebook.com/nnamdi.iregbulem",
        }}
        twitter={{
          card: "summary_large_image",
          title: post.twitter_title,
          description: post.twitter_description,
          image: post.twitter_image,
          creator: "@whoisnnamdi",
          label1: "Written by",
          data1: "Nnamdi Iregbulem",
        }}
      />

      <div className="bg-grid border-neutral-300">
        <Container
          className={`${isAbout ? "pt-0 pb-4" : "py-4"} grid grid-cols-1 ${isPost ? "lg:grid-cols-[240px,1fr] gap-12" : ""}`}
        >
          {isPost && <EssaySidebar sections={sections} post={post} />}

          <main
            className={`min-w-0 ${isPost ? "lg:border-l lg:border-neutral-300 lg:pl-10" : ""}`}
          >
            {isAbout ? (
              <header className="mb-12">
                <div className="border border-neutral-900 bg-white px-8 py-10 lg:px-12 lg:py-12 relative overflow-hidden">
                  <div className="flex items-center gap-2 font-mono uppercase text-xs tracking-[0.35em] text-blue-600 mb-6">
                    <span className="inline-block w-2 h-2 bg-blue-600" />
                    <span>About Me</span>
                  </div>
                  <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-neutral-900 max-w-4xl">
                    Investigating the{" "}
                    <span className="italic text-accent">mechanics</span> of
                    digital value.
                  </h1>
                  <p className="mt-8 text-sm md:text-base font-mono uppercase tracking-[0.2em] text-neutral-500">
                    <span className="mr-2 text-neutral-400">|</span>
                    Technology • Software Metrics • Economic Theory • Venture
                    Capital
                  </p>
                  <div className="hidden md:block absolute right-0 top-2 text-neutral-200">
                    <svg
                      viewBox="0 0 64 64"
                      className="w-20 h-20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="14" y="14" width="36" height="36" rx="4" />
                      <rect x="24" y="24" width="16" height="16" rx="2" />
                      <path d="M8 24h6M8 32h6M8 40h6M50 24h6M50 32h6M50 40h6M24 8v6M32 8v6M40 8v6M24 50v6M32 50v6M40 50v6" />
                    </svg>
                  </div>
                </div>
              </header>
            ) : (
              <header className="mb-10">
                <h1
                  className={`font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-neutral-900 ${post.slug === "talks" ? "mb-4" : "mb-6"}`}
                >
                  {titleContent}
                </h1>
              </header>
            )}

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

            {isPost && introHtml ? (
              <>
                <article
                  className={`prose prose-lg md:prose-xl max-w-none prose-essay`}
                >
                  <LinkConverter content={introHtml} />
                </article>
                <div className="my-12">
                  <SubscribeCTA source={`Top: ${post.title}`} />
                </div>
                <article
                  className={`prose prose-lg md:prose-xl max-w-none prose-essay`}
                >
                  <LinkConverter content={mainHtml} />
                </article>
              </>
            ) : (
              <article
                className={`prose prose-lg md:prose-xl max-w-none prose-essay ${post.slug === "talks" ? "talks-prose" : ""}`}
              >
                <LinkConverter content={post.html} />
              </article>
            )}

            {isPost && (
              <div className="mt-16">
                <SubscribeCTA source={`Bottom: ${post.title}`} />
              </div>
            )}
            {isAbout && (
              <div className="my-16">
                <SubscribeCTA source="About" />
              </div>
            )}
          </main>
        </Container>
      </div>
    </Layout>
  );
}
