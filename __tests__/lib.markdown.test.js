/**
 * Tests for markdown preprocessing functions
 *
 * These test the preprocessing regex transformations used before markdown parsing.
 * The functions are duplicated here since they're not exported from lib/markdown.js
 */

describe('markdown preprocessing', () => {
  // Test escapeCurrencyDollars behavior (matches lib/markdown.js implementation)
  describe('currency dollar escaping', () => {
    // Exact copy of the function from lib/markdown.js
    // In replace: \\ = literal \, $$ = literal $, $1 = capture group
    function escapeCurrencyDollars(content) {
      return content.replace(/\$(\d[\d,]*\.?\d*[MKBmkb]?)/g, '\\$$$1')
    }

    test('escapes simple currency amounts', () => {
      expect(escapeCurrencyDollars('$10')).toBe('\\$10')
      expect(escapeCurrencyDollars('$100')).toBe('\\$100')
      expect(escapeCurrencyDollars('$1000')).toBe('\\$1000')
    })

    test('escapes currency with commas', () => {
      expect(escapeCurrencyDollars('$10,000')).toBe('\\$10,000')
      expect(escapeCurrencyDollars('$1,000,000')).toBe('\\$1,000,000')
    })

    test('escapes currency with decimals', () => {
      expect(escapeCurrencyDollars('$5.5')).toBe('\\$5.5')
      expect(escapeCurrencyDollars('$10.99')).toBe('\\$10.99')
      expect(escapeCurrencyDollars('$1,000.50')).toBe('\\$1,000.50')
    })

    test('escapes currency with suffixes (M, K, B)', () => {
      expect(escapeCurrencyDollars('$5M')).toBe('\\$5M')
      expect(escapeCurrencyDollars('$5.5M')).toBe('\\$5.5M')
      expect(escapeCurrencyDollars('$100K')).toBe('\\$100K')
      expect(escapeCurrencyDollars('$2B')).toBe('\\$2B')
      expect(escapeCurrencyDollars('$2.5b')).toBe('\\$2.5b')
    })

    test('does not escape LaTeX math', () => {
      // LaTeX uses $ for math delimiters - these should NOT be escaped
      expect(escapeCurrencyDollars('$x^2$')).toBe('$x^2$')
      expect(escapeCurrencyDollars('$\\sum_{i=1}^n$')).toBe('$\\sum_{i=1}^n$')
    })

    test('handles mixed content', () => {
      const input = 'The price is $100 and the formula is $x^2$'
      const expected = 'The price is \\$100 and the formula is $x^2$'
      expect(escapeCurrencyDollars(input)).toBe(expected)
    })

    test('escapes multiple currency values', () => {
      const input = 'Between $10,000 and $50,000'
      const expected = 'Between \\$10,000 and \\$50,000'
      expect(escapeCurrencyDollars(input)).toBe(expected)
    })
  })

  // Test normalizeDisplayMath behavior (matches lib/markdown.js implementation)
  describe('display math normalization', () => {
    function normalizeDisplayMath(content) {
      // Use $$$$ to output literal $$ in replacement string
      return content.replace(/^\$\$([^$\n]+)\$\$$/gm, '$$$$\n$1\n$$$$')
    }

    test('converts single-line display math to multi-line', () => {
      const input = '$$x^2 + y^2 = z^2$$'
      const expected = '$$\nx^2 + y^2 = z^2\n$$'
      expect(normalizeDisplayMath(input)).toBe(expected)
    })

    test('leaves multi-line display math unchanged', () => {
      const input = '$$\nx^2 + y^2 = z^2\n$$'
      expect(normalizeDisplayMath(input)).toBe(input)
    })

    test('does not affect inline math', () => {
      const input = 'The formula $x^2$ is inline'
      expect(normalizeDisplayMath(input)).toBe(input)
    })

    test('handles multiple display math blocks', () => {
      const input = '$$a + b$$\nSome text\n$$c + d$$'
      const expected = '$$\na + b\n$$\nSome text\n$$\nc + d\n$$'
      expect(normalizeDisplayMath(input)).toBe(expected)
    })
  })
})
