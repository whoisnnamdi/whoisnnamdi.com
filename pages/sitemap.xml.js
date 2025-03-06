// This page redirects to the static sitemap
export default function Sitemap() {
    return null
}

export async function getServerSideProps({ res }) {
    // Redirect to the static sitemap in the static directory
    res.statusCode = 301
    res.setHeader('Location', '/static/sitemap.xml')
    res.end()
    
    return {
        props: {},
    }
}