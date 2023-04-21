import CustomizeNavigation from './dapps/Customize/CustomizeNavigation';
import { favoritableDapps } from './favoritableDapps';
import addressBookIcon from '_src/ui/assets/images/dappIcons/address-book.png';
import customizeIcon from '_src/ui/assets/images/dappIcons/customize.png';

import type { DappData } from '_src/types/DappData';

// This fixes the issue of the circular dependency by importing this data into Customize
const dappsLockedToFavorites: DappData[] = [
    {
        image: customizeIcon,
        name: 'Customize',
        component: CustomizeNavigation,
        route: 'customize',
        isFavorite: true,
    },
    {
        image: addressBookIcon,
        name: 'Address Book',
        component: CustomizeNavigation,
        route: 'address-book',
        isFavorite: true,
    },
];

export const dapps: DappData[] = [
    ...dappsLockedToFavorites,
    ...favoritableDapps,
];
