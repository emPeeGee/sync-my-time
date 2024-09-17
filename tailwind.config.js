/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'flex',
    'h-6',
    'w-6',
    'items-center',
    'justify-center',
    'rounded-full',
    'bg-indigo-600',
    'font-semibold',
    'text-white',
  ],
};
