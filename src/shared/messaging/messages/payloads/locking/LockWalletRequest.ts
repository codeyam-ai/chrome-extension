import { isBasePayload } from '_payloads';

import type { BasePayload, Payload } from '_payloads';

export interface LockWalletRequest extends BasePayload {
    type: 'lock-wallet-request';
}

export function isLockWalletRequest(
    payload: Payload
): payload is LockWalletRequest {
    return isBasePayload(payload) && payload.type === 'lock-wallet-request';
}
