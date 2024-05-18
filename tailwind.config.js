/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'purple': {
          DEFAULT : '#665BE3',
          800 : '#3C1F63'

        },
        'yellow' : {
          DEFAULT : '#CBB43B',
          800 : '#EFDE68',
        },
        'gray' : {
          200 : '#FAFAFA',
          300 : '#DADADA',
          400 : '#D9D9D9',
          500 : '#747474',
          600 : '#646464'
        },
        'black': {
          DEFAULT : '#252628',
          800 : '#1E1F21'
        },
        'pink' : {
          400 : '#EC6C6C',
          600 : '#B74C85'
        },
      }
    },
  },
  plugins: [],
}