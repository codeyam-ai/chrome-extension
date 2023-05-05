// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { normalizeSuiAddress, type SuiAddress } from '@mysten/sui.js';

export type SerializedLedgerAccount = {
    address: SuiAddress;
    derivationPath: string;
    index: number;
};

export class LedgerAccount {
    readonly address: SuiAddress;
    readonly derivationPath: string;
    readonly index: number;

    constructor({
        address,
        derivationPath,
        index,
    }: {
        address: SuiAddress;
        derivationPath: string;
        index: number;
    }) {
        this.address = normalizeSuiAddress(address);
        this.derivationPath = derivationPath;
        this.index = index;
    }

    toJSON(): SerializedLedgerAccount {
        return {
            address: this.address,
            derivationPath: this.derivationPath,
            index: this.index,
        };
    }
}
