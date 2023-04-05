import type {BasePayload} from "_payloads";
import {isBasePayload, Payload} from "_payloads";
import {GetPreapprovalResponse} from "_payloads/transactions/ui/GetPreapprovalResponse";

export interface WalletLocked extends BasePayload {
    type: 'wallet-locked';
}

export function isWalletLockedMessage(
    payload: Payload
): payload is WalletLocked {
    return (
        isBasePayload(payload) && payload.type === 'wallet-locked'
    );
}

