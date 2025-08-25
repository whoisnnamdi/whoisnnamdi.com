import { withBotId } from 'botid/next/config';

const nextConfig = {
    images: {
      domains: ['whoisnnamdi.com', 
                '138.68.29.23',
                'nnamdi.net',
                'res-9.cloudinary.com',  
                'res-8.cloudinary.com', 
                'res-7.cloudinary.com', 
                'res-6.cloudinary.com', 
                'res-5.cloudinary.com', 
                'res-4.cloudinary.com', 
                'res-3.cloudinary.com', 
                'res-2.cloudinary.com', 
                'res-1.cloudinary.com', 
                'res.cloudinary.com'],
    },
    i18n: {
      locales: ["en"],
      defaultLocale: "en",
    },
    trailingSlash: true,
    async rewrites() {
      return [
        {
          source: "/notes",
          destination: "/notes/index.html"
        },
        {
          source: "/notes/:path*",
          destination: "/notes/:path*.html"
        },
        {
          source: "/notes/:path*",
          destination: "/notes/404.html"
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

export default withBotId(nextConfig);
