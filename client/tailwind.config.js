/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                forest: {
                    900: '#07120a', // deep forest black-green
                    800: '#0f2015',
                    700: '#153018',
                },
                leaf: {
                    500: '#86c563', // positive signals
                },
                harvest: {
                    500: '#f0c040', // warnings/predictions
                },
                danger: {
                    500: '#ff6b6b', // sell now / risk
                },
                info: {
                    500: '#64b5f6', // loan/storage
                }
            },
            fontFamily: {
                heading: ['Georgia', 'Playfair Display', 'serif'],
                mono: ['JetBrains Mono', 'Courier', 'monospace'],
                body: ['Inter', 'system-ui', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
