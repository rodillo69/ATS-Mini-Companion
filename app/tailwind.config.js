/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        icom: {
          bg: '#0a0e1a',
          panel: '#141824',
          display: '#0d1117',
          accent: '#00d4ff',
          'accent-dim': '#0099cc',
          green: '#00ff88',
          amber: '#ffaa00',
          red: '#ff4444',
          text: '#e8f0ff',
          'text-dim': '#8891a5',
        }
      },
      fontFamily: {
        'digital': ['Orbitron', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'icom': '0 0 20px rgba(0, 212, 255, 0.3)',
        'icom-strong': '0 0 30px rgba(0, 212, 255, 0.5)',
        'display': 'inset 0 2px 10px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
