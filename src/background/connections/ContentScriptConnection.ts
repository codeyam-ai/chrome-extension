// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import Messages from '../Messages';
import { Connection } from './Connection';
import { createMessage } from '_messages';
import { isGetAccount } from '_payloads/account/GetAccount';
import {
    isAcquirePermissionsRequest,
    isHasPermissionRequest,
} from '_payloads/permissions';
import {
    isPreapprovalRequest,
    isExecuteTransactionRequest,
} from '_payloads/transactions';
import Permissions from '_src/background/Permissions';
import Transactions from '_src/background/Transactions';
import { isDisconnectRequest } from '_src/shared/messaging/messages/payloads/connections/DisconnectRequest';
import { isExecuteSignMessageRequest } from '_src/shared/messaging/messages/payloads/messages/ExecuteSignMessageRequest';
import { isGetUrl } from '_src/shared/messaging/messages/payloads/url/OpenWallet';
import { openInNewTab } from '_src/shared/utils';

import type { SuiAddress } from '@mysten/sui.js';
import type { Message } from '_messages';
import type { PortChannelName } from '_messaging/PortChannelName';
import type { ErrorPayload } from '_payloads';
import type { GetAccountResponse } from '_payloads/account/GetAccountResponse';
import type {
    HasPermissionsResponse,
    AcquirePermissionsResponse,
} from '_payloads/permissions';
import type {
    PreapprovalResponse,
    ExecuteTransactionResponse,
} from '_payloads/transactions';
import type { DisconnectResponse } from '_src/shared/messaging/messages/payloads/connections/DisconnectResponse';
import type { ExecuteSignMessageResponse } from '_src/shared/messaging/messages/payloads/messages/ExecuteSignMessageResponse';
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
            openInNewTab('ui.html#/initialize/hosted?log-in=true');
            this.send(
                createMessage<OpenWalletResponse>(
                    {
                        type: 'open-wallet-response',
                        success: true,
                    },
                    msg.id
                )
            );
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
            const allowed = await Permissions.hasPermissions(this.origin, [
                'viewAccount',
                'suggestTransactions',
            ]);
            if (allowed) {
                try {
                    const result = await Transactions.executeTransaction(
                        payload.transaction,
                        this
                    );
                    this.send(
                        createMessage<ExecuteTransactionResponse>(
                            { type: 'execute-transaction-response', result },
                            msg.id
                        )
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
        } else if (isExecuteSignMessageRequest(payload)) {
            const allowed = await Permissions.hasPermissions(this.origin, [
                'viewAccount',
                'suggestSignMessages',
            ]);

            if (allowed) {
                try {
                    const signature = await Messages.signMessage(
                        payload.messageData,
                        payload.messageString,
                        this
                    );
                    this.send(
                        createMessage<ExecuteSignMessageResponse>(
                            {
                                type: 'execute-sign-message-response',
                                signature,
                            },
                            msg.id
                        )
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
}
