import { NextResponse } from 'next/server'

export function middleware(request) {
  const url = request.nextUrl.clone()
  const { pathname } = url

  // Only handle /notes routes that lack a trailing slash
  if (!pathname.startsWith('/notes')) {
    return NextResponse.next()
  }

  // Leave asset/file requests (contain a dot) and trailing slash paths alone
  if (pathname.endsWith('/') || pathname.includes('.')) {
    return NextResponse.next()
  }

  // Redirect /notes -> /notes/ explicitly
  if (pathname === '/notes') {
    url.pathname = '/notes/'
  } else {
    url.pathname = `${pathname}/`
  }

  return NextResponse.redirect(url, 308)
}

export const config = {
  matcher: ['/notes/:path*'],
}
