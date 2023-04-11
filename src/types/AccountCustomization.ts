import type { SuiAddress } from '@mysten/sui.js';

export interface Account {
    address: SuiAddress;
    nickname: string;
    color: string;
    emoji: string;
}

export interface Favorite {
    id: string;
    address: SuiAddress;
    network: string;
}

export interface AccountCustomization extends Account {
    contacts?: Account[];
    favorites?: Favorite[];
}
