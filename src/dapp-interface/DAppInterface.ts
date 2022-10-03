// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Base64DataBuffer } from '@mysten/sui.js';
import { filter, lastValueFrom, map, take } from 'rxjs';

import { createMessage } from '_messages';
import { WindowMessageStream } from '_messaging/WindowMessageStream';
import { isErrorPayload } from '_payloads';
import { ALL_PERMISSION_TYPES } from '_payloads/permissions';
import { deserializeSignaturePubkeyPair } from '_src/shared/signature-serialization';

import type { SuiAddress, MoveCallTransaction } from '@mysten/sui.js';
import type { Payload } from '_payloads';
import type { GetAccount } from '_payloads/account/GetAccount';
import type { GetAccountResponse } from '_payloads/account/GetAccountResponse';
import type { ExecuteSignMessageRequest } from '_payloads/messages/ExecuteSignMessageRequest';
import type { ExecuteSignMessageResponse } from '_payloads/messages/ExecuteSignMessageResponse';
import type {
    PermissionType,
    HasPermissionsRequest,
    HasPermissionsResponse,
    AcquirePermissionsRequest,
    AcquirePermissionsResponse,
} from '_payloads/permissions';
import type {
    PreapprovalRequest,
    PreapprovalResponse,
    ExecuteTransactionRequest,
    ExecuteTransactionResponse,
} from '_payloads/transactions';
import type { DisconnectRequest } from '_src/shared/messaging/messages/payloads/connections/DisconnectRequest';
import type { DisconnectResponse } from '_src/shared/messaging/messages/payloads/connections/DisconnectResponse';
import type { Preapproval } from '_src/shared/messaging/messages/payloads/transactions/Preapproval';
import type { OpenWallet } from '_src/shared/messaging/messages/payloads/url/OpenWallet';
import type { OpenWalletResponse } from '_src/shared/messaging/messages/payloads/url/OpenWalletResponse';
import type { Observable } from 'rxjs';

function mapToPromise<T extends Payload, R>(
    stream: Observable<T>,
    project: (value: T) => R
) {
    return lastValueFrom(
        stream.pipe(
            take<T>(1),
            map<T, R>((response) => {
                if (isErrorPayload(response)) {
                    // TODO: throw proper error
                    throw new Error(response.message);
                }
                return project(response);
            })
        )
    );
}

export class DAppInterface {
    private _messagesStream: WindowMessageStream;

    constructor() {
        this._messagesStream = new WindowMessageStream(
            'ethos_in-page',
            'ethos_content-script'
        );
    }

    public openWallet(): Promise<boolean> {
        return mapToPromise(
            this.send<OpenWallet, OpenWalletResponse>({
                type: 'open-wallet',
            }),
            (response) => response.success
        );
    }

    public hasPermissions(
        permissions: readonly PermissionType[] = ALL_PERMISSION_TYPES
    ): Promise<boolean> {
        return mapToPromise(
            this.send<HasPermissionsRequest, HasPermissionsResponse>({
                type: 'has-permissions-request',
                permissions,
            }),
            (response) => response.result
        );
    }

    public requestPermissions(
        permissions: readonly PermissionType[] = ALL_PERMISSION_TYPES
    ): Promise<boolean> {
        return mapToPromise(
            this.send<AcquirePermissionsRequest, AcquirePermissionsResponse>({
                type: 'acquire-permissions-request',
                permissions,
            }),
            (response) => response.result
        );
    }

    public getAccounts(): Promise<SuiAddress[]> {
        return mapToPromise(
            this.send<GetAccount, GetAccountResponse>({
                type: 'get-account',
            }),
            (response) => response.accounts
        );
    }

    public requestPreapproval(preapproval: Preapproval) {
        return mapToPromise(
            this.send<PreapprovalRequest, PreapprovalResponse>({
                type: 'preapproval-request',
                preapproval,
            }),
            (response) => response
        );
    }

    public executeMoveCall(transaction: MoveCallTransaction) {
        return mapToPromise(
            this.send<ExecuteTransactionRequest, ExecuteTransactionResponse>({
                type: 'execute-transaction-request',
                transaction,
            }),
            (response) => response.result
        );
    }

    public executeSerializedMoveCall(transactionBytes: Uint8Array) {
        return mapToPromise(
            this.send<ExecuteTransactionRequest, ExecuteTransactionResponse>({
                type: 'execute-transaction-request',
                transactionBytes,
            }),
            (response) => response.result
        );
    }

    public signMessage(message: Uint8Array | string) {
        let messageData;
        let messageString;

        // convert utf8 string to Uint8Array
        if (typeof message === 'string') {
            messageString = message;
            message = new Uint8Array(Buffer.from(message, 'utf8'));
        }

        // convert Uint8Array to base64 string
        if (message instanceof Uint8Array) {
            messageData = new Base64DataBuffer(message).toString();
        }

        return mapToPromise(
            this.send<ExecuteSignMessageRequest, ExecuteSignMessageResponse>({
                type: 'execute-sign-message-request',
                messageData,
                messageString,
            }),
            (response) =>
                response.signature
                    ? deserializeSignaturePubkeyPair(response.signature)
                    : undefined
        );
    }

    public disconnect() {
        return mapToPromise(
            this.send<DisconnectRequest, DisconnectResponse>({
                type: 'disconnect-request',
            }),
            (response) => response.success
        );
    }

    private send<
        RequestPayload extends Payload,
        ResponsePayload extends Payload | void = void
    >(
        payload: RequestPayload,
        responseForID?: string
    ): Observable<ResponsePayload> {
        const msg = createMessage(payload, responseForID);
        this._messagesStream.send(msg);
        return this._messagesStream.messages.pipe(
            filter(({ id }) => id === msg.id),
            map((msg) => msg.payload as ResponsePayload)
        );
    }
}
