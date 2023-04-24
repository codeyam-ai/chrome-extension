import CustomizeNavigation from './dapps/Customize/CustomizeNavigation';
import { favoritableDappsMap } from './favoritableDapps';
import addressBookIcon from '_src/ui/assets/images/dappIcons/address-book.png';
import customizeIcon from '_src/ui/assets/images/dappIcons/customize.png';

import type { DappData } from '_src/types/DappData';

export const dappsLockedToFavoritesMap = new Map<string, DappData>([
    [
        'id1',
        {
            image: customizeIcon,
            name: 'Customize',
            component: CustomizeNavigation,
            route: 'customize',
            isFavorite: true,
        },
    ],
    [
        'id2',
        {
            image: addressBookIcon,
            name: 'Address Book',
            component: CustomizeNavigation,
            route: 'address-book',
            isFavorite: true,
        },
    ],
]);

export const dapps = new Map<string, DappData>([
    ...Array.from(dappsLockedToFavoritesMap.entries()),
    ...Array.from(favoritableDappsMap.entries()),
]);
