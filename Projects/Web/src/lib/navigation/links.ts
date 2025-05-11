export const siteLinks = {
    home: {
        name: 'Home',
        href: '/',
    },
    mainNav: [
        {
            name: 'Mixing',
            href: '/mixing',
            subPaths: [
                {
                    name: 'Mixer',
                    href: '/mixing/normal',
                    description: 'See what your mix causes without spending money.',
                },
                {
                    name: 'Recipe Finder',
                    href: '/mixing/reverse',
                    description: 'Find a way to your desired effects.',
                },
            ],
        },
        {
            name: 'Guides',
            href: '/community/guides',
            subPaths: [
                { name: 'NPC Guide', href: '/guides/npc', description: 'Explore how to use NPCs to your advantage.' },
                { name: 'Game Guide', href: '/guides/game', description: 'Learn how to master the game.' },
            ],
        },
        {
            name: 'Community',
            href: '/community',
            subPaths: [
                { name: 'Community Mixes', href: '/community/seeds', description: 'See what the community is mixing.' },
                { name: 'Users', href: '/community/users', description: 'Check out the other users.' },
            ],
        },
    ],
    connectLinks: [
        {
            name: 'Discord Server',
            href: 'https://discord.gg/yourserverplaceholder',
        },
        {
            name: 'GitHub Repository',
            href: 'https://github.com/Neonsy/ScheduleOneInsights',
        },
        {
            name: 'Ko-fi Support',
            href: 'https://ko-fi.com/neonsy',
        },
    ],
};
