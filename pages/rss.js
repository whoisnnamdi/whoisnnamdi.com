// This page redirects to the static RSS feed
export default function RSS() {
    return null
}

export async function getServerSideProps({ res }) {
    // Redirect to the static RSS feed
    res.statusCode = 301
    res.setHeader('Location', '/rss/feed.xml')
    res.end()
    
    return {
        props: {},
    }
}