// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { normalizeSuiAddress } from '@mysten/sui.js/utils';

export type SerializedLedgerAccount = {
    address: string;
    derivationPath: string;
    index: number;
    publicKey: string | null;
};

export class LedgerAccount {
    readonly address: string;
    readonly derivationPath: string;
    readonly index: number;
    #publicKey: string | null;

    constructor({
        address,
        derivationPath,
        index,
        publicKey,
    }: {
        address: string;
        derivationPath: string;
        index: number;
        publicKey: string | null;
    }) {
        this.address = normalizeSuiAddress(address);
        this.derivationPath = derivationPath;
        this.index = index;
        this.#publicKey = publicKey;
    }

    toJSON(): SerializedLedgerAccount {
        return {
            address: this.address,
            derivationPath: this.derivationPath,
            index: this.index,
            publicKey: this.#publicKey,
        };
    }

    getPublicKey() {
        return this.#publicKey;
    }

    setPublicKey(publicKey: string) {
        this.#publicKey = publicKey;
    }
}
