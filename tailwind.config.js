/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', '!./src/**/*.tdc.tsx'],
  theme: {
    extend: {
      fontWeight: {
        normal: '500',
        label: '600'
      },
      colors: {
        'primary-color': '#00163a',
        'primary-color-hover': '#48bae0',
        'danger-color': '#D1293D',
        'danger-color-hover': '#BA1B2E',
        'danger-color-disabled': '#F76F7F',

        'color-border': '#d2ddec',
        'grey-color': '#868686',
        'grey-bg': '#f5f5f5',

        'free-shipping-bg': '#ffc206'
      },
      flex: {
        2: '2 2 0%',
        3: '3 3 0%',
        4: '4 4 0%',
        5: '5 5 0%',
        6: '6 6 0%',
        7: '7 7 0%',
        8: '8 8 0%',
        9: '9 9 0%'
      },
      borderRadius: {
        '4xl': '2rem'
      },
      container: {
        center: true,
        screens: {
          sm: '100vw',
          md: '100vw',
          lg: '100vw',
          xl: '100vw',
          '2xl': '100vw'
        }
      }
    },
    screens: {
      phone: { max: '767px' },
      tablet: { min: '768px', max: '1024px' },
      desktop: { min: '1025' },
      mobileTablet: { max: '1023px' }
    }
  },
  plugins: [],
  important: true
};
