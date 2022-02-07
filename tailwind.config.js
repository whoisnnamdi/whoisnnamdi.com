module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            table: {
              width: '',
              'margin-left': 'auto',
              'margin-right': 'auto'
            }
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
