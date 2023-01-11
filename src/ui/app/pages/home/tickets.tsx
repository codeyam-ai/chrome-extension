// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '_hooks';
import { accountTicketsSelector } from '_redux/slices/account';
import TicketList from '_src/ui/app/shared/content/rows-and-lists/TicketList';
import TicketProjectList from '_src/ui/app/shared/content/rows-and-lists/TicketProjectList';
import TextPageTitle from '_src/ui/app/shared/headers/page-headers/TextPageTitle';

function TicketsPage() {
    const params = useParams();
    const tickets = useAppSelector(accountTicketsSelector) || [];
    const [showTickets, setShowTickets] = useState(
        (params['*'] || '').indexOf('my_tickets') > -1
    );

    const showTicketSection = useCallback(() => {
        setShowTickets(true);
    }, []);

    const showProjectSection = useCallback(() => {
        setShowTickets(false);
    }, []);

    return (
        <div>
            <div className="py-6 flex justify-evenly">
                <TextPageTitle
                    title="Discover"
                    onClick={showProjectSection}
                    padding={false}
                    selected={!showTickets}
                />
                <TextPageTitle
                    title="My Tickets"
                    count={tickets.length}
                    onClick={showTicketSection}
                    padding={false}
                    selected={showTickets}
                />
            </div>
            {showTickets ? (
                <TicketList tickets={tickets} />
            ) : (
                <TicketProjectList />
            )}
        </div>
    );
}

export default TicketsPage;
