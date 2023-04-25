import CustomizeNavigation from './dapps/Customize/CustomizeNavigation';
import { favoritableDappsMap } from './favoritableDapps';
import customizeIcon from '_images/dappIcons/customize.png';
import addressBookIcon from '_src/ui/assets/images/dappIcons/address-book.png';

import type { DappData } from '_src/types/DappData';

export const dappsLockedToFavoritesMap = new Map<string, DappData>([
    [
        // in the future these IDs can be UUIDs, but for now they are shorter to keep it simple
        'id1',
        {
            image: customizeIcon,
            name: 'Customize',
            component: CustomizeNavigation,
            route: 'customize',
        },
    ],
    [
        'id2',
        {
            image: addressBookIcon,
            name: 'Address Book',
            component: CustomizeNavigation,
            route: 'address-book',
        },
    ],
]);

export const dapps = new Map<string, DappData>([
    ...Array.from(dappsLockedToFavoritesMap.entries()),
    ...Array.from(favoritableDappsMap.entries()),
]);
