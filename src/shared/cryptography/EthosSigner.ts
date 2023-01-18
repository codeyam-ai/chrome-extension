import {
    Base64DataBuffer,
    Ed25519PublicKey,
    SignerWithProvider,
} from '@mysten/sui.js';

import { deleteEncrypted } from '../storagex/store';
import simpleApiCall from '_src/shared/utils/simpleApiCall';

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

    async signData(data: Base64DataBuffer): Promise<SignaturePubkeyPair> {
        const { json, status } = await simpleApiCall(
            'transaction/sign',
            'POST',
            this.accessToken || '',
            {
                network: 'sui',
                walletAddress: this.address,
                txOrMessage: {
                    id: 0,
                    transaction: data.toString(),
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
            signature: new Base64DataBuffer(signedTransaction.signature),
            pubKey: new Ed25519PublicKey(signedTransaction.pubKey),
        };
    }

    connect(provider: Provider): SignerWithProvider {
        return new EthosSigner(this.address, this.accessToken, provider);
    }
}
