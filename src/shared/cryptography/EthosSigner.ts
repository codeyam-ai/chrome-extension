import {
    Ed25519PublicKey,
    SignerWithProvider,
    toB64,
    fromB64,
} from '@mysten/sui.js';

import { deleteEncrypted } from '../storagex/store';
import { simpleApiCall } from '_src/shared/utils/simpleApiCall';

import type {
    SignaturePubkeyPair,
    SuiAddress,
    Provider,
    TxnDataSerializer,
} from '@mysten/sui.js';

export class EthosSigner extends SignerWithProvider {
    private readonly accessToken: string;
    private readonly address: SuiAddress;

    constructor(
        address: SuiAddress,
        accessToken: string,
        provider?: Provider,
        serializer?: TxnDataSerializer
    ) {
        super(provider, serializer);
        this.address = address;
        this.accessToken = accessToken;
    }

    async getAddress(): Promise<SuiAddress> {
        return this.address;
    }

    async signData(data: Uint8Array): Promise<SignaturePubkeyPair> {
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
            await deleteEncrypted('authentication');
            throw new Error(`Signing error: ${status}`);
        }

        const { signedTransaction } = json;

        return {
            signatureScheme: 'ED25519',
            signature: fromB64(signedTransaction.signature),
            pubKey: new Ed25519PublicKey(fromB64(signedTransaction.pubKey)),
        };
    }

    connect(provider: Provider): SignerWithProvider {
        return new EthosSigner(this.address, this.accessToken, provider);
    }
}
