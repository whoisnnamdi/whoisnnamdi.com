// This page redirects to the static RSS feed
export default function RSS() {
    return null
}

export async function getServerSideProps({ res }) {
    // Redirect to the static RSS feed in the static directory
    res.statusCode = 301
    res.setHeader('Location', '/static/rss.xml')
    res.end()
    
    return {
        props: {},
    }
}