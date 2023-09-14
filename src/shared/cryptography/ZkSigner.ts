import { type ExportedKeypair, type SerializedSignature } from '@mysten/sui.js';
import {
    type Ed25519Keypair,
    type Ed25519PublicKey,
} from '@mysten/sui.js/keypairs/ed25519';

import { WalletSigner } from './WalletSigner';

import type { SuiClient } from '@mysten/sui.js/client';
import { decodeJwt, type JWTPayload } from 'jose';
import { type ZkProvider } from '_src/ui/app/components/zklogin/providers';
import { computeZkAddress } from '_src/ui/app/components/zklogin/address';
import { deobfuscate, obfuscate } from './keystore';
import { blake2b } from '@noble/hashes/blake2b';
import { getEncrypted, setEncrypted } from '../storagex/store';
import { type PartialZkSignature } from '_src/ui/app/components/zklogin/utils';
import networkEnv, { type NetworkEnvType } from '_src/background/NetworkEnv';
import { getCurrentEpoch } from './current-epoch';

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
    ephemeralKeyPair: ExportedKeypair;
    proofs?: PartialZkSignature;
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

    constructor(ephemeralKeyPair: Ed25519Keypair, client: SuiClient) {
        super(client);
        this.ephemeralKeyPair = ephemeralKeyPair;
        this.createNew({ provider: 'google' });
    }

    private async createNew({
        provider,
    }: {
        provider: ZkProvider;
    }): Promise<Omit<ZkAccountSerialized, 'id'>> {
        // const jwt = await zkLogin({ provider, prompt: true });
        const jwt = jwtStub;
        const salt = saltStub;
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
        console.log('claims :>> ', claims);
        const address = computeZkAddress({
            claimName: 'sub',
            claimValue: decodedJWT.sub,
            iss: decodedJWT.iss,
            aud,
            userSalt: BigInt(salt),
        });
        console.log('address :>> ', address);

        this.address = address;

        // in the sui wallet this is not called here (not sure were it gets called when the account is created)
        await this.#doLogin();

        return Promise.resolve({
            type: 'zk',
            address: address,
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
        return this.address || '';
    }

    async signData(data: Uint8Array): Promise<SerializedSignature | any> {
        console.log('in signData');

        // const digest = blake2b(data, { dkLen: 32 });
        const digest = blake2b(stubDataToSign, { dkLen: 32 });
        console.log('digest :>> ', digest);

        // if (await this.isLocked()) {
        // 	throw new Error('Account is locked');
        // }

        // Currently the SUI wallet saves the CredentialData in a Record with keys being 'mainnet', 'testnet' etc
        // But that errors out in their code so for now going to save just CredentialData
        const credentialsData = await this.getEphemeralValue();
        console.log('credentialsData from storage :>> ', credentialsData);
        const currentEpoch = await getCurrentEpoch();
        console.log('currentEpoch :>> ', currentEpoch);

        // NOTE going to try to save credentials then come back to this track.
    }

    connect(client: SuiClient): WalletSigner {
        return new ZkSigner(this.ephemeralKeyPair, client);
    }

    async #doLogin() {
        // const { provider, claims } = await this.getStoredData();
        // const { sub, aud, iss } = await deobfuscate<JwtSerializedClaims>(claims);
        const epoch = await getCurrentEpoch();
        // const { ephemeralKeyPair, nonce, randomness, maxEpoch } = prepareZKLogin(Number(epoch));
        const maxEpoch = epoch + 5; // Temporary
        const randomness = BigInt(0); // Temporary
        const ephemeralKeyPair = this.ephemeralKeyPair;
        // const jwt = await zkLogin({ provider, nonce, loginHint: sub });
        const jwt = jwtStub;
        const decodedJWT = decodeJwt(jwt);
        // if (decodedJWT.aud !== aud || decodedJWT.sub !== sub || decodedJWT.iss !== iss) {
        // 	throw new Error("Logged in account doesn't match with saved account");
        // }
        const ephemeralValue = (await this.getEphemeralValue()) || {};
        const activeNetwork = await networkEnv.getActiveNetwork();
        const credentialsData: CredentialData = {
            ephemeralKeyPair: ephemeralKeyPair.export(),
            minEpoch: Number(epoch),
            maxEpoch,
            network: activeNetwork,
            randomness: randomness.toString(),
            jwt,
        };
        console.log(
            'credentialsData being saved to storage :>> ',
            credentialsData
        );
        // ephemeralValue[serializeNetwork(activeNetwork)] = credentialsData;
        // await this.setEphemeralValue(ephemeralValue);
        // await this.onUnlocked();

        await setEncrypted({
            // ❗❗❗❗ CHANGE THIS KEY ❗❗❗❗
            key: 'zk-1',
            session: false,
            strong: false,
            value: JSON.stringify(credentialsData),
        });

        return credentialsData;
    }

    protected async getEphemeralValue(): Promise<CredentialData | null> {
        return (await getEncrypted({
            // ❗❗❗❗ CHANGE THIS KEY ❗❗❗❗
            key: 'zk-1',
            session: false,
            strong: false,
        })) as CredentialData | null;
    }
}

const jwtStub =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6IjdjMGI2OTEzZmUxMzgyMGEzMzMzOTlhY2U0MjZlNzA1MzVhOWEwYmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI5NDY3MzEzNTIyNzYtcGs1Z2xjZzhjcW8zOG5kYjM5aDdqMDkzZnBzcGh1c3UuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI5NDY3MzEzNTIyNzYtcGs1Z2xjZzhjcW8zOG5kYjM5aDdqMDkzZnBzcGh1c3UuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDM2OTY1NjQ2MzA2MjM3MzE4MTciLCJoZCI6ImV0aG9zd2FsbGV0Lnh5eiIsImVtYWlsIjoidG9tbXlAZXRob3N3YWxsZXQueHl6IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5vbmNlIjoiYmVPVWVUWVpXb2pTSWgzRlFteXdubU16SVowIiwibmJmIjoxNjk0NjM2ODM2LCJuYW1lIjoiVG9tbXkgV2lsY3playIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLQk9nVjE0OXN5cVBUZlRoWGFiaC12TXB2U3oxNm1Wa3F4b2FyWjYxVE91QT1zOTYtYyIsImdpdmVuX25hbWUiOiJUb21teSIsImZhbWlseV9uYW1lIjoiV2lsY3playIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjk0NjM3MTM2LCJleHAiOjE2OTQ2NDA3MzYsImp0aSI6IjhlZGZmMDIyM2RhYjU2YjY0MmNlMjU2ODYzYjI3YTY4YzIxNTFkOTcifQ.AI89AbyaAZhD2HrXfZwJXv__yoxwE-PgnMpyKX5ehz9TQzCAnYGgLhUHSoGKi2uhB5IWAMGi0_Z-45BBDe1hiTwwA-iC_e7gABANZxBWTOuYWttrzr3VbUMT6jxWVec3EgRxMVT4CHC6WhgjZOjTupVFrJlCFOoWyOWnl3eR1ajbAyeXQpTWbut5iWtOgsi9yid19q_kwy3-GrdVC6xjc3Hrb2fCK1Tw7DHbTpOc4ULI0biA8dresJaVqr580UTS06PQ4URSE6RHWrqSYTdtKNHK6MLsvfp8CV8x3c_J-n4dNUtfHrMBGM8kp5zg4YJE8fJHjDt-JMpfawlq741KPQ';
const saltStub = '213783213642252539822840878157811945348';
const decodedJwtStub = {
    iss: 'https://accounts.google.com',
    azp: '946731352276-pk5glcg8cqo38ndb39h7j093fpsphusu.apps.googleusercontent.com',
    aud: '946731352276-pk5glcg8cqo38ndb39h7j093fpsphusu.apps.googleusercontent.com',
    sub: '103696564630623731817',
    hd: 'ethoswallet.xyz',
    email: 'tommy@ethoswallet.xyz',
    email_verified: true,
    nonce: 'beOUeTYZWojSIh3FQmywnmMzIZ0',
    nbf: 1694636836,
    name: 'Tommy Wilczek',
    picture:
        'https://lh3.googleusercontent.com/a/ACg8ocKBOgV149syqPTfThXabh-vMpvSz16mVkqxoarZ61TOuA=s96-c',
    given_name: 'Tommy',
    family_name: 'Wilczek',
    locale: 'en',
    iat: 1694637136,
    exp: 1694640736,
    jti: '8edff0223dab56b642ce256863b27a68c2151d97',
} as JWTPayload;

// This is an unsigned transaction for sending some SUI
const stubDataToSign = new Uint8Array([
    0, 0, 0, 0, 0, 2, 0, 8, 0, 225, 245, 5, 0, 0, 0, 0, 0, 32, 241, 198, 164,
    104, 81, 215, 58, 254, 66, 25, 103, 128, 116, 24, 154, 127, 241, 70, 228,
    174, 219, 59, 117, 84, 48, 137, 159, 209, 132, 243, 7, 17, 2, 2, 0, 1, 1, 0,
    0, 1, 1, 2, 0, 0, 1, 1, 0, 50, 161, 152, 67, 17, 34, 30, 79, 234, 233, 229,
    49, 5, 6, 157, 225, 218, 142, 70, 36, 194, 146, 43, 164, 215, 41, 189, 106,
    201, 27, 159, 209, 1, 226, 155, 21, 126, 91, 146, 246, 221, 130, 126, 114,
    65, 62, 118, 210, 44, 27, 25, 85, 99, 80, 229, 210, 197, 194, 13, 6, 8, 2,
    150, 240, 137, 53, 136, 145, 0, 0, 0, 0, 0, 32, 161, 51, 68, 195, 129, 148,
    91, 192, 149, 102, 66, 221, 34, 47, 18, 251, 110, 201, 30, 62, 236, 196, 61,
    211, 153, 35, 250, 164, 9, 219, 231, 198, 50, 161, 152, 67, 17, 34, 30, 79,
    234, 233, 229, 49, 5, 6, 157, 225, 218, 142, 70, 36, 194, 146, 43, 164, 215,
    41, 189, 106, 201, 27, 159, 209, 232, 3, 0, 0, 0, 0, 0, 0, 64, 171, 60, 0,
    0, 0, 0, 0, 0,
]);
