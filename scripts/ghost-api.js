// CommonJS version of ghost API for build scripts
const GhostContentAPI = require('@tryghost/content-api');

// Initialize API
const api = new GhostContentAPI({
    url: process.env.GHOST_API_URL,
    key: process.env.GHOST_API_KEY,
    version: process.env.GHOST_API_VERSION
});

async function getPosts() {
    return await api.posts
        .browse({
            include: 'tags, authors',
            limit: 'all'
        })
        .catch((err) => {
            console.error(err);
        });
}

async function getAll() {
    const posts = await api.posts
    .browse({
        include: 'tags, authors',
        limit: 'all'
    })
    .catch((err) => {
        console.error(err);
    });

    const pages = await api.pages
    .browse({
        limit: 'all'
    })
    .catch((err) => {
        console.error(err);
    });

    return posts.concat(pages);
}

module.exports = {
    getPosts,
    getAll
};