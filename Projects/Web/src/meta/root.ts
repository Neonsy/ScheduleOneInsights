import type { Metadata } from 'next';

export const rootMetadata: Metadata = {
    metadataBase: new URL('https://scheduleoneinsights.space'),

    alternates: {
        canonical: '/',
    },

    title: {
        template: '%s | ScheduleOneInsights',
        default: 'ScheduleOneInsights',
    },
    description:
        'Master the art of in-game mixing, uncover profitable recipes with the reverse mixer, and target the right customers using the comprehensive guide.',

    manifest: '/meta/manifest.json',

    keywords: [
        'scheduleoneinsights',
        'schedule one insights',
        'schedule one',
        'insights',
        'schedule',
        'one',
        'insights',
        'mixing',
        'mixer',
        'reverse mixer',
        'profitable recipes',
        'comprehensive guide',
    ],

    creator: 'Neonsy',

    authors: [{ name: 'Neonsy' }],

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },

    icons: {
        // Define the order of preference for general browser icons:
        icon: [
            {
                url: '/meta/icon0.svg',
                type: 'image/svg+xml',
                sizes: 'any', // Indicates the SVG is scalable
            },
            {
                url: '/meta/icon1.png',
                type: 'image/png',
                sizes: '96x96',
            },
        ],

        apple: {
            url: '/meta/apple-icon.png',
            type: 'image/png',
            sizes: '180x180',
        },

        // For legacy browsers and as a general fallback (uses src/app/favicon.ico)
        // Next.js automatically detects src/app/favicon.ico.
        shortcut: {
            url: '/meta/favicon.ico', // Served from src/app/favicon.ico
        },
    },

    openGraph: {
        title: 'ScheduleOneInsights',
        description:
            'Master the art of in-game mixing, uncover profitable recipes with the reverse mixer, and target the right customers using the comprehensive guide.',
        images: [
            {
                url: '/meta/og-image.png',
                width: 1200,
                height: 630,
                alt: 'ScheduleOneInsights',
            },
        ],
        locale: 'en_US',
        type: 'website',
        siteName: 'ScheduleOneInsights',
        url: 'https://scheduleoneinsights.space',
    },

    twitter: {
        card: 'summary_large_image',
        title: 'ScheduleOneInsights',
        description:
            'Master the art of in-game mixing, uncover profitable recipes with the reverse mixer, and target the right customers using the comprehensive guide.',
        images: [
            {
                url: '/meta/og-image.png',
                width: 1200,
                height: 630,
                alt: 'ScheduleOneInsights',
            },
        ],
        creator: '@DrNeonsy',
        site: '@DrNeonsy',
    },

    category: 'game',
    applicationName: 'ScheduleOneInsights',
    referrer: 'no-referrer-when-downgrade',
};
