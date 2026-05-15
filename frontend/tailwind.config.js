/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
        'india-green':  { DEFAULT: '#1B5E3A', light: '#2E8B57', dark: '#0F3D24' },
        'saffron':      { DEFAULT: '#C9963F', light: '#D4A843', dark: '#9A7430' },
        'med-teal':     { DEFAULT: '#0D9488', light: '#14B8A6' },
        'med-blue':     { DEFAULT: '#1E40AF', light: '#3B82F6' },
        'cream':        '#F6F5F2',
        'gold':         '#C9963F',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        inter:   ['Inter', 'sans-serif'],
      },
  		keyframes: {
  			'accordion-down': {
  				from: { height: '0' },
  				to:   { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to:   { height: '0' }
  			},
        'blob': {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '25%':     { transform: 'translate(30px,-25px) scale(1.08)' },
          '50%':     { transform: 'translate(-20px,30px) scale(0.94)' },
          '75%':     { transform: 'translate(25px,20px) scale(1.04)' },
        },
        'float': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-14px)' },
        },
        'gradient-shift': {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'pulse-ring': {
          '0%':   { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(40px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        'wave': {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'ticker': {
          '0%':   { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        'bounce-in': {
          '0%':   { transform: 'scale(0.3)', opacity: '0' },
          '50%':  { transform: 'scale(1.05)' },
          '70%':  { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
  		},
  		animation: {
  			'accordion-down':  'accordion-down 0.2s ease-out',
  			'accordion-up':    'accordion-up 0.2s ease-out',
        'blob':            'blob 9s ease-in-out infinite',
        'blob-delay':      'blob 12s ease-in-out infinite -4s',
        'blob-delay2':     'blob 15s ease-in-out infinite -7s',
        'float':           'float 4s ease-in-out infinite',
        'float-delay':     'float 5s ease-in-out infinite -2s',
        'gradient-shift':  'gradient-shift 8s ease infinite',
        'pulse-ring':      'pulse-ring 1.8s cubic-bezier(0.215,0.61,0.355,1) infinite',
        'fade-in-up':      'fade-in-up 0.7s ease-out forwards',
        'fade-in':         'fade-in 0.6s ease-out forwards',
        'slide-in-right':  'slide-in-right 0.7s ease-out forwards',
        'wave':            'wave 22s linear infinite',
        'ticker':          'ticker 30s linear infinite',
        'spin-slow':       'spin-slow 8s linear infinite',
        'bounce-in':       'bounce-in 0.6s ease-out forwards',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
