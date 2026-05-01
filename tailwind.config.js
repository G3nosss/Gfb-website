/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // GF&B Brand
        'gfb-dark': '#0D1F12',
        'gfb-charcoal': '#1A1A1A',
        'gfb-gold': '#C9922A',
        'gfb-gold-light': '#F0C060',
        'gfb-cream': '#FDF6EC',
        // Arunas Brand
        'arunas-orange': '#E8650A',
        'arunas-red': '#C0281A',
        'arunas-yellow': '#F5C200',
        'arunas-cream': '#FFF8EE',
        'arunas-brown': '#2C1A0E',
        // Shree Kunj Brand
        'sk-dark': '#0B0B0F',
        'sk-bg': '#0F0F14',
        'sk-gold': '#C9922A',
        'sk-gold-light': '#F0C060',
        'sk-rose': '#B5755A',
        'sk-ivory': '#F5EDD6',
      },
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'dm': ['"DM Sans"', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'nunito': ['Nunito', 'sans-serif'],
        'cormorant': ['"Cormorant Garamond"', 'serif'],
        'jost': ['Jost', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'float': 'float 6s ease-in-out infinite',
        'ticker': 'ticker 20s linear infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'pouchwiggle': 'pouchwiggle 1.2s ease forwards',
        'gold-particle': 'goldParticle 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        pouchwiggle: {
          '0%':   { transform: 'perspective(800px) rotateY(-60deg) rotateX(5deg)', opacity: '0' },
          '60%':  { transform: 'perspective(800px) rotateY(10deg) rotateX(-2deg)', opacity: '1' },
          '80%':  { transform: 'perspective(800px) rotateY(-5deg) rotateX(1deg)' },
          '100%': { transform: 'perspective(800px) rotateY(0deg) rotateX(0deg)' },
        },
        goldParticle: {
          '0%':   { transform: 'translateY(100%) translateX(0px)', opacity: '0' },
          '10%':  { opacity: '1' },
          '90%':  { opacity: '1' },
          '100%': { transform: 'translateY(-100px) translateX(20px)', opacity: '0' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9922A, #F0C060)',
        'arunas-gradient': 'linear-gradient(135deg, #E8650A, #F5C200)',
        'sk-radial': 'radial-gradient(ellipse at center, #1a1200 0%, #0B0B0F 70%)',
        'tea-garden': 'linear-gradient(180deg, #F0C060 0%, #8BA888 30%, #2D5016 70%, #0D1F12 100%)',
      },
    },
  },
  plugins: [],
}
