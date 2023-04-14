import { isBasePayload } from '_payloads';

import type { BasePayload, Payload } from '_payloads';

export interface WalletLocked extends BasePayload {
    type: 'wallet-locked';
    hosted: boolean;
}

export function isWalletLockedMessage(
    payload: Payload
): payload is WalletLocked {
    return isBasePayload(payload) && payload.type === 'wallet-locked';
}
