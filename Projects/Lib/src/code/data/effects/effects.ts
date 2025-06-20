/**
 * Effects data - single source of truth
 * All effect types and properties are inferred from this data
 */

export const effects = [
    {
        name: 'Anti-Gravity',
        code: 'AG',
        description: 'Causes user to jump higher.',
        type: 'Ability',
        multiplier: 0.54,
        tier: 5,
        addictiveness: 0.611,
    },
    {
        name: 'Athletic',
        code: 'ALI',
        description: 'Causes user to run faster.',
        type: 'Ability',
        multiplier: 0.32,
        tier: 3,
        addictiveness: 0.607,
    },
    {
        name: 'Balding',
        code: 'BI',
        description: 'Causes user to be bald.',
        type: 'Cosmetic',
        multiplier: 0.3,
        tier: 3,
        addictiveness: 0.0,
    },
    {
        name: 'Bright-Eyed',
        code: 'BE',
        description: "Causes user's eyes to shine flashlight beams.",
        type: 'Ability',
        multiplier: 0.4,
        tier: 4,
        addictiveness: 0.2,
    },
    {
        name: 'Calming',
        code: 'CI',
        description: 'Causes user to have chromatic aberration around screen.',
        type: 'Cosmetic',
        multiplier: 0.1,
        tier: 1,
        addictiveness: 0.0,
    },
    {
        name: 'Calorie-Dense',
        code: 'CD',
        description: 'Causes user to appear fat.',
        type: 'Cosmetic',
        multiplier: 0.28,
        tier: 2,
        addictiveness: 0.1,
    },
    {
        name: 'Cyclopean',
        code: 'CCPA',
        description: 'Causes user to only have one eye.',
        type: 'Cosmetic',
        multiplier: 0.56,
        tier: 5,
        addictiveness: 0.1,
    },
    {
        name: 'Disorienting',
        code: 'DOIET',
        description:
            'Inverts up/down camera; left/right movement inverted; forward/backward inverts at random for a few steps.',
        type: 'Ability',
        multiplier: 0.0,
        tier: 1,
        addictiveness: 0.0,
    },
    {
        name: 'Electrifying',
        code: 'ELTFI',
        description: 'Causes lightning effect on user.',
        type: 'Cosmetic',
        multiplier: 0.5,
        tier: 5,
        addictiveness: 0.235,
    },
    {
        name: 'Energizing',
        code: 'EEGI',
        description: 'Causes user to run faster.',
        type: 'Ability',
        multiplier: 0.22,
        tier: 2,
        addictiveness: 0.34,
    },
    {
        name: 'Euphoric',
        code: 'EPI',
        description: 'Causes user to have a euphoric/high and smile.',
        type: 'Cosmetic',
        multiplier: 0.18,
        tier: 1,
        addictiveness: 0.235,
    },
    {
        name: 'Explosive',
        code: 'EPS',
        description: 'Causes user to explode after countdown, killing them and damaging nearby NPCs.',
        type: 'Ability',
        multiplier: 0.0,
        tier: 1,
        addictiveness: 0.0,
    },
    {
        name: 'Focused',
        code: 'FCE',
        description: 'Causes user to have chromatic aberration around screen.',
        type: 'Cosmetic',
        multiplier: 0.16,
        tier: 1,
        addictiveness: 0.104,
    },
    {
        name: 'Foggy',
        code: 'FG',
        description: 'Creates a fog cloud around user and global fog limiting visibility.',
        type: 'Cosmetic',
        multiplier: 0.36,
        tier: 3,
        addictiveness: 0.1,
    },
    {
        name: 'Gingeritis',
        code: 'GGIT',
        description: 'Causes user to have red hair.',
        type: 'Cosmetic',
        multiplier: 0.2,
        tier: 2,
        addictiveness: 0.0,
    },
    {
        name: 'Glowing',
        code: 'GI',
        description: 'Causes user to have a radioactive glow.',
        type: 'Cosmetic',
        multiplier: 0.48,
        tier: 5,
        addictiveness: 0.472,
    },
    {
        name: 'Jennerising',
        code: 'JNII',
        description: 'Causes user to appear female.',
        type: 'Cosmetic',
        multiplier: 0.42,
        tier: 4,
        addictiveness: 0.343,
    },
    {
        name: 'Laxative',
        code: 'LAT',
        description: 'Causes user to constantly soil themselves.',
        type: 'Cosmetic',
        multiplier: 0.0,
        tier: 1,
        addictiveness: 0.1,
    },
    {
        name: 'Lethal',
        code: 'LT',
        description: 'Causes user to vomit and then die.',
        type: 'Ability',
        multiplier: 0.0,
        tier: 1,
        addictiveness: 0.0,
    },
    {
        name: 'Long Faced',
        code: 'LF',
        description: "Causes user's neck and face to grow.",
        type: 'Cosmetic',
        multiplier: 0.52,
        tier: 5,
        addictiveness: 0.607,
    },
    {
        name: 'Munchies',
        code: 'MC',
        description: '(no description provided)',
        type: 'Cosmetic',
        multiplier: 0.12,
        tier: 1,
        addictiveness: 0.096,
    },
    {
        name: 'Paranoia',
        code: 'PANA',
        description: 'Causes bad high; NPCs appear to stare from long distances.',
        type: 'Cosmetic',
        multiplier: 0.0,
        tier: 1,
        addictiveness: 0.0,
    },
    {
        name: 'Refreshing',
        code: 'RFI',
        description: '(no description provided)',
        type: 'Cosmetic',
        multiplier: 0.14,
        tier: 1,
        addictiveness: 0.104,
    },
    {
        name: 'Schizophrenic',
        code: 'SZPN',
        description: 'Runs backwards saying "oh no," hears muffled voices, with pulsing vision.',
        type: 'Ability',
        multiplier: 0.0,
        tier: 1,
        addictiveness: 0.0,
    },
    {
        name: 'Sedating',
        code: 'SDT',
        description: 'Causes heavy sleepiness: vignette around screen and mouse smoothing.',
        type: 'Cosmetic',
        multiplier: 0.26,
        tier: 2,
        addictiveness: 0.0,
    },
    {
        name: 'Seizure-Inducing',
        code: 'SUIDI',
        description: 'Causes user to have a seizure and shake on the ground.',
        type: 'Cosmetic',
        multiplier: 0.0,
        tier: 1,
        addictiveness: 0.0,
    },
    {
        name: 'Shrinking',
        code: 'SI',
        description: 'Causes user to shrink.',
        type: 'Cosmetic',
        multiplier: 0.6,
        tier: 5,
        addictiveness: 0.336,
    },
    {
        name: 'Slippery',
        code: 'SPY',
        description: 'Causes user to have sluggish, slippery movement.',
        type: 'Ability',
        multiplier: 0.34,
        tier: 3,
        addictiveness: 0.309,
    },
    {
        name: 'Smelly',
        code: 'SL',
        description: 'Causes user to have a stinky cloud around them.',
        type: 'Cosmetic',
        multiplier: 0.0,
        tier: 1,
        addictiveness: 0.0,
    },
    {
        name: 'Sneaky',
        code: 'SY',
        description: 'Police "?" meter fills half as fast; increases pickpocket success area.',
        type: 'Ability',
        multiplier: 0.24,
        tier: 2,
        addictiveness: 0.327,
    },
    {
        name: 'Spicy',
        code: 'SC',
        description: "Causes user's head to light on fire.",
        type: 'Cosmetic',
        multiplier: 0.38,
        tier: 3,
        addictiveness: 0.665,
    },
    {
        name: 'Thought-Provoking',
        code: 'TP',
        description: "Causes user's head to grow in size.",
        type: 'Cosmetic',
        multiplier: 0.44,
        tier: 4,
        addictiveness: 0.37,
    },
    {
        name: 'Toxic',
        code: 'TI',
        description: 'Causes user to vomit.',
        type: 'Cosmetic',
        multiplier: 0.0,
        tier: 1,
        addictiveness: 0.0,
    },
    {
        name: 'Tropic Thunder',
        code: 'TT',
        description: "Inverts user's skin color from light to dark or dark to light.",
        type: 'Cosmetic',
        multiplier: 0.46,
        tier: 4,
        addictiveness: 0.803,
    },
    {
        name: 'Zombifying',
        code: 'ZBFI',
        description: 'Causes user to have green skin and a zombie-like voice.',
        type: 'Cosmetic',
        multiplier: 0.58,
        tier: 5,
        addictiveness: 0.598,
    },
] as const;
