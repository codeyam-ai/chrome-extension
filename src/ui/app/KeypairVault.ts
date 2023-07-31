// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { fromB64 } from '@mysten/bcs';

import { getKeypairFromMnemonics } from '_shared/cryptography/mnemonics';

import type { Ed25519Keypair } from '@mysten/sui.js';
import type { AccountCustomization } from '_src/types/AccountCustomization';

export type AccountInfo = AccountCustomization & {
    index: number;
    address: string;
    chain?: string;
    importedMnemonicName?: string;
    importedMnemonicIndex?: number;
    importedPrivateKeyName?: string;
    importedLedgerIndex?: number; // migrating away - do not use - remove after 6/15/2023 (search for this date for related code)
    ledgerAccountIndex?: number;
    ledgerAccountVerified?: boolean;
    publicKey: string | null;
};

export type SeedInfo = {
    address: string;
    seed: string;
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
        const keypair = getKeypairFromMnemonics(this._mnemonic, index);
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

        const b64Seed = getKeypairFromMnemonics(this._mnemonic, index).export()
            .privateKey;
        return fromB64(b64Seed);
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
