// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { lastValueFrom, take } from 'rxjs';

import { createMessage } from '_messages';
import { PortStream } from '_messaging/PortStream';
import { isWalletLockedMessage } from '_payloads/locking/WalletLocked';
import { isPermissionRequests } from '_payloads/permissions';
import { isGetTransactionRequestsResponse } from '_payloads/transactions/ui/GetTransactionRequestsResponse';
import { lockWalletUI } from '_redux/slices/account';
import { setPermissions } from '_redux/slices/permissions';
import { setPreapprovalRequests } from '_redux/slices/preapproval-requests';
import { setTransactionRequests } from '_redux/slices/transaction-requests';
import { isGetPreapprovalResponse } from '_src/shared/messaging/messages/payloads/transactions/ui/GetPreapprovalResponse';

import type {
    SignedMessage,
    SignedTransaction,
    SuiAddress,
} from '@mysten/sui.js';
import type { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import type { Message } from '_messages';
import type { HeartbeatPayload } from '_payloads/locking/HeartbeatPayload';
import type { LockWalletRequest } from '_payloads/locking/LockWalletRequest';
import type {
    GetPermissionRequests,
    PermissionResponse,
} from '_payloads/permissions';
import type { GetTransactionRequests } from '_payloads/transactions/ui/GetTransactionRequests';
import type { TransactionRequestResponse } from '_payloads/transactions/ui/TransactionRequestResponse';
import type { PreapprovalResponse } from '_src/shared/messaging/messages/payloads/transactions';
import type { Preapproval } from '_src/shared/messaging/messages/payloads/transactions/Preapproval';
import type { GetPreapprovalRequests } from '_src/shared/messaging/messages/payloads/transactions/ui/GetPreapprovalRequests';
import type { AppDispatch } from '_store';

export class BackgroundClient {
    private _portStream: PortStream | null = null;
    private _dispatch: AppDispatch | null = null;
    private _initialized = false;

    public async init(dispatch: AppDispatch) {
        if (this._initialized) {
            throw new Error('[BackgroundClient] already initialized');
        }
        this._initialized = true;
        this._dispatch = dispatch;
        this.createPortStream();
        return Promise.all([
            this.sendGetPermissionRequests(),
            this.sendGetTransactionRequests(),
            this.sendGetPreapprovalRequests(),
        ]).then(() => undefined);
    }

    public sendPermissionResponse(
        id: string,
        accounts: SuiAddress[],
        allowed: boolean,
        responseDate: string
    ) {
        this.sendMessage(
            createMessage<PermissionResponse>({
                id,
                type: 'permission-response',
                accounts,
                allowed,
                responseDate,
            })
        );
    }

    public async sendGetPermissionRequests() {
        return lastValueFrom(
            this.sendMessage(
                createMessage<GetPermissionRequests>({
                    type: 'get-permission-requests',
                })
            ).pipe(take(1))
        );
    }

    public sendTransactionRequestResponse(
        txID: string,
        approved: boolean,
        txResult?: SuiTransactionBlockResponse | SignedMessage,
        txResultError?: string,
        txSigned?: SignedTransaction
    ) {
        this.sendMessage(
            createMessage<TransactionRequestResponse>({
                type: 'transaction-request-response',
                approved,
                txID,
                txResult,
                txResultError,
                txSigned,
            })
        );
    }

    public async sendPreapprovalResponse(
        preapprovalResponseID: string,
        approved: boolean,
        preapproval: Preapproval
    ) {
        this.sendMessage(
            createMessage<PreapprovalResponse>({
                type: 'preapproval-response',
                id: preapprovalResponseID,
                approved,
                preapproval,
            })
        );
    }

    public async sendGetTransactionRequests() {
        return lastValueFrom(
            this.sendMessage(
                createMessage<GetTransactionRequests>({
                    type: 'get-transaction-requests',
                })
            ).pipe(take(1))
        );
    }

    public async sendGetPreapprovalRequests() {
        return lastValueFrom(
            this.sendMessage(
                createMessage<GetPreapprovalRequests>({
                    type: 'get-preapproval-requests',
                })
            ).pipe(take(1))
        );
    }

    sendHeartbeat() {
        this.sendMessage(
            createMessage<HeartbeatPayload>({
                type: 'heartbeat',
            })
        );
    }

    lockWallet() {
        this.sendMessage(
            createMessage<LockWalletRequest>({
                type: 'lock-wallet-request',
            })
        );
    }

    private handleIncomingMessage(msg: Message) {
        if (!this._initialized || !this._dispatch) {
            throw new Error(
                'BackgroundClient is not initialized to handle incoming messages'
            );
        }
        const { payload } = msg;

        if (isPermissionRequests(payload)) {
            this._dispatch(setPermissions(payload.permissions));
        } else if (isGetTransactionRequestsResponse(payload)) {
            this._dispatch(setTransactionRequests(payload.txRequests));
        } else if (isGetPreapprovalResponse(payload)) {
            this._dispatch(setPreapprovalRequests(payload.preapprovalRequests));
        } else if (isWalletLockedMessage(payload)) {
            this._dispatch(lockWalletUI(payload.hosted));
        }
    }

    private createPortStream() {
        this._portStream = PortStream.connectToBackgroundService(
            'ethos_ui<->background'
        );
        this._portStream.onDisconnect.subscribe(() => {
            this.createPortStream();
        });
        this._portStream.onMessage.subscribe((msg) =>
            this.handleIncomingMessage(msg)
        );
    }

    private sendMessage(msg: Message) {
        if (this._portStream?.connected) {
            return this._portStream.sendMessage(msg);
        } else {
            throw new Error(
                'Failed to send message to background service. Port not connected.'
            );
        }
    }
}
