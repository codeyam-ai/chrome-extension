// import { Ticket } from '../redux/slices/sui-objects/Ticket';

import type { SuiClient } from '@mysten/sui.js/client';
import type { ObjectContentFields } from '@mysten/sui.js/src/types/objects';


export type SuiTicketData = {
    type: string;
    fields: ObjectContentFields;
};

const isValidTicket = async (
    client: SuiClient,
    ticketData: SuiTicketData,
    walletAddress: string,
    ticketAgentId: string
) => {
    // if (ticketData.fields.ticket_agent_id === ticketAgentId) {
    //     const typeArguments = [];
    //     if (ticketData.type.indexOf('<') > -1) {
    //         const type = ticketData.type.split('<')[1];
    //         if (type) {
    //             typeArguments.push(type.replace('>', ''));
    //         }
    //     }
    //     const ticketRecord = await Ticket.lookupTicketRecord(
    //         client,
    //         ticketData.type.split('::')[0],
    //         walletAddress,
    //         ticketData.fields.ticket_id as string,
    //         ticketAgentId,
    //         typeArguments
    //     );
    //     if (
    //         ticketRecord.redemption_count > 0 &&
    //         `0x${ticketRecord.address}` === walletAddress
    //     ) {
    //         return true;
    //     }
    // }
    return false;
};

export default isValidTicket;
