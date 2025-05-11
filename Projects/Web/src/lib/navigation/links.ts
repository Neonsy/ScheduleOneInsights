export const siteLinks = {
    mainNav: [
        { name: 'Home', href: '/' },
        {
            name: 'Mixing',
            href: '/mixing',
            subPaths: [
                { name: 'Mixer', href: '/mixing/normal' },
                { name: 'Recipe Finder', href: '/mixing/reverse' },
            ],
        },
        {
            name: 'Guides',
            href: '/community/guides', // Main landing page for guides
            subPaths: [
                { name: 'NPC Guide', href: '/guides/npc' },
                { name: 'Game Guide', href: '/guides/game' },
            ],
        },
        {
            name: 'Community',
            href: '/community',
            subPaths: [
                { name: 'Community Mixes', href: '/community/seeds' },
                { name: 'Users', href: '/community/users' }, // 'Users' is nested under 'Community' based on its href
            ],
        },
    ],
    connectLinks: [
        {
            name: 'Discord',
            href: 'https://discord.gg/yourserverplaceholder', // Placeholder URL
        },
        {
            name: 'GitHub',
            href: 'https://github.com/yourusernameplaceholder', // Placeholder URL
        },
        {
            name: 'Ko-fi',
            href: 'https://ko-fi.com/yourpageplaceholder', // Placeholder URL
        },
    ],
};
