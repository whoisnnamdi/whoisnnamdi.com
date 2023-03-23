import { getAll } from './api/ghost_data'

const others = [
    "founders",
    "developers",
    "investors"
]

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
`

export async function getServerSideProps({ res }) {
    const postsPages = await getAll()

    res.setHeader("Content-Type", "text/xml")
    res.write(createSitemap(postsPages))
    res.end()

    return {
        props: {}
    }
}

export default function Sitemap() {
    return
}