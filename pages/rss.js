import fs from 'fs';
import path from 'path';

// This function serves the static RSS feed
export default function RSS() {
    return null
}

export async function getServerSideProps({ res }) {
    try {
        // Path to the static RSS file
        const filePath = path.join(process.cwd(), 'public', 'static', 'rss.xml');
        
        // Read the static file
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        // Set the content type to XML
        res.setHeader('Content-Type', 'text/xml');
        
        // Send the static content
        res.write(fileContent);
        res.end();
    } catch (error) {
        console.error('Error serving RSS feed:', error);
        res.statusCode = 500;
        res.end('Error serving RSS feed');
    }
    
    return {
        props: {},
    }
}