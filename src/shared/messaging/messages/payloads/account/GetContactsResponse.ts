import type { BasePayload } from '_payloads';

export interface GetContactsResponse extends BasePayload {
    type: 'get-contacts-response';
}
