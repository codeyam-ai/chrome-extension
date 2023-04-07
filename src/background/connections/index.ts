// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import Browser from 'webextension-polyfill';

import { ContentScriptConnection } from './ContentScriptConnection';
import { UiConnection } from './UiConnection';

import type { Connection } from './Connection';

export class Connections {
    private _connections: Connection[] = [];

    private _uiConnection: UiConnection | null = null;

    getUiConnection(): UiConnection | null {
        return this._uiConnection;
    }

    constructor() {
        Browser.runtime.onConnect.addListener((port) => {
            // Note: in tests this may get called multiple times. Each call is with a fresh Port, so multiple
            // Connection objects will not get created with the same Port. Still, it seems weird to be accruing
            // all these Connection object in this._connections. We should probably have an explicit initializer
            // in the background service that creates a new Connections every time.
            try {
                let connection: Connection;
                switch (port.name) {
                    case ContentScriptConnection.CHANNEL:
                        connection = new ContentScriptConnection(port);
                        break;
                    case UiConnection.CHANNEL:
                        connection = new UiConnection(port);
                        this._uiConnection = connection as UiConnection;
                        break;
                    default:
                        throw new Error(
                            `[Connections] Unknown connection ${port.name}`
                        );
                }

                this._connections.push(connection);
                connection.onDisconnect.subscribe(() => {
                    const connectionIndex =
                        this._connections.indexOf(connection);
                    if (connectionIndex >= 0) {
                        this._connections.splice(connectionIndex, 1);
                    }
                });
            } catch (e) {
                port.disconnect();
            }
        });
    }
}
