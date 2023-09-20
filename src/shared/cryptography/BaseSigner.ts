import {
    toSerializedSignature,
    type SerializedSignature,
} from '@mysten/sui.js/cryptography';


import { WalletSigner } from './WalletSigner';

import type { SuiClient } from '@mysten/sui.js/client';
import type { Ed25519Keypair } from '@mysten/sui.js/dist/cjs/keypairs/ed25519';

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
        const signature = await this.keypair.signData(data);
        const pubKey = await this.keypair.getPublicKey();
        return toSerializedSignature({
            signature,
            signatureScheme: 'ED25519',
            pubKey,
        });
    }

    connect(client: SuiClient): WalletSigner {
        return new BaseSigner(this.keypair, client);
    }
}
