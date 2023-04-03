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
                'weight-ethos-jumbo-title': '600',
                'weight-ethos-title': '600',
                'weight-ethos-header': '600',
                'weight-ethos-subheader': '600',
                'weight-ethos-body-large': '400',
                'weight-ethos-semibold-body': '600',
                'weight-ethos-body': '400',
            },
            fontSize: {
                'size-ethos-ultra-jumbo': '44px',
                'size-ethos-jumbo-title': '32px',
                'size-ethos-title': '24px',
                'size-ethos-header': '20px',
                'size-ethos-subheader': '18px',
                'size-ethos-body-large': '16px',
                'size-ethos-body': '14px',
                'size-ethos-small': '12px',
            },
            lineHeight: {
                'line-height-ethos-ultra-jumbo': '55px',
                'line-height-ethos-jumbo-title': '40px',
                'line-height-ethos-title': '32px',
                'line-height-ethos-header': '28px',
                'line-height-ethos-subheader': '28px',
                'line-height-ethos-body-large': '24px',
                'line-height-ethos-body': '20px',
            },
            letterSpacing: {
                'letter-spacing-ethos-jumbo-title': '-0.01em',
                'letter-spacing-ethos-title': '-0.01em',
                'letter-spacing-ethos-header': '-0.01em',
                'letter-spacing-ethos-subheader': '',
                'letter-spacing-ethos-body-large': '',
                'letter-spacing-ethos-body': '',
            },
            borderRadius: {
                'ethos-large-images': '1.25em',
            },
            dropShadow: {
                'ethos-lg-image': '0px 8px 24px rgba(0, 0, 0, 0.3)',
            },
            boxShadow: {
                // ==========
                // Shadow
                // ==========

                'ethos-box-shadow': '0px 4px 12px rgba(0, 0, 0, 0.09)',
                'ethos-shadow-small': '0px 1px 2px rgba(0, 0, 0, 0.05)',
                'ethos-hovering-element-box-shadow':
                    '0px 2px 8px rgba(0, 0, 0, 0.1)',
                'ethos-modal-box-shadow': '0px 4px 64px rgba(0, 0, 0, 0.2)',
                'ethos-onboarding-icon-container-box-shadow':
                    '0px 13px 40px rgba(0, 0, 0, 0.16)',
                'ethos-pin-card-box-shadow': '0px 4px 76px rgba(0, 0, 0, 0.2)',

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
                // ==============================
                // Shared light and dark mode
                // ==============================
                'ethos-sui-blue': '#3D5FF2',
                'ethos-light-purple': '#F0EBFE',

                // ==========
                // Light mode
                // ==========

                // Background
                'ethos-light-background-default': '#FFFFFF',
                'ethos-light-background-secondary': '#F2F2F2',
                'ethos-light-fullscreen-backdrop': '#FAFAFB',

                // Text and stroke
                'ethos-light-text-default': '#000000',
                'ethos-light-text-medium': '#74777C',
                'ethos-light-text-stroke': 'rgba(0, 0, 0, 0.08)',
                'ethos-light-mnemonic-word': 'rgba(0, 0, 0, 0.7)',

                // Primary
                'ethos-light-primary-light': '#6D28D9',

                // Feedback
                'ethos-light-green': '#16A349',
                'ethos-light-red': '#EF4444',

                // ==========
                // Dark mode
                // ==========

                // Background
                'ethos-dark-background-default': '#111111',
                'ethos-dark-background-secondary': '#1A1C26',
                'ethos-dark-fullscreen-backdrop': '#000',

                // Text and stroke
                'ethos-dark-text-default': '#FFFFFF',
                'ethos-dark-text-medium': '#9CA3AF',
                'ethos-dark-text-stroke': 'rgba(255, 255, 255, 0.12)',
                'ethos-dark-mnemonic-word': 'rgba(255, 255, 255, 0.7)',

                // Primary
                'ethos-dark-primary-dark': '#9C78F7',
                'ethos-dark-primary-light': '#6D28D9',

                // Primary translucent
                'ethos-dark-primary-light-translucent': '#6D28D90F',

                // Feedback
                'ethos-dark-green': '#16A349',
                'ethos-dark-red': '#EF4444',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            },
            screens: {
                tall: { raw: '(min-height: 800px)' },
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
    variants: {},
    corePlugins: {
        preflight: true,
    },
};
