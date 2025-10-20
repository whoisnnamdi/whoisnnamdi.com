jest.mock('../pages/api/ghost_data', () => ({
  __esModule: true,
  getPosts: jest.fn(),
  getPost: jest.fn(),
  getPages: jest.fn(),
  getPage: jest.fn(),
}))

const ghost = require('../pages/api/ghost_data')
const page = require('../pages/[slug].js')

describe('[slug] data functions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('getStaticPaths combines posts and pages, excluding talks', async () => {
    ghost.getPosts.mockResolvedValueOnce([
      { slug: 'post-a' },
      { slug: 'post-b' },
    ])
    ghost.getPages.mockResolvedValueOnce([
      { slug: 'about' },
      { slug: 'talks' },
    ])

    const res = await page.getStaticPaths()
    expect(res.fallback).toBe(false)
    const slugs = res.paths.map((p) => p.params.slug)
    expect(slugs).toEqual(expect.arrayContaining(['post-a', 'post-b', 'about']))
    expect(slugs).not.toContain('talks')
  })

  test('getStaticProps uses getPost when slug is a post', async () => {
    ghost.getPosts.mockResolvedValueOnce([{ slug: 'my-post' }])
    ghost.getPost.mockResolvedValueOnce({ id: '1', slug: 'my-post' })

    const res = await page.getStaticProps({ params: { slug: 'my-post' } })
    expect(ghost.getPost).toHaveBeenCalledWith('my-post')
    expect(res.props.post).toMatchObject({ slug: 'my-post' })
  })

  test('getStaticProps uses getPage when slug is not a post', async () => {
    ghost.getPosts.mockResolvedValueOnce([{ slug: 'other-post' }])
    ghost.getPage.mockResolvedValueOnce({ id: '2', slug: 'about-me' })

    const res = await page.getStaticProps({ params: { slug: 'about-me' } })
    expect(ghost.getPage).toHaveBeenCalledWith('about-me')
    expect(res.props.post).toMatchObject({ slug: 'about-me' })
  })
})
