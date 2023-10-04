/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}', './index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            backgroundColor: {
                dark: '#1f2937',
                light: '#fff',
                'dark-header': '#1f2937',
                'light-header': '#fff',
                'bg-light-hover': 'rgba(0,0,0,0.1)',
                'bg-dark-hover': 'rgba(255,255,255,0.1)',
                'bg-light-menu': 'rgba(255,255,255,0.1)',
                'bg-dark-menu': 'rgba(0,0,0,0.1)',
                primary: 'rgba(247, 101, 163, 0.1)',
                'btn-primary': 'rgba(247, 101, 163, 0.5)',
                hover: 'rgba(247, 101, 163,0.1)',
            },
            textColor: {
                dark: '#fff',
                light: '#000',
                hover: '#f765a3',
            },
            height: {
                header: '3rem',
                logo: '3rem',
            },
            width: {
                logo: '4rem',
            },
            borderColor: {
                'light-header': 'rgba(255,255,255,0.1)',
                'dark-header': 'rgba(0,0,0,0.1)',
                header: 'rgba(247, 101, 163, 0.1)',
            },
            margin: {
                header: '3rem',
            },
            top: {
                header: '3rem',
            },
        },
    },
    plugins: [require('flowbite/plugin')],
};
