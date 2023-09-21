import {
    toSerializedSignature,
    type SerializedSignature,
    IntentScope,
} from '@mysten/sui.js/cryptography';

import { WalletSigner } from './WalletSigner';

import type { SuiClient } from '@mysten/sui.js/client';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { fromB64, toB64 } from '@mysten/sui.js/utils';
import { verifyPersonalMessage } from '@mysten/sui.js/verify';

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
        // const message = 'Hello';
        // const messageBytes = new TextEncoder().encode(message);
        // const keypair = Ed25519Keypair.generate();
        // // const signature = await keypair.signWithIntent(
        // //     messageBytes,
        // //     IntentScope.PersonalMessage
        // // ); // Error: Signing message failed with the following error Unsupported signature scheme
        // // const signaturex = await keypair.signPersonalMessage(messageBytes); // Error: Signing message failed with the following error Unable to parse a zk signature. (not implemented yet)
        // // const signaturey = await keypair.sign(messageBytes); // Error: Signing message failed with the following error Unsupported signature scheme
        // const signaturez = await keypair.signData(messageBytes); //Error: Signing message failed with the following error Unsupported signature scheme
        // const publicKey = await keypair.getPublicKey();
        // const verifiedPublicKey = await verifyPersonalMessage(
        //     messageBytes,
        //     toB64(signaturez)
        // );
        // console.log(
        //     'VERIFIED',
        //     publicKey.toSuiAddress(),
        //     verifiedPublicKey.toSuiAddress()
        // );

        const signature = await this.keypair.signData(data);
        const publicKey = await this.keypair.getPublicKey();
        // const publicKey2 = await verifyPersonalMessage(data, signature.bytes);
        // console.log(
        //     'DATA',
        //     data,
        //     signature,
        //     publicKey.toSuiAddress(),
        //     publicKey2.toSuiAddress(),
        //     toSerializedSignature({
        //         signature: fromB64(signature.bytes),
        //         signatureScheme: 'ED25519',
        //         publicKey,
        //     })
        // );
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
