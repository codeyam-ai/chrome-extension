import {
    toSerializedSignature,
    type SerializedSignature,
} from '@mysten/sui.js/cryptography';
import { blake2b } from '@noble/hashes/blake2b';

import { WalletSigner } from './WalletSigner';

import type { SuiClient } from '@mysten/sui.js/client';
import type { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';

export class BaseSigner extends WalletSigner {
    private readonly keypair: Ed25519Keypair;

    constructor(keypair: Ed25519Keypair, client: SuiClient) {
        super(client);
        this.keypair = keypair;
    }

    async getAddress(): Promise<string> {
        return this.keypair.getPublicKey().toSuiAddress();
    }

    async signData(
        data: Uint8Array,
        clientIdentifier?: string
    ): Promise<SerializedSignature> {
        const digest = blake2b(data, { dkLen: 32 });

        const signature = await this.keypair.signData(digest);
        const publicKey = await this.keypair.getPublicKey();

        return toSerializedSignature({
            signature,
            signatureScheme: 'ED25519',
            publicKey,
        });
    }

    connect(client: SuiClient): WalletSigner {
        return new BaseSigner(this.keypair, client);
    }
}
