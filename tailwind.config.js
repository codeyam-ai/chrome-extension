const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
            fontWeight: {
                'weight-ethos-title': '600',
                'weight-ethos-header': '600',
                'weight-ethos-subheader': '600',
                'weight-ethos-body-large': '400',
                'weight-ethos-body': '400',
            },
            fontSize: {
                'size-ethos-title': '24px',
                'size-ethos-header': '20px',
                'size-ethos-subheader': '18px',
                'size-ethos-body-large': '16px',
                'size-ethos-body': '14px',
            },
            lineHeight: {
                'line-height-ethos-title': '32px',
                'line-height-ethos-header': '28px',
                'line-height-ethos-subheader': '28px',
                'line-height-ethos-body-large': '24px',
                'line-height-ethos-body': '20px',
            },
            letterSpacing: {
                'letter-spacing-ethos-title': '-0.01em',
                'letter-spacing-ethos-header': '-0.01em',
                'letter-spacing-ethos-subheader': '',
                'letter-spacing-ethos-body-large': '',
                'letter-spacing-ethos-body': '',
            },
            colors: {
                // ==========
                // Light mode
                // ==========

                // Background
                'ethos-light-background-default': '#FFFFFF',
                'ethos-light-background-light': '#F3F4F6',
                'ethos-light-background-accent': '#EDE9FE',

                // Text and stroke
                'ethos-light-text-default': '#000000',
                'ethos-light-text-medium': '#74777C',
                'ethos-light-text-stroke': '#E5E7EB',

                // Primary
                'ethos-light-primary': '#6D28D9',
                'ethos-light-primary-light': '#8B5CF6',

                // Feedback
                'ethos-light-green': '#16A349',
                'ethos-light-red': '#EF4444',

                // ==========
                // Dark mode
                // ==========

                // Background
                'ethos-dark-background-default': '#1F2937',
                'ethos-dark-background-light': '#374151',
                'ethos-dark-background-accent': '#374151',

                // Text and stroke
                'ethos-dark-text-default': '#FFFFFF',
                'ethos-dark-text-medium': '#9CA3AF',
                'ethos-dark-text-stroke': '#4B5563',

                // Primary
                'ethos-dark-primary': '#6D28D9',
                'ethos-dark-primary-light': '#8B5CF6',

                // Feedback
                'ethos-dark-green': '#16A349',
                'ethos-dark-red': '#EF4444',

                // FIX:::
                'ethos-primary-dark': '#6b21a8',
                'ethos-light-secondary': '#e9d5ff',
                'ethos-dark-secondary': '#d8b4fe',
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
