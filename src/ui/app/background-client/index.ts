// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { lastValueFrom, take } from 'rxjs';

import { createMessage } from '_messages';
import { PortStream } from '_messaging/PortStream';
import { isGetSignMessageRequestsResponse } from '_payloads/messages/ui/GetSignMessageRequestsResponse';
import { isPermissionRequests } from '_payloads/permissions';
import { isGetTransactionRequestsResponse } from '_payloads/transactions/ui/GetTransactionRequestsResponse';
import { setPermissions } from '_redux/slices/permissions';
import { setPreapprovalRequests } from '_redux/slices/preapproval-requests';
import { setSignMessageRequests } from '_redux/slices/sign-message-requests';
import { setTransactionRequests } from '_redux/slices/transaction-requests';
import { isGetPreapprovalResponse } from '_src/shared/messaging/messages/payloads/transactions/ui/GetPreapprovalResponse';

import type { SuiAddress, SuiExecuteTransactionResponse } from '@mysten/sui.js';
import type { Message } from '_messages';
import type { GetSignMessageRequests } from '_payloads/messages/ui/GetSignMessageRequests';
import type { SignMessageRequestResponse } from '_payloads/messages/ui/SignMessageRequestResponse';
import type {
    GetPermissionRequests,
    PermissionResponse,
} from '_payloads/permissions';
import type { GetTransactionRequests } from '_payloads/transactions/ui/GetTransactionRequests';
import type { TransactionRequestResponse } from '_payloads/transactions/ui/TransactionRequestResponse';
import type { SerializedSignaturePubkeyPair } from '_shared/signature-serialization';
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
            this.sendGetSignMessageRequests(),
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

    public async sendTransactionRequestResponse(
        txID: string,
        approved: boolean,
        txResult: SuiExecuteTransactionResponse | undefined,
        tsResultError: string | undefined
    ) {
        this.sendMessage(
            createMessage<TransactionRequestResponse>({
                type: 'transaction-request-response',
                approved,
                txID,
                txResult,
                tsResultError,
            })
        );
    }

    public async sendSignMessageRequestResponse(
        signMessageRequestID: string,
        approved: boolean,
        signature: SerializedSignaturePubkeyPair | undefined,
        error: string | undefined
    ) {
        this.sendMessage(
            createMessage<SignMessageRequestResponse>({
                type: 'sign-message-request-response',
                signMessageRequestID,
                approved,
                signature,
                error,
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

    public async sendGetSignMessageRequests() {
        return lastValueFrom(
            this.sendMessage(
                createMessage<GetSignMessageRequests>({
                    type: 'get-sign-message-requests',
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
        } else if (isGetSignMessageRequestsResponse(payload)) {
            this._dispatch(setSignMessageRequests(payload.signMessageRequests));
        } else if (isGetPreapprovalResponse(payload)) {
            this._dispatch(setPreapprovalRequests(payload.preapprovalRequests));
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
