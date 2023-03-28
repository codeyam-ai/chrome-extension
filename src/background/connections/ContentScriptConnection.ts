// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Connection } from './Connection';
import { DEFAULT_API_ENV } from '../../ui/app/ApiProvider';
import Authentication from '../Authentication';
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
} from '_payloads/transactions';
import Permissions from '_src/background/Permissions';
import Transactions from '_src/background/Transactions';
import { isGetAccountCustomizations } from '_src/shared/messaging/messages/payloads/account/GetAccountCustomizations';
import { type GetAccountCustomizationsResponse } from '_src/shared/messaging/messages/payloads/account/GetAccountCustomizationsResponse';
import { isGetNetwork } from '_src/shared/messaging/messages/payloads/account/GetNetwork';
import { isDisconnectRequest } from '_src/shared/messaging/messages/payloads/connections/DisconnectRequest';
import {
    isSignMessageRequest,
    type SignMessageRequest,
} from '_src/shared/messaging/messages/payloads/transactions/SignMessage';
import { isGetUrl } from '_src/shared/messaging/messages/payloads/url/OpenWallet';
import { getLocal, getEncrypted } from '_src/shared/storagex/store';
import { openInNewTab } from '_src/shared/utils';
import { type AccountCustomization } from '_src/types/AccountCustomization';
import { type AccountInfo } from '_src/ui/app/KeypairVault';

import type { SuiAddress, SuiTransactionBlockResponse } from '@mysten/sui.js';
import type { Message } from '_messages';
import type { PortChannelName } from '_messaging/PortChannelName';
import type { ErrorPayload } from '_payloads';
import type { GetAccountResponse } from '_payloads/account/GetAccountResponse';
import type { GetNetworkResponse } from '_src/shared/messaging/messages/payloads/account/GetNetworkResponse';
import type { DisconnectResponse } from '_src/shared/messaging/messages/payloads/connections/DisconnectResponse';
import type { OpenWalletResponse } from '_src/shared/messaging/messages/payloads/url/OpenWalletResponse';
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

        if (isGetAccount(payload)) {
            const existingPermission = await Permissions.getPermission(
                this.origin
            );
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
                this.sendAccounts(existingPermission.accounts, msg.id);
            }
        } else if (isGetUrl(payload)) {
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

            this.sendAccountCustomizations(accountCustomizations, msg.id);
        } else if (isGetNetwork(payload)) {
            const network = (await getLocal('sui_Env')) || DEFAULT_API_ENV;
            this.sendNetwork(network, msg.id);
        } else if (isHasPermissionRequest(payload)) {
            this.send(
                createMessage<HasPermissionsResponse>(
                    {
                        type: 'has-permissions-response',
                        result: await Permissions.hasPermissions(
                            this.origin,
                            payload.permissions
                        ),
                    },
                    msg.id
                )
            );
        } else if (isAcquirePermissionsRequest(payload)) {
            try {
                const permission = await Permissions.acquirePermissions(
                    payload.permissions,
                    this
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
        } else if (isSignMessageRequest(payload) && payload.args) {
            await this.ensurePermissions(
                ['viewAccount', 'suggestTransactions'],
                payload.args.accountAddress
            );
            const result = await Transactions.signMessage(payload.args, this);
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
        const locked = await getEncrypted({ key: 'locked', session: false });
        if (locked) {
            throw new Error('Wallet is locked');
        }
        const passphrase = await getEncrypted({
            key: 'passphrase',
            session: true,
        });
        const authentication = await getEncrypted({
            key: 'authentication',
            session: true,
        });
        let accountInfos;
        if (authentication) {
            Authentication.set(authentication);
            accountInfos = await Authentication.getAccountInfos();
        } else {
            const accountInfosString = await getEncrypted({
                key: 'accountInfos',
                session: false,
                passphrase: (passphrase || authentication) as string,
            });
            accountInfos = JSON.parse(accountInfosString || '[]');
        }

        return accountInfos;
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

    private sendNetwork(network: string | number, responseForID?: string) {
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
        const existingPermission = await Permissions.getPermission(this.origin);
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
