module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "whoisnnamdi.com"
        },
        {
          protocol: "https",
          hostname: "fbnlxna1ujeyw7ap.public.blob.vercel-storage.com"
        },
        {
          protocol: "https",
          hostname: "res-9.cloudinary.com"
        },
        {
          protocol: "https",
          hostname: "res-8.cloudinary.com"
        },
        {
          protocol: "https",
          hostname: "res-7.cloudinary.com"
        },
        {
          protocol: "https",
          hostname: "res-6.cloudinary.com"
        },
        {
          protocol: "https",
          hostname: "res-5.cloudinary.com"
        },
        {
          protocol: "https",
          hostname: "res-4.cloudinary.com"
        },
        {
          protocol: "https",
          hostname: "res-3.cloudinary.com"
        },
        {
          protocol: "https",
          hostname: "res-2.cloudinary.com"
        },
        {
          protocol: "https",
          hostname: "res-1.cloudinary.com"
        },
        {
          protocol: "https",
          hostname: "res.cloudinary.com"
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
    },
    // The redirects function can be removed or left empty
    async redirects() {
      return []
    }
}
