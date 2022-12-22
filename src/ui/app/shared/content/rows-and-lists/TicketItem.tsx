import { Link } from 'react-router-dom';

import truncateString from '_src/ui/app/helpers/truncate-string';
import { useTicketBasicData } from '_src/ui/app/hooks';

import type { SuiObject } from '@mysten/sui.js';

interface TicketItemProps {
    ticket: SuiObject;
}

const TicketItem = ({ ticket }: TicketItemProps) => {
    const { ticketObjectID, ticketFields, filePath, fileExtentionType } =
        useTicketBasicData(ticket);
    const drilldownLink = `/ticket/details?${new URLSearchParams({
        objectId: ticketObjectID,
    }).toString()}`;

    return (
        <Link to={drilldownLink}>
            <div className="border border-slate-200 dark:border-slate-500 rounded-2xl p-4 flex gap-3">
                {filePath && (
                    <img
                        className="h-16 w-16 rounded-2xl"
                        src={filePath}
                        alt={fileExtentionType?.name || 'Ticket'}
                    />
                )}
                <div className="flex flex-col gap-1 text-left">
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
                        <div>
                            {truncateString(ticketFields?.description, 75)}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default TicketItem;
