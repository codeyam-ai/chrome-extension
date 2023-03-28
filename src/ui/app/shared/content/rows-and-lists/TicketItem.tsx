import { Link } from 'react-router-dom';

import { useTicketBasicData } from '_src/ui/app/hooks';

import type { SuiObjectData } from '@mysten/sui.js';

interface TicketItemProps {
    ticket: SuiObjectData;
}

const TicketItem = ({ ticket }: TicketItemProps) => {
    const { ticketObjectID, ticketFields, filePath, fileExtentionType } =
        useTicketBasicData(ticket);
    const drilldownLink = `/ticket/details?${new URLSearchParams({
        objectId: ticketObjectID,
    }).toString()}`;

    return (
        <Link to={drilldownLink}>
            <div className="border border-slate-200 dark:border-slate-500 rounded-2xl flex flex-col gap-3 overflow-hidden">
                {filePath && (
                    <div className="bg-[#F2F2F2] dark:bg-[#717377] p-4 rounded-xl">
                        <img
                            src={filePath}
                            alt={fileExtentionType?.name || 'Ticket'}
                            className="w-full"
                        />
                    </div>
                )}
                <div className="flex flex-col p-3 gap-1 text-left bg-black bg-opacity-5">
                    <div className="flex justify-between items-center">
                        {ticketFields?.name && (
                            <div className="text-base">
                                {ticketFields?.name}
                            </div>
                        )}
                        {ticketFields?.count && (
                            <div className="text-xs text-slate-600">
                                {ticketFields?.count} remaining
                            </div>
                        )}
                    </div>
                    {ticketFields?.description && (
                        <div>{ticketFields?.description}</div>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default TicketItem;
