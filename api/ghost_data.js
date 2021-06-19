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