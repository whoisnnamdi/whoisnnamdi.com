module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        primary: '#E24B2D',
        accent: '#E24B2D',
        paper: '#F7F4EF',
        ink: '#111111',
        blueprint: '#1E3AEB',
        line: '#E2DDD4',
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            table: {
              width: '',
              'margin-left': 'auto',
              'margin-right': 'auto'
            },
            blockquote: {
              borderLeftColor: '#E85D04',
              backgroundColor: '#FAFAFA',
              padding: '1rem 1.5rem',
              fontStyle: 'normal',
              quotes: 'none',
            },
            'blockquote p:first-of-type::before': {
              content: 'none',
            },
            'blockquote p:last-of-type::after': {
              content: 'none',
            },
          }
        }
      }
    },
  },
  variants: {
    extend: {
      scale: ['hover']
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
