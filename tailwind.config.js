module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        bike: `bike 10s linear infinite`,
      },
      keyframes: {
        bike: {
          '0%': {
            transform: 'translate(0vw, 0vh)',
          },
          '100%': {
            transform: 'translate(150vw, -18vw)',
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
