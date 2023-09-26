import { toB64 } from '@mysten/bcs';

import { WalletSigner } from './WalletSigner';
import { deleteEncrypted } from '../storagex/store';
import { simpleApiCall } from '_src/shared/utils/simpleApiCall';

import type { SuiClient } from '@mysten/sui.js/client';

export class EthosSigner extends WalletSigner {
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

    async signData(
        data: Uint8Array,
        clientIdentifier?: string
    ): Promise<string> {
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

    connect(client: SuiClient): WalletSigner {
        return new EthosSigner(this.address, this.accessToken, client);
    }
}
