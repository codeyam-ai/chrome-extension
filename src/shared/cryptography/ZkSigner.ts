import { toSerializedSignature } from '@mysten/sui.js/cryptography';
import { type Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { genAddressSeed, getZkSignature } from '@mysten/zklogin';
import { blake2b } from '@noble/hashes/blake2b';
import { decodeJwt } from 'jose';

import { WalletSigner } from './WalletSigner';
import { obfuscate } from './keystore';
import { getEncrypted } from '../storagex/store';
import { type NetworkEnvType } from '_src/background/NetworkEnv';
import { fromExportedKeypair } from '_src/ui/app/components/zklogin/from-exported-keypair';
import { type ZkProvider } from '_src/ui/app/components/zklogin/providers';

import type { SuiClient } from '@mysten/sui.js/client';
import type {
    ExportedKeypair,
    SerializedSignature,
} from '@mysten/sui.js/cryptography';
import type { ZkSignatureInputs } from '@mysten/zklogin/dist/cjs/bcs';
import type {
    ProofResponse,
    ZkData,
} from '_src/ui/app/components/zklogin/ZKLogin';

type JwtSerializedClaims = {
    email: string | null;
    fullName: string | null;
    firstName: string | null;
    lastName: string | null;
    picture: string | null;
    aud: string;
    iss: string;
    sub: string;
};

type CredentialData = {
    exportedKeypair: ExportedKeypair;
    proof: ProofResponse;
    minEpoch: number;
    maxEpoch: number;
    network: NetworkEnvType;
    randomness: string;
    jwt: string;
};

/*
    For ZkAccountSerialized, the mysten codebase this extends `SerializedAccount`, which is the object that
    gets stored to local storage. It has public key, nickname, etc. We're using the
    Account slice instead. However for now I pasted in the required types (AccountType, SerializedAccount)
*/
// THIS IS FROM THE SUI WALLET
export type AccountType =
    | 'mnemonic-derived'
    | 'imported'
    | 'ledger'
    | 'qredo'
    | 'zk';
// THIS IS FROM THE SUI WALLET
export interface SerializedAccount {
    readonly id: string;
    readonly type: AccountType;
    readonly address: string;
    readonly publicKey: string | null;
    readonly lastUnlockedOn: number | null;
    /**
     * indicates if it's the selected account in the UI (active account)
     */
    readonly selected: boolean;
    readonly nickname: string | null;
    readonly createdAt: number;
}
export interface ZkAccountSerialized extends SerializedAccount {
    type: 'zk';
    provider: ZkProvider;
    /**
     * the salt used to create the account obfuscated
     */
    salt: string;
    /**
     * obfuscated data that contains user info as it was in jwt
     */
    claims: string;
}

export class ZkSigner extends WalletSigner {
    ephemeralKeyPair: Ed25519Keypair;
    address: string | undefined;
    claims: JwtSerializedClaims | undefined;
    zkData: ZkData;

    constructor({ zkData, client }: { zkData: ZkData; client: SuiClient }) {
        super(client);
        this.ephemeralKeyPair = zkData.ephemeralKeyPair;
        this.zkData = zkData;
        this.createNew({ provider: 'google', zkData });
    }

    private async createNew({
        provider,
        zkData,
    }: {
        provider: ZkProvider;
        zkData: ZkData;
    }): Promise<Omit<ZkAccountSerialized, 'id'>> {
        const jwt = zkData.jwt;
        const decodedJWT = decodeJwt(jwt);
        if (!decodedJWT.sub || !decodedJWT.iss || !decodedJWT.aud) {
            throw new Error('Missing jwt data');
        }
        if (Array.isArray(decodedJWT.aud)) {
            throw new Error(
                'Not supported aud. Aud is an array, string was expected.'
            );
        }
        const aud = decodedJWT.aud;
        const claims: JwtSerializedClaims = {
            email: String(decodedJWT.email || '') || null,
            fullName: String(decodedJWT.name || '') || null,
            firstName: String(decodedJWT.given_name || '') || null,
            lastName: String(decodedJWT.family_name || '') || null,
            picture: String(decodedJWT.picture || '') || null,
            aud,
            iss: decodedJWT.iss,
            sub: decodedJWT.sub,
        };

        this.claims = claims;
        const address = zkData.address;

        this.address = address;

        return Promise.resolve({
            type: 'zk',
            address: address,
            claims: await obfuscate(claims),
            salt: await obfuscate(zkData.salt.toString()),
            provider,
            publicKey: null,
            lastUnlockedOn: null,
            selected: false,
            nickname: claims.email || null,
            createdAt: Date.now(),
        });
    }

    async getAddress(): Promise<string> {
        return this.address || '';
    }

    async signData(data: Uint8Array): Promise<SerializedSignature | any> {
        const digest = blake2b(data, { dkLen: 32 });

        // Currently the SUI wallet saves the CredentialData in a Record with keys being 'mainnet', 'testnet' etc
        // But that errors out in their code so for now going to save just CredentialData
        const credentialsData = await this.getEphemeralValue();
        if (!credentialsData) {
            throw new Error('No credentials data found');
        }

        const { exportedKeypair, proof, maxEpoch, jwt } = credentialsData;

        const keyPair = fromExportedKeypair(exportedKeypair);

        if (!proof) throw 'no proofs stored';
        if (!this.address) throw 'no address stored';
        if (!this.claims) throw 'no claims stored';

        const userSignature = toSerializedSignature({
            signature: await keyPair.sign(digest),
            signatureScheme: keyPair.getKeyScheme(),
            publicKey: keyPair.getPublicKey(),
        });

        const decodedJWT = decodeJwt(jwt);

        const aud = Array.isArray(decodedJWT.aud)
            ? decodedJWT.aud.at(0)
            : decodedJWT.aud;

        const inputs: ZkSignatureInputs = {
            ...proof,
            addressSeed: genAddressSeed(
                this.zkData.salt,
                'sub',
                decodedJWT.sub ?? '',
                aud ?? ''
            ).toString(),
        };

        const zkSig = getZkSignature({ inputs, maxEpoch, userSignature });

        return zkSig;
    }

    connect(client: SuiClient): WalletSigner {
        return new ZkSigner({ zkData: this.zkData, client });
    }

    protected async getEphemeralValue(): Promise<CredentialData | null> {
        const rawCredentialsData = await getEncrypted({
            key: 'zk',
            session: true,
            strong: false,
        });
        if (!rawCredentialsData) {
            return null;
        }
        const credentialData = JSON.parse(rawCredentialsData) as CredentialData;
        return credentialData;
    }
}
