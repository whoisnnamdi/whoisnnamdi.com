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

const buildLastModTag = (value) => {
    if (!value) return ''
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return ''
    return `
                    <lastmod>${date.toISOString()}</lastmod>`
}

const createSitemap = (posts) => {
    const latestUpdatedAt = posts.reduce((latest, post) => {
        const candidate = post.updated_at || post.published_at
        if (!candidate) return latest
        const candidateDate = new Date(candidate)
        if (Number.isNaN(candidateDate.getTime())) return latest
        if (!latest) return candidateDate
        return candidateDate > latest ? candidateDate : latest
    }, null)

    const rootLastMod = latestUpdatedAt ? latestUpdatedAt.toISOString() : null

    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${`https://whoisnnamdi.com`}</loc>${buildLastModTag(rootLastMod)}
    </url>
    ${posts
        .map(({ slug, updated_at, published_at }) => {
            const lastMod = updated_at || published_at
            return `
                <url>
                    <loc>${`https://whoisnnamdi.com/${slug}/`}</loc>${buildLastModTag(lastMod)}
                </url>
            `
        })
        .join("")
    }
    ${others
        .map((slug) => {
            return `
                <url>
                    <loc>${`https://whoisnnamdi.com/${slug}/`}</loc>${buildLastModTag(rootLastMod)}
                </url>
            `
        })
        .join("")
    }
    </urlset>
`;
}

async function generateSitemap() {
    try {
        console.log('Generating sitemap...');
        
        // Ensure the public directory exists
        const publicDir = path.join(process.cwd(), 'public');
        
        // Get all posts and pages
        const postsPages = await getAll();
        const sitemapContent = createSitemap(postsPages);
        
        // Write sitemap directly to /public
        const filePath = path.join(publicDir, 'sitemap.xml');
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
