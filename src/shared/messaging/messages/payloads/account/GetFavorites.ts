import { isBasePayload } from '_payloads';

import type { BasePayload, Payload } from '_payloads';

export interface GetFavorites extends BasePayload {
    type: 'get-favorites';
}

export function isGetFavorites(payload: Payload): payload is GetFavorites {
    return isBasePayload(payload) && payload.type === 'get-favorites';
}
