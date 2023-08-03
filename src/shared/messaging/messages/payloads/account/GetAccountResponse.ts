import type { BasePayload } from '_payloads';

export interface GetAccountResponse extends BasePayload {
    type: 'get-account-response';
    accounts: { address: string; publicKey: string | null }[];
}
