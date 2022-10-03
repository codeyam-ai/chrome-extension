// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Ed25519Keypair } from '@mysten/sui.js';

import {
    getKeypairFromMnemonics,
    getSeedFromMnemonics,
} from '_shared/cryptography/mnemonics';

export type AccountInfo = {
    index: number;
    address: string;
    seed: string;
    name?: string;
    color?: string;
    chain?: string;
};

export default class KeypairVault {
    private _activeIndex = 0;
    private _mnemonic = '';
    private _keypairs: Record<string, Ed25519Keypair> | null = null;

    public set mnemonic(mnemonic: string) {
        this._mnemonic = mnemonic;
        if (!this._keypairs) {
            this._keypairs = {};
        }
    }

    public addKeyPair(index: number): Ed25519Keypair {
        if (!this._keypairs) {
            throw new Error('Account mnemonic is not set');
        }

        const key = index.toString();
        const keypair = new Ed25519Keypair(
            getKeypairFromMnemonics(this._mnemonic, index)
        );
        this._keypairs[key] = keypair;
        return keypair;
    }

    public getAddress(index?: number): string | null {
        if (!this._keypairs) {
            throw new Error('Account mnemonic is not set');
        }

        if (index === undefined) {
            index = this._activeIndex;
        } else {
            this._activeIndex = index;
        }

        const keypair = this.getKeyPair(index);
        let address = keypair.getPublicKey().toSuiAddress() || null;
        if (address && !address.startsWith('0x')) {
            address = `0x${address}`;
        }
        return address;
    }

    public getSeed(index?: number): Uint8Array | null {
        if (!this._keypairs) {
            throw new Error('Account mnemonic is not set');
        }

        if (index === undefined) {
            index = this._activeIndex;
        } else {
            this._activeIndex = index;
        }

        return getSeedFromMnemonics(this._mnemonic, index);
    }

    public setActiveIndex(index: number): void {
        this._activeIndex = index;
    }

    public getAddresses(): string[] {
        if (!this._keypairs) {
            throw new Error('Account mnemonic is not set');
        }

        const addresses: string[] = [];
        const indices = Object.keys(this._keypairs)
            .map((key) => parseInt(key))
            .sort();
        for (const index of indices) {
            const address = this.getAddress(index);
            if (address) {
                addresses.push(address);
            }
        }

        return addresses;
    }

    public getKeyPair(index?: number) {
        if (!this._keypairs) {
            throw new Error('Account mnemonic is not set');
        }

        if (index === undefined) {
            index = this._activeIndex;
        } else {
            this._activeIndex = index;
        }

        const key = index.toString();
        let keypair = this._keypairs[key];
        if (!keypair) {
            keypair = this.addKeyPair(index);
        }
        return keypair;
    }
}
