import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                gold: {
                    50: '#fff9e6',
                    100: '#fff0b3',
                    200: '#ffe680',
                    300: '#ffdd4d',
                    400: '#ffd31a',
                    500: '#e6b800',
                    600: '#b38f00',
                    700: '#806600',
                    800: '#4d3d00',
                    900: '#1a1400',
                },
                navy: {
                    50: '#e6f0ff',
                    100: '#b3d1ff',
                    200: '#80b3ff',
                    300: '#4d94ff',
                    400: '#1a75ff',
                    500: '#0052cc',
                    600: '#003d99',
                    700: '#002966',
                    800: '#001433',
                    900: '#000a1a',
                },
                cream: {
                    50: '#fffef5',
                    100: '#fffce6',
                    200: '#fff9cc',
                    300: '#fff6b3',
                    400: '#fff399',
                    500: '#ffef80',
                    600: '#ccbf66',
                    700: '#998f4d',
                    800: '#666033',
                    900: '#33301a',
                },
            },
            fontFamily: {
                serif: ['var(--font-playfair-display)', 'serif'],
                script: ['var(--font-great-vibes)', 'cursive'],
                elegant: ['var(--font-cormorant-garamond)', 'serif'],
                sans: ['var(--font-inter)', 'sans-serif'],
                'pinyon-script': ['var(--font-pinyon-script)', 'cursive'],
                'dancing-script': ['var(--font-dancing-script)', 'cursive'],
                'alex-brush': ['var(--font-alex-brush)', 'cursive'], // Add Pinyon Script
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'fade-in': 'fadeIn 1s ease-in',
                'slide-up': 'slideUp 0.8s ease-out',
                'zoom-in': 'zoomIn 0.6s ease-out',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 5px rgba(230, 184, 0, 0.5)' },
                    '100%': { boxShadow: '0 0 20px rgba(230, 184, 0, 0.8)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(50px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                zoomIn: {
                    '0%': { transform: 'scale(0.8)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
};

export default config;
