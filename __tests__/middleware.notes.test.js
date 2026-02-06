jest.mock('next/server', () => ({
  NextResponse: {
    next: jest.fn(() => ({ type: 'next' })),
    redirect: jest.fn((url, status) => ({ type: 'redirect', url, status })),
    rewrite: jest.fn((url) => ({ type: 'rewrite', url })),
  },
}))

const { NextResponse } = require('next/server')
const { middleware } = require('../middleware')

function createUrl(pathname, search = '') {
  return {
    pathname,
    search,
    clone() {
      return createUrl(this.pathname, this.search)
    },
  }
}

function createRequest(pathname, search = '') {
  return {
    nextUrl: createUrl(pathname, search),
  }
}

describe('notes middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('redirects /notes to /notes/ with 308', () => {
    const req = createRequest('/notes')

    const result = middleware(req)

    expect(NextResponse.redirect).toHaveBeenCalledTimes(1)
    const [url, status] = NextResponse.redirect.mock.calls[0]
    expect(status).toBe(308)
    expect(url.pathname).toBe('/notes/')
    expect(result).toEqual({ type: 'redirect', url, status })
  })

  test('redirects /notes/foo to /notes/foo/ with 308', () => {
    const req = createRequest('/notes/foo')

    middleware(req)

    expect(NextResponse.redirect).toHaveBeenCalledTimes(1)
    const [url, status] = NextResponse.redirect.mock.calls[0]
    expect(status).toBe(308)
    expect(url.pathname).toBe('/notes/foo/')
  })

  test('rewrites /notes/foo/ to the notes proxy API with encoded path query', () => {
    const req = createRequest('/notes/foo/')

    middleware(req)

    expect(NextResponse.redirect).not.toHaveBeenCalled()
    expect(NextResponse.rewrite).toHaveBeenCalledTimes(1)
    const [url] = NextResponse.rewrite.mock.calls[0]
    expect(url.pathname).toBe('/api/notes-proxy')
    expect(url.search).toBe(`?path=${encodeURIComponent('/notes/foo/')}`)
  })

  test('passes through static files under /notes without redirect or rewrite', () => {
    const req = createRequest('/notes/styles.css')

    const result = middleware(req)

    expect(NextResponse.next).toHaveBeenCalledTimes(1)
    expect(NextResponse.redirect).not.toHaveBeenCalled()
    expect(NextResponse.rewrite).not.toHaveBeenCalled()
    expect(result).toEqual({ type: 'next' })
  })
})
