import type { BasePayload } from '_payloads';
import type { Contact } from '_src/ui/app/redux/slices/contacts';

export interface GetContactsResponse extends BasePayload {
    type: 'get-contacts-response';
    contacts: Contact[];
}
