import type { SuiObject } from '@mysten/sui.js';

export class Ticket {
    public static isTicket(obj: SuiObject): boolean {
        return 'fields' in obj.data && 'ticket_id' in obj.data.fields;
    }
}
