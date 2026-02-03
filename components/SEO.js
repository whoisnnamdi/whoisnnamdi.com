import Head from "next/head";

const DEFAULT_IMAGE =
  "https://whoisnnamdi.com/images/portrait2.png";
const SITE_NAME = "Who is Nnamdi?";
const TWITTER_HANDLE = "@whoisnnamdi";
const FACEBOOK_PUBLISHER = "https://www.facebook.com/nnamdi.iregbulem";

export default function SEO({
  title,
  description,
  url,
  image = DEFAULT_IMAGE,
  type = "website",
  article = null,
  twitter = {},
}) {
  const twitterCard = twitter.card || (type === "article" ? "summary_large_image" : "summary");
  const twitterTitle = twitter.title || title;
  const twitterDescription = twitter.description || description;
  const twitterImage = twitter.image || image;

  return (
    <Head>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {url && <link rel="canonical" href={url} />}
      <meta name="referrer" content="no-referrer-when-downgrade" />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:image" content={image} />
      <meta property="article:publisher" content={FACEBOOK_PUBLISHER} />

      {/* Article-specific meta */}
      {article?.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {article?.modifiedTime && (
        <meta property="article:modified_time" content={article.modifiedTime} />
      )}
      {article?.author && (
        <meta property="article:author" content={article.author} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      {url && <meta name="twitter:url" content={url} />}
      <meta name="twitter:image" content={twitterImage} />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      {twitter.creator && <meta name="twitter:creator" content={twitter.creator} />}
      {twitter.label1 && <meta name="twitter:label1" content={twitter.label1} />}
      {twitter.data1 && <meta name="twitter:data1" content={twitter.data1} />}
    </Head>
  );
}
