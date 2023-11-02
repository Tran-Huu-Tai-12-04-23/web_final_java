/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            backgroundColor: {
                dark: '#1f2937',
                'dark-second': '#111422',
                light: '#fff',
                'light-second': '#F1F6F9',
                'dark-header': '#1f2937',
                'light-header': '#fff',
                'bg-light-hover': 'rgba(0,0,0,0.1)',
                'bg-dark-hover': 'rgba(255,255,255,0.1)',
                'bg-light-menu': 'rgba(255,255,255,0.1)',
                'bg-dark-menu': 'rgba(0,0,0,0.1)',
                primary: 'rgba(247, 101, 163, 0.8)',
                'btn-primary': 'rgb(238, 124, 153)',
                'btn-second': 'rgba(238, 124, 153, 0.1)',
                hover: 'rgba(247, 101, 163,0.1)',
                sale: 'rgba(245, 110, 35,0.3)',
                second: '#ffe5f1',
                'light-tiny': 'rgba(255, 255, 255, 0.1)',
                'dark-tiny': 'rgb(31, 41, 57)',
                submit: 'rgb(27, 166, 79)',
            },
            textColor: {
                dark: '#fff',
                light: '#000',
                hover: '#f765a3',
                sale: 'rgba(245, 110, 35,1)',
                primary: 'rgb(251, 111, 146)',
                second: '#757575',
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
                'dark-tiny': 'rgb(255,255,255,0.1)',
                'light-tiny': 'rgb(0,0,0,0.1)',
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
