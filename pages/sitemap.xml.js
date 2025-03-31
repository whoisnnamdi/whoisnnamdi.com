import fs from 'fs';
import path from 'path';

// This function serves the static sitemap
export default function Sitemap() {
    return null
}

export async function getServerSideProps({ res }) {
    try {
        // Path to the static sitemap file
        const filePath = path.join(process.cwd(), 'public', 'static', 'sitemap.xml');
        
        // Read the static file
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        // Set the content type to XML
        res.setHeader('Content-Type', 'text/xml');
        
        // Send the static content
        res.write(fileContent);
        res.end();
    } catch (error) {
        console.error('Error serving sitemap:', error);
        res.statusCode = 500;
        res.end('Error serving sitemap');
    }
    
    return {
        props: {},
    }
}