import { type SerializedSignature } from '@mysten/sui.js';
import {
    type Ed25519Keypair,
    type Ed25519PublicKey,
} from '@mysten/sui.js/keypairs/ed25519';

import { WalletSigner } from './WalletSigner';

import type { SuiClient } from '@mysten/sui.js/client';
import type { JWTPayload } from 'jose';
import { type ZkProvider } from '_src/ui/app/components/zklogin/providers';
import { computeZkAddress } from '_src/ui/app/components/zklogin/address';
import { obfuscate } from './keystore';

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

/*
    For ZkAccountSerialized, the mysten codebase this extends `SerializedAccount`, which is the object that
    gets stored to local storage. It has public key, nickname, etc. We're using the
    Account slice instead. However for now I pasted in the required types (AccountType, SerializedAccount)
*/
// THIS IS FROM THE SUI WALLET
export type AccountType = 'mnemonic-derived' | 'imported' | 'ledger' | 'qredo' | 'zk';
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

    constructor(ephemeralKeyPair: Ed25519Keypair, client: SuiClient) {
        super(client);
        this.ephemeralKeyPair = ephemeralKeyPair;
    }

    private async createNew({ provider }: { provider: ZkProvider }): Promise<Omit<ZkAccountSerialized, 'id'>> {
        const salt = '🧂'
        const decodedJWT = decodedJwtStub;
        if (!decodedJWT.sub || !decodedJWT.iss || !decodedJWT.aud) {
            throw new Error('Missing jwt data');
        }
        if (Array.isArray(decodedJWT.aud)) {
            throw new Error('Not supported aud. Aud is an array, string was expected.');
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
        return Promise.resolve({
            type: 'zk',
            address: computeZkAddress({
                claimName: 'sub',
                claimValue: decodedJWT.sub,
                iss: decodedJWT.iss,
                aud,
                userSalt: BigInt(salt),
            }),
            claims: await obfuscate(claims),
            salt: await obfuscate(salt),
            provider,
            publicKey: null,
            lastUnlockedOn: null,
            selected: false,
            nickname: claims.email || null,
            createdAt: Date.now(),
        });
    }

    async getAddress(): Promise<string> {
        return this.ephemeralKeyPair.toSuiAddress();
    }

    async getPublicKey(): Promise<Ed25519PublicKey> {
        return this.ephemeralKeyPair.getPublicKey();
    }

    async signData(data: Uint8Array): Promise<SerializedSignature> {
        throw new Error('Not implemented');
    }

    connect(client: SuiClient): WalletSigner {
        return new ZkSigner(this.ephemeralKeyPair, client);
    }
}

const decodedJwtStub = {
    "iss": "https://accounts.google.com",
    "azp": "946731352276-pk5glcg8cqo38ndb39h7j093fpsphusu.apps.googleusercontent.com",
    "aud": "946731352276-pk5glcg8cqo38ndb39h7j093fpsphusu.apps.googleusercontent.com",
    "sub": "102582563248739061316",
    "email": "tommywilczek@gmail.com",
    "email_verified": true,
    "nonce": "ByBEO6Qw4X4VjqVmzZ6U8lrQpEY",
    "nbf": 1694482525,
    "name": "Tommy Wilczek",
    "picture": "https://lh3.googleusercontent.com/a/ACg8ocIa3pj6wBFPMeBFPfKLL26jL5gMZtwpwbRCGHgSMEomPH4B=s96-c",
    "given_name": "Tommy",
    "family_name": "Wilczek",
    "locale": "en",
    "iat": 1694482825,
    "exp": 1694486425,
    "jti": "1647fc1cbbab0d4aa296297e5c11890026cb2202"
} as JWTPayload