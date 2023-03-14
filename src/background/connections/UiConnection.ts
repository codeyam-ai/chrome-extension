// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Connection } from './Connection';
import { createMessage } from '_messages';
import {
    isGetPermissionRequests,
    isPermissionResponse,
} from '_payloads/permissions';
import { isPreapprovalResponse } from '_payloads/transactions';
import { isGetTransactionRequests } from '_payloads/transactions/ui/GetTransactionRequests';
import { isTransactionRequestResponse } from '_payloads/transactions/ui/TransactionRequestResponse';
import Permissions from '_src/background/Permissions';
import Transactions from '_src/background/Transactions';
import { isGetPreapprovalRequests } from '_src/shared/messaging/messages/payloads/transactions/ui/GetPreapprovalRequests';

import type { Message } from '_messages';
import type { PortChannelName } from '_messaging/PortChannelName';
import type { Permission, PermissionRequests } from '_payloads/permissions';
import type { PreapprovalRequest } from '_payloads/transactions';
import type { GetTransactionRequestsResponse } from '_payloads/transactions/ui/GetTransactionRequestsResponse';
import type { ApprovalRequest } from '_src/shared/messaging/messages/payloads/transactions/ApprovalRequest';
import type { GetPreapprovalResponse } from '_src/shared/messaging/messages/payloads/transactions/ui/GetPreapprovalResponse';

export class UiConnection extends Connection {
    public static readonly CHANNEL: PortChannelName = 'ethos_ui<->background';

    protected async handleMessage(msg: Message) {
        const { payload, id } = msg;

        if (isGetPermissionRequests(payload)) {
            this.sendPermissions(
                Object.values(await Permissions.getPermissions()),
                id
            );
        } else if (isPermissionResponse(payload)) {
            Permissions.handlePermissionResponse(payload);
        } else if (isTransactionRequestResponse(payload)) {
            Transactions.handleTxMessage(payload);
        } else if (isGetTransactionRequests(payload)) {
            this.sendTransactionRequests(
                Object.values(await Transactions.getTransactionRequests()),
                id
            );
        } else if (isPreapprovalResponse(payload)) {
            Transactions.handlePreapprovalMessage(payload);
        } else if (isGetPreapprovalRequests(payload)) {
            this.sendPreapprovalRequests(
                Object.values(await Transactions.getPreapprovalRequests()),
                id
            );
        }
    }

    private sendPermissions(permissions: Permission[], requestID: string) {
        this.send(
            createMessage<PermissionRequests>(
                {
                    type: 'permission-request',
                    permissions,
                },
                requestID
            )
        );
    }

    private sendTransactionRequests(
        txRequests: ApprovalRequest[],
        requestID: string
    ) {
        this.send(
            createMessage<GetTransactionRequestsResponse>(
                {
                    type: 'get-transaction-requests-response',
                    txRequests,
                },
                requestID
            )
        );
    }

    private sendPreapprovalRequests(
        preapprovalRequests: PreapprovalRequest[],
        requestID: string
    ) {
        this.send(
            createMessage<GetPreapprovalResponse>(
                {
                    type: 'get-preapproval-response',
                    preapprovalRequests,
                },
                requestID
            )
        );
    }
}
