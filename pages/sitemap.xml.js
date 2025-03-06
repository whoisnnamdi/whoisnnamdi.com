// This page redirects to the static sitemap
export default function Sitemap() {
    return null
}

export async function getServerSideProps({ res }) {
    // Redirect to the static sitemap
    res.statusCode = 301
    res.setHeader('Location', '/sitemap.xml')
    res.end()
    
    return {
        props: {},
    }
}