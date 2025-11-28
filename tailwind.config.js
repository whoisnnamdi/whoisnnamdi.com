const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Semantic colors using CSS variables
        background: 'var(--bg-primary)',
        surface: 'var(--bg-surface)',
        elevated: 'var(--bg-elevated)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        coral: {
          DEFAULT: 'var(--accent-coral)',
          dark: '#f07178',
          light: '#e05560',
        },
        cyan: {
          DEFAULT: 'var(--accent-cyan)',
          dark: '#62d6e8',
          light: '#0891b2',
        },
        border: 'var(--border)',
      },
      fontFamily: {
        serif: ['Instrument Serif', ...fontFamily.serif],
        sans: ['IBM Plex Sans', ...fontFamily.sans],
        mono: ['IBM Plex Mono', ...fontFamily.mono],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--text-primary)',
            '--tw-prose-headings': 'var(--text-primary)',
            '--tw-prose-lead': 'var(--text-secondary)',
            '--tw-prose-links': 'var(--accent-coral)',
            '--tw-prose-bold': 'var(--text-primary)',
            '--tw-prose-counters': 'var(--text-secondary)',
            '--tw-prose-bullets': 'var(--text-tertiary)',
            '--tw-prose-hr': 'var(--border)',
            '--tw-prose-quotes': 'var(--text-primary)',
            '--tw-prose-quote-borders': 'var(--accent-coral)',
            '--tw-prose-captions': 'var(--text-secondary)',
            '--tw-prose-code': 'var(--text-primary)',
            '--tw-prose-pre-code': 'var(--text-primary)',
            '--tw-prose-pre-bg': 'var(--bg-elevated)',
            '--tw-prose-th-borders': 'var(--border)',
            '--tw-prose-td-borders': 'var(--border)',
            table: {
              width: '',
              'margin-left': 'auto',
              'margin-right': 'auto'
            },
            a: {
              textDecoration: 'none',
              borderBottom: '1px solid var(--accent-coral)',
              transition: 'border-color 150ms ease, opacity 150ms ease',
              '&:hover': {
                opacity: '0.8',
              },
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            code: {
              fontFamily: 'IBM Plex Mono, monospace',
              backgroundColor: 'var(--bg-elevated)',
              padding: '0.125rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            pre: {
              backgroundColor: 'var(--bg-elevated)',
              borderRadius: '0.5rem',
            },
            blockquote: {
              fontStyle: 'normal',
              borderLeftColor: 'var(--accent-coral)',
            },
            h1: {
              fontFamily: 'Instrument Serif, serif',
              fontWeight: '400',
            },
            h2: {
              fontFamily: 'Instrument Serif, serif',
              fontWeight: '400',
            },
            h3: {
              fontFamily: 'Instrument Serif, serif',
              fontWeight: '400',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
