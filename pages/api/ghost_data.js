import GhostContentAPI from '@tryghost/content-api'

const api = new GhostContentAPI({
    url: process.env.GHOST_API_URL,
    key: process.env.GHOST_API_KEY,
    version: process.env.GHOST_API_VERSION
})

// Utility function to filter out specific pages by slug
function filterPages(pages, slugsToExclude = ['newsletter', 'portfolio']) {
    return pages ? pages.filter(page => !slugsToExclude.includes(page.slug)) : pages
}

export async function getPosts() {
    return await api.posts
        .browse({
            include: 'tags, authors',
            limit: 'all'
        })
        .catch((err) => {
            console.error(err)
        })
}

export async function getPost(postSlug) {
    return await api.posts
        .read({
            slug: postSlug
        })
        .catch((err) => {
            console.error(err)
        })
}

export async function getPages() {
    const pages = await api.pages
        .browse({
            limit: 'all'
        })
        .catch((err) => {
            console.error(err)
        })
    
    return filterPages(pages)
}

export async function getPage(pageSlug) {
    return await api.pages
        .read({
            slug: pageSlug
        })
        .catch((err) => {
            console.error(err)
        })
}

export async function getAll() {
    const posts = await api.posts
    .browse({
        include: 'tags, authors',
        limit: 'all'
    })
    .catch((err) => {
        console.error(err)
    })

    const pages = await api.pages
    .browse({
        limit: 'all'
    })
    .catch((err) => {
        console.error(err)
    })

    return await posts.concat(filterPages(pages))
}
