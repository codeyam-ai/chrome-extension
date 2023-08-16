import TicketItem from './TicketItem';

import type { SuiObjectData } from '@mysten/sui.js/client';

const TicketList = ({ tickets }: { tickets: SuiObjectData[] }) => {
    return (
        <div className="p-3 flex flex-col gap-3">
            {tickets.map((ticket, index) => (
                <TicketItem key={`ticket-${index}`} ticket={ticket} />
            ))}
        </div>
    );
};

export default TicketList;
