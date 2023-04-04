import {Runtime, Tabs} from 'webextension-polyfill';

import type { Events } from 'webextension-polyfill/namespaces/events';

import Port = Runtime.Port;
import ConnectConnectInfoType = Tabs.ConnectConnectInfoType;

export class FakeConnections {
    onConnect = new FakeEvent();
    connect(info: ConnectConnectInfoType) {
        // each side of the connection gets its own Port, but each has to know how to call into the other side
        // by invoking the other's onMessage.
        const connectingSideOnMessage = new FakeEvent();
        const listeningSideOnMessage = new FakeEvent();
        const name = info.name || 'nameless connection'
        this.onConnect.listeners.forEach((listener) => {
            listener(
                new FakePort(name, listeningSideOnMessage, connectingSideOnMessage)
            );
        });
        return new FakePort(name, connectingSideOnMessage, listeningSideOnMessage);
    }
}

export class FakeEvent<T extends (...args: any[]) => any>
    implements Events.Event<T>
{
    listeners: T[] = [];
    addListener(callback: T, ...params: any[]): void {
        this.listeners.push(callback);
    }

    hasListener(callback: T): boolean {
        return false;
    }

    hasListeners(): boolean {
        return this.listeners.length > 0;
    }

    removeListener(callback: T): void {}
}

export class FakePort implements Port {
    name: string;
    onDisconnect: Events.Event<(port: Runtime.Port) => void> = new FakeEvent();
    onMessage: FakeEvent<(message: any, port: Runtime.Port) => void> =
        new FakeEvent();
    onMessageForSending: FakeEvent<(message: any, port: Runtime.Port) => void> =
        new FakeEvent();

    constructor(
        name: string,
        onMessageForReceiving: FakeEvent<
            (message: any, port: Runtime.Port) => void
        >,
        onMessageForSending: FakeEvent<
            (message: any, port: Runtime.Port) => void
        >
    ) {
        this.name = name;
        this.onMessage = onMessageForReceiving;
        this.onMessageForSending = onMessageForSending;
    }

    disconnect(): void {
        //
    }

    postMessage(message: any): void {
        this.onMessageForSending.listeners.forEach((listener) => {
            listener(message, this);
        });
    }
}
