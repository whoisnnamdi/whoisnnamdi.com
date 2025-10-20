import React from 'react'
import { render } from '@testing-library/react'
import LinkConverter from '../components/linkconverter'

describe('LinkConverter', () => {
  beforeAll(() => {
    process.env.NEXT_PUBLIC_HOST_URL = 'https://whoisnnamdi.com'
    process.env.NEXT_PUBLIC_HOST_IP = '138.68.29.23'
  })

  test('rewrites internal links and normalizes Ghost image domains', async () => {
    const content = `
      <a href="https://whoisnnamdi.com/abc/">ABC</a>
      <img src="http://ghost.example.com/content/images/xyz.png" srcset="http://ghost.example.com/content/images/xyz.png 2x" />
    `
    const { container } = render(<LinkConverter content={content} />)

    // allow effect to run
    await new Promise((r) => setTimeout(r, 0))

    const a = container.querySelector('a')
    const img = container.querySelector('img')
    expect(a.getAttribute('href')).toContain('/abc/')
    expect(img.getAttribute('src')).toContain('https://nnamdi.net')
    expect(img.getAttribute('srcset')).toBe('')
  })
})
