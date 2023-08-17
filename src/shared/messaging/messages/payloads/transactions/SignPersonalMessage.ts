import { type BasePayload, isBasePayload } from '../BasePayload';
import { type Payload } from '../Payload';

import type { SuiSignPersonalMessageOutput } from '@mysten/wallet-standard';

export interface SignPersonalMessageRequest extends BasePayload {
    type: 'sign-personal-message-request';
    args?: {
        message: string; // base64
        accountAddress: string;
    };
    return?: SuiSignPersonalMessageOutput;
}

export function isSignPersonalMessageRequest(
    payload: Payload
): payload is SignPersonalMessageRequest {
    return (
        isBasePayload(payload) &&
        payload.type === 'sign-personal-message-request'
    );
}
