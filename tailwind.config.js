module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // purple-700 is #7e22ce
                'ethos-primary': '#7e22ce',
                // purple-800 is #6b21a8
                'ethos-primary-dark': '#6b21a8',
                // purple-200 is #e9d5ff
                'ethos-secondary': '#e9d5ff',
                // purple-300 is #d8b4fe
                'ethos-secondary-dark': '#d8b4fe',
                'ethos-background': '#FFFFFF',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
    variants: {},
    corePlugins: {
        preflight: true,
    },
};
