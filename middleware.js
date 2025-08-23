import { NextResponse } from 'next/server'

export async function middleware(request) {
  // Only apply bot detection to API routes and subscription forms
  if (request.nextUrl.pathname.startsWith('/api/subscribe') || 
      request.nextUrl.pathname === '/' && request.method === 'POST') {
    
    try {
      // Get request headers and metadata for bot detection
      const userAgent = request.headers.get('user-agent') || ''
      const origin = request.headers.get('origin') || ''
      const referer = request.headers.get('referer') || ''
      const xForwardedFor = request.headers.get('x-forwarded-for') || ''
      
      // Basic bot detection patterns
      const botPatterns = [
        /bot|crawler|spider|scraper/i,
        /curl|wget|python|java|go-http/i,
        /headless|phantom|selenium/i
      ]
      
      const isSuspiciousUserAgent = botPatterns.some(pattern => pattern.test(userAgent))
      
      // Check for missing browser headers that legitimate requests should have
      const hasValidOrigin = origin && (origin.includes('whoisnnamdi.com') || origin.includes('localhost'))
      const hasValidReferer = referer && (referer.includes('whoisnnamdi.com') || referer.includes('localhost'))
      
      // Rate limiting check - this would typically integrate with Vercel's edge storage
      // For now, we'll use basic request pattern detection
      
      if (isSuspiciousUserAgent || (!hasValidOrigin && !hasValidReferer)) {
        // Instead of blocking completely, we'll add a header to flag suspicious requests
        // This allows the API route to handle it more gracefully
        const response = NextResponse.next()
        response.headers.set('x-bot-detection', 'suspicious')
        response.headers.set('x-bot-user-agent', userAgent)
        response.headers.set('x-bot-origin', origin)
        return response
      }
      
      // For legitimate requests, add a verification header
      const response = NextResponse.next()
      response.headers.set('x-bot-detection', 'verified')
      return response
      
    } catch (error) {
      // If bot detection fails, allow the request through but log it
      console.error('Bot detection error:', error)
      const response = NextResponse.next()
      response.headers.set('x-bot-detection', 'error')
      return response
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Apply to API routes
    '/api/:path*',
    // Apply to home page for subscription form
    '/',
  ]
}