import { NextResponse } from 'next/server'

export function middleware(request) {
  const url = request.nextUrl.clone()
  const { pathname } = url

  if (!pathname.startsWith('/notes')) {
    return NextResponse.next()
  }

  // If it's a file under /notes (has a dot), do nothing
  if (pathname.includes('.')) {
    return NextResponse.next()
  }

  // Redirect /notes -> /notes/ explicitly
  if (pathname === '/notes') {
    url.pathname = '/notes/'
  } else {
    url.pathname = `${pathname}/`
  }
  // If the path did not have a trailing slash, redirect to the slash version
  if (!pathname.endsWith('/')) {
    return NextResponse.redirect(url, 308)
  }

  // For directory-like HTML under /notes (ending with slash), rewrite to API proxy for injection
  const rewriteUrl = request.nextUrl.clone()
  rewriteUrl.pathname = '/api/notes-proxy'
  rewriteUrl.search = `?path=${encodeURIComponent(pathname)}`
  return NextResponse.rewrite(rewriteUrl)
}

export const config = {
  matcher: ['/notes/:path*'],
}
