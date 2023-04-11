import type { SuiAddress } from '@mysten/sui.js';
import type { IdentifierString } from '@wallet-standard/standard';

export interface Account {
    address: SuiAddress;
    nickname: string;
    color: string;
    emoji: string;
}

export interface Favorite {
    id: string;
    address: SuiAddress;
    chain: IdentifierString;
}

export interface AccountCustomization extends Account {
    contacts?: Account[];
    favorites?: Favorite[];
}
