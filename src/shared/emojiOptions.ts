export type Emoji =
    | 'Rocket'
    | 'Controller'
    | 'CrystalBall'
    | 'Flower'
    | 'Monster'
    | 'Music'
    | 'Palette'
    | 'PartyPopper'
    | 'Sparkles'
    | 'Tools';

// This will govern the order the emoji will be chosen for new wallets, and how they are displayed in a list
const emojiOptions: Emoji[] = [
    'Sparkles',
    'Controller',
    'Palette',
    'Music',
    'Rocket',
    'CrystalBall',
    'Flower',
    'Monster',
    'PartyPopper',
    'Tools',
];

export default emojiOptions;
