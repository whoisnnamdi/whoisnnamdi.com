import React from 'react'
import { render } from '@testing-library/react'
import LinkConverter from '../components/linkconverter'

describe('LinkConverter', () => {
  test('rewrites internal whoisnnamdi.com links to relative paths', async () => {
    const content = `<a href="https://whoisnnamdi.com/abc/">ABC</a>`
    const { container } = render(<LinkConverter content={content} />)

    // allow effect to run
    await new Promise((r) => setTimeout(r, 0))

    const a = container.querySelector('a')
    expect(a.getAttribute('href')).toBe('/abc/')
  })

  test('leaves external links unchanged', async () => {
    const content = `<a href="https://example.com/page">External</a>`
    const { container } = render(<LinkConverter content={content} />)

    await new Promise((r) => setTimeout(r, 0))

    const a = container.querySelector('a')
    expect(a.getAttribute('href')).toBe('https://example.com/page')
  })

  test('renders content via dangerouslySetInnerHTML', () => {
    const content = `<p>Hello <strong>world</strong></p>`
    const { container } = render(<LinkConverter content={content} />)

    expect(container.querySelector('p')).toBeTruthy()
    expect(container.querySelector('strong').textContent).toBe('world')
  })
})
