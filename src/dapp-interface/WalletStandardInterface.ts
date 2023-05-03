// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { type SuiAddress, toB64, TransactionBlock } from '@mysten/sui.js';
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

    #setAccounts(addresses: SuiAddress[]) {
        this.#accounts = addresses.map(
            (address) =>
                new ReadonlyWalletAccount({
                    address,
                    // TODO: Expose public key instead of address:
                    publicKey: new Uint8Array(),
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
                    accountAddress: account.address,
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

const dataIcon: IconString = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMzQiIHZpZXdCb3g9IjAgMCAyOCAzNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMuMTYxMDkgNi4yODU1OEgxOC4zMDM5QzE5LjUzMzkgNi4yODU1OCAyMC41MzA5IDcuMjk3NDUgMjAuNTMwOSA4LjU0NTY1VjI2LjEwM0MyMC41MzA5IDI3LjM1MTIgMTkuNTMzOCAyOC4zNjMgMTguMzAzOSAyOC4zNjNIMy4xNjEwOUMxLjkzMTE1IDI4LjM2MyAwLjkzNDA4MiAyNy4zNTEyIDAuOTM0MDgyIDI2LjEwM1Y4LjU0NTY1QzAuOTM0MDgyIDcuMjk3NDUgMS45MzExNSA2LjI4NTU4IDMuMTYxMDkgNi4yODU1OFoiIGZpbGw9IiNEN0I4RkYiLz4KPHBhdGggZD0iTTMuNDY0NjIgNi40NTY1MUwxNC4xNDMzIDExLjQ5OTJDMTQuNzcxNSAxMS43OTU5IDE1LjE3MzMgMTIuNDM1MyAxNS4xNzMzIDEzLjEzODVWMzEuMzMyM0MxNS4xNzMzIDMyLjY0MDYgMTMuODQ2NSAzMy41MTU4IDEyLjY2ODMgMzIuOTg0NkwxLjk4OTYyIDI4LjE2OTZDMS4zNDYxMiAyNy44Nzk1IDAuOTMxMzk2IDI3LjIzMTkgMC45MzEzOTYgMjYuNTE3M1Y4LjA5NTc4QzAuOTMxMzk2IDYuNzczODUgMi4yODM2MiA1Ljg5ODgyIDMuNDY0NjIgNi40NTY1MVoiIGZpbGw9IiM5QTQyRkYiLz4KPHBhdGggZD0iTTIzLjgzODQgMC4wMDQ2NTM5M0wyNC4wNjEzIDAuNjA3Mjc1QzI0LjU4NjcgMi4wMjY5MiAyNS43MDYgMy4xNDYyMiAyNy4xMjU2IDMuNjcxNTNMMjcuNzI4MiAzLjg5NDUyTDI3LjEyNTYgNC4xMTc1MUMyNS43MDYgNC42NDI4MyAyNC41ODY3IDUuNzYyMTMgMjQuMDYxMyA3LjE4MTc3TDIzLjgzODQgNy43ODQzOUwyMy42MTU0IDcuMTgxNzdDMjMuMDkwMSA1Ljc2MjEzIDIxLjk3MDcgNC42NDI4MyAyMC41NTExIDQuMTE3NTFMMTkuOTQ4NSAzLjg5NDUyTDIwLjU1MTEgMy42NzE1M0MyMS45NzA4IDMuMTQ2MjIgMjMuMDkwMSAyLjAyNjkyIDIzLjYxNTQgMC42MDcyNzVMMjMuODM4NCAwLjAwNDY1MzkzWiIgZmlsbD0iIzlBNDJGRiIvPgo8L3N2Zz4K`;
