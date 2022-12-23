// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useAppSelector } from '_hooks';
import { accountTicketsSelector } from '_redux/slices/account';
import TicketList from '_src/ui/app/shared/content/rows-and-lists/TicketList';
import TicketProjectList from '_src/ui/app/shared/content/rows-and-lists/TicketProjectList';
import TextPageTitle from '_src/ui/app/shared/headers/page-headers/TextPageTitle';

function TicketsPage() {
    const tickets = useAppSelector(accountTicketsSelector) || [];

    return (
        <div>
            {tickets.length > 0 && (
                <>
                    <TextPageTitle title="My Tickets" count={tickets.length} />
                    <TicketList tickets={tickets} />
                </>
            )}
            <TextPageTitle title="Discover" />
            <TicketProjectList />
        </div>
    );
}

export default TicketsPage;
