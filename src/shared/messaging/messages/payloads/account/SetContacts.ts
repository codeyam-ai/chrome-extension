import { isBasePayload } from '_payloads';

import type { BasePayload, Payload } from '_payloads';
import type { Contact } from '_src/ui/app/redux/slices/contacts';

export interface SetContacts extends BasePayload {
    type: 'set-contacts';
    contacts: Contact[];
}

export function isSetContacts(payload: Payload): payload is SetContacts {
    return isBasePayload(payload) && payload.type === 'set-contacts-response';
}
