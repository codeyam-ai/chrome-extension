import { type SerializedSignature } from '@mysten/sui.js';
import {
    type Ed25519Keypair,
    type Ed25519PublicKey,
} from '@mysten/sui.js/keypairs/ed25519';

import { WalletSigner } from './WalletSigner';

import type { SuiClient } from '@mysten/sui.js/client';

export class ZkSigner extends WalletSigner {
    ephemeralKeyPair: Ed25519Keypair;

    constructor(ephemeralKeyPair: Ed25519Keypair, client: SuiClient) {
        super(client);
        this.ephemeralKeyPair = ephemeralKeyPair;
    }

    async getAddress(): Promise<string> {
        return this.ephemeralKeyPair.toSuiAddress();
    }

    async getPublicKey(): Promise<Ed25519PublicKey> {
        return this.ephemeralKeyPair.getPublicKey();
    }

    async signData(data: Uint8Array): Promise<SerializedSignature> {
        throw new Error('Not implemented');
    }

    connect(client: SuiClient): WalletSigner {
        return new ZkSigner(this.ephemeralKeyPair, client);
    }
}
