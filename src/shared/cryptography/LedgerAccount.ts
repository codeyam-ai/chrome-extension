// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { normalizeSuiAddress, type SuiAddress } from '@mysten/sui.js';

export type SerializedLedgerAccount = {
    address: SuiAddress;
    derivationPath: string;
};

export class LedgerAccount {
    readonly address: SuiAddress;
    readonly derivationPath: string;

    constructor({
        address,
        derivationPath,
    }: {
        address: SuiAddress;
        derivationPath: string;
    }) {
        this.address = normalizeSuiAddress(address);
        this.derivationPath = derivationPath;
    }

    toJSON(): SerializedLedgerAccount {
        return {
            address: this.address,
            derivationPath: this.derivationPath,
        };
    }
}
