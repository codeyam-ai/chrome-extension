import type { SuiAddress } from '@mysten/sui.js';
import type { BasePayload } from '_payloads';

export interface GetAccountResponse extends BasePayload {
    type: 'get-account-response';
    accounts: { address: SuiAddress; publicKey: string | null }[];
}
