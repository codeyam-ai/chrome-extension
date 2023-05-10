// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Connection } from './Connection';
import { isSignTransactionRequest } from '../../shared/messaging/messages/payloads/transactions/ExecuteTransactionRequest';
import networkEnv from '../NetworkEnv';
import { createMessage } from '_messages';
import { isGetAccount } from '_payloads/account/GetAccount';
import {
    isAcquirePermissionsRequest,
    isHasPermissionRequest,
    type AcquirePermissionsResponse,
    type HasPermissionsResponse,
    type PermissionType,
} from '_payloads/permissions';
import {
    isPreapprovalRequest,
    isExecuteTransactionRequest,
    type PreapprovalResponse,
    type ExecuteTransactionResponse,
    type SignTransactionResponse,
} from '_payloads/transactions';
import Permissions from '_src/background/Permissions';
import Transactions from '_src/background/Transactions';
import { isGetAccountCustomizations } from '_src/shared/messaging/messages/payloads/account/GetAccountCustomizations';
import { type GetAccountCustomizationsResponse } from '_src/shared/messaging/messages/payloads/account/GetAccountCustomizationsResponse';
import { isGetAccounts } from '_src/shared/messaging/messages/payloads/account/GetAccounts';
import { isGetContacts } from '_src/shared/messaging/messages/payloads/account/GetContacts';
import { isGetFavorites } from '_src/shared/messaging/messages/payloads/account/GetFavorites';
import { isGetNetwork } from '_src/shared/messaging/messages/payloads/account/GetNetwork';
import { isGetTheme } from '_src/shared/messaging/messages/payloads/account/GetTheme';
import { isSetAccountCustomizations } from '_src/shared/messaging/messages/payloads/account/SetAccountCustomizations';
import { isSetContacts } from '_src/shared/messaging/messages/payloads/account/SetContacts';
import { isSetFavorites } from '_src/shared/messaging/messages/payloads/account/SetFavorites';
import { isSwitchAccount } from '_src/shared/messaging/messages/payloads/account/SwitchAccount';
import { isDisconnectRequest } from '_src/shared/messaging/messages/payloads/connections/DisconnectRequest';
import {
    isSignMessageRequest,
    type SignMessageRequest,
} from '_src/shared/messaging/messages/payloads/transactions/SignMessage';
import { isGetUrl } from '_src/shared/messaging/messages/payloads/url/OpenWallet';
import {
    getEncrypted,
    getLocal,
    setEncrypted,
    setSession,
} from '_src/shared/storagex/store';
import { openInNewTab } from '_src/shared/utils';
import { type AccountInfo } from '_src/ui/app/KeypairVault';

import type { NetworkEnvType } from '../NetworkEnv';
import type {
    SignedTransaction,
    SuiAddress,
    SuiTransactionBlockResponse,
} from '@mysten/sui.js';
import type { Message } from '_messages';
import type { PortChannelName } from '_messaging/PortChannelName';
import type { ErrorPayload } from '_payloads';
import type { GetAccountResponse } from '_payloads/account/GetAccountResponse';
import type { GetContactsResponse } from '_src/shared/messaging/messages/payloads/account/GetContactsResponse';
import type { GetFavoritesResponse } from '_src/shared/messaging/messages/payloads/account/GetFavoritesResponse';
import type { GetNetworkResponse } from '_src/shared/messaging/messages/payloads/account/GetNetworkResponse';
import type { GetThemeResponse } from '_src/shared/messaging/messages/payloads/account/GetThemeResponse';
import type { SwitchAccountResponse } from '_src/shared/messaging/messages/payloads/account/SwitchAccountResponse';
import type { DisconnectResponse } from '_src/shared/messaging/messages/payloads/connections/DisconnectResponse';
import type { OpenWalletResponse } from '_src/shared/messaging/messages/payloads/url/OpenWalletResponse';
import type { AccountCustomization } from '_src/types/AccountCustomization';
import type { Contact } from '_src/ui/app/redux/slices/contacts';
import type { Runtime } from 'webextension-polyfill';

export class ContentScriptConnection extends Connection {
    public static readonly CHANNEL: PortChannelName =
        'ethos_content<->background';
    public readonly origin: string;
    public readonly originFavIcon: string | undefined;
    public readonly originTitle: string | undefined;

    constructor(port: Runtime.Port) {
        super(port);
        this.origin = this.getOrigin(port);
        this.originFavIcon = port.sender?.tab?.favIconUrl;
        this.originTitle = port.sender?.tab?.title;
    }

    protected async handleMessage(msg: Message) {
        const { payload } = msg;

        try {
            if (isGetAccount(payload)) {
                const activeAccount = await this.getActiveAccount();
                const existingPermission = await Permissions.getPermission({
                    origin: this.origin,
                    account: activeAccount?.address,
                });
                if (
                    !(await Permissions.hasPermissions(
                        this.origin,
                        ['viewAccount'],
                        existingPermission
                    )) ||
                    !existingPermission
                ) {
                    this.sendNotAllowedError(msg.id);
                } else {
                    this.sendAccounts([activeAccount.address], msg.id);
                }
            } else if (isSwitchAccount(payload)) {
                const existingPermission = await Permissions.getPermission({
                    origin: this.origin,
                    account: payload.address,
                });
                if (
                    !(await Permissions.hasPermissions(
                        this.origin,
                        ['switchAccount'],
                        existingPermission
                    )) ||
                    !existingPermission
                ) {
                    this.sendNotAllowedError(msg.id);
                } else {
                    const activeAddress = await this.setActiveAccount(
                        payload.address
                    );
                    this.sendAddress(activeAddress, msg.id);
                }
            } else if (isGetAccounts(payload)) {
                const activeAccount = await this.getActiveAccount();
                const existingPermission = await Permissions.getPermission({
                    origin: this.origin,
                    account: activeAccount?.address,
                });
                if (
                    !(await Permissions.hasPermissions(
                        this.origin,
                        ['viewAccount'],
                        existingPermission
                    )) ||
                    !existingPermission
                ) {
                    this.sendNotAllowedError(msg.id);
                } else {
                    const accountInfos = await this.getAccountInfos();
                    const addresses = accountInfos.map(
                        (accountInfo) => accountInfo.address
                    );
                    this.sendAccounts(addresses, msg.id);
                }
            } else if (isGetUrl(payload)) {
                const { accessToken, refreshToken } = payload;
                if (accessToken && refreshToken) {
                    await setSession({ accessToken, refreshToken });
                }

                openInNewTab('ui.html#/initialize/hosted/logging-in');
                this.send(
                    createMessage<OpenWalletResponse>(
                        {
                            type: 'open-wallet-response',
                            success: true,
                        },
                        msg.id
                    )
                );
            } else if (isGetAccountCustomizations(payload)) {
                const activeAccount = await this.getActiveAccount();
                const existingPermission = await Permissions.getPermission({
                    origin: this.origin,
                    account: activeAccount?.address,
                });

                if (
                    !(await Permissions.hasPermissions(
                        this.origin,
                        ['viewAccount'],
                        existingPermission
                    )) ||
                    !existingPermission
                ) {
                    this.sendNotAllowedError(msg.id);
                } else {
                    const accountInfos = await this.getAccountInfos();
                    const accountCustomizations: AccountCustomization[] = [];
                    for (const accountInfo of accountInfos) {
                        accountCustomizations.push({
                            address: accountInfo.address,
                            nickname: accountInfo.name || '',
                            color: accountInfo.color || '',
                            emoji: accountInfo.emoji || '',
                        });
                    }

                    this.sendAccountCustomizations(
                        accountCustomizations,
                        msg.id
                    );
                }
            } else if (isSetAccountCustomizations(payload)) {
                const activeAccount = await this.getActiveAccount();
                const existingPermission = await Permissions.getPermission({
                    origin: this.origin,
                    account: activeAccount?.address,
                });

                if (
                    !(await Permissions.hasPermissions(
                        this.origin,
                        ['setAccountCustomizations'],
                        existingPermission
                    )) ||
                    !existingPermission
                ) {
                    this.sendNotAllowedError(msg.id);
                } else {
                    this.setAccountCustomizations(
                        payload.accountCustomizations
                    );
                }
            } else if (isGetTheme(payload)) {
                const activeAccount = await this.getActiveAccount();
                const existingPermission = await Permissions.getPermission({
                    origin: this.origin,
                    account: activeAccount?.address,
                });

                if (
                    !(await Permissions.hasPermissions(
                        this.origin,
                        ['viewAccount'],
                        existingPermission
                    )) ||
                    !existingPermission
                ) {
                    this.sendNotAllowedError(msg.id);
                } else {
                    const theme = (await getLocal('theme')) as string;
                    this.sendTheme(theme, msg.id);
                }
            } else if (isGetContacts(payload)) {
                const activeAccount = await this.getActiveAccount();
                const existingPermission = await Permissions.getPermission({
                    origin: this.origin,
                    account: activeAccount?.address,
                });

                if (
                    !(await Permissions.hasPermissions(
                        this.origin,
                        ['viewContacts'],
                        existingPermission
                    )) ||
                    !existingPermission
                ) {
                    this.sendNotAllowedError(msg.id);
                } else {
                    const contacts = await this.getContacts();
                    this.sendContacts(contacts, msg.id);
                }
            } else if (isSetContacts(payload)) {
                const activeAccount = await this.getActiveAccount();
                const existingPermission = await Permissions.getPermission({
                    origin: this.origin,
                    account: activeAccount?.address,
                });

                if (
                    !(await Permissions.hasPermissions(
                        this.origin,
                        ['setContacts'],
                        existingPermission
                    )) ||
                    !existingPermission
                ) {
                    this.sendNotAllowedError(msg.id);
                } else {
                    this.setContacts(payload.contacts);
                }
            } else if (isGetFavorites(payload)) {
                const activeAccount = await this.getActiveAccount();
                const existingPermission = await Permissions.getPermission({
                    origin: this.origin,
                    account: activeAccount?.address,
                });

                if (
                    !(await Permissions.hasPermissions(
                        this.origin,
                        ['viewFavorites'],
                        existingPermission
                    )) ||
                    !existingPermission
                ) {
                    this.sendNotAllowedError(msg.id);
                } else {
                    const favorites = await this.getFavorites();
                    this.sendFavorites(favorites, msg.id);
                }
            } else if (isSetFavorites(payload)) {
                const activeAccount = await this.getActiveAccount();
                const existingPermission = await Permissions.getPermission({
                    origin: this.origin,
                    account: activeAccount?.address,
                });

                if (
                    !(await Permissions.hasPermissions(
                        this.origin,
                        ['setFavorites'],
                        existingPermission
                    )) ||
                    !existingPermission
                ) {
                    this.sendNotAllowedError(msg.id);
                } else {
                    this.setFavorites(payload.favorites);
                }
            } else if (isGetNetwork(payload)) {
                const network = await networkEnv.getActiveNetwork();
                this.sendNetwork(network, msg.id);
            } else if (isHasPermissionRequest(payload)) {
                const activeAccount = await this.getActiveAccount();

                this.send(
                    createMessage<HasPermissionsResponse>(
                        {
                            type: 'has-permissions-response',
                            result: await Permissions.hasPermissions(
                                this.origin,
                                payload.permissions,
                                null,
                                activeAccount?.address
                            ),
                        },
                        msg.id
                    )
                );
            } else if (isAcquirePermissionsRequest(payload)) {
                const activeAccount = await this.getActiveAccount();

                try {
                    const permission = await Permissions.acquirePermissions(
                        payload.permissions,
                        this,
                        activeAccount?.address
                    );
                    this.send(
                        createMessage<AcquirePermissionsResponse>(
                            {
                                type: 'acquire-permissions-response',
                                result: !!permission.allowed,
                            },
                            msg.id
                        )
                    );
                } catch (e) {
                    this.sendError(
                        {
                            error: true,
                            message: (e as Error).toString(),
                            code: -1,
                        },
                        msg.id
                    );
                }
            } else if (isExecuteTransactionRequest(payload)) {
                if (!payload.transaction.account) {
                    // make sure we don't execute transactions that doesn't have a specified account
                    throw new Error('Missing account');
                }
                await this.ensurePermissions(
                    ['viewAccount', 'suggestTransactions'],
                    payload.transaction.account
                );
                const result = await Transactions.executeOrSignTransaction(
                    { tx: payload.transaction },
                    this
                );
                this.send(
                    createMessage<ExecuteTransactionResponse>(
                        {
                            type: 'execute-transaction-response',
                            result: result as SuiTransactionBlockResponse,
                        },
                        msg.id
                    )
                );
            } else if (isSignTransactionRequest(payload)) {
                if (!payload.transaction.account) {
                    // make sure we don't execute transactions that doesn't have a specified account
                    throw new Error('Missing account');
                }
                await this.ensurePermissions(
                    ['viewAccount', 'suggestTransactions'],
                    payload.transaction.account
                );
                const result = await Transactions.executeOrSignTransaction(
                    { sign: payload.transaction },
                    this
                );
                this.send(
                    createMessage<SignTransactionResponse>(
                        {
                            type: 'sign-transaction-response',
                            result: result as SignedTransaction,
                        },
                        msg.id
                    )
                );
            } else if (isSignMessageRequest(payload) && payload.args) {
                await this.ensurePermissions(
                    ['viewAccount', 'suggestTransactions'],
                    payload.args.accountAddress
                );
                const result = await Transactions.signMessage(
                    payload.args,
                    this
                );
                this.send(
                    createMessage<SignMessageRequest>(
                        { type: 'sign-message-request', return: result },
                        msg.id
                    )
                );
            } else if (isPreapprovalRequest(payload)) {
                const allowed = await Permissions.hasPermissions(this.origin, [
                    'viewAccount',
                    'suggestTransactions',
                ]);
                if (allowed) {
                    try {
                        const result = await Transactions.requestPreapproval(
                            payload.preapproval,
                            this
                        );
                        this.send(
                            createMessage<PreapprovalResponse>(result, msg.id)
                        );
                    } catch (e) {
                        this.sendError(
                            {
                                error: true,
                                code: -1,
                                message: (e as Error).message,
                            },
                            msg.id
                        );
                    }
                } else {
                    this.sendNotAllowedError(msg.id);
                }
            } else if (isDisconnectRequest(payload)) {
                let success = true;
                try {
                    await Permissions.revokeAllPermissions(this.origin);
                } catch (e) {
                    success = false;
                }

                this.send(
                    createMessage<DisconnectResponse>(
                        {
                            type: 'disconnect-response',
                            success,
                        },
                        msg.id
                    )
                );
            }
        } catch (e) {
            this.sendError(
                {
                    error: true,
                    code: -1,
                    message: (e as Error).message,
                },
                msg.id
            );
        }
    }

    private getOrigin(port: Runtime.Port) {
        if (port.sender?.origin) {
            return port.sender.origin;
        }
        if (port.sender?.url) {
            return new URL(port.sender.url).origin;
        }
        throw new Error(
            "[ContentScriptConnection] port doesn't include an origin"
        );
    }

    private async getAccountInfos(): Promise<AccountInfo[]> {
        const accountInfosString = await getEncrypted({
            key: 'accountInfos',
            session: false,
            strong: false,
        });
        return JSON.parse(accountInfosString || '[]');
    }

    private async setAccountCustomizations(updates: AccountCustomization[]) {
        const accountInfosString = await getEncrypted({
            key: 'accountInfos',
            session: false,
            strong: false,
        });
        const accountInfos = JSON.parse(accountInfosString || '[]');
        const newAccountInfos = accountInfos.map((accountInfo: AccountInfo) => {
            const update = updates.find(
                (u) => u.address === accountInfo.address
            );

            if (!update) return accountInfo;

            return {
                ...accountInfo,
                ...update,
            };
        });

        await setEncrypted({
            key: 'accountInfos',
            value: JSON.stringify(newAccountInfos),
            session: false,
            strong: false,
        });
    }

    private async getContacts(): Promise<Contact[]> {
        const contactsString = await getEncrypted({
            key: 'contacts',
            session: false,
            strong: false,
        });
        return JSON.parse(contactsString || '[]');
    }

    private async setContacts(updates: Contact[]) {
        await setEncrypted({
            key: 'contacts',
            value: JSON.stringify(updates),
            session: false,
            strong: false,
        });
    }

    private async getFavorites(): Promise<string[]> {
        const favoritesString = await getEncrypted({
            key: 'favoriteDappsKeys',
            session: false,
            strong: false,
        });
        return JSON.parse(favoritesString || '[]');
    }

    private async setFavorites(updates: string[]) {
        await setEncrypted({
            key: 'favoriteDappsKeys',
            value: JSON.stringify(updates),
            session: false,
            strong: false,
        });
    }

    private async setActiveAccount(address: SuiAddress): Promise<SuiAddress> {
        const accountInfos = await this.getAccountInfos();
        const activeAccountIndex = accountInfos.findIndex(
            (a) => a.address === address
        );

        if (activeAccountIndex === -1) {
            const activeAccount = await this.getActiveAccount();
            return activeAccount.address;
        }

        await setEncrypted({
            key: 'activeAccountIndex',
            value: activeAccountIndex.toString(),
            session: false,
            strong: false,
        });

        return (
            accountInfos.find((a) => a.index === activeAccountIndex) ??
            accountInfos[0]
        ).address;
    }

    private async getActiveAccount(): Promise<AccountInfo> {
        const accountInfos = await this.getAccountInfos();

        const activeAccountIndex = parseInt(
            (await getEncrypted({
                key: 'activeAccountIndex',
                session: false,
                strong: false,
            })) || '0'
        );

        return (
            accountInfos.find((a) => a.index === activeAccountIndex) ??
            accountInfos[0]
        );
    }

    private sendError<Error extends ErrorPayload>(
        error: Error,
        responseForID?: string
    ) {
        this.send(createMessage(error, responseForID));
    }

    private sendNotAllowedError(requestID?: string) {
        this.sendError(
            {
                error: true,
                message:
                    "Operation not allowed, dapp doesn't have the required permissions",
                code: -2,
            },
            requestID
        );
    }

    private sendAccounts(accounts: SuiAddress[], responseForID?: string) {
        this.send(
            createMessage<GetAccountResponse>(
                {
                    type: 'get-account-response',
                    accounts,
                },
                responseForID
            )
        );
    }

    private sendAddress(address: SuiAddress, responseForID?: string) {
        this.send(
            createMessage<SwitchAccountResponse>(
                {
                    type: 'switch-account-response',
                    address,
                },
                responseForID
            )
        );
    }

    private sendAccountCustomizations(
        accountCustomizations: AccountCustomization[],
        responseForID?: string
    ) {
        this.send(
            createMessage<GetAccountCustomizationsResponse>(
                {
                    type: 'get-account-customizations-response',
                    accountCustomizations,
                },
                responseForID
            )
        );
    }

    private sendTheme(theme: string, responseForID?: string) {
        this.send(
            createMessage<GetThemeResponse>(
                {
                    type: 'get-theme-response',
                    theme,
                },
                responseForID
            )
        );
    }

    private sendContacts(contacts: Contact[], responseForID?: string) {
        this.send(
            createMessage<GetContactsResponse>(
                {
                    type: 'get-contacts-response',
                    contacts,
                },
                responseForID
            )
        );
    }

    private sendFavorites(favorites: string[], responseForID?: string) {
        this.send(
            createMessage<GetFavoritesResponse>(
                {
                    type: 'get-favorites-response',
                    favorites,
                },
                responseForID
            )
        );
    }

    private sendNetwork(network: NetworkEnvType, responseForID?: string) {
        this.send(
            createMessage<GetNetworkResponse>(
                {
                    type: 'get-network-response',
                    network,
                },
                responseForID
            )
        );
    }

    private async ensurePermissions(
        permissions: PermissionType[],
        account?: SuiAddress
    ) {
        const existingPermission = await Permissions.getPermission({
            origin: this.origin,
            account,
        });
        const allowed = await Permissions.hasPermissions(
            this.origin,
            permissions,
            existingPermission,
            account
        );
        if (!allowed || !existingPermission) {
            throw new Error(
                "Operation not allowed, dapp doesn't have the required permissions"
            );
        }
        return existingPermission;
    }
}
