import { NextResponse } from 'next/server'
import { checkBotId } from 'botid/server'

export async function middleware(request) {
    // Only run bot detection on homepage
    if (request.nextUrl.pathname !== '/') {
        return NextResponse.next()
    }

    try {
        const verification = await checkBotId()
        
        if (verification.isBot) {
            const botDetails = {
                url: request.nextUrl.toString(),
                userAgent: request.headers.get('user-agent'),
                timestamp: new Date().toISOString(),
                ip: request.headers.get('x-forwarded-for') || request.ip
            }
            
            console.log('Bot detected on homepage:', botDetails)
            
            // Return a minimal HTML response for bots to avoid wasting resources
            return new NextResponse(
                `<!DOCTYPE html>
<html>
<head>
    <title>Page</title>
    <meta name="description" content="Website">
</head>
<body>
    <h1>Welcome</h1>
    <p>This is a website.</p>
    <hr>
    <h2>Detection Details</h2>
    <p><strong>URL:</strong> ${botDetails.url}</p>
    <p><strong>User Agent:</strong> ${botDetails.userAgent}</p>
    <p><strong>Timestamp:</strong> ${botDetails.timestamp}</p>
    <p><strong>IP:</strong> ${botDetails.ip}</p>
</body>
</html>`,
                {
                    status: 200,
                    headers: {
                        'Content-Type': 'text/html',
                        'Cache-Control': 'public, max-age=86400'
                    }
                }
            )
        }
    } catch (error) {
        console.error('Bot detection error:', error)
        // Continue to serve the page if bot detection fails
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Only match homepage
         */
        '/',
    ],
}
