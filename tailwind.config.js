/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            colors: {
                teal: {
                    50: '#f0fdfa',
                    100: '#ccfbf1',
                    200: '#99f6e4',
                    300: '#5eead4',
                    400: '#2dd4bf',
                    500: '#14b8a6',
                    600: '#0d9488',
                    700: '#0f766e',
                    800: '#115e59',
                    900: '#134e4a',
                    950: '#042f2e',
                },
            },
            animation: {
                'shimmer': 'shimmer 1.5s infinite',
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'float-delayed': 'float 6s ease-in-out 2s infinite',
                'gradient-shift': 'gradientShift 3s ease infinite',
                'pulse-badge': 'pulseBadge 2s ease-in-out infinite',
                'sparkle': 'sparkle 1.5s ease-in-out infinite',
            },
            keyframes: {
                shimmer: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 0 0 rgba(13, 148, 136, 0.4)' },
                    '50%': { boxShadow: '0 0 20px 10px rgba(13, 148, 136, 0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
                    '50%': { transform: 'translateY(-20px) rotate(5deg)' },
                },
                gradientShift: {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
                pulseBadge: {
                    '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(20, 184, 166, 0.4)' },
                    '50%': { transform: 'scale(1.02)', boxShadow: '0 0 20px 5px rgba(20, 184, 166, 0.2)' },
                },
                sparkle: {
                    '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
                    '50%': { opacity: '1', transform: 'scale(1.2)' },
                },
            },
        },
    },
    plugins: [],
}
