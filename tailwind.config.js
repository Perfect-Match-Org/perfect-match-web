const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                pmpink: {
                    500: '#fce5f3',
                },
                pmpink2: {
                    500: '#f7a4af',
                },
                pmred: {
                    500: '#f30020',
                },
                pmblue: {
                    500: '#24438d',
                },
                pmorange: {
                    500: '#FF7E55',
                },
                pmblue2: {
                    500: '#C5E1EF',
                },
            },
            fontFamily: {
                'dela-gothic': ['Dela Gothic One', 'sans-serif'],
                'work-sans': ['Work Sans', 'sans-serif'],
                'press-start': ['"Press Start 2P"', 'sans-serif'],
            },
            keyframes: {
                jiggle: {
                    '0%, 100%': { transform: 'rotate(0deg)' },
                    '25%': { transform: 'rotate(-5deg)' },
                    '75%': { transform: 'rotate(5deg)' },
                },
                flash: {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0 },
                },
                flip: {
                    '0%': { transform: 'rotateY(0)' },
                    '100%': { transform: 'rotateY(0.5turn)' },
                },
                'pulse-glow': {
                    '0%': {
                        boxShadow: '0 0 0 0px rgba(250, 67, 95, 0.7)',
                    },
                    '100%': {
                        boxShadow: '0 0 0 60px rgba(0, 0, 0, 0)',
                    },
                },
            },
            animation: {
                jiggle: 'jiggle 0.3s ease-in-out infinite',
                flash: 'flash 1s steps(1, end) infinite',
                flip: 'flip 1s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 1s infinite alternate',
            },
        },
    },
    plugins: [
        plugin(function ({ addUtilities }) {
            const newUtilities = {
                '.perspective-400': {
                    perspective: '400px',
                },
                '.transform-3d': {
                    'transform-style': 'preserve-3d',
                },
                '.rotate-y-half': {
                    transform: 'rotateY(0.5turn)',
                },
                '.backface-hidden': {
                    'backface-visibility': 'hidden',
                    '-webkit-backface-visibility': 'hidden',
                },
            };
            addUtilities(newUtilities, ['responsive']);
        }),
    ],
};
