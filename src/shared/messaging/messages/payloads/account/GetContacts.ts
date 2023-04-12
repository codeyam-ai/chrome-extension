import { isBasePayload } from '_payloads';

import type { BasePayload, Payload } from '_payloads';

export interface GetContacts extends BasePayload {
    type: 'get-contacts';
}

export function isGetContacts(payload: Payload): payload is GetContacts {
    return isBasePayload(payload) && payload.type === 'get-contacts';
}
