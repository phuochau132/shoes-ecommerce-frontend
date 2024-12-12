/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', '!./src/**/*.tdc.tsx'],
  theme: {
    extend: {
      fontWeight: {
        normal: '400',
        label: '700'
      },
      animation: {
        slide: 'slide 0.2s ease-in-out'
      },
      keyframes: {
        slide: {
          '0%': {
            opacity: 0,
            transform: 'translateY(-20px)'
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)'
          }
        }
      },
      colors: {
        'primary-color': '#00163a',
        'primary-color-hover': '#48bae0',
        'danger-color': '#D1293D',
        'danger-color-hover': '#BA1B2E',
        'danger-color-disabled': '#F76F7F',

        'color-border': '#d2ddec',
        'grey-color': 'rgba(17, 17, 17, 0.55)',
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
      phoneUp: { min: '768px' },
      tablet: { min: '768px', max: '1024px' },
      desktop: { min: '1025' },
      mobileTablet: { max: '1023px' },
      tabletUp: { min: '768px' }
    },
    boxShadow: {
      custom: ' 0 0 40px 0 rgba(0,0,0,.45);'
    }
  },
  plugins: [],
  important: true
};
