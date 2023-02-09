// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

// import { Base64DataBuffer } from '@mysten/sui.js';
import {
    SUI_CHAINS,
    ReadonlyWalletAccount,
    type SuiSignAndExecuteTransactionFeature,
    type SuiSignAndExecuteTransactionMethod,
    type ConnectFeature,
    type ConnectMethod,
    type Wallet,
    type EventsFeature,
    type EventsOnMethod,
    type EventsListeners,
    type DisconnectFeature,
    type DisconnectMethod,
    type WalletIcon,
    // type SignMessageFeature,
    // type SignMessageMethod,
} from '@mysten/wallet-standard';
import mitt, { type Emitter } from 'mitt';
import { filter, map, type Observable } from 'rxjs';

import { mapToPromise } from './utils';
import { createMessage } from '_messages';
import { WindowMessageStream } from '_messaging/WindowMessageStream';
import { type Payload } from '_payloads';
import {
    type AcquirePermissionsRequest,
    type AcquirePermissionsResponse,
    ALL_PERMISSION_TYPES,
    type HasPermissionsRequest,
    type HasPermissionsResponse,
} from '_payloads/permissions';
// import { deserializeSignaturePubkeyPair } from '_src/shared/signature-serialization';

import type { GetAccount } from '_payloads/account/GetAccount';
import type { GetAccountResponse } from '_payloads/account/GetAccountResponse';
// import type { ExecuteSignMessageRequest } from '_payloads/messages/ExecuteSignMessageRequest';
// import type { ExecuteSignMessageResponse } from '_payloads/messages/ExecuteSignMessageResponse';
import type {
    ExecuteTransactionRequest,
    ExecuteTransactionResponse,
} from '_payloads/transactions';
import type { DisconnectRequest } from '_src/shared/messaging/messages/payloads/connections/DisconnectRequest';
import type { DisconnectResponse } from '_src/shared/messaging/messages/payloads/connections/DisconnectResponse';

type WalletEventsMap = {
    [E in keyof EventsListeners]: Parameters<EventsListeners[E]>[0];
};

// TODO: rebuild event interface with Mitt.
export class EthosWallet implements Wallet {
    readonly #events: Emitter<WalletEventsMap>;
    readonly #version = '1.0.0' as const;
    readonly #name = 'Ethos Wallet' as const;
    #account: ReadonlyWalletAccount | null;
    #messagesStream: WindowMessageStream;

    get version() {
        return this.#version;
    }

    get name() {
        return this.#name;
    }

    get icon() {
        return dataIcon;
    }

    get chains() {
        // TODO: Extract chain from wallet:
        return SUI_CHAINS;
    }

    get features(): ConnectFeature &
        DisconnectFeature &
        EventsFeature &
        // SignMessageFeature &
        SuiSignAndExecuteTransactionFeature {
        return {
            'standard:connect': {
                version: '1.0.0',
                connect: this.#connect,
            },
            'standard:disconnect': {
                version: '1.0.0',
                disconnect: this.#disconnect,
            },
            'standard:events': {
                version: '1.0.0',
                on: this.#on,
            },
            // 'standard:signMessage': {
            //     version: '1.0.0',
            //     signMessage: this.#signMessage,
            // },
            'sui:signAndExecuteTransaction': {
                version: '1.1.0',
                signAndExecuteTransaction: this.#signAndExecuteTransaction,
            },
        };
    }

    get accounts() {
        return this.#account ? [this.#account] : [];
    }

    constructor() {
        this.#events = mitt();
        this.#account = null;
        this.#messagesStream = new WindowMessageStream(
            'ethos_in-page',
            'ethos_content-script'
        );

        this.#connected();
    }

    #on: EventsOnMethod = (event, listener) => {
        this.#events.on(event, listener);
        return () => this.#events.off(event, listener);
    };

    #connected = async () => {
        if (!(await this.#hasPermissions(['viewAccount']))) {
            return;
        }
        const accounts = await mapToPromise(
            this.#send<GetAccount, GetAccountResponse>({
                type: 'get-account',
            }),
            (response) => response.accounts
        );

        const [address] = accounts;

        if (address) {
            const account = this.#account;
            if (!account || account.address !== address) {
                this.#account = new ReadonlyWalletAccount({
                    address,
                    // TODO: Expose public key instead of address:
                    publicKey: new Uint8Array(),
                    chains: SUI_CHAINS,
                    features: ['sui:signAndExecuteTransaction'],
                });
                this.#events.emit('change', { accounts: this.accounts });
            }
        }
    };

    #connect: ConnectMethod = async (input) => {
        if (!input?.silent) {
            await mapToPromise(
                this.#send<
                    AcquirePermissionsRequest,
                    AcquirePermissionsResponse
                >({
                    type: 'acquire-permissions-request',
                    permissions: ALL_PERMISSION_TYPES,
                }),
                (response) => response.result
            );
        }

        await this.#connected();

        return { accounts: this.accounts };
    };

    #disconnect: DisconnectMethod = async () => {
        this.#account = null;
        await mapToPromise(
            this.#send<DisconnectRequest, DisconnectResponse>({
                type: 'disconnect-request',
            }),
            (response) => response.success
        );
    };

    #signAndExecuteTransaction: SuiSignAndExecuteTransactionMethod = async (
        input
    ) => {
        return mapToPromise(
            this.#send<ExecuteTransactionRequest, ExecuteTransactionResponse>({
                type: 'execute-transaction-request',
                transaction: {
                    type: 'v2',
                    data: input.transaction,
                    options: input.options,
                },
            }),
            (response) => response.result
        );
    };

    // #signMessage: SignMessageMethod = async (input) => {
    //     let { message } = input;

    //     let messageData;
    //     let messageString;

    //     // convert utf8 string to Uint8Array
    //     if (typeof message === 'string') {
    //         messageString = message;
    //         message = new Uint8Array(Buffer.from(message, 'utf8'));
    //     }

    //     // convert Uint8Array to base64 string
    //     if (message instanceof Uint8Array) {
    //         messageData = new Base64DataBuffer(message).toString();
    //     }

    //     return mapToPromise(
    //         this.send<ExecuteSignMessageRequest, ExecuteSignMessageResponse>({
    //             type: 'execute-sign-message-request',
    //             messageData,
    //             messageString,
    //         }),
    //         (response) =>
    //             response.signature
    //                 ? deserializeSignaturePubkeyPair(response.signature)
    //                 : undefined
    //     );
    // };

    #hasPermissions(permissions: HasPermissionsRequest['permissions']) {
        return mapToPromise(
            this.#send<HasPermissionsRequest, HasPermissionsResponse>({
                type: 'has-permissions-request',
                permissions: permissions,
            }),
            ({ result }) => result
        );
    }

    #send<
        RequestPayload extends Payload,
        ResponsePayload extends Payload | void = void
    >(
        payload: RequestPayload,
        responseForID?: string
    ): Observable<ResponsePayload> {
        const msg = createMessage(payload, responseForID);
        this.#messagesStream.send(msg);
        return this.#messagesStream.messages.pipe(
            filter(({ id }) => id === msg.id),
            map((msg) => msg.payload as ResponsePayload)
        );
    }
}

const dataIcon: WalletIcon = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iOCIgZmlsbD0iIzZEMjhEOSIvPgo8cGF0aCBvcGFjaXR5PSIwLjgiIGQ9Ik05LjEyMTg3IDYuODU3MDZIMTkuOTU4M0MyMC40NTcxIDYuODU3MDYgMjAuODYxNCA3LjI2MTQxIDIwLjg2MTQgNy43NjAyVjE5Ljk4ODZDMjAuODYxNCAyMC40ODc0IDIwLjQ1NzEgMjAuODkxOCAxOS45NTgzIDIwLjg5MThIOS4xMjE4N0M4LjYyMzA4IDIwLjg5MTggOC4yMTg3MiAyMC40ODc0IDguMjE4NzIgMTkuOTg4NlY3Ljc2MDJDOC4yMTg3MiA3LjI2MTQxIDguNjIzMDggNi44NTcwNiA5LjEyMTg3IDYuODU3MDZaIiBzdHJva2U9InVybCgjcGFpbnQwX2xpbmVhcl82OTlfMjY5OCkiIHN0cm9rZS13aWR0aD0iMC40NTE1NzIiLz4KPHBhdGggZD0iTTguNzEyNzQgNy40NTQ1OUwxNi4wOTQ1IDEwLjg4OTRDMTYuNDEyOSAxMS4wMzc2IDE2LjYxNjYgMTEuMzU3IDE2LjYxNjYgMTEuNzA4M1YyMy44MUMxNi42MTY2IDI0LjQ2MzUgMTUuOTQ0IDI0LjkwMDcgMTUuMzQ2OCAyNC42MzUzTDcuOTY1MDIgMjEuMzU1NkM3LjYzODgyIDIxLjIxMDcgNy40Mjg1OCAyMC44ODcyIDcuNDI4NTggMjAuNTMwM1Y4LjI3MzQzQzcuNDI4NTggNy42MTMxMSA4LjExNDA2IDcuMTc2MDIgOC43MTI3NCA3LjQ1NDU5WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTIzLjM3ODIgMTUuMzc2N0MyMy40MzAzIDE1LjEzMjEgMjMuNTUzOCAxNC45MDg2IDIzLjczMzIgMTQuNzM0M0MyMy45MTI1IDE0LjU2IDI0LjEzOTYgMTQuNDQzIDI0LjM4NTYgMTQuMzk3OUwyNS4wNDA0IDE0LjI3ODRMMjQuMzg1NSAxNC4xNTg4SDI0LjM4NTZDMjQuMTM5NiAxNC4xMTM3IDIzLjkxMjUgMTMuOTk2NyAyMy43MzMyIDEzLjgyMjRDMjMuNTUzOCAxMy42NDgxIDIzLjQzMDMgMTMuNDI0NiAyMy4zNzgyIDEzLjE4TDIzLjIzNDEgMTIuNTAxM0wyMy4wOSAxMy4xOEMyMy4wMzc5IDEzLjQyNDYgMjIuOTE0NCAxMy42NDgxIDIyLjczNTEgMTMuODIyNEMyMi41NTU4IDEzLjk5NjcgMjIuMzI4NyAxNC4xMTM4IDIyLjA4MjcgMTQuMTU4OEwyMS40Mjc4IDE0LjI3ODRMMjIuMDgyNyAxNC4zOTc5SDIyLjA4MjdDMjIuMzI4NyAxNC40NDMgMjIuNTU1NyAxNC41NiAyMi43MzUgMTQuNzM0M0MyMi45MTQ0IDE0LjkwODYgMjMuMDM3OSAxNS4xMzIxIDIzLjA5IDE1LjM3NjdMMjMuMjM0MSAxNi4wNTU0TDIzLjM3ODIgMTUuMzc2N1oiIGZpbGw9IndoaXRlIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfNjk5XzI2OTgiIHgxPSIyMC44NjE0IiB5MT0iMTAuNTkyNiIgeDI9IjE0LjUzOTgiIHkyPSIxMy43NTM0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IndoaXRlIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0id2hpdGUiIHN0b3Atb3BhY2l0eT0iMCIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo=`;
