import { findEffectByName } from '@/code/utils/effects/effectUtils';
import { Rank } from '@/code/types/consts/ranks';

export const ingredients = [
    {
        name: 'Cuke',
        code: 'C',
        rank: Rank.StreetRatI,
        price: 2,
        defaultEffect: findEffectByName('Energizing').match(
            (code) => code,
            (err) => {
                throw new Error(`Static data init failed for ingredient 'Cuke', effect 'Energizing': ${err.message}`);
            }
        ),
        description: "A refreshing can of Cuke that leaves you feeling energized. It's heaven in a can.",
    },
    {
        name: 'Banana',
        code: 'BNN',
        rank: Rank.StreetRatI,
        price: 2,
        defaultEffect: findEffectByName('Gingeritis').match(
            (code) => code,
            (err) => {
                throw new Error(`Static data init failed for ingredient 'Banana', effect 'Gingeritis': ${err.message}`);
            }
        ),
        description: 'Elongated yellow fruit, rich in potassium.',
    },
    {
        name: 'Paracetamol',
        code: 'PRCTM',
        rank: Rank.StreetRatI,
        price: 3,
        defaultEffect: findEffectByName('Sneaky').match(
            (code) => code,
            (err) => {
                throw new Error(
                    `Static data init failed for ingredient 'Paracetamol', effect 'Sneaky': ${err.message}`
                );
            }
        ),
        description: 'Mild over‑the‑counter painkiller.',
    },
    {
        name: 'Donut',
        code: 'DN',
        rank: Rank.StreetRatI,
        price: 3,
        defaultEffect: findEffectByName('Calorie-Dense').match(
            (code) => code,
            (err) => {
                throw new Error(
                    `Static data init failed for ingredient 'Donut', effect 'Calorie-Dense': ${err.message}`
                );
            }
        ),
        description: 'Yummy strawberry frosted donut.',
    },
    {
        name: 'Viagra',
        code: 'VAR',
        rank: Rank.HoodlumII,
        price: 4,
        defaultEffect: findEffectByName('Tropic Thunder').match(
            (code) => code,
            (err) => {
                throw new Error(
                    `Static data init failed for ingredient 'Viagra', effect 'Tropic Thunder': ${err.message}`
                );
            }
        ),
        description: 'Medication that is used to get you chubbed‑up.',
    },
    {
        name: 'Mouth Wash',
        code: 'MW',
        rank: Rank.HoodlumIII,
        price: 4,
        defaultEffect: findEffectByName('Balding').match(
            (code) => code,
            (err) => {
                throw new Error(
                    `Static data init failed for ingredient 'Mouth Wash', effect 'Balding': ${err.message}`
                );
            }
        ),
        description: 'Antiseptic mouth wash for a minty fresh breath.',
    },
    {
        name: 'Flu Medicine',
        code: 'FM',
        rank: Rank.HoodlumIV,
        price: 5,
        defaultEffect: findEffectByName('Sedating').match(
            (code) => code,
            (err) => {
                throw new Error(
                    `Static data init failed for ingredient 'Flu Medicine', effect 'Sedating': ${err.message}`
                );
            }
        ),
        description: 'Pain reliever and mild sedative used to alleviate flu symptoms.',
    },
    {
        name: 'Gasoline',
        code: 'GOL',
        rank: Rank.HoodlumV,
        price: 5,
        defaultEffect: findEffectByName('Toxic').match(
            (code) => code,
            (err) => {
                throw new Error(`Static data init failed for ingredient 'Gasoline', effect 'Toxic': ${err.message}`);
            }
        ),
        description: 'A jerry can full of gasoline.',
    },
    {
        name: 'Energy Drink',
        code: 'ED',
        rank: Rank.PeddlerI,
        price: 6,
        defaultEffect: findEffectByName('Athletic').match(
            (code) => code,
            (err) => {
                throw new Error(
                    `Static data init failed for ingredient 'Energy Drink', effect 'Athletic': ${err.message}`
                );
            }
        ),
        description:
            'Tasty energy drink filled with lots of yummy chemicals to make you feel refreshed. Removes the effects of drugs when consumed.',
    },
    {
        name: 'Motor Oil',
        code: 'MO',
        rank: Rank.PeddlerII,
        price: 6,
        defaultEffect: findEffectByName('Slippery').match(
            (code) => code,
            (err) => {
                throw new Error(
                    `Static data init failed for ingredient 'Motor Oil', effect 'Slippery': ${err.message}`
                );
            }
        ),
        description: 'Specially formulated oil used for lubricating the moving stuff in an engine.',
    },
    {
        name: 'Mega Bean',
        code: 'MB',
        rank: Rank.PeddlerIII,
        price: 7,
        defaultEffect: findEffectByName('Foggy').match(
            (code) => code,
            (err) => {
                throw new Error(`Static data init failed for ingredient 'Mega Bean', effect 'Foggy': ${err.message}`);
            }
        ),
        description: 'An unusually large bean of mysterious origin.',
    },
    {
        name: 'Chili',
        code: 'CL',
        rank: Rank.PeddlerIV,
        price: 7,
        defaultEffect: findEffectByName('Spicy').match(
            (code) => code,
            (err) => {
                throw new Error(`Static data init failed for ingredient 'Chili', effect 'Spicy': ${err.message}`);
            }
        ),
        description: 'Yummy spicy chili.',
    },
    {
        name: 'Battery',
        code: 'BTY',
        rank: Rank.PeddlerV,
        price: 8,
        defaultEffect: findEffectByName('Bright-Eyed').match(
            (code) => code,
            (err) => {
                throw new Error(
                    `Static data init failed for ingredient 'Battery', effect 'Bright-Eyed': ${err.message}`
                );
            }
        ),
        description: 'Small battery used to power stuff.',
    },
    {
        name: 'Iodine',
        code: 'ID',
        rank: Rank.HustlerI,
        price: 8,
        defaultEffect: findEffectByName('Jennerising').match(
            (code) => code,
            (err) => {
                throw new Error(
                    `Static data init failed for ingredient 'Iodine', effect 'Jennerising': ${err.message}`
                );
            }
        ),
        description: 'Chemical element that is an essential nutrient in a healthy diet. It also has other purposes.',
    },
    {
        name: 'Addy',
        code: 'AD',
        rank: Rank.HustlerII,
        price: 9,
        defaultEffect: findEffectByName('Thought-Provoking').match(
            (code) => code,
            (err) => {
                throw new Error(
                    `Static data init failed for ingredient 'Addy', effect 'Thought-Provoking': ${err.message}`
                );
            }
        ),
        description: 'Like meth except legal. Used to stimulate cognition.',
    },
    {
        name: 'Horse Semen',
        code: 'HS',
        rank: Rank.HustlerIII,
        price: 9,
        defaultEffect: findEffectByName('Long Faced').match(
            (code) => code,
            (err) => {
                throw new Error(
                    `Static data init failed for ingredient 'Horse Semen', effect 'Long Faced': ${err.message}`
                );
            }
        ),
        description: 'A big jug of ethically sourced horse semen.',
    },
] as const;
