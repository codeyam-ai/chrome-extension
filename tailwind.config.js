/* eslint @typescript-eslint/no-var-requires: "off" */

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
                'weight-ethos-semibold-body': '600',
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
            boxShadow: {
                // ==========
                // Shadow
                // ==========

                'ethos-box-shadow': '0px 4px 12px rgba(0, 0, 0, 0.09)',
                'ethos-hovering-element-box-shadow':
                    '0px 2px 8px rgba(0, 0, 0, 0.1)',

                // ==========
                // Stroke
                // ==========

                // Light mode
                'ethos-light-stroke-focused':
                    '0px 1px 2px rgba(0, 0, 0, 0.05), 0px 0px 0px 3px #EDE9FE',
                // Dark mode
                'ethos-dark-stroke-focused':
                    '0px 1px 2px rgba(0, 0, 0, 0.05), 0px 0px 0px 3px #374151',
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
                'ethos-light-text-stroke': 'rgba(0, 0, 0, 0.08)',

                // Primary
                'ethos-light-primary-light': '#6D28D9',

                // Primary translucent
                'ethos-light-primary-light-translucent': '#6D28D90F',

                // Feedback
                'ethos-light-green': '#16A349',
                'ethos-light-red': '#EF4444',

                // Input
                'ethos-input-background': '#F2F2F2',

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
                'ethos-dark-text-stroke': 'rgba(255, 255, 255, 0.12)',

                // Primary
                'ethos-dark-primary-dark': '#9C78F7',
                'ethos-dark-primary-light': '#6D28D9',

                // Primary translucent
                'ethos-dark-primary-light-translucent': '#6D28D90F',

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
