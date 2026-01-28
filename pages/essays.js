import Head from "next/head";
import NavbarRedesign from "../components/NavbarRedesign";
import FooterRedesign from "../components/FooterRedesign";
import EssayListItem from "../components/EssayListItem";
import SubscribeCTA from "../components/SubscribeCTA";
import { getPosts } from "../lib/content";
import Analytics from "../components/analytics";
import postFormat from "../components/postformat";

export async function getStaticProps() {
  const posts = postFormat(await getPosts());

  return {
    props: {
      posts,
    },
  };
}

export default function Page({ posts }) {
  const slug = "essays";
  const pageTitle = "Essays — Nnamdi Iregbulem";
  const pageDesc = "All essays by Nnamdi Iregbulem";
  const pageURL = "https://whoisnnamdi.com/essays";

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

      <main className="bg-grid border-neutral-300">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <header className="mb-10">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              Essays
            </h1>
            <p className="text-sm font-mono uppercase tracking-[0.2em] text-neutral-500">
              Thoughts on technology, venture capital, and the economics of
              both.
            </p>
          </header>

          <div className="border-t border-neutral-300">
            {posts.map((post) => (
              <EssayListItem key={post.id} post={post} />
            ))}
          </div>

          <div className="mt-16">
            <SubscribeCTA source="Essays Page" />
          </div>
        </div>
      </main>

      <FooterRedesign />
    </div>
  );
}
