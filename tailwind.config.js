/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      colors: {
        base: '#060B18',
        sidebar: '#0B1220',
        card: '#111827',
        border: {
          DEFAULT: 'rgba(255,255,255,0.12)',
          strong: 'rgba(59,130,246,0.35)',
        },
        primary: {
          DEFAULT: '#3B82F6',
          hover: '#2563EB',
        },
        accent2: '#06B6D4',
        accent3: '#8B5CF6',
        muted: '#94A3B8',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(59,130,246,0.18), 0 8px 24px -4px rgba(59,130,246,0.25)',
        'glow-lg': '0 0 0 1px rgba(59,130,246,0.25), 0 16px 40px -8px rgba(59,130,246,0.35)',
        card: '0 4px 16px -4px rgba(0,0,0,0.4)',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
};
