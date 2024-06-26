/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
        'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
        'node_modules/flowbite/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                main: '#040073',
                main2: '#2840d9'
            },
        },
    },
    plugins: [require('flowbite/plugin')],
}
