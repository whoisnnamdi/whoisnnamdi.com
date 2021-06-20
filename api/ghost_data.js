import GhostContentAPI from '@tryghost/content-api'

const api = new GhostContentAPI({
    url: 'https://whoisnnamdi.com',
    key: '4247c5d1c1b4726e7a58cc3a96',
    version: 'v3'
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