import TicketItem from './TicketItem';

import type { SuiObject } from '@mysten/sui.js';

const TicketList = ({ tickets }: { tickets: SuiObject[] }) => {
    return (
        <div className="p-3 flex flex-col gap-3">
            {tickets.map((ticket, index) => (
                <TicketItem key={`ticket-${index}`} ticket={ticket} />
            ))}
        </div>
    );
};

export default TicketList;
