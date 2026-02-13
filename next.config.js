module.exports = {
    images: {
      // Cache optimized images for 30 days. Source images on Vercel Blob
      // are immutable, and Vercel purges the CDN on deploy, so this only
      // governs caching between deploys. Reduces /_next/image origin
      // transfer from revalidating every 60s (default) to every 30 days.
      minimumCacheTTL: 2592000,
      remotePatterns: [
        {
          protocol: "https",
          hostname: "whoisnnamdi.com"
        },
        {
          protocol: "https",
          hostname: "fbnlxna1ujeyw7ap.public.blob.vercel-storage.com"
        }
      ]
    },
    i18n: {
      locales: ["en"],
      defaultLocale: "en",
    },
    trailingSlash: true,
    async rewrites() {
      return [
        {
          source: "/notes/",
          destination: "/notes/index.html"
        },
        {
          source: "/notes/:path*/",
          destination: "/notes/:path*.html"
        },
        {
          source: "/rss",
          destination: "/static/rss.xml"
        },
        {
          source: "/rss.xml",
          destination: "/static/rss.xml"
        },
        {
          source: "/feed",
          destination: "/static/rss.xml"
        },
        {
          source: "/en/rss",
          destination: "/static/rss.xml"
        }
      ]
    },
    async headers() {
      return [
        {
          source: "/static/rss.xml",
          headers: [
            {
              key: "Cache-Control",
              value: "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400"
            },
            {
              key: "Content-Type",
              value: "application/rss+xml"
            }
          ]
        }
      ]
    }
}
