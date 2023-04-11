// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { filter, map } from 'rxjs';

import { mapToPromise } from './utils';
import { createMessage } from '_messages';
import { WindowMessageStream } from '_messaging/WindowMessageStream';
import { ALL_PERMISSION_TYPES } from '_payloads/permissions';
import { type GetAccountCustomizations } from '_src/shared/messaging/messages/payloads/account/GetAccountCustomizations';
import { type GetAccountCustomizationsResponse } from '_src/shared/messaging/messages/payloads/account/GetAccountCustomizationsResponse';
import { type AccountCustomization } from '_src/types/AccountCustomization';

import type { SuiAddress } from '@mysten/sui.js';
import type { Payload } from '_payloads';
import type { GetAccount } from '_payloads/account/GetAccount';
import type { GetAccountResponse } from '_payloads/account/GetAccountResponse';
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
} from '_payloads/transactions';
import type { GetNetwork } from '_src/shared/messaging/messages/payloads/account/GetNetwork';
import type { GetNetworkResponse } from '_src/shared/messaging/messages/payloads/account/GetNetworkResponse';
import type { DisconnectRequest } from '_src/shared/messaging/messages/payloads/connections/DisconnectRequest';
import type { DisconnectResponse } from '_src/shared/messaging/messages/payloads/connections/DisconnectResponse';
import type { Preapproval } from '_src/shared/messaging/messages/payloads/transactions/Preapproval';
import type { OpenWallet } from '_src/shared/messaging/messages/payloads/url/OpenWallet';
import type { OpenWalletResponse } from '_src/shared/messaging/messages/payloads/url/OpenWalletResponse';
import type { Observable } from 'rxjs';

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

    public getAccountCustomizations(): Promise<AccountCustomization[]> {
        return mapToPromise(
            this.send<
                GetAccountCustomizations,
                GetAccountCustomizationsResponse
            >({
                type: 'get-account-customizations',
            }),
            (response) => response.accountCustomizations
        );
    }

    // public syncAccountCustomizations(): Promise<AccountCustomization[]> {
    //     return mapToPromise(
    //         this.send<
    //             GetAccountCustomizations,
    //             GetAccountCustomizationsResponse
    //         >({
    //             type: 'sync-account-customizations',
    //         }),
    //         (response) => response.accountCustomizations
    //     );
    // }

    public getNetwork(): Promise<string | number> {
        return mapToPromise(
            this.send<GetNetwork, GetNetworkResponse>({
                type: 'get-network',
            }),
            (response) => response.network
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
