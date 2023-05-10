import { isBasePayload } from '_payloads';

import type { BasePayload, Payload } from '_payloads';

export interface SetFavorites extends BasePayload {
    type: 'set-favorites';
    favorites: string[];
}

export function isSetFavorites(payload: Payload): payload is SetFavorites {
    return isBasePayload(payload) && payload.type === 'set-favorites';
}
