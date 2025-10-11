import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: 'rgb(239,207,80)',
        charcoal: '#111',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        'sequential': 'sequential 4.8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(1deg)' },
        },
        'neon-pulse': {
          '0%, 100%': { 
            textShadow: '0 0 10px rgb(239,207,80), 0 0 20px rgb(239,207,80), 0 0 30px rgb(239,207,80)',
            opacity: '1'
          },
          '50%': { 
            textShadow: '0 0 5px rgb(239,207,80), 0 0 10px rgb(239,207,80), 0 0 15px rgb(239,207,80)',
            opacity: '0.8'
          },
        },
        sequential: {
          '0%, 83.33%': { opacity: '0.3', transform: 'scale(0.95)' },
          '16.66%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
