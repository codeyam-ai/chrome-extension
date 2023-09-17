import { 
    toSerializedSignature, 
    type Keypair, 
    type SerializedSignature 
} from '@mysten/sui.js/cryptography';

import { WalletSigner } from './WalletSigner';

import type { SuiClient } from '@mysten/sui.js/client';

export class BaseSigner extends WalletSigner {
    private readonly keypair: Keypair;

    constructor(keypair: Keypair, client: SuiClient) {
        super(client);
        this.keypair = keypair;
    }

    async getAddress(): Promise<string> {
        return this.keypair.toSuiAddress();
    }

    async signData(data: Uint8Array, clientIdentifier?: string): Promise<SerializedSignature> {
        const signature = await this.keypair.sign(data);
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
