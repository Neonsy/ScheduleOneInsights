import type { Metadata } from 'next';

export const rootMetadata: Metadata = {
    title: {
        default: 'ScheduleOneInsights',
        template: '%s | ScheduleOneInsights',
    },

    description:
        'Master the art of in-game mixing, uncover profitable recipes with the reverse mixer, and target the right customers using the comprehensive guide.',

    icons: {
        // Define the order of preference for general browser icons:
        icon: [
            {
                url: '/icon0.svg', // Served from src/app/icon0.svg
                type: 'image/svg+xml',
                sizes: 'any', // Indicates the SVG is scalable
            },
            {
                url: '/icon1.png', // Served from src/app/icon1.png
                type: 'image/png',
                sizes: '96x96',
            },
        ],

        // For legacy browsers and as a general fallback (uses src/app/favicon.ico)
        // Next.js automatically detects src/app/favicon.ico.
        shortcut: {
            url: '/favicon.ico', // Served from src/app/favicon.ico
        },
    },
};
