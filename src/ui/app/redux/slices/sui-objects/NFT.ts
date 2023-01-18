import type { SuiObject } from '@mysten/sui.js';

export class NFT {
    public static isNFT(obj: SuiObject): boolean {
        return (
            'fields' in obj.data &&
            'url' in obj.data.fields &&
            !('ticket_id' in obj.data.fields)
        );
    }
}
