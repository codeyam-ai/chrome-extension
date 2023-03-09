import { getObjectId } from '@mysten/sui.js';
import { useMemo, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

import Loading from '_components/loading';
import { useAppSelector, useTicketBasicData } from '_hooks';
import { accountTicketsSelector } from '_redux/slices/account/index';
import ExternalLink from '_src/ui/app/components/external-link';
import Button from '_src/ui/app/shared/buttons/Button';
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import Title from '_src/ui/app/shared/typography/Title';

import type { SuiObjectData } from '@mysten/sui.js';

const TIcketDetailsContent = ({ ticket }: { ticket: SuiObjectData }) => {
    const { filePath, ticketFields } = useTicketBasicData(ticket);

    return (
        <div className="text-center w-full p-6 flex flex-col justify-start gap-6 items-center">
            <div className="flex flex-col gap-3">
                <img
                    src={filePath || ''}
                    alt={`${ticketFields?.name} Ticket Cover`}
                    className="rounded-xl"
                />
                {ticketFields?.count && (
                    <Body className="text-ethos-light-text-medium dark:text-ethos-dark-text-medium text-sm mb-3">
                        {ticketFields?.count} Use
                        {ticketFields?.count === 1 ? '' : 's'} Remaining
                    </Body>
                )}
            </div>
            {ticketFields?.redeem_url && (
                <ExternalLink
                    href={ticketFields.redeem_url}
                    title={ticketFields.name}
                    className="text-ethos-light-text-medium dark:text-ethos-dark-text-medium"
                    showIcon={false}
                >
                    <Button
                        isInline
                        buttonStyle="primary"
                        className={'inline-block mb-0'}
                        removeContainerPadding={true}
                    >
                        Redeem Ticket
                    </Button>
                </ExternalLink>
            )}
            <div>
                <Title className={'text-left mb-2'}>{ticketFields?.name}</Title>
                <BodyLarge
                    className={
                        'text-left text-ethos-light-text-medium dark:text-ethos-dark-text-medium font-weight-normal mb-6'
                    }
                >
                    {ticketFields?.description}
                </BodyLarge>
            </div>
        </div>
    );
};

const TicketDetails = () => {
    const [searchParams] = useSearchParams();
    const [selectedTicket, setSelectedTicket] = useState<SuiObjectData | null>(
        null
    );
    const objectId = useMemo(
        () => searchParams.get('objectId'),
        [searchParams]
    );

    const tickets = useAppSelector(accountTicketsSelector);

    const activeTicket = useMemo(() => {
        const selectedTicket = tickets.filter(
            (ticket) => ticket.objectId === objectId
        )[0];
        setSelectedTicket(selectedTicket);
        return selectedTicket;
    }, [tickets, objectId]);

    const loading = useAppSelector(
        ({ suiObjects }) => suiObjects.loading && !suiObjects.lastSync
    );

    if (!objectId || (!loading && !selectedTicket)) {
        return <Navigate to="/tickets" replace={true} />;
    }

    return (
        <div className="">
            <Loading loading={loading} big={true}>
                <TIcketDetailsContent ticket={activeTicket} />
            </Loading>
        </div>
    );
};

export default TicketDetails;
