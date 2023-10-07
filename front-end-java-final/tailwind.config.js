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
                primary: 'rgba(247, 101, 163, 0.8)',
                'btn-primary': 'rgb(238, 124, 153)',
                hover: 'rgba(247, 101, 163,0.1)',
                sale: 'rgba(245, 110, 35,0.3)',
                second: '#ffe5f1',
            },
            textColor: {
                dark: '#fff',
                light: '#000',
                hover: '#f765a3',
                sale: 'rgba(245, 110, 35,1)',
                primary: 'rgb(251, 111, 146)',
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
                primary: 'rgb(251, 111, 146)',
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
