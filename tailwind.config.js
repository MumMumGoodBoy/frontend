/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', join(__dirname, './src/**/*.{js,ts,jsx,tsx}')],
  theme: {
    extend: {
      transitionTimingFunction: {
        'minor-spring': 'cubic-bezier(0.18,0.89,0.82,1.04)',
      },
      keyframes: {
        'reveal-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(80%)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'reveal-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-80%)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'content-blur': {
          '0%': {
            filter: 'blur(0.3rem)',
          },
          '100%': {
            filter: 'blur(0)',
          },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in',
      },
      fontSize: {
        h1: ['var(--font-size-h1)', 'var(--line-height-h1)'],
        h2: ['var(--font-size-h2)', 'var(--line-height-h2)'],
        h3: ['var(--font-size-h3)', 'var(--line-height-h3)'],
        h4: ['var(--font-size-h4)', 'var(--line-height-h4)'],
        h5: ['var(--font-size-h5)', 'var(--line-height-h5)'],
        h6: ['var(--font-size-h6)', 'var(--line-height-h6)'],
        tiny: ['var(--font-size-tiny)', 'var(--line-height-tiny)'],
        body1: ['var(--font-size-body1)', 'var(--line-height-body1)'],
        body2: ['var(--font-size-body2)', 'var(--line-height-body2)'],
        body3: ['var(--font-size-body3)', 'var(--line-height-body3)'],
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        looped: ['var(--font-looped)'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    ({ addUtilities }) => {
      addUtilities({
        '.h1': {
          '@apply text-h1 font-sans': {},
        },
        '.h2': {
          '@apply text-h2 font-sans': {},
        },
        '.h3': {
          '@apply text-h3 font-sans': {},
        },
        '.h4': {
          '@apply text-h4 font-sans': {},
        },
        '.h5': {
          '@apply text-h5 font-sans': {},
        },
        '.h6': {
          '@apply text-h6 font-sans': {},
        },
        '.tiny': {
          '@apply text-tiny font-sans': {},
        },
        '.body1': {
          '@apply text-body1 font-looped': {},
        },
        '.body2': {
          '@apply text-body2 font-looped': {},
        },
        '.body3': {
          '@apply text-body3 font-looped': {},
        },
      });
    },
  ],
};
