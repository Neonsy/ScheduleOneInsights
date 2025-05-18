export const siteLinks = {
    home: {
        name: 'Home',
        href: '/',
    },
    mainNav: [
        {
            name: 'Mixing',
            href: '/mixing',
            isWip: true,
            subPaths: [
                {
                    name: 'Mixer',
                    href: '/mixing/normal',
                    description: 'See what your mix causes without spending money.',
                    isWip: true,
                },
                {
                    name: 'Recipe Finder',
                    href: '/mixing/reverse',
                    description: 'Find a way to your desired effects.',
                    isWip: true,
                },
            ],
        },
        {
            name: 'Guides',
            href: '/community/guides',
            isWip: true,
            subPaths: [
                {
                    name: 'NPC Guide',
                    href: '/guides/npc',
                    description: 'Explore how to use NPCs to your advantage.',
                    isWip: true,
                },
                {
                    name: 'Game Guide',
                    href: '/guides/game',
                    description: 'Learn how to master the game.',
                    isWip: true,
                },
            ],
        },
        {
            name: 'Community',
            href: '/community',
            isWip: true,
            subPaths: [
                {
                    name: 'Mixes',
                    href: '/community/seeds',
                    description: 'See what the community is mixing.',
                    isWip: true,
                },
                {
                    name: 'Users',
                    href: '/community/users',
                    description: 'Check out the other users.',
                    isWip: true,
                },
            ],
        },
    ],
    connectLinks: [
        {
            name: 'GitHub Repository',
            href: 'https://github.com/Neonsy/ScheduleOneInsights',
        },
        {
            name: 'Discord Server',
            href: 'https://discord.gg/aK3B9QyGU4',
        },
        {
            name: 'Ko-fi Support',
            href: 'https://ko-fi.com/neonsy',
        },
    ],
};
