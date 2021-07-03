import GhostContentAPI from '@tryghost/content-api'

const api = new GhostContentAPI({
    url: process.env.GHOST_API_URL,
    key: process.env.GHOST_API_KEY,
    version: process.env.GHOST_API_VERSION
})

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
    return await api.pages
        .browse({
            limit: 'all'
        })
        .catch((err) => {
            console.error(err)
        })
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

    return posts.concat(pages)
}