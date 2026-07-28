/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#0B0F19',
          card: '#161F30',
          border: '#2A3C58',
          textMuted: '#94A3B8',
          primary: '#3B82F6', // Neon blue
          primaryHover: '#2563EB',
          accent: '#10B981', // Neon green
          accentHover: '#059669',
          danger: '#EF4444', // Cyber red
          warning: '#F59E0B', // Cyber Amber
          purple: '#8B5CF6' // Cyber Purple
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'cyber-neon': '0 0 15px rgba(59, 130, 246, 0.4)',
        'cyber-success': '0 0 15px rgba(16, 185, 129, 0.4)',
        'cyber-purple': '0 0 15px rgba(139, 92, 246, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
