import { BCS, getSuiMoveConfig } from '@mysten/bcs';

import type { JsonRpcProvider, SuiObjectData } from '@mysten/sui.js';

export class Ticket {
    public static isTicket(obj: SuiObjectData): boolean {
        if (obj.content) {
            return 'fields' in obj.content && 'ticket_id' in obj.content.fields;
        } else {
            return false;
        }
    }

    public static async lookupTicketRecord(
        provider: JsonRpcProvider,
        contract: string,
        address: string,
        ticketId: string,
        ticketAgentId: string,
        typeArguments: string[] = []
    ) {
        const ticketResponse = await provider.devInspectTransaction(address, {
            kind: 'moveCall',
            data: {
                packageObjectId: contract,
                module: 'token_gated_ticket',
                function: 'get_ticket_record_by_ticket_id',
                typeArguments,
                arguments: [ticketAgentId, ticketId],
            },
        });

        if ('Ok' in ticketResponse.results) {
            const bcs = new BCS(getSuiMoveConfig());

            bcs.registerAddressType('SuiAddress', 20, 'hex');

            bcs.registerStructType('TicketRecord', {
                ticket_id: 'string',
                address: 'SuiAddress',
                redemption_count: 'u64',
                fulfillment_count: 'u64',
            });

            const dataNumberArray =
                ticketResponse.results.Ok[0][1].returnValues?.[0]?.[0];
            if (!dataNumberArray) return;

            const data = Uint8Array.from(dataNumberArray);
            const ticketRecord = bcs.de('TicketRecord', data);
            // console.log("TICKETRECORD", ticketRecord)
            return ticketRecord;
        }
    }
}
