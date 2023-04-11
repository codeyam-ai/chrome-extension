import { isBasePayload } from '_payloads';

import type { BasePayload, Payload } from '_payloads';
import type { AccountCustomization } from '_src/types/AccountCustomization';

export interface SetContacts extends BasePayload {
    type: 'set-contacts';
    accountCustomizations: AccountCustomization[];
}

export function isSetContacts(payload: Payload): payload is SetContacts {
    return isBasePayload(payload) && payload.type === 'set-contacts-response';
}
