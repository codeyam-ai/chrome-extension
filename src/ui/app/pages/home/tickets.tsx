// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppSelector } from '_hooks';
import { accountTicketsSelector } from '_redux/slices/account';
import TicketList from '_src/ui/app/shared/content/rows-and-lists/TicketList';
import TicketProjectList from '_src/ui/app/shared/content/rows-and-lists/TicketProjectList';
import TextPageTitle from '_src/ui/app/shared/headers/page-headers/TextPageTitle';

function TicketsPage() {
    const navigate = useNavigate();
    const params = useParams();
    const tickets = useAppSelector(accountTicketsSelector) || [];
    const myTickets = useMemo(() => params['*'] === 'my_tickets', [params]);

    const showTicketSection = useCallback(() => {
        navigate('/my_tickets');
    }, [navigate]);

    const showProjectSection = useCallback(() => {
        navigate('/tickets');
    }, [navigate]);

    return (
        <div>
            <div className="py-6 flex justify-evenly">
                <TextPageTitle
                    title="Discover"
                    onClick={showProjectSection}
                    padding={false}
                    selected={!myTickets}
                />
                <TextPageTitle
                    title="My Tickets"
                    count={tickets.length}
                    onClick={showTicketSection}
                    padding={false}
                    selected={myTickets}
                />
            </div>
            {myTickets ? (
                <TicketList tickets={tickets} />
            ) : (
                <TicketProjectList />
            )}
        </div>
    );
}

export default TicketsPage;
