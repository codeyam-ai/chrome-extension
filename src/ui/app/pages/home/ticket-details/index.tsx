import { getObjectId } from '@mysten/sui.js';
import { useMemo, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

import Loading from '_components/loading';
import { useAppSelector, useTicketBasicData } from '_hooks';
import { accountTicketsSelector } from '_redux/slices/account/index';
import Button from '_src/ui/app/shared/buttons/Button';
import { BlurredImage } from '_src/ui/app/shared/images/BlurredBgImage';
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import Title from '_src/ui/app/shared/typography/Title';

import type { SuiObject } from '@mysten/sui.js';

const TIcketDetailsContent = ({ ticket }: { ticket: SuiObject }) => {
    const { filePath, ticketFields, fileExtentionType } =
        useTicketBasicData(ticket);

    return (
        <>
            <div>
                <div className="text-center w-full mb-6">
                    <div className={'px-6 pt-6'}>
                        <BlurredImage
                            imgSrc={filePath || ''}
                            fileExt={fileExtentionType?.name || 'NFT'}
                        />
                    </div>
                    <div className="p-6">
                        <Title className={'text-left mb-2'}>
                            {ticketFields?.name}
                        </Title>
                        <BodyLarge
                            className={
                                'text-left text-ethos-light-text-medium dark:text-ethos-dark-text-medium font-weight-normal mb-6'
                            }
                        >
                            {ticketFields?.description}
                        </BodyLarge>
                        {ticketFields?.count && (
                            <Body className="text-ethos-light-text-medium dark:text-ethos-dark-text-medium text-sm">
                                {ticketFields?.count} Remaining
                            </Body>
                        )}

                        {ticketFields?.url && (
                            <Button
                                isInline
                                buttonStyle="primary"
                                className={'inline-block mb-0'}
                                to={ticketFields.url}
                            >
                                Send
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

const TicketDetails = () => {
    const [searchParams] = useSearchParams();
    const [selectedTicket, setSelectedTicket] = useState<SuiObject | null>(
        null
    );
    const objectId = useMemo(
        () => searchParams.get('objectId'),
        [searchParams]
    );

    const tickets = useAppSelector(accountTicketsSelector);

    const activeTicket = useMemo(() => {
        const selectedTicket = tickets.filter(
            (ticket) => getObjectId(ticket.reference) === objectId
        )[0];
        setSelectedTicket(selectedTicket);
        return selectedTicket;
    }, [tickets, objectId]);

    const loadingBalance = useAppSelector(
        ({ suiObjects }) => suiObjects.loading && !suiObjects.lastSync
    );

    if (!objectId || (!loadingBalance && !selectedTicket)) {
        return <Navigate to="/tickets" replace={true} />;
    }

    return (
        <div className="">
            <Loading loading={loadingBalance} big={true}>
                <TIcketDetailsContent ticket={activeTicket} />
            </Loading>
        </div>
    );
};

export default TicketDetails;
