/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: { colors: { espresso: '#241912', mocha: '#5B3D2B', cream: '#F7F1E8', sand: '#E9DDCD', caramel: '#B98252' }, fontFamily: { display: ['Playfair Display', 'serif'], sans: ['DM Sans', 'sans-serif'] } } },
  plugins: [],
}