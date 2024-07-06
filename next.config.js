module.exports = {
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
        }
      ]
    },
    async redirects() {
      return [
        {
          source: '/notes/:path*',
          destination: '/notes/404.html',
          permanent: false,
          missing: [
            {
              type: 'file',
              key: 'notes/:path*.html'
            }
          ]
        }
      ]
    }
}
