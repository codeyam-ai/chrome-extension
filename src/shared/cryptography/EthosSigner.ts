import { toB64 } from '@mysten/bcs';
import { SignerWithProvider } from '@mysten/sui.js';

import { deleteEncrypted } from '../storagex/store';
import { simpleApiCall } from '_src/shared/utils/simpleApiCall';

import type {
    SerializedSignature,
    SuiAddress,
    JsonRpcProvider,
} from '@mysten/sui.js';

export class EthosSigner extends SignerWithProvider {
    private readonly accessToken: string;
    private readonly address: SuiAddress;

    constructor(
        address: SuiAddress,
        accessToken: string,
        provider: JsonRpcProvider
    ) {
        super(provider);
        this.address = address;
        this.accessToken = accessToken;
    }

    async getAddress(): Promise<SuiAddress> {
        return this.address;
    }

    async signData(data: Uint8Array): Promise<SerializedSignature> {
        const { json, status } = await simpleApiCall(
            'transaction/sign',
            'POST',
            this.accessToken || '',
            {
                network: 'sui',
                walletAddress: this.address,
                txOrMessage: {
                    id: 0,
                    transaction: toB64(data),
                },
            }
        );

        if (status !== 200) {
            await deleteEncrypted({ key: 'authentication', session: true });
            throw new Error(`Signing error: ${status}`);
        }

        const { serializedSignature } = json;

        return serializedSignature;
    }

    connect(provider: JsonRpcProvider): SignerWithProvider {
        return new EthosSigner(this.address, this.accessToken, provider);
    }
}
