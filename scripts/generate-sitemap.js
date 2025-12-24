// Script to generate sitemap at build time
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { getAll } = require('./content-api');

const others = [
    "founders",
    "developers",
    "investors"
];

const createSitemap = (posts) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${`https://whoisnnamdi.com`}</loc>
    </url>
    ${posts
        .map(({ slug }) => {
            return `
                <url>
                    <loc>${`https://whoisnnamdi.com/${slug}/`}</loc>
                </url>
            `
        })
        .join("")
    }
    ${others
        .map((slug) => {
            return `
                <url>
                    <loc>${`https://whoisnnamdi.com/${slug}/`}</loc>
                </url>
            `
        })
        .join("")
    }
    </urlset>
`;

async function generateSitemap() {
    try {
        console.log('Generating sitemap...');
        
        // Ensure the public directory exists
        const publicDir = path.join(process.cwd(), 'public');
        
        // Get all posts and pages
        const postsPages = await getAll();
        const sitemapContent = createSitemap(postsPages);
        
        // Write the file to a different path to avoid conflict with pages/sitemap.xml.js
        const sitemapDir = path.join(publicDir, 'static');
        fs.mkdirSync(sitemapDir, { recursive: true });
        const filePath = path.join(sitemapDir, 'sitemap.xml');
        fs.writeFileSync(filePath, sitemapContent);
        
        console.log(`Sitemap generated at ${filePath}`);
        return true;
    } catch (error) {
        console.error('Error generating sitemap:', error);
        process.exit(1);
    }
}

// Run the function if this script is executed directly
if (require.main === module) {
    generateSitemap();
}

module.exports = generateSitemap;
module.exports.createSitemap = createSitemap;
