jest.mock('../lib/content', () => ({
  __esModule: true,
  getPosts: jest.fn(),
  getPost: jest.fn(),
  getPages: jest.fn(),
  getPage: jest.fn(),
}))

const content = require('../lib/content')
const page = require('../pages/[slug].js')

describe('[slug] data functions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('getStaticPaths combines posts and pages, excluding talks', async () => {
    content.getPosts.mockResolvedValueOnce([
      { slug: 'post-a' },
      { slug: 'post-b' },
    ])
    content.getPages.mockResolvedValueOnce([
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
    content.getPosts.mockResolvedValueOnce([{ slug: 'my-post' }])
    content.getPost.mockResolvedValueOnce({ id: '1', slug: 'my-post', html: '<p>hello</p>' })

    const res = await page.getStaticProps({ params: { slug: 'my-post' } })
    expect(content.getPost).toHaveBeenCalledWith('my-post')
    expect(res.props.post).toMatchObject({ slug: 'my-post' })
  })

  test('getStaticProps uses getPage when slug is not a post', async () => {
    content.getPosts.mockResolvedValueOnce([{ slug: 'other-post' }])
    content.getPage.mockResolvedValueOnce({ id: '2', slug: 'about-me', html: '<p>about</p>' })

    const res = await page.getStaticProps({ params: { slug: 'about-me' } })
    expect(content.getPage).toHaveBeenCalledWith('about-me')
    expect(res.props.post).toMatchObject({ slug: 'about-me' })
  })
})
