import { isBasePayload } from '_payloads';

import type { BasePayload, Payload } from '_payloads';
import type { Favorite } from '_src/types/AccountCustomization';

export interface SetFavorites extends BasePayload {
    type: 'set-favorites';
    favorites: Favorite[];
}

export function isSetFavorites(payload: Payload): payload is SetFavorites {
    return isBasePayload(payload) && payload.type === 'set-favorites';
}
