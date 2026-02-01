// Unified script to generate all static files at build time
import 'dotenv/config';
import generateRSS from './generate-rss.mjs';
import generateSitemap from './generate-sitemap.mjs';

async function generateAll() {
    try {
        console.log('Starting static file generation...');

        // Generate RSS feed
        await generateRSS();

        // Generate sitemap
        await generateSitemap();

        console.log('All static files generated successfully!');
    } catch (error) {
        console.error('Error generating static files:', error);
        process.exit(1);
    }
}

// Run the function
generateAll();
