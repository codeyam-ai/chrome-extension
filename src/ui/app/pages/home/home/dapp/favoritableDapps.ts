import stakingIcon from '_src/ui/assets/images/dappIcons/staking.png';

import type { DappData } from '_src/types/DappData';

export const favoritableDappsMap = new Map<string, DappData>([
    [
        'id3',
        {
            image: stakingIcon,
            name: 'Staking',
            route: 'staking',
            isFavorite: true,
        },
    ],
    [
        'id4',
        {
            image: 'https://via.placeholder.com/150/1',
            name: 'Ethos Example App',
            url: 'https://ethos-example-app.onrender.com/',
            isFavorite: true,
        },
    ],
    // ...
    // Add the rest of the favoritable items with unique IDs
    [
        'id5',
        {
            image: 'https://via.placeholder.com/150/3',
            name: 'Sui8192',
            url: 'https://ethoswallet.github.io/Sui8192/mobile',
            isFavorite: false,
        },
    ],
    [
        'id6',
        {
            image: 'https://via.placeholder.com/150/2',
            name: 'Keepsake',
            url: 'https://keepsake.gg/',
            isFavorite: false,
        },
    ],
    [
        'id7',
        {
            image: 'https://via.placeholder.com/150/4',
            name: 'Item 4',
            url: 'https://www.example.com/item4',
            isFavorite: true,
        },
    ],
    [
        'id8',
        {
            image: 'https://via.placeholder.com/150/5',
            name: 'Item 5',
            url: 'https://www.example.com/item5',
            isFavorite: false,
        },
    ],
    [
        'id9',
        {
            image: 'https://via.placeholder.com/150/6',
            name: 'Item 6',
            url: 'https://www.example.com/item6',
            isFavorite: true,
        },
    ],
    [
        'id10',
        {
            image: 'https://via.placeholder.com/150/7',
            name: 'Item 7',
            url: 'https://www.example.com/item7',
            isFavorite: false,
        },
    ],
    [
        'id11',
        {
            image: 'https://via.placeholder.com/150/8',
            name: 'Item 8',
            url: 'https://www.example.com/item8',
            isFavorite: true,
        },
    ],
    [
        'id12',
        {
            image: 'https://via.placeholder.com/150/9',
            name: 'Item 9',
            url: 'https://www.example.com/item9',
            isFavorite: false,
        },
    ],
    [
        'id13',
        {
            image: 'https://via.placeholder.com/150/10',
            name: 'Item 10',
            url: 'https://www.example.com/item10',
            isFavorite: false,
        },
    ],
]);
