import { toB64 } from '@mysten/bcs';
import { SignerWithProvider } from '@mysten/sui.js';

import { deleteEncrypted } from '../storagex/store';
import { simpleApiCall } from '_src/shared/utils/simpleApiCall';

import type { SuiClient } from '@mysten/sui.js/client';
import type { SerializedSignature } from '@mysten/sui.js/cryptography';

export class EthosSigner extends SignerWithProvider {
    private readonly accessToken: string;
    private readonly address: string;

    constructor(address: string, accessToken: string, client: SuiClient) {
        super(client);
        this.address = address;
        this.accessToken = accessToken;
    }

    async getAddress(): Promise<string> {
        return this.address;
    }

    async signData(data: Uint8Array): Promise<SerializedSignature> {
        const { json, status } = await simpleApiCall(
            'transactions/sign',
            'POST',
            this.accessToken || '',
            {
                network: 'sui',
                walletAddress: this.address,
                dataToSign: toB64(data),
            }
        );

        if (status !== 200) {
            await deleteEncrypted({
                key: 'authentication',
                session: true,
                strong: false,
            });
            throw new Error(`Signing error: ${status}`);
        }

        const { signature } = json;

        return signature;
    }

    connect(client: SuiClient): SignerWithProvider {
        return new EthosSigner(this.address, this.accessToken, client);
    }
}
