/** @type {import('tailwindcss').Config} */
export default {
  // Enable class-based dark mode (toggled via `dark` class on <html>)
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Comprehensive color palette for both light and dark themes
      colors: {
        // Dark theme colors
        'navy-dark': '#121212',
        'navy-card': '#112A52',
        'cyan-primary': '#3AA0FF',
        'cyan-accent': '#35E0C5',
        'text-light': '#E6F0FF',
        'neon-blue': '#00D4FF',
        'electric-blue': '#0099FF',
        
        // Light theme colors
        'white-primary': '#ffffff',
        'gray-light': '#f8fafc',
        'gray-card': '#ffffff',
        'gray-border': '#e2e8f0',
        'text-primary': '#1e293b',
        'text-secondary': '#64748b',
        'blue-primary': '#3b82f6',
        'blue-accent': '#06b6d4',
        'blue-light': '#dbeafe',
        
        // Semantic colors for both themes
        'success': '#10b981',
        'warning': '#f59e0b',
        'error': '#ef4444',
        'info': '#3b82f6',
      },
      // Custom animation for modal entrance and UI effects
      animation: {
        'fade-in':    'fadeIn 0.15s ease-out',
        'slide-up':   'slideUp 0.2s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'slide-in':   'slideIn 0.3s ease-out',
        'theme-switch': 'themeSwitch 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn:  { from: { opacity: '0' },                          to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideIn: { from: { opacity: '0', transform: 'translateX(-20px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        pulseGlow: { 
          '0%, 100%': { boxShadow: '0 0 20px rgba(58, 160, 255, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(58, 160, 255, 0.6)' }
        },
        themeSwitch: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(180deg)' }
        },
      },
      // Glassmorphism backdrop blur and border utilities
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        // Dark theme gradients
        'gradient-dark': 'linear-gradient(135deg, #121212 0%, #1A1A1A 50%, #0F0F0F 100%)',
        'neon-gradient': 'linear-gradient(135deg, #3AA0FF 0%, #35E0C5 100%)',
        'card-gradient-dark': 'linear-gradient(135deg, rgba(17, 42, 82, 0.8) 0%, rgba(18, 18, 18, 0.9) 100%)',
        
        // Light theme gradients
        'gradient-light': 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
        'blue-gradient': 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
        'card-gradient-light': 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.95) 100%)',
      },
      boxShadow: {
        // Dark theme shadows
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'neon': '0 0 20px rgba(58, 160, 255, 0.5), 0 0 40px rgba(58, 160, 255, 0.3)',
        'card-dark': '0 4px 20px rgba(0, 0, 0, 0.4)',
        
        // Light theme shadows
        'card-light': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'card-hover-light': '0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
        'soft': '0 2px 8px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
};
