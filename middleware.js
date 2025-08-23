import { NextResponse } from 'next/server'

export function middleware(request) {
    // BotID headers are automatically injected by Vercel
    const botScore = parseInt(request.headers.get('x-vercel-bot-score') || '0')
    const isBot = request.headers.get('x-vercel-bot') === 'true'
    
    // Block bots from accessing sensitive API routes
    if (request.nextUrl.pathname.startsWith('/api/subscribe')) {
        if (botScore > 90) { // Very high confidence bot
            // Log the blocked attempt
            console.log('Middleware blocked high-confidence bot:', {
                path: request.nextUrl.pathname,
                botScore: botScore,
                ip: request.ip,
                userAgent: request.headers.get('user-agent'),
                timestamp: new Date().toISOString()
            })
            
            // Return a fake success response
            return new NextResponse(
                JSON.stringify({ message: "You are now subscribed!" }),
                {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/api/subscribe']
}