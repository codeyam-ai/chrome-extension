// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { createEntityAdapter } from '@reduxjs/toolkit';

import type { RootState } from '_redux/RootReducer';
import type { ApprovalRequest } from '_src/shared/messaging/messages/payloads/transactions';

const signPersonalMessageRequestsAdapter = createEntityAdapter<ApprovalRequest>(
    {
        sortComparer: (a, b) => {
            const aDate: Date = new Date(a.createdDate);
            const bDate: Date = new Date(b.createdDate);
            return aDate.getTime() - bDate.getTime();
        },
    }
);

export const signPersonalMessageRequestsSelectors =
    signPersonalMessageRequestsAdapter.getSelectors(
        (state: RootState) => state.transactionRequests
    );
