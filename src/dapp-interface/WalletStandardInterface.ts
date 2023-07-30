// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { toB64, TransactionBlock, fromB64 } from '@mysten/sui.js';
import {
    SUI_CHAINS,
    ReadonlyWalletAccount,
    SUI_DEVNET_CHAIN,
    SUI_TESTNET_CHAIN,
    SUI_LOCALNET_CHAIN,
    type SuiFeatures,
    type SuiSignAndExecuteTransactionBlockMethod,
    type StandardConnectFeature,
    type StandardConnectMethod,
    type Wallet,
    type StandardEventsFeature,
    type StandardEventsOnMethod,
    type StandardEventsListeners,
    type SuiSignTransactionBlockMethod,
    type SuiSignMessageMethod,
    type StandardDisconnectFeature,
    type StandardDisconnectMethod,
    SUI_MAINNET_CHAIN,
} from '@mysten/wallet-standard';
import mitt, { type Emitter } from 'mitt';
import { filter, map, type Observable } from 'rxjs';

import { mapToPromise } from './utils';
import { createMessage } from '_messages';
import { WindowMessageStream } from '_messaging/WindowMessageStream';
import {
    type AcquirePermissionsRequest,
    type AcquirePermissionsResponse,
    type HasPermissionsRequest,
    type HasPermissionsResponse,
    ALL_PERMISSION_TYPES,
} from '_payloads/permissions';
import { API_ENV } from '_src/shared/api-env';
import { type SignMessageRequest } from '_src/shared/messaging/messages/payloads/transactions';
import { isWalletStatusChangePayload } from '_src/shared/messaging/messages/payloads/wallet-status-change';

import type { IconString } from '@wallet-standard/standard';
import type { BasePayload, Payload } from '_payloads';
import type { GetAccount } from '_payloads/account/GetAccount';
import type { GetAccountResponse } from '_payloads/account/GetAccountResponse';
import type { SetNetworkPayload } from '_payloads/network';
import type {
    StakeRequest,
    ExecuteTransactionRequest,
    ExecuteTransactionResponse,
    SignTransactionRequest,
    SignTransactionResponse,
} from '_payloads/transactions';
import type { NetworkEnvType } from '_src/background/NetworkEnv';
import type { DisconnectRequest } from '_src/shared/messaging/messages/payloads/connections/DisconnectRequest';
import type { DisconnectResponse } from '_src/shared/messaging/messages/payloads/connections/DisconnectResponse';

type WalletEventsMap = {
    [E in keyof StandardEventsListeners]: Parameters<
        StandardEventsListeners[E]
    >[0];
};

// NOTE: Because this runs in a content script, we can't fetch the manifest.
const name = process.env.APP_NAME || 'Ethos Wallet';

type StakeInput = { validatorAddress: string };
type SuiWalletStakeFeature = {
    'suiWallet:stake': {
        version: '0.0.1';
        stake: (input: StakeInput) => Promise<void>;
    };
};
type ChainType = Wallet['chains'][number];
const API_ENV_TO_CHAIN: Record<
    Exclude<API_ENV, API_ENV.customRPC>,
    ChainType
> = {
    [API_ENV.local]: SUI_LOCALNET_CHAIN,
    [API_ENV.devNet]: SUI_DEVNET_CHAIN,
    [API_ENV.testNet]: SUI_TESTNET_CHAIN,
    [API_ENV.mainNet]: SUI_MAINNET_CHAIN,
};

export class EthosWallet implements Wallet {
    readonly #events: Emitter<WalletEventsMap>;
    readonly #version = '1.0.0' as const;
    readonly #name = name;
    #accounts: ReadonlyWalletAccount[];
    #messagesStream: WindowMessageStream;
    #activeChain: ChainType | null = null;

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

    get features(): StandardConnectFeature &
        StandardEventsFeature &
        SuiFeatures &
        SuiWalletStakeFeature &
        StandardDisconnectFeature {
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
            'sui:signTransactionBlock': {
                version: '1.0.0',
                signTransactionBlock: this.#signTransactionBlock,
            },
            'sui:signAndExecuteTransactionBlock': {
                version: '1.0.0',
                signAndExecuteTransactionBlock:
                    this.#signAndExecuteTransactionBlock,
            },
            'suiWallet:stake': {
                version: '0.0.1',
                stake: this.#stake,
            },
            'sui:signMessage': {
                version: '1.0.0',
                signMessage: this.#signMessage,
            },
        };
    }

    get accounts() {
        return this.#accounts;
    }

    #setAccounts(accounts: GetAccountResponse['accounts']) {
        this.#accounts = accounts.map(
            ({ address, publicKey }) =>
                new ReadonlyWalletAccount({
                    address,
                    publicKey: publicKey
                        ? fromB64(publicKey)
                        : new Uint8Array(),
                    chains: this.#activeChain ? [this.#activeChain] : [],
                    features: [
                        'standard:connect',
                        'standard:disconnect',
                        'standard:events',
                        'sui:signMessage',
                        'sui:signTransactionBlock',
                        'sui:signAndExecuteTransactionBlock',
                    ],
                    icon: dataIcon,
                    label: this.#name,
                })
        );
    }

    constructor() {
        this.#events = mitt();
        this.#accounts = [];
        this.#messagesStream = new WindowMessageStream(
            'ethos_in-page',
            'ethos_content-script'
        );
        this.#messagesStream.messages.subscribe(({ payload }) => {
            if (isWalletStatusChangePayload(payload)) {
                const { network, accounts } = payload;
                if (payload)
                    throw new Error(
                        `payload: ${JSON.stringify(payload, null, 2)}`
                    );
                if (network) {
                    this.#setActiveChain(network);
                    if (!accounts) {
                        // in case an accounts change exists skip updating chains of current accounts
                        // accounts will be updated in the if block below
                        this.#accounts = this.#accounts.map(
                            ({ address, features, icon, label, publicKey }) =>
                                new ReadonlyWalletAccount({
                                    address,
                                    publicKey,
                                    chains: this.#activeChain
                                        ? [this.#activeChain]
                                        : [],
                                    features,
                                    label,
                                    icon,
                                })
                        );
                    }
                }
                if (accounts) {
                    this.#setAccounts(accounts);
                }
                this.#events.emit('change', { accounts: this.accounts });
            }
        });
        this.#connected();
    }

    #on: StandardEventsOnMethod = (event, listener) => {
        this.#events.on(event, listener);
        return () => this.#events.off(event, listener);
    };

    #connected = async () => {
        const activeNetwork = await this.#getActiveNetwork();
        this.#setActiveChain(activeNetwork);
        if (!(await this.#hasPermissions(['viewAccount']))) {
            return;
        }
        const accounts = await this.#getAccounts();
        this.#setAccounts(accounts);
        if (this.#accounts.length) {
            this.#events.emit('change', { accounts: this.accounts });
        }
    };

    #connect: StandardConnectMethod = async (input) => {
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

    #disconnect: StandardDisconnectMethod = async () => {
        await mapToPromise(
            this.#send<DisconnectRequest, DisconnectResponse>({
                type: 'disconnect-request',
            }),
            (response) => response.success
        );
        this.#setAccounts([]);
        this.#events.emit('change', { accounts: this.accounts });
    };

    #signTransactionBlock: SuiSignTransactionBlockMethod = async (input) => {
        if (!TransactionBlock.is(input.transactionBlock)) {
            throw new Error(
                'Unexpect transaction format found. Ensure that you are using the `Transaction` class.'
            );
        }

        return mapToPromise(
            this.#send<SignTransactionRequest, SignTransactionResponse>({
                type: 'sign-transaction-request',
                transaction: {
                    ...input,
                    // account might be undefined if previous version of adapters is used
                    // in that case use the first account address
                    account:
                        input.account?.address ||
                        this.#accounts[0]?.address ||
                        '',
                    transaction: input.transactionBlock.serialize(),
                },
            }),
            (response) => {
                return response.result;
            }
        );
    };

    #signAndExecuteTransactionBlock: SuiSignAndExecuteTransactionBlockMethod =
        async (input) => {
            const { transactionBlock, account, chain, options } = input;

            if (!TransactionBlock.is(transactionBlock)) {
                throw new Error(
                    'Unexpect transaction format found. Ensure that you are using the `Transaction` class.'
                );
            }

            return mapToPromise(
                this.#send<
                    ExecuteTransactionRequest,
                    ExecuteTransactionResponse
                >({
                    type: 'execute-transaction-request',
                    transaction: {
                        type: 'transaction',
                        data: transactionBlock.serialize(),
                        options,
                        // account might be undefined if previous version of adapters is used
                        // in that case use the first account address
                        account:
                            account?.address ||
                            this.#accounts[0]?.address ||
                            '',
                        chain,
                    },
                }),
                (response) => response.result
            );
        };

    #stake = async (input: StakeInput) => {
        this.#send<StakeRequest, void>({
            type: 'stake-request',
            validatorAddress: input.validatorAddress,
        });
    };

    #signMessage: SuiSignMessageMethod = async ({ message, account }) => {
        return mapToPromise(
            this.#send<SignMessageRequest, SignMessageRequest>({
                type: 'sign-message-request',
                args: {
                    message: toB64(message),
                    accountAddress: account.address ?? account,
                },
            }),
            (response) => {
                if (!response.return) {
                    throw new Error('Invalid sign message response');
                }
                return response.return;
            }
        );
    };

    #hasPermissions(permissions: HasPermissionsRequest['permissions']) {
        return mapToPromise(
            this.#send<HasPermissionsRequest, HasPermissionsResponse>({
                type: 'has-permissions-request',
                permissions: permissions,
            }),
            ({ result }) => result
        );
    }

    #getAccounts() {
        return mapToPromise(
            this.#send<GetAccount, GetAccountResponse>({
                type: 'get-account',
            }),
            (response) => response.accounts
        );
    }

    #getActiveNetwork() {
        return mapToPromise(
            this.#send<BasePayload, SetNetworkPayload>({
                type: 'get-network',
            }),
            ({ network }) => network
        );
    }

    #setActiveChain({ env }: NetworkEnvType) {
        this.#activeChain =
            env === API_ENV.customRPC ? 'sui:unknown' : API_ENV_TO_CHAIN[env];
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

const dataIcon: IconString = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAzIiBoZWlnaHQ9IjIwNCIgdmlld0JveD0iMCAwIDIwMyAyMDQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHk9IjAuOTYwMjA1IiB3aWR0aD0iMjAyLjQ2OSIgaGVpZ2h0PSIyMDIuNDY5IiByeD0iNTcuMDc2NCIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTYwLjE0NTYgNTguODcxSDEyMC4wODNDMTI0Ljk1MSA1OC44NzEgMTI4Ljg5NyA2Mi44NzYxIDEyOC44OTcgNjcuODE2NlYxMzcuMzExQzEyOC44OTcgMTQyLjI1MSAxMjQuOTUxIDE0Ni4yNTYgMTIwLjA4MyAxNDYuMjU2SDYwLjE0NTZDNTUuMjc3MyAxNDYuMjU2IDUxLjMzMDggMTQyLjI1MSA1MS4zMzA4IDEzNy4zMTFWNjcuODE2NkM1MS4zMzA4IDYyLjg3NjEgNTUuMjc3MyA1OC44NzEgNjAuMTQ1NiA1OC44NzFaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfOTcxXzIyMjA0KSIvPgo8cGF0aCBkPSJNNjEuMzQ4NiA1OS41NDc1TDEwMy42MTYgNzkuNTA3MkMxMDYuMTAzIDgwLjY4MTQgMTA3LjY5MyA4My4yMTIzIDEwNy42OTMgODUuOTk1NlYxNTguMDA5QzEwNy42OTMgMTYzLjE4NyAxMDIuNDQxIDE2Ni42NTIgOTcuNzc4IDE2NC41NDlMNTUuNTEwMyAxNDUuNDkxQzUyLjk2MzMgMTQ0LjM0MiA1MS4zMjE4IDE0MS43NzkgNTEuMzIxOCAxMzguOTUxVjY2LjAzNkM1MS4zMjE4IDYwLjgwMzYgNTYuNjc0IDU3LjM0MDEgNjEuMzQ4NiA1OS41NDc1WiIgZmlsbD0iIzlBNDJGRiIvPgo8cGF0aCBkPSJNMTQxLjk5IDM0LjAxMjFMMTQyLjg3MyAzNi4zOTczQzE0NC45NTIgNDIuMDE2NSAxNDkuMzgzIDQ2LjQ0NjggMTU1LjAwMiA0OC41MjZMMTU3LjM4NyA0OS40MDg3TDE1NS4wMDIgNTAuMjkxM0MxNDkuMzgzIDUyLjM3MDUgMTQ0Ljk1MiA1Ni44MDA5IDE0Mi44NzMgNjIuNDJMMTQxLjk5IDY0LjgwNTJMMTQxLjEwOCA2Mi40MkMxMzkuMDI5IDU2LjgwMDkgMTM0LjU5OCA1Mi4zNzA1IDEyOC45NzkgNTAuMjkxM0wxMjYuNTk0IDQ5LjQwODdMMTI4Ljk3OSA0OC41MjZDMTM0LjU5OCA0Ni40NDY4IDEzOS4wMjkgNDIuMDE2NSAxNDEuMTA4IDM2LjM5NzNMMTQxLjk5IDM0LjAxMjFaIiBmaWxsPSIjOUE0MkZGIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfOTcxXzIyMjA0IiB4MT0iMTQwLjI4IiB5MT0iNDIuODk5NyIgeDI9IjYxLjU4NiIgeTI9IjEzNi45OSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjOUE0MkZGIiBzdG9wLW9wYWNpdHk9IjAuNzQiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjOUE0MkZGIiBzdG9wLW9wYWNpdHk9IjAuMDUiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K`;
